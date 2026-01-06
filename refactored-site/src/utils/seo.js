export const createSEOMeta = ({
    title,
    description,
    canonicalUrl,
    ogImage,
    keywords = [],
    author = 'Alpha Code',
    publishedTime,
    modifiedTime,
    type = 'website'
}) => ({
    // Meta básicos
    title: `${title} | Alpha Code`,
    description,
    canonical: canonicalUrl,

    // Open Graph
    'og:title': title,
    'og:description': description,
    'og:type': type,
    'og:url': canonicalUrl,
    'og:image': ogImage,
    'og:locale': 'pt_BR',

    // Twitter Cards
    'twitter:card': 'summary_large_image',
    'twitter:creator': '@alphacode',

    // Article específico
    ...(publishedTime && { 'article:published_time': publishedTime }),
    ...(modifiedTime && { 'article:modified_time': modifiedTime }),
    ...(author && { 'article:author': author }),

    // Keywords (moderado)
    keywords: keywords.join(', '),

    // Robots
    robots: 'index, follow, max-image-preview:large'
});
