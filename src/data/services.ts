export interface ServiceContent {
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    h1: string;
    intro: string;
    whatIsItTitle?: string;
    whatIsIt?: string;
    whoIsItForTitle?: string;
    whoIsItFor?: string;
    benefitsTitle?: string;
    benefits: string[];
    howItWorksTitle?: string;
    howItWorks?: string;
    expectedResultsTitle?: string;
    expectedResults?: string;
    ctaText: string;
    faq?: { question: string; answer: string }[];
    fullText?: string;
    socialProof?: string[];
}

export const services: ServiceContent[] = [
    {
        slug: "site-profissional-saude",
        title: "Site Profissional para Saúde e Negócios",
        metaTitle: "Site Profissional para Saúde e Negócios | Alpha Code",
        metaDescription: "Sites rápidos e profissionais para profissionais da saúde e negócios que precisam de presença digital profissional. Converta visitantes em clientes.",
        keywords: ["site para médicos", "site para advogados", "site institucional empresas", "marketing digital profissional", "presença online negócios"],
        h1: "Site profissional que transforma visitantes em pacientes e clientes",
        intro: "Ter um site hoje não é diferencial. O diferencial é ter um site que passa confiança, facilita o contato e trabalha por você 24 horas por dia. Profissionais da saúde e negócios que dependem apenas de redes sociais acabam com crescimento limitado e instável.",
        whatIsItTitle: "O que é um site profissional de alto padrão",
        whatIsIt: "Um site profissional é uma estrutura digital pensada para autoridade, clareza e conversão. Ele apresenta quem você é, o que seu negócio faz, como entrar em contato e por que confiar no seu trabalho.",
        whoIsItForTitle: "Para quem este serviço é ideal",
        whoIsItFor: "Profissionais da saúde e negócios que precisam de presença digital profissional, como advogados, escolas, clínicas e empresas de serviços que buscam previsibilidade online.",
        benefitsTitle: "Benefícios práticos",
        benefits: [
            "Mais confiança antes do primeiro contato",
            "Facilidade no agendamento e contato",
            "Presença estratégica no Google",
            "Autoridade profissional consolidada"
        ],
        howItWorksTitle: "Como funciona na prática",
        howItWorks: "Criamos um site rápido, responsivo, com copy estratégica para seu nicho, integração com WhatsApp, SEO técnico e estrutura validada para conversão.",
        expectedResultsTitle: "Resultados esperados",
        expectedResults: "Mais contatos qualificados, menos dependência de indicações e uma presença digital que trabalha continuamente para atrair novos negócios.",
        ctaText: "Quero um site profissional para meu negócio",
        faq: [
            { question: "Quanto tempo leva para criar um site profissional?", answer: "O prazo médio para entrega de um site institucional completo é de 15 a 20 dias úteis, dependendo da complexidade e da entrega de materiais pelo cliente." },
            { question: "O site funciona bem em celulares?", answer: "Sim, todos os nossos sites são 100% responsivos e otimizados para oferecer a melhor experiência em smartphones e tablets." },
            { question: "Meu site vai aparecer no Google?", answer: "Sim, desenvolvemos toda a estrutura seguindo as melhores práticas de SEO técnico para facilitar a indexação e o ranqueamento orgânico." }
        ],
        fullText: `A criação de sites profissionais para o setor de saúde e negócios de alto padrão exige uma abordagem que une design emocional com precisão técnica. Na Alpha Code, entendemos que seu site não é apenas um folder digital; é uma ferramenta de filtragem e conversão de leads qualificados. 

Para médicos, clínicas e escritórios de advocacia, a autoridade digital é construída através da percepção imediata de profissionalismo. Quando um potencial cliente acessa seu site, ele avalia subconscientemente a velocidade de carregamento, a clareza das informações e a facilidade de contato. Se o site demora mais de 3 segundos para carregar, você perde cerca de 40% dos seus potenciais clientes para o concorrente que investiu em performance.

Nossa metodologia "Performance-First" utiliza tecnologias como Astro e React para garantir que seu site atinja pontuações máximas no Google Core Web Vitals. Isso significa que, além de ser bonito, seu site será tecnicamente superior, facilitando o ranqueamento orgânico para palavras-chave competitivas como "advogado especialista em direito digital" ou "clínica de estética avançada". 

Além disso, focamos profundamente na psicologia das cores e tipografia para garantir que o layout fechado da sua empresa seja respeitado, mas otimizado para guiar o olhar do usuário até o botão de agendamento. O resultado é um ativo digital que valoriza sua hora técnica e reduz o esforço de venda direta.`,
        socialProof: [
            "A Alpha Code transformou nossa presença digital. Hoje recebemos diariamente contatos qualificados através do site.",
            "Profissionalismo e entrega dentro do prazo. Nosso site médico superou todas as expectativas de design e performance.",
            "O retorno sobre o investimento foi imediato. O site é leve, rápido e passa toda a confiança que nossos clientes precisam."
        ]
    },
    {
        slug: "link-profissional",
        title: "Link Profissional",
        metaTitle: "Link Profissional para Saúde e Negócios | Alpha Code",
        metaDescription: "Centralize WhatsApp, agendamento e localização em um link profissional para redes sociais com domínio próprio e foco em conversão.",
        keywords: ["link na bio", "linktree profissional", "link whatsapp instagram", "bio instagram profissional"],
        h1: "Link profissional que organiza e converte seus atendimentos",
        intro: "Link genérico não passa autoridade. Um link profissional centraliza seus canais, reduz atrito e aumenta a chance de contato para profissionais da saúde e negócios que usam redes sociais.",
        whatIsItTitle: "O que é um link profissional",
        whatIsIt: "Uma página única com botões estratégicos para WhatsApp, agendamento, Google Maps e redes sociais, personalizada para o seu segmento.",
        whoIsItForTitle: "Para quem é ideal",
        whoIsItFor: "Profissionais liberais, empresas de serviços e negócios locais que usam Instagram ou anúncios e querem uma ponte mais profissional com o cliente.",
        benefitsTitle: "Benefícios",
        benefits: [
            "Mais cliques reais no WhatsApp",
            "Organização total dos canais de contato",
            "Aparência premium e profissional"
        ],
        howItWorksTitle: "Como funciona",
        howItWorks: "Criamos um link rápido, responsivo, com copy curta e direta, domínio próprio e foco total em conversão.",
        expectedResultsTitle: "Resultados esperados",
        expectedResults: "Melhor organização dos seus canais de atendimento e um aumento na conversão dos visitantes das suas redes sociais em leads reais.",
        ctaText: "Quero meu link profissional",
        faq: [
            { question: "Por que não usar o Linktree gratuito?", answer: "O Linktree gratuito não usa seu domínio e tem limitações de design e SEO. Com um Link Profissional, você usa sua própria marca e tem controle total dos dados de conversão." },
            { question: "Posso colocar quantos botões eu quiser?", answer: "Sim, mas recomendamos foco estratégico nos canais que mais convertem para não confundir o visitante." }
        ],
        fullText: "O Link Profissional é a evolução do 'Link na Bio'. Ele elimina ferramentas genéricas e coloca sua marca em destaque. É ideal para quem investe em anúncios no Instagram e quer que o destino seja uma página de alta conversão, rápida e elegante, que centraliza agendamentos e informações cruciais."
    },
    {
        slug: "pagina-agendamento",
        title: "Página de Agendamento",
        metaTitle: "Página de Agendamento Online para Clínicas e Profissionais",
        metaDescription: "Facilite o agendamento de consultas e serviços com uma página focada em conversão e experiência do cliente.",
        keywords: ["página de agendamento", "agendamento online profissional", "marcar consulta online", "landing page de serviços"],
        h1: "Página de agendamento que reduz perguntas e aumenta conversões",
        intro: "Quando o agendamento ou pedido de orçamento é confuso, o cliente desiste. Simples assim.",
        whatIsItTitle: "O que é a página de agendamento estratégica",
        whatIsIt: "Uma landing page focada exclusivamente em levar o visitante à ação de agendamento ou contato, sem distrações.",
        benefitsTitle: "Benefícios",
        benefits: [
            "Menos mensagens repetitivas de suporte",
            "Mais agendamentos e vendas confirmadas",
            "Experiência clara e rápida para o cliente"
        ],
        howItWorksTitle: "Como funciona",
        howItWorks: "Integração com WhatsApp ou sistemas de agenda, CTA direto e copy objetiva focada no seu serviço.",
        expectedResultsTitle: "Resultados esperados",
        expectedResults: "Simplificação drástica do processo de reserva e aumento na taxa de conversão final.",
        ctaText: "Quero facilitar meus agendamentos"
    },
    {
        slug: "google-meu-negocio",
        title: "Google Meu Negócio",
        metaTitle: "Otimização Google Meu Negócio para Negócios Locais",
        metaDescription: "Apareça no Google Maps quando clientes buscarem sua solução na sua cidade. Para profissionais da saúde e empresas locais.",
        keywords: ["google maps empresa", "google meu negócio local", "seo local negócios", "ser encontrado no google maps"],
        h1: "Seja encontrado no Google Maps por novos clientes",
        intro: "Quem não aparece no Google Maps praticamente não existe localmente para quem pesquisa no celular.",
        whatIsItTitle: "O que é a otimização de SEO Local",
        whatIsIt: "Configuração estratégica do seu perfil no Google para melhorar visibilidade, credibilidade e atrair tráfego geográfico.",
        benefitsTitle: "Benefícios",
        benefits: [
            "Mais ligações diretas",
            "Mais visitas ao seu endereço físico",
            "Mais confiança através de avaliações"
        ],
        expectedResultsTitle: "Resultados esperados",
        expectedResults: "Mais contatos qualificados, menos dependência de indicações e uma presença digital que trabalha continuamente para atrair novos negócios.",
        ctaText: "Quero aparecer no Google Maps",
        faq: [
            { question: "Como funciona o ranqueamento no Google Maps?", answer: "O Google prioriza relevância, distância e proeminência. Otimizamos sua ficha com palavras-chave estratégicas e orientamos sobre como obter as melhores avaliações." },
            { question: "Preciso ter um endereço físico?", answer: "Sim, para aparecer no Google Maps como empresa local, é necessário ter um local de atendimento ou definir sua área de prestação de serviços." }
        ],
        fullText: "Aparecer nas primeiras posições do Google Maps (SEO Local) é o investimento com maior retorno para negócios que atendem regiões específicas. Quando alguém busca por 'psicólogo perto de mim', você precisa estar no 'Local Pack' (os 3 primeiros resultados). Nossa estratégia foca em otimizar cada detalhe da sua ficha para garantir essa visibilidade."
    },
    {
        slug: "blog-seo-profissionais-saude",
        title: "Blog SEO Estratégico",
        metaTitle: "Blog SEO para Profissionais da Saúde e Negócios | Alpha Code",
        metaDescription: "Atraia clientes pelo Google com conteúdo estratégico e artigos otimizados para SEO. Autoridade para seu negócio.",
        keywords: ["blog para empresas", "seo para negócios", "marketing de conteúdo", "autoridade digital"],
        h1: "Atraia clientes todos os meses com conteúdo no Google",
        intro: "Enquanto você trabalha no seu negócio, seu conteúdo trabalha para trazer novos clientes.",
        howItWorksTitle: "Como funciona a estratégia de Blog",
        howItWorks: "Criamos artigos focados em dores reais e buscas frequentes dos seus potenciais clientes no Google.",
        benefitsTitle: "Benefícios",
        benefits: [
            "Tráfego orgânico qualificado",
            "Autoridade máxima no seu nicho",
            "Crescimento contínuo e escalável"
        ],
        expectedResultsTitle: "Resultados de longo prazo",
        expectedResults: "Construção de autoridade duradoura e fluxo constante de interessados sem depender exclusivamente de anúncios pagos.",
        ctaText: "Quero atrair clientes pelo Google"
    },
    {
        slug: "manutencao-site",
        title: "Manutenção de Site",
        metaTitle: "Manutenção de Site Profissional | Alpha Code",
        metaDescription: "Mantenha seu site rápido, seguro e atualizado com suporte contínuo para sua empresa.",
        keywords: ["manutenção de site", "suporte técnico site", "performance web", "atualização de site empresas"],
        h1: "Seu site sempre rápido, seguro e funcionando",
        intro: "Site parado é site esquecido e oportunidade perdida.",
        whatIsItTitle: "O que inclui a manutenção técnica",
        whatIsIt: "Atualizações de segurança, backups, ajustes de conteúdo e melhorias constantes de performance.",
        benefitsTitle: "Benefícios",
        benefits: [
            "Segurança total contra ataques",
            "Performance sempre otimizada",
            "Tranquilidade para focar no seu negócio"
        ],
        howItWorksTitle: "Como funciona",
        howItWorks: "Monitoramos seu site em tempo real, realizando todas as manutenções necessárias para que ele nunca seja um problema para você.",
        ctaText: "Quero manter meu site ativo"
    }
];

export function getRelatedServices(currentSlug: string): ServiceContent[] {
    return services.filter(s => s.slug !== currentSlug).slice(0, 2);
}
