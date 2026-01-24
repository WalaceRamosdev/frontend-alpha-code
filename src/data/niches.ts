export interface NicheContent {
    slug: string;
    name: string;
    title: string;
    heroTitle: string;
    heroDesc: string;
    badge: string;
    keywords: string[];
}

export const niches: NicheContent[] = [
    {
        slug: "advogados",
        name: "Advogados",
        title: "Criação de Sites para Advogados e Escritórios de Advocacia",
        heroTitle: "Autoridade Jurídica que Transforma Cliques em Clientes.",
        heroDesc: "Escritórios de advocacia de elite precisam de uma presença digital que transmita confiança e seriedade. Criamos sites jurídicos de alto padrão, focados em conformidade com o código de ética e conversão de leads qualificados.",
        badge: "Especialistas em Marketing Jurídico",
        keywords: ["site para advogado", "marketing jurídico", "presença digital advocacia", "site profissional jurídico"]
    },
    {
        slug: "medicos",
        name: "Médicos",
        title: "Criação de Sites para Médicos e Clínicas de Saúde",
        heroTitle: "Sua Clínica no Próximo Nível de Profissionalismo.",
        heroDesc: "A primeira impressão de um paciente hoje é digital. Desenvolvemos sites para médicos e clínicas que priorizam a humanização, clareza e agendamento facilitado, posicionando você como referência máxima na sua especialidade.",
        badge: "Autoridade Médica Digital",
        keywords: ["site para médico", "marketing médico", "site clínica de saúde", "agendamento online médico"]
    },
    {
        slug: "contadores",
        name: "Contadores",
        title: "Criação de Sites para Contadores e Escritórios Contábeis",
        heroTitle: "Sua Contabilidade com Imagem de Grande Empresa.",
        heroDesc: "Sites projetados para contadores que desejam atrair empresas de alto valor. Transmita organização, segurança e tecnologia, facilitando a prospecção de novos contratos com um design limpo e eficiente.",
        badge: "Branding para Contabilidades",
        keywords: ["site para contador", "site escritório contábil", "marketing para contadores", "presença digital contabilidade"]
    },
    {
        slug: "arquitetos",
        name: "Arquitetos",
        title: "Criação de Sites para Arquitetos e Designers de Interiores",
        heroTitle: "Seus Projetos Merecem uma Moldura Digital de Luxo.",
        heroDesc: "Para quem vende estética, o site é o cartão de visitas mais importante. Projetamos portfólios imersivos para arquitetos que valorizam o visual, a luz e a sofisticação, transformando cada clique em um novo contrato.",
        badge: "Portfólios de Alto Luxo",
        keywords: ["site para arquiteto", "portfólio arquitetura", "site design de interiores", "marketing para arquitetos"]
    },
    {
        slug: "psicologos",
        name: "Psicólogos",
        title: "Criação de Sites para Psicólogos e Clínicas de Psicologia",
        heroTitle: "Acolhimento e Autoridade para sua Atuação Clínica.",
        heroDesc: "Sua presença digital deve transmitir a mesma segurança e acolhimento que o seu consultório. Desenvolvemos sites para psicólogos que unem ética, design humanizado e clareza para converter visitantes em pacientes fidelizados.",
        badge: "Especialistas em Marketing para Psicólogos",
        keywords: ["site para psicólogo", "marketing para psicólogos", "site clínica psicologia", "presença digital psicólogo"]
    }
];
