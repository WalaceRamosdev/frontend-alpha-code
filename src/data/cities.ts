/**
 * Fonte única de verdade para páginas de cidade.
 * Cada entrada tem conteúdo ÚNICO (bairros, referências locais, dados da região)
 * para evitar thin content / duplicate content.
 */

export interface CityContent {
    /** slug da URL */
    slug: string;
    /** nome da cidade (sem estado) */
    name: string;
    /** UF */
    state: string;
    /** sigla completa (ex: Nova Iguaçu - RJ) */
    fullName: string;
    /** região */
    region: string;
    /** título SEO (H1) - único por cidade */
    seoTitle: string;
    /** meta description - única por cidade */
    seoDescription: string;
    /** palavras-chave locais (não inclui "criação de sites", que é universal) */
    localKeywords: string[];
    /** bairro(s) principal(is) para chamada no hero */
    mainNeighborhoods: string[];
    /** pontos de referência reais da cidade (para SEO local) */
    landmarks: string[];
    /** parágrafo 1 do hero - menciona dados locais reais */
    heroIntro: string;
    /** texto longo (corpo do SEO) - 600+ palavras únicas por cidade */
    longContent: string;
    /** FAQs únicas desta cidade */
    faq: { question: string; answer: string }[];
    /** schema tipo - LocalBusiness usa o address da própria cidade */
    schemaType: "LocalBusiness" | "ProfessionalService";
    /** NAP (Name, Address, Phone) para consistência */
    nap: {
        addressLocality: string;
        addressRegion: string;
        addressCountry: string;
    };
}

