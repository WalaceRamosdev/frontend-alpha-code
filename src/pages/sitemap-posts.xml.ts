import { getCollection } from "astro:content";
import type { APIContext } from "astro";

// SSR: o sitemap de posts precisa reavaliar o filtro de data a cada requisição.
// O sitemap gerado pela integração (@astrojs/sitemap) só enxerga páginas
// prerenderizadas, então este arquivo é a fonte de verdade para /blog/*.
export const prerender = false;

const XML_ESCAPES: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
};

function escapeXml(value: string): string {
    return value.replace(/[&<>"']/g, (char) => XML_ESCAPES[char]);
}

export async function GET(context: APIContext) {
    const now = new Date();
    const posts = (await getCollection("blog", ({ data }) =>
        data.draft !== true && data.pubDate <= now
    )).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

    const site = (context.site?.toString() ?? "https://www.sitesalphacode.com.br/").replace(
        /\/$/,
        "",
    );

    const urls = posts
        .map((post) => {
            const lastmod = (post.data.updatedDate ?? post.data.pubDate).toISOString();
            const imageTag = post.data.heroImage
                ? `\n    <image:image>\n      <image:loc>${escapeXml(post.data.heroImage.startsWith("http") ? post.data.heroImage : `${site}${post.data.heroImage.startsWith("/") ? post.data.heroImage : `/${post.data.heroImage}`}`)}</image:loc>\n      <image:title>${escapeXml(post.data.title)}</image:title>\n    </image:image>`
                : "";
            return `
  <url>
    <loc>${escapeXml(`${site}/blog/${post.slug}/`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>${imageTag}
  </url>`;
        })
        .join("");

    // A listagem /blog/ nao entra aqui: como e uma rota de path fixo, o
    // @astrojs/sitemap ja a inclui no sitemap-0.xml mesmo sendo SSR.
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=0, s-maxage=1800",
        },
    });
}
