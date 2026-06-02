import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export const prerender = true;

export async function GET(context: APIContext) {
    const now = new Date();
    const posts = (await getCollection("blog", ({ data }) =>
        data.draft !== true && data.pubDate <= now
    )).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

    const site = context.site?.toString() ?? "https://www.sitesalphacode.com.br";

    const urls = posts
        .map((post) => {
            const lastmod = (post.data.updatedDate ?? post.data.pubDate).toISOString();
            return `
  <url>
    <loc>${site}blog/${post.slug}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
        })
        .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
        },
    });
}
