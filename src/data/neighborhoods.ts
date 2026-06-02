/**
 * Matriz de Bairros × Cidades para páginas long-tail.
 * Cada entrada tem 4-8 bairros estratégicos por cidade
 * (foco em bairros comerciais / alta renda / alta conversão).
 */

export interface NeighborhoodEntry {
    /** Slug do bairro (URL-safe) */
    slug: string;
    /** Nome do bairro */
    name: string;
    /** Categoria do bairro (Residencial, Comercial, Industrial, Misto) */
    type: "Residencial" | "Comercial" | "Industrial" | "Misto" | "Rural";
    /** Descrição única do bairro para evitar conteúdo duplicado */
    description: string;
    /** CEP exemplo do bairro */
    cepExample: string;
    /** Ponto de referência famoso */
    landmark: string;
}

export const NEIGHBORHOODS: Record<string, NeighborhoodEntry[]> = {
    "nova-iguacu": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Coração comercial de Nova Iguaçu, com forte fluxo de pedestres e o calçadão do Top Shopping nas proximidades.",
            cepExample: "26210-000",
            landmark: "Top Shopping",
        },
        {
            slug: "centro-de-nova-iguacu",
            name: "Centro de Nova Iguaçu",
            type: "Comercial",
            description:
                "Região administrativa e bancária de Nova Iguaçu, sede das principais empresas e órgãos públicos da Baixada.",
            cepExample: "26210-170",
            landmark: "Paço Municipal",
        },
        {
            slug: "belford-roxo-centro",
            name: "Belford Roxo (Centro)",
            type: "Comercial",
            description:
                "Centro de Belford Roxo, ponto de conexão entre Nova Iguaçu e a Baixada Fluminense.",
            cepExample: "26113-000",
            landmark: "Praça de Belford Roxo",
        },
        {
            slug: "cabuçu",
            name: "Cabuçu",
            type: "Misto",
            description:
                "Bairro residencial e comercial em ascensão, com novos empreendimentos e fácil acesso à Via Light.",
            cepExample: "26290-000",
            landmark: "Via Light",
        },
        {
            slug: "posse",
            name: "Posse",
            type: "Residencial",
            description:
                "Maior bairro de Nova Iguaçu em extensão, com perfil residencial e forte identidade cultural.",
            cepExample: "26020-000",
            landmark: "Igreja Matriz da Posse",
        },
        {
            slug: "vila-nova",
            name: "Vila Nova",
            type: "Residencial",
            description:
                "Bairro tradicional e bem localizado, com excelente infraestrutura comercial e fácil acesso ao centro.",
            cepExample: "26230-000",
            landmark: "Praça de Vila Nova",
        },
    ],
    "duque-de-caxias": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro histórico e comercial de Duque de Caxias, com forte presença de bancos, escritórios e comércio varejista.",
            cepExample: "25010-000",
            landmark: "Praça do Pacificador",
        },
        {
            slug: "jardin-camburi",
            name: "Jardim Camburi",
            type: "Residencial",
            description:
                "Bairro nobre com prédios residenciais de alto padrão, próximo ao Polo Industrial de Caxias.",
            cepExample: "25215-000",
            landmark: "Via Light",
        },
        {
            slug: "gramacho",
            name: "Gramacho",
            type: "Industrial",
            description:
                "Bairro industrial com grande concentração de empresas químicas, petroquímicas e de logística.",
            cepExample: "25035-000",
            landmark: "Refinaria de Duque de Caxias (Reduc)",
        },
        {
            slug: "parque-duque",
            name: "Parque Duque",
            type: "Residencial",
            description:
                "Bairro residencial consolidado, com boa infraestrutura de comércio e serviços.",
            cepExample: "25025-000",
            landmark: "Praça do Parque Duque",
        },
        {
            slug: "vila-sao-luiz",
            name: "Vila São Luiz",
            type: "Misto",
            description:
                "Bairro em crescimento com novos empreendimentos imobiliários e fácil acesso à Rodovia Washington Luís.",
            cepExample: "25065-000",
            landmark: "Rodovia Washington Luís",
        },
    ],
    "belford-roxo": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro comercial de Belford Roxo, polo de compras e serviços da região.",
            cepExample: "26113-000",
            landmark: "Praça de Belford Roxo",
        },
        {
            slug: "areia-branca",
            name: "Areia Branca",
            type: "Residencial",
            description:
                "Bairro residencial de classe média, com boa infraestrutura e comércio local forte.",
            cepExample: "26120-000",
            landmark: "Igreja de Areia Branca",
        },
        {
            slug: "heliópolis",
            name: "Heliópolis",
            type: "Residencial",
            description:
                "Bairro tranquilo e bem servido, próximo a Nova Iguaçu e com excelente custo-benefício.",
            cepExample: "26140-000",
            landmark: "Parque de Heliópolis",
        },
    ],
    "sao-joao-de-meriti": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro comercial vibrante de São João de Meriti, com intenso comércio de rua.",
            cepExample: "25515-000",
            landmark: "Praça da Bandeira",
        },
        {
            slug: "vila-dias-lopes",
            name: "Vila Dias Lopes",
            type: "Residencial",
            description:
                "Bairro residencial consolidado, com boa infraestrutura e fácil acesso ao Rio de Janeiro.",
            cepExample: "25520-000",
            landmark: "Rodovia Presidente Dutra",
        },
    ],
    "nilopolis": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro de Nilópolis, menor município da Baixada Fluminense, com forte identidade cultural.",
            cepExample: "26510-000",
            landmark: "Praça Paulo VI",
        },
    ],
    "mesquita": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro de Mesquita, com fácil acesso via Rodovia Presidente Dutra e bom polo comercial.",
            cepExample: "26550-000",
            landmark: "Praça de Mesquita",
        },
    ],
    "queimados": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro de Queimados, polo comercial do município com forte presença varejista.",
            cepExample: "26300-000",
            landmark: "Praça de Queimados",
        },
    ],
    "seropedica": [
        {
            slug: "centro",
            name: "Centro",
            type: "Misto",
            description:
                "Centro de Seropédica, com presença da UFRRJ e forte economia acadêmica e rural.",
            cepExample: "23890-000",
            landmark: "UFRRJ (Universidade Federal Rural do Rio de Janeiro)",
        },
    ],
    "itaguai": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro de Itaguaí, próximo ao Porto de Sepetiba, com forte vocação industrial e portuária.",
            cepExample: "23810-000",
            landmark: "Porto de Sepetiba",
        },
    ],
    "mage": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro histórico de Magé, com construções coloniais e forte identidade cultural da Baixada.",
            cepExample: "25900-000",
            landmark: "Igreja Matriz de Magé",
        },
    ],
    "guapimirim": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro de Guapimirim, porta de entrada para a Serra dos Órgãos, com forte turismo ecológico.",
            cepExample: "25940-000",
            landmark: "Parque Nacional da Serra dos Órgãos",
        },
    ],
    "itaim-bibi": [
        {
            slug: "itaim-bibi",
            name: "Itaim Bibi",
            type: "Comercial",
            description:
                "Bairro nobre de São Paulo, polo corporativo e gastronômico de alto padrão da capital paulista.",
            cepExample: "04530-000",
            landmark: "Avenida Brigadeiro Faria Lima",
        },
    ],
};

/** Lista todos os bairros em formato flat para geração de páginas */
export function getAllNeighborhoods(): Array<{
    citySlug: string;
    neighborhood: NeighborhoodEntry;
}> {
    const out: Array<{ citySlug: string; neighborhood: NeighborhoodEntry }> = [];
    for (const [citySlug, list] of Object.entries(NEIGHBORHOODS)) {
        for (const n of list) {
            out.push({ citySlug, neighborhood: n });
        }
    }
    return out;
}
