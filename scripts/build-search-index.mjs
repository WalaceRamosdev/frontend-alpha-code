/**
 * Gera o indice de busca do Pagefind em `dist/client/pagefind`.
 *
 * Como as paginas do blog sao SSR (`prerender = false`) para permitir
 * publicacao agendada em tempo real, o HTML delas nao existe em `dist/client`
 * e o Pagefind -- que so le HTML prerenderizado -- deixaria de indexar todos
 * os artigos do blog.
 *
 * A solucao e montar um diretorio "staging" com o HTML que deve ser indexado:
 *   1. todo `.html` de `dist/client`, mantendo a estrutura de pastas
 *   2. uma copia indexavel de cada artigo do blog, em `blog/<slug>/index.html`
 *
 * O Pagefind deriva a URL do resultado do caminho do arquivo, entao
 * `blog/meu-artigo/index.html` produz o link `/blog/meu-artigo/`, que e
 * exatamente a rota real do artigo (servida por SSR).
 *
 * Nada disso vira arquivo estatico do site: o staging fica num diretorio
 * temporario removido no fim, entao nao ha risco de HTML duplicado nem de URL
 * espuria no sitemap.
 *
 * Por que nao usar `index.addHTMLFile()`: na API Node do Pagefind 1.5.2
 * `addDirectory` e `addHTMLFile` se anulam -- a segunda chamada zera o indice
 * construido pela primeira. O staging evita o problema por construcao.
 *
 * Artigos com `draft: true` ou `pubDate` no futuro sao ignorados, para nunca
 * vazar conteudo ainda nao publicado.
 *
 * Uso: node scripts/build-search-index.mjs (executado por `npm run build`)
 */
import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createIndex, close } from "pagefind";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BLOG_DIR = path.join(ROOT, "src", "content", "blog");

// Caminhos relativos ao cwd: o npm sempre roda os scripts a partir da raiz do
// projeto e o Pagefind resolve os globs relativos a ele.
const SITE_DIR = path.join(ROOT, "dist", "client");
const STAGING_DIR = path.join(ROOT, ".pagefind-staging");
const OUTPUT_DIR = path.join(ROOT, "dist", "client", "pagefind");

/* ------------------------------------------------------------------ */
/* Frontmatter                                                         */
/* ------------------------------------------------------------------ */

function unquote(value) {
    const first = value[0];
    const last = value[value.length - 1];
    if (value.length > 1 && (first === '"' || first === "'") && first === last) {
        return value.slice(1, -1);
    }
    return value;
}

function parseFrontmatter(raw) {
    const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
    if (!match) return { data: {}, body: raw };

    const data = {};
    for (const line of match[1].split(/\r?\n/)) {
        // Ignora sub-objets/listas: so precisamos dos campos escalares simples.
        const prop = /^([A-Za-z][A-Za-z0-9_-]*):[ \t]*(.*)$/.exec(line);
        if (prop) data[prop[1]] = unquote(prop[2].trim());
    }
    return { data, body: raw.slice(match[0].length) };
}

/* ------------------------------------------------------------------ */
/* Markdown -> HTML (texto plano, so o que o Pagefind precisa)          */
/* ------------------------------------------------------------------ */

const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };

function escapeHtml(value) {
    return value.replace(/[&<>"]/g, (char) => HTML_ESCAPES[char]);
}

function stripHtmlTags(value) {
    return value.replace(/<\/?[a-zA-Z][^>]*>/g, "");
}

/** Remove a marcacao inline do markdown, preservando o texto. */
function inline(value) {
    return escapeHtml(stripHtmlTags(value))
        .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1") // imagens -> texto alternativo
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links -> rotulo
        .replace(/\[([^\]]+)\]\[[^\]]*\]/g, "$1") // links por referencia
        .replace(/\[([^\]]+)\]\s*$/, "$1") // link truncado
        .replace(/`([^`]+)`/g, "$1") // codigo inline
        .replace(/\*\*\*([^*]+)\*\*\*/g, "$1")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/\*([^*]+)\*/g, "$1")
        .replace(/(^|\W)_([^_]+)_(?=\W|$)/g, "$1$2")
        .replace(/~~([^~]+)~~/g, "$1")
        .replace(/^\s*[-*+]\s+/, "")
        .trim();
}

/**
 * Conversao linha a linha. O objetivo nao e fidelidade visual (o HTML real e
 * renderizado pelo Astro em tempo de requisicao), e sim preservar texto e a
 * hierarquia de headings -- e isso que o Pagefind usa para gerar titulo e
 * subtitulos dos resultados.
 */
function markdownToHtml(markdown) {
    const lines = markdown
        .replace(/\r\n/g, "\n")
        .replace(/<!--[\s\S]*?-->/g, "")
        .split("\n");

    const html = [];
    let inCode = false;
    let listType = null;
    let droppedLeadingTitle = false;

    const closeList = () => {
        if (listType) {
            html.push(`</${listType}>`);
            listType = null;
        }
    };

    for (const line of lines) {
        if (/^\s*(```|~~~)/.test(line)) {
            closeList();
            html.push(inCode ? "</code></pre>" : "<pre><code>");
            inCode = !inCode;
            continue;
        }

        if (inCode) {
            html.push(escapeHtml(line));
            continue;
        }

        if (!line.trim()) {
            closeList();
            continue;
        }

        const heading = /^(#{1,6})\s+(.*)$/.exec(line);
        if (heading) {
            closeList();
            const depth = heading[1].length;
            // O titulo do frontmatter ja virou o <h1> do documento: descarta o
            // <h1> inicial do corpo para nao duplicar e manter h2 como 2o nivel.
            if (depth === 1 && !droppedLeadingTitle) {
                droppedLeadingTitle = true;
                continue;
            }
            html.push(`<h${depth}>${inline(heading[2])}</h${depth}>`);
            continue;
        }

        if (/^\s*([-*_][ \t]*){3,}$/.test(line)) {
            closeList();
            html.push("<hr>");
            continue;
        }

        const quote = /^>[ \t]?(.*)$/.exec(line);
        if (quote) {
            closeList();
            html.push(`<blockquote><p>${inline(quote[1])}</p></blockquote>`);
            continue;
        }

        const bullet = /^\s*[-*+]\s+(.*)$/.exec(line);
        const numbered = /^\s*\d+[.)]\s+(.*)$/.exec(line);
        if (bullet || numbered) {
            const wanted = bullet ? "ul" : "ol";
            if (listType !== wanted) {
                closeList();
                html.push(`<${wanted}>`);
                listType = wanted;
            }
            html.push(`<li>${inline((bullet ?? numbered)[1])}</li>`);
            continue;
        }

        closeList();
        html.push(`<p>${inline(line)}</p>`);
    }

    closeList();
    if (inCode) html.push("</code></pre>");
    return html.join("\n");
}

/* ------------------------------------------------------------------ */
/* HTML indexavel de um artigo                                         */
/* ------------------------------------------------------------------ */

function buildArticleHtml({ title, description, body }) {
    // Nao usar `data-pagefind-body` aqui. O Pagefind detecta essa tag em
    // qualquer pagina do site e passa a descartar todas as paginas que NAO a
    // tem (as 1096 paginas prerenderizadas do site). Sem a tag, ele usa o
    // <html> como raiz e indexa o documento inteiro, como ja funcionava.
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
<meta name="robots" content="noindex">
<meta name="description" content="${escapeHtml(description)}">
</head>
<body>
<article>
<h1>${escapeHtml(title)}</h1>
<p>${escapeHtml(description)}</p>
${body}
</article>
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/* Montagem do staging                                                 */
/* ------------------------------------------------------------------ */

/** Copia apenas os `.html` de `dist/client`, preservando a estrutura de pastas. */
async function copyStaticHtml(from, to) {
    let copied = 0;

    async function walk(dir, relative) {
        const entries = await readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            // `pagefind/` e a saida da execucao anterior: nunca entra no staging.
            if (relative === "" && entry.name === "pagefind") continue;

            const source = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                await walk(source, path.join(relative, entry.name));
                continue;
            }
            if (!entry.name.endsWith(".html")) continue;

            const destination = path.join(to, relative, entry.name);
            await mkdir(path.dirname(destination), { recursive: true });
            await cp(source, destination);
            copied += 1;
        }
    }

    await walk(from, "");
    return copied;
}

