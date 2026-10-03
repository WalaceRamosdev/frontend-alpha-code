import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const BLOG_DIR = "src/content/blog";
const OUT_DIR = "public/assets/blog";
const W = 1200;
const H = 800;

/* ---------- helpers ---------- */

const esc = (s) =>
    s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

function hsl(h, s, l) {
    h = ((h % 360) + 360) % 360;
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    const seg = [
        [c, x, 0],
        [x, c, 0],
        [0, c, x],
        [0, x, c],
        [x, 0, c],
        [c, 0, x],
    ][Math.floor(h / 60) % 6];
    return (
        "#" +
        seg
            .map((v) =>
                Math.round((v + m) * 255)
                    .toString(16)
                    .padStart(2, "0"),
            )
            .join("")
    );
}

// deterministic 0..1 from a string
function rand(str, salt = 0) {
    let h = 2166136261 ^ salt;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return ((h >>> 0) % 100000) / 100000;
}

function wrap(text, cpl, maxLines) {
    const words = text.replace(/\s+/g, " ").trim().split(" ");
    const lines = [];
    let cur = "";
    for (const w of words) {
        const t = cur ? cur + " " + w : w;
        if (t.length > cpl && cur) {
            lines.push(cur);
            cur = w;
        } else cur = t;
    }
    if (cur) lines.push(cur);
    if (lines.length > maxLines) {
        const kept = lines.slice(0, maxLines);
        kept[maxLines - 1] =
            kept[maxLines - 1].slice(0, Math.max(4, cpl - 1)).trimEnd() + "…";
        return kept;
    }
    return lines;
}

/* ---------- themes ---------- */
// icon paths are 24x24 stroke icons
const THEMES = [
    { key: "advocacia", label: "Advocacia", hue: 218, icon: "briefcase", kw: /advoc|advogad|juridic|jurídic|parecer|legal/i },
    { key: "odontologia", label: "Odontologia", hue: 196, icon: "activity", kw: /odontolog|dentista|dental|estetica|estética|clinica|clínica|medic|saude|saúde/i },
    { key: "psicologia", label: "Psicologia", hue: 272, icon: "users", kw: /psicolog|terapeut|paciente/i },
    { key: "imobiliaria", label: "Imobiliário", hue: 28, icon: "home", kw: /imobili|imoveis|imovel|imovel|apartamento|imovelario/i },
    { key: "restaurante", label: "Gastronomia", hue: 8, icon: "coffee", kw: /restaurante|gastronom|pizza|food|bar\b|culinaria/i },
    { key: "energia", label: "Energia Solar", hue: 44, icon: "sun", kw: /solar|energia|panel|photovolta/i },
    { key: "pet", label: "Pet", hue: 20, icon: "award", kw: /pet\b|petshop|pet shop|cachorr|gato/i },
    { key: "educacao", label: "Educação", hue: 210, icon: "book-open", kw: /escola|educa|curso|ensino|faculdade/i },
    { key: "ecommerce", label: "E-commerce", hue: 320, icon: "shopping-cart", kw: /achadinhos|shopee|amazon|mercado livre|afiliad|loja|e-commerce|ecommerce|produto/i },
    { key: "geo", label: "GEO & Respostas de IA", hue: 292, icon: "search", kw: /geo\b|generative engine|ai overview|ai overview|sge\b|ia no google|resposta.*ia|overviews/i },
    { key: "ai", label: "Inteligência Artificial", hue: 258, icon: "cpu", kw: /ia\b|\bcom ia\b|inteligencia artificial|automacao|automati|chatbot|whatsapp|machine|smart\b/i },
    { key: "performance", label: "Performance", hue: 190, icon: "zap", kw: /performance|velocidade|core web vital|carregamento|otimiz|hosting|hospedagem|cloud|vps|dominio|migrar|migracao|seo tecnico|seo e ranqu|ranqueamento/i },
    { key: "seo-local", label: "SEO Local", hue: 152, icon: "map-pin", kw: /seo local|google maps|google meu negocio|maps|local\b|perto de mim|GBP/i },
    { key: "custos", label: "Custos & ROI", hue: 38, icon: "dollar-sign", kw: /custa|orcamento|preco|preço|investimento|roi\b|valor|barato|caro\b|freelancer|agencia|pagar/i },
    { key: "cro", label: "Conversão & Vendas", hue: 350, icon: "trending-up", kw: /convers|converte|venda|leads?|landing page|cta\b|faturamento|cliente/i },
    { key: "design", label: "Design", hue: 300, icon: "layers", kw: /design|imagem|webp|avif|visual|identidade|cores?\b/i },
    { key: "mobile", label: "Mobile First", hue: 200, icon: "smartphone", kw: /mobile|celular|responsiv|app\b|instagram|social|rede social|linktree|link profissional/i },
    { key: "tech", label: "Tecnologia", hue: 232, icon: "code", kw: /wix\b|wordpress|plataforma|tecnolog|codig|schema|api\b|site\b.*(antigo|velho)/i },
    { key: "processo", label: "Processo de Criação", hue: 166, icon: "file-text", kw: /briefing|processo|criar um site|criacao de site|criação de site|checklist|passo a passo|como criar/i },
    { key: "cases", label: "Case de Sucesso", hue: 136, icon: "award", kw: /^case\b|case de|cliente real|exemplos reais|de\s.+ para\s/i },
    { key: "conteudo", label: "Conteúdo & Marketing", hue: 176, icon: "compass", kw: /conteudo|conteúdo|marketing|email|e-mail|multicanal|remarketing|publicidade|midia|mídia|campanha|seo\b/i },
];

