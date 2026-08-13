export interface SEOProps {
    title: string;
    description?: string;
    canonicalUrl?: string;
    ogImage?: string;
    keywords?: string[];
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    type?: string;
    noIndex?: boolean;
    /**
     * Se true, não adiciona " | Alpha Code" ao title.
     * Use quando a página já termina com "Alpha Code" (ex.: "Criação de Sites ... | Sites Profissionais Alpha Code")
     * para evitar "Title | Alpha Code | Alpha Code" duplicado e truncado no Google.
     */
    skipSuffix?: boolean;
}

const SUFFIX = " | Alpha Code";
const MAX_TITLE = 60;

/**
 * Aplica o sufixo " | Alpha Code" apenas se o resultado couber no limite
 * recomendado de ~60 chars. Títulos que já contêm o sufixo (ou passaram
 * por buildSEOTitle) são mantidos como estão — evita "Title | Alpha Code"
 * truncado no Google e duplicação de sufixo.
 */
const applyTitleSuffix = (title: string, skipSuffix: boolean): string => {
    if (skipSuffix) return title;
    if (title.endsWith(SUFFIX)) return title;
    if ((title + SUFFIX).length <= MAX_TITLE) return title + SUFFIX;
    return title;
};

/**
 * Corta o texto no limite de palavra mais próximo, sem quebrar palavras.
 */
export const truncateAtWord = (text: string, max: number, ellipsis = "…") => {
    if (text.length <= max) return text;
    const cut = text.slice(0, max - ellipsis.length);
    const lastSpace = cut.lastIndexOf(" ");
    return (lastSpace > 30 ? cut.slice(0, lastSpace) : cut).trimEnd() + ellipsis;
};

/**
 * Monta o <title> com o sufixo da marca, mas remove o sufixo (e/ou corta
 * o texto) quando o resultado ultrapassar o limite recomendado (~60 chars),
 * evitando títulos truncados no Google. Se o texto base já termina com o
 * sufixo, ele é removido antes de recompor (evita "| Alpha Code | Alpha Code").
 */
export const buildSEOTitle = (
    base: string,
    opts: { suffix?: string; max?: number } = {},
): string => {
    const { suffix = SUFFIX, max = 60 } = opts;
    const clean = base.endsWith(suffix) ? base.slice(0, -suffix.length).trimEnd() : base;
    const full = clean + suffix;
    if (full.length <= max) return full;
    if (clean.length <= max) return clean;
    return truncateAtWord(clean, max);
};

/**
 * Monta a meta description respeitando o limite recomendado (~155 chars),
 * com corte em limite de palavra.
 */
export const buildSEODescription = (
    text: string,
    max = 155,
): string => truncateAtWord(text, max);

export const createSEOMeta = ({
    title,
    description,
    canonicalUrl,
    ogImage,
    keywords = [],
    author = 'Alpha Code',
    publishedTime,
    modifiedTime,
    type = 'website',
    noIndex = false,
    skipSuffix = false
}: SEOProps) => {
    // Detecta sufixo " | Alpha Code" já presente para evitar duplicação
    const finalTitle = applyTitleSuffix(title, skipSuffix);

    return {
        // Meta básicos
        title: finalTitle,
        description,
        canonical: canonicalUrl,

        // Open Graph
        'og:title': finalTitle,
        'og:description': description,
        'og:type': type,
        'og:url': canonicalUrl,
        'og:image': ogImage,
        'og:locale': 'pt_BR',
        'og:site_name': 'Alpha Code',

        // Twitter Cards
        'twitter:card': 'summary_large_image',
        'twitter:creator': '@alphacode',
        'twitter:title': finalTitle,
        'twitter:description': description,
        'twitter:image': ogImage,

        // Article específico
        ...(publishedTime && { 'article:published_time': publishedTime }),
        ...(modifiedTime && { 'article:modified_time': modifiedTime }),
        ...(author && { 'article:author': author }),

        // Keywords (moderado)
        keywords: keywords.join(', '),

        // Robots
        robots: noIndex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1'
    };
};