async function writeArticles() {
    const files = (await readdir(BLOG_DIR)).filter((name) => name.endsWith(".md"));
    const now = new Date();
    const written = [];
    const skipped = [];

    for (const file of files) {
        const { data, body } = parseFrontmatter(
            await readFile(path.join(BLOG_DIR, file), "utf8"),
        );

        if (!data.title || !data.description) {
            skipped.push(`${file} (sem title/description)`);
            continue;
        }

        if (data.draft === "true") {
            skipped.push(`${file} (draft)`);
            continue;
        }

        const pubDate = new Date(data.pubDate);
        if (Number.isNaN(pubDate.valueOf())) {
            skipped.push(`${file} (pubDate invalido: ${data.pubDate})`);
            continue;
        }

        if (pubDate > now) {
            skipped.push(`${file} (agendado para ${pubDate.toISOString()})`);
            continue;
        }

        const slug = file.replace(/\.md$/, "");
        const destination = path.join(STAGING_DIR, "blog", slug, "index.html");
        await mkdir(path.dirname(destination), { recursive: true });
        await writeFile(
            destination,
            buildArticleHtml({
                title: data.title,
                description: data.description,
                body: markdownToHtml(body),
            }),
        );

        written.push(slug);
    }

    return { written, skipped };
}

/* ------------------------------------------------------------------ */
/* Execucao                                                            */
/* ------------------------------------------------------------------ */

async function countHtml(dir) {
    let total = 0;
    for (const entry of await readdir(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
            total += await countHtml(path.join(dir, entry.name));
        } else if (entry.name.endsWith(".html")) {
            total += 1;
        }
    }
    return total;
}

async function main() {
    try {
        await rm(STAGING_DIR, { recursive: true, force: true });
        await mkdir(STAGING_DIR, { recursive: true });

        const staticPages = await copyStaticHtml(SITE_DIR, STAGING_DIR);
        const { written, skipped } = await writeArticles();
        const stagedFiles = await countHtml(STAGING_DIR);

        const { errors: indexErrors, index } = await createIndex();
        if (indexErrors.length) throw new Error(`Pagefind: ${indexErrors.join("; ")}`);

        const result = await index.addDirectory({ path: STAGING_DIR });
        for (const error of result.errors) console.warn(`  aviso: ${error}`);

        // O Pagefind reporta um `page_count` correto mesmo quando decide, por
        // conta propria, descartar a maior parte do site -- e nesse caso ele
        // escreve o indice incompleto sem nenhum erro. Comparar o resultado
        // com o numero de arquivosMontados no staging pega esse tipo de falha
        // silenciosa em vez de publicar uma busca quebrada.
        // Desconto de 5: o build gera alguns .html auxiliares sem <html>.
        const lost = stagedFiles - result.page_count;
        if (lost > 5) {
            throw new Error(
                `Pagefind indexou apenas ${result.page_count} de ${stagedFiles} paginas ` +
                    `(${lost} perdidas). Verifique se algum HTML injetado usa ` +
                    `data-pagefind-body -- isso faz o Pagefind descartar todas as ` +
                    `paginas do site que nao tenham a tag.`,
            );
        }

        const output = await index.writeFiles({ outputPath: OUTPUT_DIR });
        await close();

        for (const error of output.errors) throw new Error(`Pagefind: ${error}`);

        console.log(
            `pagefind: ${result.page_count} pagina(s) indexadas ` +
                `(${staticPages} estaticas + ${written.length} do blog) -> ${output.outputPath}`,
        );
        for (const entry of skipped) console.log(`  ignorado: ${entry}`);
    } finally {
        await rm(STAGING_DIR, { recursive: true, force: true });
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});