const DEFAULT_THEME = { key: "geral", label: "Marketing Digital", hue: 214, icon: "target" };

const ICONS = {
    zap: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
    "map-pin": "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    cpu: "M4 4h16v16H4z M9 9h6v6H9z M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3",
    "trending-up": "M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6",
    "dollar-sign": "M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    smartphone: "M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z M11 19h2",
    code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
    "book-open": "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
    layers: "M12 2 2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
    briefcase: "M3 7h18v13H3z M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M3 12h18",
    activity: "M22 12h-4l-3 9L9 3l-3 9H2",
    users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
    home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
    coffee: "M18 8h1a4 4 0 0 1 0 8h-1 M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z M6 1v3M10 1v3M14 1v3",
    sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
    award: "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M8.2 13.9 7 23l5-3 5 3-1.2-9.1",
    "shopping-cart": "M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M20 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6",
    search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.3-4.3",
    "file-text": "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8M16 17H8M10 9H8",
    compass: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M16.2 7.8l-2.9 6.4-6.4 2.9 2.9-6.4 6.4-2.9z",
    target: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    "bar-chart-2": "M18 20V10M12 20V4M6 20v-6",
};

/* ---------- cover renderer ---------- */

function buildSvg({ title, label, hue, icon, seed }) {
    const hueShift = Math.round((rand(seed, 7) - 0.5) * 26);
    const h1 = hue + hueShift;
    const h2 = h1 + 34 + Math.round(rand(seed, 11) * 22);
    const accent = hsl(h1 + 18, 88, 62);
    const c0 = hsl(h2, 46, 11);
    const c1 = hsl(h1, 52, 22);
    const c2 = hsl(h1 + 8, 44, 17);
    const glow = hsl(h1 + 10, 80, 55);
    const pattern = Math.floor(rand(seed, 13) * 3);

    // pick a size that fits the title in <= 4 lines
    const TEXT_W = 660;
    let size = 70;
    let lines = [];
    for (; size >= 40; size -= 3) {
        const cpl = Math.floor(TEXT_W / (size * 0.5));
        lines = wrap(title, cpl, 4);
        if (lines.length <= 4 && (lines.length < 4 || cpl > 6)) break;
    }

    const lineH = Math.round(size * 1.18);
    const blockH = lines.length * lineH;
    const titleTop = 300 - (blockH - size) / 2;

    const titleSvg = lines
        .map(
            (l, i) =>
                `<text x="90" y="${Math.round(titleTop + i * lineH)}" font-size="${size}" font-weight="800" fill="#ffffff" letter-spacing="-0.6">${esc(l)}</text>`,
        )
        .join("");

    let decor = "";
    if (pattern === 0) {
        decor = `<circle cx="1010" cy="200" r="230" fill="${glow}" opacity="0.13"/>
                 <circle cx="880" cy="640" r="150" fill="${glow}" opacity="0.09"/>`;
    } else if (pattern === 1) {
        decor = `<circle cx="1090" cy="620" r="250" fill="${glow}" opacity="0.12"/>
                 <path d="M1200 0 L1200 260 L820 0 Z" fill="${glow}" opacity="0.10"/>`;
    } else {
        decor = `<circle cx="1060" cy="160" r="200" fill="${glow}" opacity="0.11"/>
                 <circle cx="980" cy="330" r="120" fill="${glow}" opacity="0.08"/>
                 <path d="M0 800 L0 560 L300 800 Z" fill="${glow}" opacity="0.10"/>`;
    }

    const iconPath = ICONS[icon] || ICONS.target;
    const iconSvg = `<g transform="translate(842,236) scale(9.2)" fill="none" stroke="${accent}" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" opacity="0.30"><path d="${iconPath}"/></g>`;

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="55%" stop-color="${c0}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <linearGradient id="ac" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${accent}"/>
      <stop offset="100%" stop-color="${hsl(h1 + 40, 88, 66)}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${decor}
  <rect x="0" y="0" width="${W}" height="8" fill="url(#ac)"/>
  <g>
    <rect x="90" y="92" width="286" height="46" rx="23" fill="${accent}" opacity="0.16"/>
    <rect x="90" y="92" width="286" height="46" rx="23" fill="none" stroke="${accent}" stroke-width="1.5" opacity="0.5"/>
    <text x="112" y="123" font-size="21" font-weight="700" fill="${accent}" letter-spacing="1.6">SITES ALPHA CODE</text>
  </g>
  <text x="90" y="216" font-size="27" font-weight="700" fill="${accent}" letter-spacing="3.4">${esc(label.toUpperCase())}</text>
  ${titleSvg}
  ${iconSvg}
  <rect x="90" y="678" width="1020" height="6" rx="3" fill="url(#ac)"/>
  <text x="90" y="734" font-size="25" font-weight="600" fill="#ffffff" opacity="0.55">sitesalphacode.com.br</text>
</svg>`;
}

/* ---------- main ---------- */

function readFrontmatter(raw) {
    const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
    return m ? m[1] : "";
}
const field = (fm, key) => {
    const m = new RegExp("^" + key + ':\\s*(.*)$', "m").exec(fm);
    return m ? m[1].trim().replace(/^["']|["']$/g, "") : "";
};

function pickTheme(slug, title) {
    const hay = slug.replace(/-/g, " ") + " " + title;
    for (const t of THEMES) if (t.kw.test(hay)) return t;
    return DEFAULT_THEME;
}

const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

const posts = files.map((f) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, f), "utf8");
    const fm = readFrontmatter(raw);
    const slug = f.replace(/\.md$/, "");
    return {
        file: f,
        slug,
        title: field(fm, "title"),
        hero: field(fm, "heroImage"),
    };
});

const shared = new Map();
for (const p of posts) {
    if (!p.hero) continue;
    if (!shared.has(p.hero)) shared.set(p.hero, []);
    shared.get(p.hero).push(p);
}

// articles sharing one heroImage get unique covers so no two cards look alike.
// the article whose slug matches the original filename keeps it; the others get their own.
function ownsOriginal(slug, hero) {
    const base = path
        .basename(hero)
        .replace(/\.webp$/, "")
        .replace(/-(sites-?alpha-?code|sitesalphacode)$/, "");
    return slug === base || slug.startsWith(base) || base.startsWith(slug);
}

let generated = 0;
let skipped = 0;
let rewrote = 0;
const force = process.argv.includes("--force");
const byTheme = new Map();

for (const p of posts) {
    if (!p.hero) continue;
    const group = shared.get(p.hero);
    const target =
        group.length > 1 && !ownsOriginal(p.slug, p.hero)
            ? `/assets/blog/${p.slug}.webp`
            : p.hero;

    const theme = pickTheme(p.slug, p.title);
    byTheme.set(theme.label, (byTheme.get(theme.label) || 0) + 1);

    const svg = buildSvg({
        title: p.title,
        label: theme.label,
        hue: theme.hue,
        icon: theme.icon,
        seed: p.slug,
    });

    const base = path.join("public", target);
    const stem = base.replace(/\.webp$/, "");

    if (!force && fs.existsSync(base) && fs.existsSync(stem + "-800.webp")) {
        skipped++;
        continue;
    }

    await sharp(Buffer.from(svg)).resize(W, H).webp({ quality: 88 }).toFile(base);
    await sharp(Buffer.from(svg)).resize(400, 267).webp({ quality: 84 }).toFile(stem + "-400.webp");
    await sharp(Buffer.from(svg)).resize(800, 533).webp({ quality: 86 }).toFile(stem + "-800.webp");
    generated++;

    if (target !== p.hero) {
        const fp = path.join(BLOG_DIR, p.file);
        const raw = fs.readFileSync(fp, "utf8");
        const next = raw.replace(
            new RegExp('(heroImage:\\s*)["\']?' + p.hero.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + '["\']?'),
            `$1"${target}"`,
        );
        if (next !== raw) {
            fs.writeFileSync(fp, next);
            rewrote++;
        }
    }
}

console.log(`capas geradas: ${generated}`);
console.log(`capas preservadas (ja existiam): ${skipped}`);
console.log(`heroImage reescrito (compartilhado): ${rewrote}`);
console.log("");
console.log("temas usados:");
for (const [label, n] of [...byTheme.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(3)}x  ${label}`);
}