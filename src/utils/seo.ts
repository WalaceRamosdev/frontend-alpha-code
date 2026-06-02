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
    const hasSuffix = title.endsWith(SUFFIX);
    const finalTitle = skipSuffix || hasSuffix ? title : `${title}${SUFFIX}`;

    return {
        // Meta básicos
        title: finalTitle,
        description,
        canonical: canonicalUrl,

        // Open Graph
        'og:title': title,
        'og:description': description,
        'og:type': type,
        'og:url': canonicalUrl,
        'og:image': ogImage,
        'og:locale': 'pt_BR',
        'og:site_name': 'Alpha Code',

        // Twitter Cards
        'twitter:card': 'summary_large_image',
        'twitter:creator': '@alphacode',
        'twitter:title': title,
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
