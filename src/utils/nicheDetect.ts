/**
 * Mapeamento de nichos para detecção de tema em artigos e páginas.
 * Cada nicho tem um conjunto de palavras-chave (singular/plural e variações)
 * usadas para casar com tags, categorias e títulos de posts do blog.
 */
export const NICHE_KEYWORDS: Record<string, string[]> = {
    advogados: ["advogado", "advocacia", "juridic", "jurídic", "oab", "direito"],
    medicos: ["médico", "medico", "medicina", "consultório", "consultorio", "clínica de saúde"],
    dentistas: ["dentista", "odontolog", "dental"],
    psicologos: ["psicolog", "terapia", "terapeuta"],
    contadores: ["contador", "contabil", "contabilidade"],
    arquitetos: ["arquiteto", "arquitetos", "arquiteta", "escritório de arquitetura", "projeto de arquitetura"],
    "energia-solar": ["energia solar", "fotovoltaico", "solar"],
    imobiliarias: ["imobiliario", "imobiliaria", "imóveis", "imoveis", "corretor"],
    estetica: ["estética", "estetica", "beleza"],
    escolas: ["escola", "colégio", "colegio", "educação", "educacao"],
    restaurantes: ["restaurante", "delivery", "cardápio", "cardapio", "gastronomia"],
    pet: ["pet shop", "petshop", "veterinár", "veterinár"],
    fotografos: ["fotógraf", "fotograf"],
    manutencao: ["manutenção", "manutencao", "reparos"],
    afiliados: ["afiliado", "afiliados", "marketing de afiliados"],
};

const NICHE_SLUGS = Object.keys(NICHE_KEYWORDS);

/** Normaliza texto (minúsculas + remove acentos) para comparação de keywords. */
export function normalizeNicheText(text: string): string {
    return ` ${text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")} `;
}

/** Verifica se um texto casa com as keywords de um nicho. */
export function matchesNiche(text: string, slug: string): boolean {
    const keywords = NICHE_KEYWORDS[slug];
    const haystack = normalizeNicheText(text);
    if (!keywords) return haystack.includes(slug);
    return keywords.some((kw) => haystack.includes(kw));
}

export function nicheName(slug: string): string {
    const map: Record<string, string> = {
        advogados: "Advogados",
        medicos: "Médicos",
        dentistas: "Dentistas",
        psicologos: "Psicólogos",
        contadores: "Contadores",
        arquitetos: "Arquitetos",
        "energia-solar": "Energia Solar",
        imobiliarias: "Imobiliárias",
        estetica: "Estética",
        escolas: "Escolas",
        restaurantes: "Restaurantes",
        pet: "Pet",
        fotografos: "Fotógrafos",
        manutencao: "Manutenção",
        afiliados: "Afiliados",
    };
    return map[slug] ?? slug.charAt(0).toUpperCase() + slug.slice(1);
}

/**
 * Detecta o nicho mais provável a partir de um texto (título + tags + categorias).
 * Retorna o slug do nicho ou null se nenhum casar.
 *
 * O `primary` (título do artigo) tem prioridade: um match ali é mais confiável
 * do que em tags/descrição, evitando falsos positivos.
 */
export function detectNiche(primary: string, secondary = ""): string | null {
    const primaryHit = matchNiche(primary);
    if (primaryHit) return primaryHit;
    return matchNiche(secondary);
}

function matchNiche(text: string): string | null {
    const haystack = normalizeNicheText(text);
    for (const slug of NICHE_SLUGS) {
        const keywords = NICHE_KEYWORDS[slug];
        for (const kw of keywords) {
            if (haystack.includes(kw)) return slug;
        }
    }
    return null;
}
