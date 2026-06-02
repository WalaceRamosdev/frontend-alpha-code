import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export const prerender = true;

export async function GET(context: APIContext) {
    const now = new Date();
    const posts = (await getCollection("blog", ({ data }) =>
        data.draft !== true && data.pubDate <= now
    )).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

    return rss({
        title: "Alpha Insights | Blog da Alpha Code",
        description:
            "Estratégias de presença digital, SEO local e conversão para profissionais e empresas que buscam o topo do Google.",
        site: context.site ?? "https://www.sitesalphacode.com.br",
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/blog/${post.slug}/`,
            categories: post.data.categories ?? [],
            author: post.data.author,
        })),
        customData: `<language>pt-BR</language>`,
        stylesheet: "/rss-styles.xsl",
    });
}
