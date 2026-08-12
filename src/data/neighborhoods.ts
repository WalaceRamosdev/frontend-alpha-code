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
    "niteroi": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro histórico e administrativo de Niterói, com forte comércio e vista privilegiada da Baía de Guanabara.",
            cepExample: "24020-000",
            landmark: "Museu de Arte Contemporânea (MAC)",
        },
        {
            slug: "icarai",
            name: "Icaraí",
            type: "Residencial",
            description:
                "Bairro nobre de Niterói, com alta qualidade de vida e proximidade com as praias da Costa Verde.",
            cepExample: "24230-000",
            landmark: "Praia de Icaraí",
        },
        {
            slug: "sao-domingos",
            name: "São Domingos",
            type: "Residencial",
            description:
                "Bairro residencial tradicional de Niterói, com ampla infraestrutura de comércio e serviços.",
            cepExample: "24210-000",
            landmark: "Parque de São Domingos",
        },
        {
            slug: "inga",
            name: "Ingá",
            type: "Misto",
            description:
                "Bairro aristocrático de Niterói, com mansões históricas e forte vocação cultural e comercial.",
            cepExample: "24220-000",
            landmark: "Castelo de Ingá",
        },
    ],
    "sao-goncalo": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro de São Gonçalo, polo administrativo e comercial do município com maior população da Região Metropolitana.",
            cepExample: "24440-000",
            landmark: "Praça da Matriz",
        },
        {
            slug: "alcantara",
            name: "Alcântara",
            type: "Residencial",
            description:
                "Bairro residencial de classe média com boa infraestrutura e acesso à Baía de Guanabara.",
            cepExample: "24470-000",
            landmark: "Igreja de Alcântara",
        },
        {
            slug: "neves",
            name: "Neves",
            type: "Misto",
            description:
                "Bairro tradicional com misto de residências e comércio, próximo ao centro histórico de São Gonçalo.",
            cepExample: "24460-000",
            landmark: "Feira de Neves",
        },
    ],
    "volta-redonda": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro de Volta Redonda, polo comercial e administrativo da cidade-sede da siderurgia nacional.",
            cepExample: "27240-000",
            landmark: "Praça Rui Barbosa",
        },
        {
            slug: "jardim-palacio",
            name: "Jardim Palácio",
            type: "Residencial",
            description:
                "Bairro nobre de Volta Redonda, com alto padrão residencial e excelente infraestrutura.",
            cepExample: "27260-000",
            landmark: "Parque Municipal",
        },
        {
            slug: "siderurgica",
            name: "Siderúrgica",
            type: "Industrial",
            description:
                "Bairro operacional da Usiminas, com forte presença industrial e serviços correlatos.",
            cepExample: "27210-000",
            landmark: "Usiminas (USIMINAS)",
        },
        {
            slug: "nunes-baia",
            name: "Nunes Baía",
            type: "Residencial",
            description:
                "Bairro residencial tranquilo com boa infraestrutura de comércio e serviços para a família.",
            cepExample: "27270-000",
            landmark: "Shopping Pátio Volta Redonda",
        },
    ],
    "petropolis": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro histórico imperial de Petrópolis, patrimônio cultural do Brasil com arquitetura colonial preservada.",
            cepExample: "25680-000",
            landmark: "Palácio de Cristal",
        },
        {
            slug: "cosme-velho",
            name: "Cosme Velho",
            type: "Residencial",
            description:
                "Bairro residencial tradicional de Petrópolis, próximo à Estação de Trem e com charme colonial.",
            cepExample: "25640-000",
            landmark: "Estação de Petrópolis",
        },
        {
            slug: "retiro",
            name: "Retiro",
            type: "Residencial",
            description:
                "Bairro residencial de classe média-alta com excelente infraestrutura e acesso ao centro histórico.",
            cepExample: "25690-000",
            landmark: "Parque de Retiro",
        },
        {
            slug: "pedra-do-sino",
            name: "Pedra do Sino",
            type: "Residencial",
            description:
                "Bairro nobre de Petrópolis, com condomínios de alto padrão e vista panorâmica da serra.",
            cepExample: "25730-000",
            landmark: "Pedra do Sino (Pico mais alto)",
        },
    ],
    "resende": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro de Resende, polo comercial e administrativo da região do Vale do Paraíba.",
            cepExample: "27510-000",
            landmark: "Praça da Matriz",
        },
        {
            slug: "vila-militar",
            name: "Vila Militar",
            type: "Misto",
            description:
                "Bairro da Escola Preparatória de Cadetes do Exército, com forte presença militar e comércio local.",
            cepExample: "27520-000",
            landmark: "EsPCEx (Escola de Cadetes)",
        },
        {
            slug: "porto-real",
            name: "Porto Real",
            type: "Industrial",
            description:
                "Distrito industrial de Resende com grandes indústrias automotivas e de base do Vale do Paraíba.",
            cepExample: "27540-000",
            landmark: "Complexo Industrial",
        },
        {
            slug: "visconde-de-maua",
            name: "Visconde de Mauá",
            type: "Residencial",
            description:
                "Bairro residencial tradicional de Resende, com ampla infraestrutura e fácil acesso à Dutra.",
            cepExample: "27530-000",
            landmark: "Avenida Visconde de Mauá",
        },
    ],
    "campos-dos-goytacazes": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro histórico de Campos dos Goytacazes, polo comercial e cultural do Norte Fluminense.",
            cepExample: "28010-000",
            landmark: "Teatro Municipal de Campos",
        },
        {
            slug: "laranjeiras",
            name: "Laranjeiras",
            type: "Residencial",
            description:
                "Bairro residencial tradicional de Campos, com casarões coloniais e forte identidade cultural.",
            cepExample: "28020-000",
            landmark: "Igreja de Laranjeiras",
        },
        {
            slug: "baiuca",
            name: "Baiuca",
            type: "Misto",
            description:
                "Bairro em crescimento com misto de residências e comércio, próximo ao centro de Campos.",
            cepExample: "28030-000",
            landmark: "Praça da Baiuca",
        },
        {
            slug: "guarus",
            name: "Guarus",
            type: "Residencial",
            description:
                "Bairro residencial tradicional com boa infraestrutura e fácil acesso ao centro e à orla.",
            cepExample: "28040-000",
            landmark: "Feira de Guarus",
        },
    ],
    "macae": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro de Macaé, polo administrativo e comercial da capital do petróleo fluminense.",
            cepExample: "27913-000",
            landmark: "Museu de Macaé",
        },
        {
            slug: "cavaleiros",
            name: "Cavaleiros",
            type: "Residencial",
            description:
                "Bairro nobre de Macaé com alto padrão residencial e forte presença de executivos do setor petrolífero.",
            cepExample: "27930-000",
            landmark: "Shopping Pátio Macaé",
        },
        {
            slug: "barra-de-macae",
            name: "Barra de Macaé",
            type: "Misto",
            description:
                "Região litorânea em desenvolvimento com forte potencial turístico e imobiliário.",
            cepExample: "27950-000",
            landmark: "Praia da Barra de Macaé",
        },
        {
            slug: "monte-dourado",
            name: "Monte Dourado",
            type: "Residencial",
            description:
                "Bairro residencial de classe média-alta com infraestrutura completa e acesso rápido ao centro.",
            cepExample: "27920-000",
            landmark: "Parque Monte Dourado",
        },
    ],
    "nova-friburgo": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro histórico de Nova Friburgo, polo comercial e cultural da Região Serrana Fluminense.",
            cepExample: "28610-000",
            landmark: "Praça do Coreto",
        },
        {
            slug: "duas-pedras",
            name: "Duas Pedras",
            type: "Residencial",
            description:
                "Bairro residencial de classe média-alta com ótima infraestrutura e vista privilegiada da serra.",
            cepExample: "28620-000",
            landmark: "Parque de Duas Pedras",
        },
        {
            slug: "mesa-do-imperador",
            name: "Mesa do Imperador",
            type: "Residencial",
            description:
                "Bairro nobre de Nova Friburgo, com alto padrão residencial e proximidade com a natureza serrana.",
            cepExample: "28650-000",
            landmark: "Mirante da Mesa do Imperador",
        },
        {
            slug: "lumiar",
            name: "Lumiar",
            type: "Rural",
            description:
                "Distrito rural de Nova Friburgo com forte turismo rural ecológico e cultivo de flores.",
            cepExample: "28670-000",
            landmark: "Fazendas de Flores de Lumiar",
        },
    ],
    "angra-dos-reis": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro histórico de Angra dos Reis, polo administrativo e cultural do Litoral Sul Fluminense.",
            cepExample: "23900-000",
            landmark: "Igreja de Santa Rita",
        },
        {
            slug: "jardim-oceanico",
            name: "Jardim Oceânico",
            type: "Residencial",
            description:
                "Bairro residencial à beira-mar com alto padrão e acesso direto às praias de Angra.",
            cepExample: "23920-000",
            landmark: "Praia do Jardim Oceânico",
        },
        {
            slug: "frade",
            name: "Frade",
            type: "Residencial",
            description:
                "Bairro litorâneo de Angra dos Reis com praias preservadas e condomínios de alto padrão.",
            cepExample: "23940-000",
            landmark: "Ilha do Frade",
        },
        {
            slug: "mambucaba",
            name: "Mambucaba",
            type: "Misto",
            description:
                "Bairro tradicional de Angra com misto de residências, comércio e forte vocação turística.",
            cepExample: "23960-000",
            landmark: "Praia de Mambucaba",
        },
    ],
    "cabo-frio": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro de Cabo Frio, polo turístico e comercial da Costa do Sol com forte presença de lojas e restaurantes.",
            cepExample: "28900-000",
            landmark: "Igreja de Nossa Senhora da Assunção",
        },
        {
            slug: "barra",
            name: "Barra",
            type: "Residencial",
            description:
                "Bairro residencial litorâneo com alto padrão e proximidade com as praias e o centro de Cabo Frio.",
            cepExample: "28920-000",
            landmark: "Praia da Barra",
        },
        {
            slug: "tijuca",
            name: "Tijuca",
            type: "Residencial",
            description:
                "Bairro residencial tranquilo com boa infraestrutura e fácil acesso ao centro e às praias.",
            cepExample: "28930-000",
            landmark: "Parque Tijuca",
        },
        {
            slug: "arraial-do-cabo",
            name: "Arraial do Cabo",
            type: "Misto",
            description:
                "Distrito de Cabo Frio com praias paradisíacas e forte vocação turística e pesqueira.",
            cepExample: "28950-000",
            landmark: "Praia do Forno",
        },
    ],
    "belo-horizonte": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro de Belo Horizonte, maior polo corporativo e cultural de Minas Gerais com arquitetura modernista.",
            cepExample: "30130-000",
            landmark: "Praça da Liberdade",
        },
        {
            slug: "savassi",
            name: "Savassi",
            type: "Comercial",
            description:
                "Bairro nobre de BH, polo gastronômico e cultural de alto padrão com lojas e bares sofisticados.",
            cepExample: "30140-000",
            landmark: "Praça da Savassi",
        },
        {
            slug: "funcionarios",
            name: "Funcionários",
            type: "Misto",
            description:
                "Bairro aristocrático de BH com mansões históricas e forte presença de escritórios e restaurantes.",
            cepExample: "30150-000",
            landmark: "Parque Municipal Américo Renné Giannetti",
        },
        {
            slug: "lourdes",
            name: "Lourdes",
            type: "Residencial",
            description:
                "Bairro nobre e tradicional de BH, com alto padrão residencial e proximidade com a Savassi.",
            cepExample: "30170-000",
            landmark: "Avenida Getúlio Vargas",
        },
        {
            slug: "pampulha",
            name: "Pampulha",
            type: "Misto",
            description:
                "Região modernista de BH com Conjunto Arquitetônico da Pampulha e forte presença universitária.",
            cepExample: "31360-000",
            landmark: "Complexo da Pampulha (UNESCO)",
        },
    ],
    "contagem": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro de Contagem, polo administrativo e comercial da segunda maior cidade da Região Metropolitana de BH.",
            cepExample: "32010-000",
            landmark: "Praça Prefeito João César de Oliveira",
        },
        {
            slug: "vila-contagem",
            name: "Vila Contagem",
            type: "Residencial",
            description:
                "Bairro residencial tradicional com boa infraestrutura e fácil acesso ao centro de Contagem.",
            cepExample: "32020-000",
            landmark: "Igreja de Vila Contagem",
        },
        {
            slug: "eymouth",
            name: "Eymouth",
            type: "Industrial",
            description:
                "Bairro industrial de Contagem com grande concentração de indústrias automotivas e de base.",
            cepExample: "32030-000",
            landmark: "Complexo Industrial Eymouth",
        },
        {
            slug: "cidade-nova",
            name: "Cidade Nova",
            type: "Residencial",
            description:
                "Bairro residencial em desenvolvimento com novos empreendimentos imobiliários e infraestrutura moderna.",
            cepExample: "32040-000",
            landmark: "Shopping Contagem",
        },
    ],
    "betim": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro de Betim, polo administrativo da cidade que abriga a maior fábrica da FIAT no Brasil.",
            cepExample: "32600-000",
            landmark: "Praça de Betim",
        },
        {
            slug: "industrial-betim",
            name: "Industrial Betim",
            type: "Industrial",
            description:
                "Bairro industrial de Betim com a maior planta fabril da FIAT e indústrias correlatas.",
            cepExample: "32610-000",
            landmark: "FIAT Automóveis",
        },
        {
            slug: "jardim-das-alterosas",
            name: "Jardim das Alterosas",
            type: "Residencial",
            description:
                "Bairro residencial de classe média-alta com boa infraestrutura e acesso ao centro de Betim.",
            cepExample: "32630-000",
            landmark: "Parque das Alterosas",
        },
        {
            slug: "taquaril",
            name: "Taquaril",
            type: "Residencial",
            description:
                "Bairro residencial em desenvolvimento com novos empreendimentos e fácil acesso à BR-381.",
            cepExample: "32640-000",
            landmark: "BR-381 (Ferrovia)",
        },
    ],
    "uberlandia": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro de Uberlândia, maior polo comercial e industrial do Triângulo Mineiro com forte economia.",
            cepExample: "38400-000",
            landmark: "Praça Tiradentes",
        },
        {
            slug: "santa-monica",
            name: "Santa Mônica",
            type: "Residencial",
            description:
                "Bairro nobre de Uberlândia com alto padrão residencial e forte presença de shopping centers.",
            cepExample: "38408-000",
            landmark: "Shopping Patio Uberlândia",
        },
        {
            slug: "tibery",
            name: "Tibery",
            type: "Misto",
            description:
                "Bairro em rápido desenvolvimento com misto de residências, comércio e escritórios modernos.",
            cepExample: "38405-000",
            landmark: "Avenida João Pinheiro",
        },
        {
            slug: "cidade-universitaria",
            name: "Cidade Universitária",
            type: "Misto",
            description:
                "Região da Universidade Federal de Uberlândia com forte presença acadêmica e inovação tecnológica.",
            cepExample: "38406-000",
            landmark: "UFU (Universidade Federal de Uberlândia)",
        },
    ],
    "juiz-de-fora": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro histórico de Juiz de Fora, polo comercial e cultural da Zona da Mata Mineira.",
            cepExample: "36010-000",
            landmark: "Catedral Metropolitana de Juiz de Fora",
        },
        {
            slug: "botanique",
            name: "Botanique",
            type: "Residencial",
            description:
                "Bairro nobre de Juiz de Fora com alto padrão residencial e forte presença de escritórios profissionais.",
            cepExample: "36020-000",
            landmark: "Parque Botanique",
        },
        {
            slug: "cascatinha",
            name: "Cascatinha",
            type: "Residencial",
            description:
                "Bairro residencial tradicional com ampla infraestrutura e fácil acesso ao centro e à BR-040.",
            cepExample: "36030-000",
            landmark: "Parque Cascatinha",
        },
        {
            slug: "sao-mateus",
            name: "São Mateus",
            type: "Misto",
            description:
                "Bairro em desenvolvimento com misto de residências e comércio, próximo ao centro de Juiz de Fora.",
            cepExample: "36040-000",
            landmark: "Igreja de São Mateus",
        },
    ],
    "sorocaba": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro de Sorocaba, polo administrativo e comercial do médio Vale do Paraíba Paulista.",
            cepExample: "18010-000",
            landmark: "Praça Tiradentes",
        },
        {
            slug: "jardim-europa",
            name: "Jardim Europa",
            type: "Residencial",
            description:
                "Bairro nobre de Sorocaba com alto padrão residencial e forte presença de condomínios fechados.",
            cepExample: "18030-000",
            landmark: "Shopping Iguatemi Sorocaba",
        },
        {
            slug: "industrial",
            name: "Industrial",
            type: "Industrial",
            description:
                "Distrito Industrial de Sorocaba com grande concentração de indústrias de base e tecnologia.",
            cepExample: "18050-000",
            landmark: "Complexo Industrial de Sorocaba",
        },
        {
            slug: "maria-antonia",
            name: "Maria Antonia",
            type: "Residencial",
            description:
                "Bairro residencial tradicional com boa infraestrutura de comércio e serviços para a família.",
            cepExample: "18060-000",
            landmark: "Parque Maria Antonia",
        },
    ],
    "sao-jose-dos-campos": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro de São José dos Campos, polo tecnológico e industrial do Vale do Paraíba com forte presença de P&D.",
            cepExample: "12210-000",
            landmark: "Praça Barão do Rio Branco",
        },
        {
            slug: "jk",
            name: "JK",
            type: "Residencial",
            description:
                "Bairro nobre de SJC com alto padrão residencial e forte presença de empresas de tecnologia.",
            cepExample: "12220-000",
            landmark: "Avenida JK",
        },
        {
            slug: "aquarius",
            name: "Aquarius",
            type: "Residencial",
            description:
                "Bairro residencial planejado com infraestrutura moderna e fácil acesso ao centro e à Rodovia dos Bandeirantes.",
            cepExample: "12230-000",
            landmark: "Shopping Colinas",
        },
        {
            slug: "campos-dos-alemaes",
            name: "Campos dos Alemães",
            type: "Misto",
            description:
                "Bairro em desenvolvimento com misto de residências e comércio, próximo ao centro de SJC.",
            cepExample: "12240-000",
            landmark: "Feira de Campos dos Alemães",
        },
    ],
    "ribeirao-preto": [
        {
            slug: "centro",
            name: "Centro",
            type: "Comercial",
            description:
                "Centro de Ribeirão Preto, polo comercial e cultural do noroeste paulista com forte economia cafeeira.",
            cepExample: "14010-000",
            landmark: "Teatro Municipal de Ribeirão Preto",
        },
        {
            slug: "jardim-paulista",
            name: "Jardim Paulista",
            type: "Residencial",
            description:
                "Bairro nobre de Ribeirão Preto com alto padrão residencial e forte presença de clínicas e hospitais.",
            cepExample: "14020-000",
            landmark: "Hospital Santa Casa",
        },
        {
            slug: "distrito-industrial",
            name: "Distrito Industrial",
            type: "Industrial",
            description:
                "Zona industrial de Ribeirão Preto com grande concentração de indústrias de alimentos e bebidas.",
            cepExample: "14040-000",
            landmark: "Complexo Industrial",
        },
        {
            slug: "bonfim",
            name: "Bonfim",
            type: "Misto",
            description:
                "Bairro tradicional com misto de residências e comércio, próximo ao centro e à Universidade de Ribeirão Preto.",
            cepExample: "14050-000",
            landmark: "Igreja do Bonfim",
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
