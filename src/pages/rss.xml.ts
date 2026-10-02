import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

// SSR: o feed precisa reavaliar o filtro de data a cada requisição para
// que um artigo agendado entre no feed assim que a data passa.
export const prerender = false;

export async function GET(context: APIContext) {
    const now = new Date();
    const posts = (await getCollection("blog", ({ data }) =>
        data.draft !== true && data.pubDate <= now
    )).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

    const feed = await rss({
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

    // Cache curto no edge: o feed é consumido por agregadores em escala de
    // minutos, então o filtro de data continua valendo sem risco de atraso.
    feed.headers.set("Cache-Control", "public, max-age=0, s-maxage=300");

    return feed;
}