const CITIES: CityContent[] = [
    {
        slug: "nova-iguacu",
        name: "Nova Iguaçu",
        state: "RJ",
        fullName: "Nova Iguaçu - RJ",
        region: "Baixada Fluminense",
        seoTitle: "Criação de Sites em Nova Iguaçu | Sites Profissionais e SEO Local",
        seoDescription:
            "Empresa de criação de sites em Nova Iguaçu. Sites profissionais, rápidos e otimizados para SEO local. Atendemos empresas e profissionais de toda a Baixada Fluminense.",
        localKeywords: [
            "Nova Iguaçu",
            "Baixada Fluminense",
            "Centro de Nova Iguaçu",
            "Comércio da Baixada",
        ],
        mainNeighborhoods: ["Centro", "Cabuçu", "Comendador Soares", "Jardim Tropical"],
        landmarks: [
            "Top Shopping Nova Iguaçu",
            "Shopping Nova Iguaçu",
            "Rodoviária Roberto Silveira",
            "Estação Ferroviária de Nova Iguaçu",
            "Hospital Geral de Nova Iguaçu (HGNI)",
        ],
        heroIntro:
            "Nova Iguaçu é o principal polo econômico da Baixada Fluminense e atende mais de 800 mil habitantes. Atuamos em todo o município, do Centro ao Cabuçu, com sites profissionais que colocam sua empresa no topo do Google para buscas em Nova Iguaçu e região.",
        longContent: `
            <p>Nova Iguaçu é a <strong>maior cidade da Baixada Fluminense</strong> em movimento econômico, com mais de 800 mil habitantes e um comércio vibrante que se estende do Centro histórico ao Top Shopping. Para empresas locais — clínicas, escritórios, lojas, prestadores de serviço — a presença digital não é mais um diferencial: é o requisito mínimo para ser encontrado por quem mora, trabalha ou estuda na cidade.</p>

            <h3>Por que sua empresa precisa de um site profissional em Nova Iguaçu</h3>
            <p>Quando alguém pesquisa <em>"dentista Nova Iguaçu"</em>, <em>"advogado trabalhista na Baixada"</em> ou <em>"clínica veterinária Cabuçu"</em>, o Google entrega uma lista local. Se sua empresa não aparece no topo (ou nem aparece), você está literalmente perdendo clientes para o concorrente que investiu em um site otimizado para SEO local.</p>
            <p>Na Alpha Code, desenvolvemos sites institucionais, landing pages e e-commerces com a mesma técnica usada em empresas do Rio e de São Paulo: HTML semântico, Core Web Vitals no verde, schema <code>LocalBusiness</code> apontando para Nova Iguaçu e arquitetura de informação pensada para a jornada do cliente iguaçuano.</p>

            <h3>Atendimento em todos os bairros de Nova Iguaçu</h3>
            <p>Nossa equipe atende empresas em toda a extensão de Nova Iguaçu, incluindo os principais polos:</p>
            <ul>
                <li><strong>Centro e Comendador Soares:</strong> núcleo histórico do comércio, com forte demanda por sites institucionais e catálogos digitais.</li>
                <li><strong>Cabuçu:</strong> bairro populoso com excelente potencial para clínicas, escolas e prestadores de serviço.</li>
                <li><strong>Jardim Tropical e Rancho Novo:</strong> regiões residenciais com alta concentração de profissionais liberais.</li>
                <li><strong>Vila de Cava e Austin:</strong> polos de comércio local que precisam de presença digital.</li>
                <li><strong>Morro Agudo e Parque Flora:</strong> bairros em crescimento com público cada vez mais conectado.</li>
            </ul>

            <h3>SEO Local: a estratégia que dá resultado em Nova Iguaçu</h3>
            <p>Aparecer no Google Maps e nos resultados orgânicos de <em>"serviço + Nova Iguaçu"</em> exige mais do que um site bonito. Aplicamos SEO técnico on-page (meta tags, schema, headings), link building local (citações em diretórios e Google Business Profile) e produzimos conteúdo de blog focado nas dúvidas reais do seu público na Baixada.</p>
            <p>Combinamos isso com velocidade de carregamento inferior a 1 segundo, design responsivo (mais de 85% das buscas na cidade são por celular) e integração direta com WhatsApp para converter o clique em contato real.</p>

            <h3>Para quem é o serviço em Nova Iguaçu</h3>
            <p>Desenvolvemos sites sob medida para clínicas médicas e odontológicas, escritórios de advocacia, contabilidades, lojas de varejo, restaurantes, salões de beleza, academias, imobiliárias, arquitetos, engenheiros, psicólogos, nutricionistas e qualquer empresa que queira dominar as buscas locais da Baixada Fluminense.</p>
        `,
        faq: [
            {
                question: "Quanto custa criar um site profissional em Nova Iguaçu?",
                answer:
                    "O valor depende do escopo: número de páginas, integrações, design personalizado e profundidade do SEO. Trabalhamos com orçamentos por projeto, e cada um é tratado como um investimento com retorno mensurável. Fale com nosso time para um diagnóstico gratuito.",
            },
            {
                question: "Vocês atendem empresas em todos os bairros de Nova Iguaçu?",
                answer:
                    "Sim. Atendemos desde o Centro e Comendador Soares até Cabuçu, Austin, Vila de Cava, Jardim Tropical e os demais bairros. Como agência digital, todo o atendimento é remoto com reuniões por videochamada, o que nos permite cobrir 100% do município.",
            },
            {
                question: "O site vai aparecer no Google quando buscarem pelo meu serviço em Nova Iguaçu?",
                answer:
                    "Esse é o foco principal do nosso trabalho. Aplicamos SEO local on-page, schema LocalBusiness apontando para Nova Iguaçu, otimização de Google Business Profile e estratégias de conteúdo para que sua empresa apareça nas primeiras posições para buscas como 'seu serviço + Nova Iguaçu'.",
            },
            {
                question: "Quanto tempo leva para um site ficar pronto?",
                answer:
                    "O prazo médio é de 15 a 30 dias úteis para um site institucional ou landing page de alta conversão, considerando planejamento, desenvolvimento, aprovações e SEO técnico.",
            },
            {
                question: "O site funciona bem no celular?",
                answer:
                    "Sim. Desenvolvemos com abordagem mobile-first, pois mais de 85% das pesquisas em Nova Iguaçu são feitas por smartphone. Seu site será testado em diversos dispositivos antes da entrega.",
            },
            {
                question: "Vocês fazem manutenção depois da entrega?",
                answer:
                    "Oferecemos planos de manutenção mensal que incluem atualizações de segurança, backups, suporte técnico, ajustes de conteúdo e monitoramento de performance. A Alpha Code não entrega e some — construímos uma parceria de longo prazo.",
            },
        ],
        schemaType: "LocalBusiness",
        nap: {
            addressLocality: "Nova Iguaçu",
            addressRegion: "RJ",
            addressCountry: "BR",
        },
    },
    {
        slug: "duque-de-caxias",
        name: "Duque de Caxias",
        state: "RJ",
        fullName: "Duque de Caxias - RJ",
        region: "Baixada Fluminense",
        seoTitle: "Criação de Sites em Duque de Caxias | Sites que Geram Clientes",
        seoDescription:
            "Sites profissionais em Duque de Caxias com SEO local. Atendemos clínicas, advogados, lojas e indústrias do município. Orçamento em 24h.",
        localKeywords: [
            "Duque de Caxias",
            "Caxias RJ",
            "Centro de Caxias",
            "Bairros de Duque de Caxias",
        ],
        mainNeighborhoods: ["Centro", "Jardim Primavera", "25 de Agosto", "Vila São Luís"],
        landmarks: [
            "Praça do Pacificador",
            "Shopping Caxias",
            "Rodoviária de Duque de Caxias",
            "Refinaria de Duque de Caxias (REDUC)",
            "Hospital Municipal Moacyr do Carmo",
        ],
        heroIntro:
            "Duque de Caxias é a segunda maior cidade do estado do Rio de Janeiro e um polo industrial e comercial estratégico da Baixada. Criamos sites profissionais que ajudam empresas caxienses a dominarem o Google local e a conquistarem clientes qualificados.",
        longContent: `
            <p>Duque de Caxias, carinhosamente chamada de <strong>Caxias</strong> pelos moradores, é a segunda maior cidade do estado do Rio de Janeiro e um dos principais polos industriais e comerciais da Baixada Fluminense. Com mais de 900 mil habitantes, o município abriga desde grandes indústrias petroquímicas até um comércio local forte nos bairros do Centro, 25 de Agosto, Jardim Primavera e Vila São Luís.</p>

            <h3>Empresas de Duque de Caxias precisam de site profissional</h3>
            <p>A transformação digital chegou com força a Caxias. Quem busca por serviços na cidade — de clínicas odontológicas no Centro a oficinas mecânicas no Jardim Primavera — quase sempre começa a jornada no Google. Se sua empresa não está nesse momento de pesquisa, ela não existe para o cliente.</p>
            <p>Desenvolvemos sites institucionais, landing pages, e-commerces e sistemas web sob medida para empresas caxienses, com foco em três pilares: <strong>SEO local agressivo</strong>, <strong>velocidade extrema</strong> e <strong>conversão via WhatsApp</strong>.</p>

            <h3>Atendimento nos principais bairros de Duque de Caxias</h3>
            <p>Trabalhamos com empresas em toda a cidade de Caxias, com atenção especial aos polos:</p>
            <ul>
                <li><strong>Centro de Caxias:</strong> coração comercial, com alta demanda por sites institucionais e lojas virtuais.</li>
                <li><strong>25 de Agosto:</strong> bairro residencial e comercial em crescimento.</li>
                <li><strong>Jardim Primavera e Vila São Luís:</strong> polos de clínicas, escritórios e prestadores de serviço.</li>
                <li><strong>Campos Elíseos e Pilar:</strong> regiões industriais com necessidade de sites corporativos robustos.</li>
                <li><strong>Parque Equitativa e Xerém:</strong> bairros com forte identidade local.</li>
            </ul>

            <h3>SEO Local para Caxias: como fazemos</h3>
            <p>Quando um morador pesquisa <em>"restaurante no Centro de Caxias"</em> ou <em>"eletricista em Caxias"</em>, os resultados do Google consideram proximidade, relevância e autoridade. Nosso trabalho é fazer sua empresa ter nota máxima nos três critérios:</p>
            <ul>
                <li><strong>Proximidade:</strong> schema LocalBusiness com endereço em Caxias, NAP consistente em toda a web.</li>
                <li><strong>Relevância:</strong> conteúdo otimizado para os termos que seus clientes realmente buscam.</li>
                <li><strong>Autoridade:</strong> backlinks locais, menções em diretórios e Google Business Profile otimizado.</li>
            </ul>

            <h3>Setores que mais crescem em Caxias com site profissional</h3>
            <p>Atendemos clínicas médicas e odontológicas, escritórios de advocacia (especialmente trabalhista e família), contabilidades, indústria e comércio, restaurantes, escolas, imobiliárias, salões de beleza, academias e qualquer negócio local que queira se destacar da concorrência que ainda opera apenas com redes sociais.</p>
        `,
        faq: [
            {
                question: "Atendem empresas em qual região de Duque de Caxias?",
                answer:
                    "Atendemos toda Duque de Caxias: Centro, 25 de Agosto, Jardim Primavera, Vila São Luís, Campos Elíseos, Pilar, Xerém, Parque Equitativa e bairros adjacentes. O atendimento é 100% remoto com reuniões por videochamada.",
            },
            {
                question: "O site pode aparecer para buscas como 'serviço + Caxias + bairro'?",
                answer:
                    "Sim. Com SEO local aplicado corretamente, seu site pode ranquear para combinações hiperlocais como 'dentista Centro Caxias', 'eletricista 25 de Agosto', etc. Usamos schema LocalBusiness e páginas otimizadas por bairro.",
            },
            {
                question: "Quanto custa um site em Duque de Caxias?",
                answer:
                    "O investimento varia conforme o projeto. Trabalhamos com propostas personalizadas após um diagnóstico gratuito. Entre em contato pelo WhatsApp para receber um orçamento sob medida.",
            },
            {
                question: "Vocês também fazem e-commerce para Caxias?",
                answer:
                    "Sim. Desenvolvemos lojas virtuais completas com integração de pagamento, frete, gestão de estoque e conexão com marketplaces. Ideal para o comércio local que quer expandir vendas para toda a Baixada e o estado do Rio.",
            },
        ],
        schemaType: "LocalBusiness",
        nap: {
            addressLocality: "Duque de Caxias",
            addressRegion: "RJ",
            addressCountry: "BR",
        },
    },
    {
        slug: "belford-roxo",
        name: "Belford Roxo",
        state: "RJ",
        fullName: "Belford Roxo - RJ",
        region: "Baixada Fluminense",
        seoTitle: "Criação de Sites em Belford Roxo | Sites Profissionais e SEO Local",
        seoDescription:
            "Agência de criação de sites em Belford Roxo. Sites rápidos, otimizados para Google e focados em gerar clientes para empresas e profissionais liberais da região.",
        localKeywords: [
            "Belford Roxo",
            "Centro de Belford Roxo",
            "Bairros de Belford Roxo",
        ],
        mainNeighborhoods: ["Centro", "São Bernardo", "Areia Branca", "Piam"],
        landmarks: [
            "Praça de Belford Roxo",
            "Rodoviária de Belford Roxo",
            "Shopping Belford Roxo",
        ],
        heroIntro:
            "Belford Roxo é uma das cidades que mais cresce na Baixada Fluminense, com um comércio local forte e cada vez mais digital. Criamos sites que ajudam empresas belforroxenses a serem encontradas no Google e a transformarem visitas em clientes.",
        longContent: `
            <p>Belford Roxo é uma cidade de grande potencial na Baixada Fluminense, com mais de 500 mil habitantes e um comércio local aquecido que vai do Centro histórico a bairros populosos como São Bernardo, Areia Branca e Piam. Para empresas da cidade, estar no Google não é mais um diferencial — é o mínimo necessário para competir.</p>

            <h3>O mercado digital em Belford Roxo</h3>
            <p>Apesar do crescimento, muitas empresas de Belford Roxo ainda dependem exclusivamente das redes sociais, perdendo clientes todos os dias para concorrentes que investiram em sites profissionais. Quando alguém pesquisa <em>"serviço em Belford Roxo"</em>, o Google entrega a lista dos resultados. Se sua empresa não está lá, você está literalmente fora do jogo.</p>
            <p>A Alpha Code desenvolve sites institucionais, landing pages e lojas virtuais com a mesma qualidade técnica encontrada no Rio e em São Paulo, com preços justos e atendimento próximo.</p>

            <h3>Bairros de Belford Roxo que atendemos</h3>
            <ul>
                <li><strong>Centro:</strong> polo comercial principal, com forte demanda por sites institucionais e portfólios.</li>
                <li><strong>São Bernardo:</strong> bairro populoso com clínicas, escolas e prestadores de serviço.</li>
                <li><strong>Areia Branca e Piam:</strong> regiões com alto potencial para presença digital.</li>
                <li><strong>Heliópolis e Bom Pastor:</strong> bairros residenciais com profissionais liberais.</li>
            </ul>

            <h3>SEO Local para Belford Roxo: nossa abordagem</h3>
            <p>Aplicamos SEO técnico on-page (schema LocalBusiness, headings, meta tags), otimização para palavras-chave locais (<em>"empresa + Belford Roxo"</em>) e estratégias de conteúdo focadas no público belforroxense. O resultado é um site que aparece nas primeiras posições do Google quando alguém na cidade busca pelo seu serviço.</p>
        `,
        faq: [
            {
                question: "Atendem empresas em todos os bairros de Belford Roxo?",
                answer:
                    "Sim. Atendemos do Centro a Areia Branca, São Bernardo, Piam, Heliópolis e demais bairros. O atendimento é remoto, com reuniões por videochamada para garantir proximidade com o cliente.",
            },
            {
                question: "Posso pagar em parcelas?",
                answer:
                    "Sim. Trabalhamos com parcelamento no cartão de crédito, boleto ou Pix, com condições especiais para projetos completos de site + SEO + manutenção.",
            },
            {
                question: "O site ajuda a aparecer no Google Maps?",
                answer:
                    "Sim. Integramos o site ao Google Business Profile e aplicamos técnicas de SEO local para que sua empresa apareça nos resultados do Google Maps e nas buscas locais de Belford Roxo.",
            },
        ],
        schemaType: "LocalBusiness",
        nap: {
            addressLocality: "Belford Roxo",
            addressRegion: "RJ",
            addressCountry: "BR",
        },
    },
    {
        slug: "sao-joao-de-meriti",
        name: "São João de Meriti",
        state: "RJ",
        fullName: "São João de Meriti - RJ",
        region: "Baixada Fluminense",
        seoTitle: "Criação de Sites em São João de Meriti | Sites Profissionais",
        seoDescription:
            "Sites profissionais em São João de Meriti com SEO local. Atendemos empresas e profissionais do município inteiro. Conheça nossos planos.",
        localKeywords: [
            "São João de Meriti",
            "Meriti",
            "Centro de Meriti",
            "Vilar dos Teles",
        ],
        mainNeighborhoods: ["Centro", "Vilar dos Teles", "Coelho da Rocha", "São Mateus"],
        landmarks: [
            "Shopping Grande Rio",
            "Rodoviária de São João de Meriti",
            "Praça dos Três Poderes",
        ],
        heroIntro:
            "São João de Meriti é uma das cidades mais populosas da Baixada Fluminense, com forte comércio nos bairros do Centro, Vilar dos Teles e Coelho da Rocha. Criamos sites que ajudam empresas meritenses a serem encontradas no Google.",
        longContent: `
            <p>São João de Meriti é uma das cidades mais populosas e dinâmicas da Baixada Fluminense. Com mais de 470 mil habitantes, abriga um comércio vibrante nos bairros do Centro, Vilar dos Teles, Coelho da Rocha e São Mateus. O município tem identidade própria e um público cada vez mais digital.</p>

            <h3>Empresas meritenses precisam de presença digital forte</h3>
            <p>O morador de Meriti que precisa de um serviço — seja uma consulta médica, um conserto, uma aula particular — pesquisa no Google. Se sua empresa não aparece nos primeiros resultados, o cliente vai para o concorrente que investiu em site profissional. É matemática pura.</p>

            <h3>Atendimento nos principais bairros de Meriti</h3>
            <ul>
                <li><strong>Centro de Meriti:</strong> coração comercial e administrativo, com clínicas, escritórios e lojas.</li>
                <li><strong>Vilar dos Teles:</strong> bairro populoso com alto consumo local.</li>
                <li><strong>Coelho da Rocha:</strong> polo comercial em crescimento.</li>
                <li><strong>São Mateus e Éden:</strong> regiões residenciais com profissionais liberais.</li>
            </ul>

            <h3>SEO Local para São João de Meriti</h3>
            <p>Otimizamos seu site para buscas hiperlocais como <em>"dentista Vilar dos Teles"</em>, <em>"eletricista Coelho da Rocha"</em> ou <em>"restaurante Centro Meriti"</em>. Aplicamos schema LocalBusiness apontando para o endereço da empresa, conteúdo relevante e link building local.</p>
        `,
        faq: [
            {
                question: "Vocês conhecem a realidade de Meriti?",
                answer:
                    "Sim. Atendemos empresas em toda a Baixada Fluminense e conhecemos as particularidades de cada município, incluindo São João de Meriti. Aplicamos estratégias de SEO local ajustadas ao tamanho e à concorrência de cada cidade.",
            },
            {
                question: "Quanto custa um site em São João de Meriti?",
                answer:
                    "O investimento depende do projeto. Trabalhamos com orçamentos personalizados após um diagnóstico. Entre em contato pelo WhatsApp para receber uma proposta sob medida.",
            },
        ],
        schemaType: "LocalBusiness",
        nap: {
            addressLocality: "São João de Meriti",
            addressRegion: "RJ",
            addressCountry: "BR",
        },
    },
    {
        slug: "nilopolis",
        name: "Nilópolis",
        state: "RJ",
        fullName: "Nilópolis - RJ",
        region: "Baixada Fluminense",
        seoTitle: "Criação de Sites em Nilópolis | Sites Profissionais e SEO",
        seoDescription:
            "Sites profissionais em Nilópolis para empresas e profissionais liberais. SEO local agressivo, carregamento ultrarrápido e integração com WhatsApp.",
        localKeywords: [
            "Nilópolis",
            "Centro de Nilópolis",
            "Bairros de Nilópolis",
        ],
        mainNeighborhoods: ["Centro", "Nova Cidade", "Olinda", "Cabral"],
        landmarks: [
            "Praça Paulo VI",
            "Estação de Nilópolis (Supervia)",
            "Centro Cívico de Nilópolis",
        ],
        heroIntro:
            "Nilópolis é a menor cidade do Brasil em extensão territorial, mas tem uma densidade demográfica altíssima e um comércio local forte. Criamos sites sob medida para empresas nilopolitanas que querem dominar o Google.",
        longContent: `
            <p>Nilópolis é uma cidade singular: a menor do Brasil em extensão territorial, mas com uma das maiores densidades demográficas do estado do Rio. Esse perfil faz com que o marketing local e o SEO hiperlocal sejam extremamente eficazes — quem mora em Nilópolis pesquisa negócios de Nilópolis.</p>

            <h3>O potencial digital de Nilópolis</h3>
            <p>Para uma empresa nilopolitana, um site otimizado para SEO local é um dos melhores investimentos possíveis. Quando alguém pesquisa <em>"serviço + Nilópolis"</em>, a concorrência é menor que em municípios maiores, o que torna mais fácil alcançar as primeiras posições do Google com um trabalho técnico bem feito.</p>

            <h3>Atendimento nos bairros de Nilópolis</h3>
            <ul>
                <li><strong>Centro de Nilópolis:</strong> polo comercial, com alta concentração de lojas e serviços.</li>
                <li><strong>Nova Cidade e Olinda:</strong> bairros residenciais com profissionais liberais.</li>
                <li><strong>Cabral e Paiol:</strong> regiões com forte identidade comunitária.</li>
            </ul>

            <h3>Por que escolher a Alpha Code para Nilópolis</h3>
            <p>Combinamos preço justo, qualidade técnica de ponta e atendimento próximo. Cada site é construído do zero, sem templates prontos, com foco em performance, SEO e conversão.</p>
        `,
        faq: [
            {
                question: "Nilópolis é uma cidade pequena, vale a pena ter site?",
                answer:
                    "Sim, e muito. A concorrência digital em Nilópolis é menor que em cidades maiores, o que significa que com um site bem otimizado você alcança o topo do Google mais rápido e com menor investimento.",
            },
            {
                question: "Vocês entendem o mercado de Nilópolis?",
                answer:
                    "Sim. Atendemos toda a Baixada Fluminense e conhecemos as particularidades de cada cidade. Para Nilópolis, aplicamos estratégias focadas em SEO hiperlocal, que funcionam muito bem em municípios menores.",
            },
        ],
        schemaType: "LocalBusiness",
        nap: {
            addressLocality: "Nilópolis",
            addressRegion: "RJ",
            addressCountry: "BR",
        },
    },
    {
        slug: "mesquita",
        name: "Mesquita",
        state: "RJ",
        fullName: "Mesquita - RJ",
        region: "Baixada Fluminense",
        seoTitle: "Criação de Sites em Mesquita | Sites Profissionais e SEO Local",
        seoDescription:
            "Sites profissionais em Mesquita, RJ. SEO local, carregamento rápido e integração com WhatsApp. Atendimento para toda a cidade.",
        localKeywords: [
            "Mesquita",
            "Mesquita RJ",
            "Centro de Mesquita",
            "Bairros de Mesquita",
        ],
        mainNeighborhoods: ["Centro", "Rocha Sobrinho", "Vila Emil", "Banco de Areia"],
        landmarks: [
            "Estação de Mesquita (Supervia)",
            "Praça da Bandeira",
            "Hospital Municipal de Mesquita",
        ],
        heroIntro:
            "Mesquita é uma cidade em crescimento na Baixada Fluminense, com forte comércio no Centro e bairros como Rocha Sobrinho e Vila Emil. Criamos sites profissionais que ajudam empresas mesquitenses a conquistarem clientes no Google.",
        longContent: `
            <p>Mesquita é uma cidade da Baixada Fluminense com cerca de 170 mil habitantes e um perfil comercial crescente. Os polos de Mesquita ficam no Centro, em Rocha Sobrinho, Vila Emil e Banco de Areia — bairros com forte identidade local e muita demanda por serviços profissionais.</p>

            <h3>Negócios locais de Mesquita precisam de site</h3>
            <p>O comportamento do consumidor mudou. Quem precisa de um serviço em Mesquita pesquisa no celular antes de sair de casa. Se sua empresa não aparece nos resultados, ela é invisível para esse cliente em potencial. Um site profissional otimizado para SEO local resolve esse problema e traz resultados mensuráveis.</p>

            <h3>Atendimento nos bairros de Mesquita</h3>
            <ul>
                <li><strong>Centro de Mesquita:</strong> polo comercial principal, com alta concentração de lojas e serviços.</li>
                <li><strong>Rocha Sobrinho:</strong> bairro populoso com grande demanda por clínicas e prestadores de serviço.</li>
                <li><strong>Vila Emil e Banco de Areia:</strong> regiões residenciais com forte economia local.</li>
            </ul>
        `,
        faq: [
            {
                question: "Vocês atendem empresas em Mesquita?",
                answer:
                    "Sim. Atendemos toda Mesquita, com destaque para o Centro, Rocha Sobrinho, Vila Emil e Banco de Areia. O atendimento é remoto, com reuniões por videochamada para garantir proximidade.",
            },
            {
                question: "O site vai funcionar no celular?",
                answer:
                    "Sim. Desenvolvemos com abordagem mobile-first. Mais de 85% das buscas em Mesquita são feitas pelo smartphone, e seu site será otimizado para oferecer a melhor experiência em qualquer tela.",
            },
        ],
        schemaType: "LocalBusiness",
        nap: {
            addressLocality: "Mesquita",
            addressRegion: "RJ",
            addressCountry: "BR",
        },
    },
    {
        slug: "queimados",
        name: "Queimados",
        state: "RJ",
        fullName: "Queimados - RJ",
        region: "Baixada Fluminense",
        seoTitle: "Criação de Sites em Queimados | Sites Profissionais e SEO",
        seoDescription:
            "Sites profissionais em Queimados, RJ. Atendemos empresas e profissionais liberais com SEO local e sites de alta conversão.",
        localKeywords: [
            "Queimados",
            "Queimados RJ",
            "Centro de Queimados",
        ],
        mainNeighborhoods: ["Centro", "Vila do Tingui", "Jardim Queimados", "Austin"],
        landmarks: [
            "Estação de Queimados (Supervia)",
            "Praça da Bíblia",
            "Rodoviária de Queimados",
        ],
        heroIntro:
            "Queimados é uma cidade estratégica da Baixada Fluminense, com fácil acesso ao Rio e à Baixada. Criamos sites profissionais para empresas queimadenses que querem crescer no Google.",
        longContent: `
            <p>Queimados é uma cidade em ascensão na Baixada Fluminense, com cerca de 150 mil habitantes e um comércio que se fortalece a cada ano. Localizada em um ponto estratégico, com fácil acesso ao Rio de Janeiro e às demais cidades da região, é um polo emergente para empresas que querem crescer.</p>

            <h3>SEO Local em Queimados</h3>
            <p>A concorrência digital em Queimados ainda é baixa, o que torna o investimento em um site otimizado para SEO local extremamente vantajoso. Quem chega primeiro ao topo do Google para <em>"serviço + Queimados"</em> fica com a maior parte do mercado local.</p>

            <h3>Atendimento nos bairros de Queimados</h3>
            <ul>
                <li><strong>Centro de Queimados:</strong> polo comercial principal, com alta concentração de serviços.</li>
                <li><strong>Vila do Tingui e Jardim Queimados:</strong> bairros residenciais com profissionais liberais.</li>
                <li><strong>Austin:</strong> bairro com forte demanda por serviços locais.</li>
            </ul>
        `,
        faq: [
            {
                question: "Vale a pena investir em site em Queimados?",
                answer:
                    "Muito. A concorrência digital em Queimados é menor que em cidades maiores, e um site bem otimizado pode colocá-lo no topo do Google em poucas semanas, gerando clientes qualificados de forma constante.",
            },
        ],
        schemaType: "LocalBusiness",
        nap: {
            addressLocality: "Queimados",
            addressRegion: "RJ",
            addressCountry: "BR",
        },
    },
    {
        slug: "mage",
        name: "Magé",
        state: "RJ",
        fullName: "Magé - RJ",
        region: "Baixada Fluminense / Região Metropolitana",
        seoTitle: "Criação de Sites em Magé | Sites Profissionais e SEO Local",
        seoDescription:
            "Sites profissionais em Magé, RJ. Atendemos empresas e profissionais com SEO local agressivo e sites de alta performance.",
        localKeywords: [
            "Magé",
            "Magé RJ",
            "Centro de Magé",
            "Piabetá",
            "Itaipava",
        ],
        mainNeighborhoods: ["Centro", "Piabetá", "Itaipava", "Santo Aleixo"],
        landmarks: [
            "Centro de Magé",
            "Rodoviária de Magé",
            "Praça da República",
        ],
        heroIntro:
            "Magé é uma cidade da Região Metropolitana do Rio de Janeiro com forte identidade local e polos comerciais em Centro, Piabetá e Itaipava. Criamos sites profissionais que destacam empresas mageenses no Google.",
        longContent: `
            <p>Magé é um município extenso da Região Metropolitana do Rio, com mais de 230 mil habitantes distribuídos entre o Centro, Piabetá, Itaipava, Santo Aleixo e outros distritos. A cidade tem uma economia diversificada, com forte presença de pequenos e médios negócios que estão descobrindo o poder do marketing digital.</p>

            <h3>Atendimento nos distritos de Magé</h3>
            <ul>
                <li><strong>Centro de Magé:</strong> polo administrativo e comercial, com clínicas, escritórios e lojas.</li>
                <li><strong>Piabetá:</strong> distrito populoso com alto consumo local.</li>
                <li><strong>Itaipava (Magé):</strong> área com potencial turístico e comercial.</li>
                <li><strong>Santo Aleixo e Suruí:</strong> regiões com forte demanda por serviços profissionais.</li>
            </ul>

            <h3>SEO Local para Magé</h3>
            <p>Para empresas de Magé, aparecer nas buscas locais do Google é uma oportunidade de crescimento imediata. Aplicamos técnicas de SEO hiperlocal para que sua empresa seja encontrada quando alguém pesquisa pelo seu serviço no município.</p>
        `,
        faq: [
            {
                question: "Vocês atendem em Piabetá e Itaipava?",
                answer:
                    "Sim. Atendemos todos os distritos de Magé, incluindo Centro, Piabetá, Itaipava, Santo Aleixo e Suruí. O atendimento é remoto, o que nos permite cobrir 100% do município com a mesma qualidade.",
            },
        ],
        schemaType: "LocalBusiness",
        nap: {
            addressLocality: "Magé",
            addressRegion: "RJ",
            addressCountry: "BR",
        },
    },
    {
        slug: "itaguai",
        name: "Itaguaí",
        state: "RJ",
        fullName: "Itaguaí - RJ",
        region: "Região Metropolitana do Rio",
        seoTitle: "Criação de Sites em Itaguaí | Sites Profissionais e SEO",
        seoDescription:
            "Sites profissionais em Itaguaí com SEO local. Atendemos empresas e profissionais liberais. Orçamento sem compromisso.",
        localKeywords: [
            "Itaguaí",
            "Itaguaí RJ",
            "Centro de Itaguaí",
        ],
        mainNeighborhoods: ["Centro", "Vila Margarida", "Brisa Mar", "Monte Serrat"],
        landmarks: [
            "Porto de Itaguaí",
            "Centro de Itaguaí",
            "Ilha da Madeira",
        ],
        heroIntro:
            "Itaguaí é uma cidade portuária estratégica da Região Metropolitana do Rio, com economia diversificada e comércio em crescimento. Criamos sites profissionais para empresas itaguaiense.",
        longContent: `
            <p>Itaguaí é uma cidade da Região Metropolitana do Rio de Janeiro conhecida por seu porto e por uma economia em expansão. Com mais de 130 mil habitantes, o município tem polos comerciais no Centro, Vila Margarida, Brisa Mar e Monte Serrat, além de bairros residenciais com forte demanda por serviços profissionais.</p>

            <h3>Atendimento nos bairros de Itaguaí</h3>
            <ul>
                <li><strong>Centro de Itaguaí:</strong> polo comercial e administrativo.</li>
                <li><strong>Vila Margarida e Brisa Mar:</strong> bairros residenciais com clínicas e serviços.</li>
                <li><strong>Monte Serrat e Coroa Grande:</strong> regiões com potencial de crescimento digital.</li>
            </ul>

            <h3>SEO Local para Itaguaí</h3>
            <p>Aplicamos técnicas de SEO on-page e off-page focadas em Itaguaí, com schema LocalBusiness, conteúdo relevante e link building local. Seu site será encontrado por quem mora e trabalha no município.</p>
        `,
        faq: [
            {
                question: "Vocês atendem empresas em Itaguaí?",
                answer:
                    "Sim. Atendemos toda Itaguaí, com foco no Centro, Vila Margarida, Brisa Mar e demais bairros. O atendimento é 100% remoto, com reuniões por videochamada.",
            },
        ],
        schemaType: "LocalBusiness",
        nap: {
            addressLocality: "Itaguaí",
            addressRegion: "RJ",
            addressCountry: "BR",
        },
    },
    {
        slug: "seropedica",
        name: "Seropédica",
        state: "RJ",
        fullName: "Seropédica - RJ",
        region: "Região Metropolitana do Rio",
        seoTitle: "Criação de Sites em Seropédica | Sites Profissionais e SEO",
        seoDescription:
            "Sites profissionais em Seropédica com SEO local. Atendemos empresas e profissionais liberais de toda a cidade.",
        localKeywords: [
            "Seropédica",
            "Seropédica RJ",
            "Centro de Seropédica",
        ],
        mainNeighborhoods: ["Centro", "Boa Esperança", "Jardim Maracanã", "Piranema"],
        landmarks: [
            "UFRRJ (Universidade Federal Rural do Rio de Janeiro)",
            "Centro de Seropédica",
            "Praça de Seropédica",
        ],
        heroIntro:
            "Seropédica é uma cidade universitária da Região Metropolitana do Rio, sede da UFRRJ. Criamos sites profissionais para empresas e profissionais liberais de Seropédica que querem crescer no Google.",
        longContent: `
            <p>Seropédica é uma cidade da Região Metropolitana do Rio de Janeiro conhecida por sediar a Universidade Federal Rural do Rio de Janeiro (UFRRJ). Esse perfil universitário traz um público jovem e conectado, com alta demanda por serviços digitais e profissionais liberais.</p>

            <h3>Oportunidades digitais em Seropédica</h3>
            <p>Além do público universitário, Seropédica tem um comércio local forte no Centro, em Boa Esperança, Jardim Maracanã e Piranema. Para empresas seropedicenses, investir em um site otimizado para SEO local é uma forma direta de capturar clientes que hoje vão para a concorrência.</p>

            <h3>Atendimento nos bairros de Seropédica</h3>
            <ul>
                <li><strong>Centro de Seropédica:</strong> polo comercial principal, com lojas e serviços.</li>
                <li><strong>Boa Esperança e Jardim Maracanã:</strong> bairros residenciais com forte economia local.</li>
                <li><strong>Piranema:</strong> região com potencial de crescimento.</li>
            </ul>
        `,
        faq: [
            {
                question: "Vocês atendem em Seropédica?",
                answer:
                    "Sim. Atendemos toda Seropédica, com foco no Centro e nos principais bairros. O atendimento é remoto, com reuniões por videochamada.",
            },
        ],
        schemaType: "LocalBusiness",
        nap: {
            addressLocality: "Seropédica",
            addressRegion: "RJ",
            addressCountry: "BR",
        },
    },
    {
        slug: "guapimirim",
        name: "Guapimirim",
        state: "RJ",
        fullName: "Guapimirim - RJ",
        region: "Região Serrana do Rio",
        seoTitle: "Criação de Sites em Guapimirim | Sites Profissionais e SEO",
        seoDescription:
            "Sites profissionais em Guapimirim com SEO local. Atendemos empresas, comércios e profissionais liberais da cidade.",
        localKeywords: [
            "Guapimirim",
            "Guapimirim RJ",
            "Centro de Guapimirim",
        ],
        mainNeighborhoods: ["Centro", "Parada Modelo", "Vila Olímpia", "Citrolândia"],
        landmarks: [
            "Parque Nacional da Serra dos Órgãos",
            "Centro de Guapimirim",
            "Cachoeira dové",
        ],
        heroIntro:
            "Guapimirim é uma cidade da Região Serrana do Rio de Janeiro, conhecida pelo turismo ecológico e por uma economia local em crescimento. Criamos sites profissionais para empresas guapimirimenses.",
        longContent: `
            <p>Guapimirim é uma cidade da Região Serrana do Rio, com forte vocação para o turismo ecológico — em especial o Parque Nacional da Serra dos Órgãos — e uma economia local que se diversifica a cada ano. O município tem polos comerciais no Centro, Parada Modelo, Vila Olímpia e Citrolândia.</p>

            <h3>SEO Local para Guapimirim</h3>
            <p>Para empresas de Guapimirim, o SEO local é a forma mais eficiente de ser encontrado por turistas e moradores. Aplicamos técnicas que destacam sua empresa para buscas como <em>"hotel em Guapimirim"</em>, <em>"restaurante na Serra"</em> ou <em>"serviço em Guapimirim"</em>.</p>

            <h3>Atendimento nos bairros de Guapimirim</h3>
            <ul>
                <li><strong>Centro de Guapimirim:</strong> polo comercial principal.</li>
                <li><strong>Parada Modelo e Vila Olímpia:</strong> bairros residenciais com serviços locais.</li>
                <li><strong>Citrolândia:</strong> distrito com perfil próprio e economia local.</li>
            </ul>
        `,
        faq: [
            {
                question: "Vocês atendem em Guapimirim?",
                answer:
                    "Sim. Atendemos toda Guapimirim com o mesmo padrão técnico de qualidade. Como agência digital, todo o atendimento é remoto, com reuniões por videochamada.",
            },
        ],
        schemaType: "LocalBusiness",
        nap: {
            addressLocality: "Guapimirim",
            addressRegion: "RJ",
            addressCountry: "BR",
        },
    },
    {
        slug: "itaim-bibi",
        name: "Itaim Bibi",
        state: "SP",
        fullName: "Itaim Bibi - SP",
        region: "Zona Sul de São Paulo",
        seoTitle: "Criação de Sites no Itaim Bibi | Sites Premium e SEO",
        seoDescription:
            "Sites premium para empresas do Itaim Bibi, em São Paulo. Design sofisticado, performance extrema e SEO para o mercado corporativo da Faria Lima.",
        localKeywords: [
            "Itaim Bibi",
            "Faria Lima",
            "Zona Sul SP",
            "Empresas do Itaim",
        ],
        mainNeighborhoods: ["Itaim Bibi", "Vila Olímpia", "Jardins", "Pinheiros"],
        landmarks: [
            "Avenida Faria Lima",
            "Shopping Iguatemi",
            "Parque do Povo",
            "Avenida Brigadeiro Faria Lima",
        ],
        heroIntro:
            "O Itaim Bibi é o coração financeiro de São Paulo, com empresas que exigem presença digital à altura do mercado corporativo da Faria Lima. Criamos sites premium para empresas do Itaim com performance extrema e design sofisticado.",
        longContent: `
            <p>O <strong>Itaim Bibi</strong> é o coração financeiro e corporativo de São Paulo, com a Avenida Faria Lima como epicentro. Empresas instaladas no Itaim — gestoras de investimento, escritórios de advocacia premium, consultorias, startups, e-commerce de luxo — operam em um mercado de altíssimo nível e exigem presença digital à altura.</p>

            <h3>Por que sua empresa do Itaim precisa de um site premium</h3>
            <p>Quando um executivo, investidor ou cliente corporativo pesquisa pelo seu serviço, ele espera encontrar um site que transmita o mesmo nível de sofisticação da sua empresa. Um site lento, amador ou desatualizado destrói credibilidade em segundos.</p>
            <p>Na Alpha Code, desenvolvemos sites premium para o Itaim Bibi com HTML semântico, design elegante, performance medida em Core Web Vitals e integração com sistemas corporativos. Cada projeto é único, sem templates prontos.</p>

            <h3>Atendimento no Itaim Bibi e arredores</h3>
            <ul>
                <li><strong>Itaim Bibi:</strong> polo financeiro e corporativo, com empresas de altíssimo padrão.</li>
                <li><strong>Vila Olímpia e Pinheiros:</strong> polos de inovação e tecnologia.</li>
                <li><strong>Jardins e Cerqueira César:</strong> regiões com identidade cultural forte e público exigente.</li>
            </ul>

            <h3>Tecnologias de ponta para o Itaim</h3>
            <p>Trabalhamos com Astro, Next.js, React e as melhores práticas de performance e SEO técnico. O resultado é um site que carrega em menos de 1 segundo, tem nota máxima no Google PageSpeed e atende aos rigorosos critérios do Google Core Web Vitals.</p>
        `,
        faq: [
            {
                question: "Vocês fazem sites para gestoras de investimento no Itaim?",
                answer:
                    "Sim. Somos especializados em sites institucionais para o setor financeiro, garantindo seriedade, elegância, segurança da informação e conformidade com órgãos reguladores.",
            },
            {
                question: "O site atende aos critérios do Google Core Web Vitals?",
                answer:
                    "Sim. Todos os nossos sites são desenvolvidos para atingir nota máxima nos critérios do Google (LCP, FID, CLS), o que é fundamental para SEO e experiência do usuário no Itaim Bibi.",
            },
            {
                question: "Posso ter reuniões presenciais no Itaim?",
                answer:
                    "Sim. Para clientes do Itaim Bibi, agendamos reuniões presenciais em escritórios na região, além do atendimento digital permanente.",
            },
            {
                question: "O site pode ser integrado ao meu CRM?",
                answer:
                    "Sim. Como empresa de software, integramos seu site a CRMs (RD Station, HubSpot, Pipedrive), ERPs, plataformas de agendamento e sistemas internos.</li>",
            },
        ],
        schemaType: "ProfessionalService",
        nap: {
            addressLocality: "São Paulo",
            addressRegion: "SP",
            addressCountry: "BR",
        },
    },
];

export const getCityBySlug = (slug: string): CityContent | undefined =>
    CITIES.find((c) => c.slug === slug);

export const getAllCitySlugs = (): string[] => CITIES.map((c) => c.slug);

export const getAllCities = (): CityContent[] => CITIES;
