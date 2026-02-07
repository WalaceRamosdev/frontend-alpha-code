export interface NicheContent {
    slug: string;
    name: string;
    title: string;
    heroTitle: string;
    heroDesc: string;
    badge: string;
    keywords: string[];
    detailedContent: string;
    benefits: string[];
    faq: { question: string; answer: string }[];
    ctaText?: string;
}

export const niches: NicheContent[] = [
    {
        slug: "advogados",
        name: "Advogados",
        title: "Criação de Sites para Advogados e Escritórios de Advocacia",
        heroTitle: "Autoridade Jurídica que Transforma Cliques em Clientes.",
        heroDesc: "Escritórios de advocacia de elite precisam de uma presença digital que transmita confiança e seriedade. Criamos sites jurídicos de alto padrão, focados em conformidade com o código de ética e conversão de leads qualificados.",
        badge: "Especialistas em Marketing Jurídico",
        keywords: ["site para advogado", "marketing jurídico", "presença digital advocacia", "site profissional jurídico"],
        detailedContent: `
            <p>No cenário jurídico atual, a <strong>presença digital</strong> não é mais opcional, é o seu principal cartão de visitas. Um site para advogados de alta performance deve ir além da estética; ele precisa transparecer <strong>autoridade, segurança e ética</strong>.</p>
            <p>Nossa metodologia foca em criar uma estrutura que respeita as normas da OAB enquanto utiliza técnicas avançadas de <strong>SEO jurídico</strong> para garantir que seu escritório seja encontrado por quem realmente precisa dos seus serviços. Não entregamos apenas um site, entregamos uma plataforma de prospecção passiva de 24 horas.</p>
            <p>Trabalhamos com carregamento ultra-rápido e <strong>otimização para dispositivos móveis</strong>, garantindo que o cliente em potencial tenha a melhor experiência possível desde o primeiro contato.</p>
        `,
        benefits: [
            "Conformidade OAB: Design focado em publicidade informativa, respeitando o Código de Ética.",
            "SEO Local Dominante: Apareça para clientes na sua região exata quando eles buscam por especialistas.",
            "Velocidade Superior: Sites carregam em menos de 1 segundo, reduzindo a taxa de rejeição.",
            "Integração WhatsApp: Facilite o contato imediato para consultas rápidas."
        ],
        faq: [
            { question: "O site segue as normas da OAB?", answer: "Sim, todos os nossos projetos para o setor jurídico são desenvolvidos seguindo estritamente as resoluções sobre publicidade informativa." },
            { question: "Quanto tempo leva para ficar pronto?", answer: "O prazo médio para um site institucional jurídico de alto padrão é de 15 a 25 dias úteis." },
            { question: "O site aparece no Google?", answer: "Sim, implementamos o SEO técnico básico em todas as páginas, e oferecemos estratégias avançadas para ranqueamento local." }
        ],
        ctaText: "Quero Mais Clientes na Advocacia"
    },
    {
        slug: "medicos",
        name: "Médicos",
        title: "Criação de Sites para Médicos e Clínicas de Saúde",
        heroTitle: "Sua Clínica no Próximo Nível de Profissionalismo.",
        heroDesc: "A primeira impression de um paciente hoje é digital. Desenvolvemos sites para médicos e clínicas que priorizam a humanização, clareza e agendamento facilitado, posicionando você como referência máxima na sua especialidade.",
        badge: "Autoridade Médica Digital",
        keywords: ["site para médico", "marketing médico", "site clínica de saúde", "agendamento online médico"],
        detailedContent: `
            <p>Para profissionais da saúde, um site é muito mais que um endereço na web; é uma extensão do seu <strong>consultório</strong>. A jornada do paciente moderno começa em uma busca no Google por sintomas ou especialidades.</p>
            <p>Criamos <strong>sites para médicos</strong> focados em UX (Experiência do Usuário) que reduzem a fricção para o agendamento. Com uma interface limpa e organizada, destacamos sua formação, especialidades e infraestrutura da clínica, gerando o <strong>acolhimento digital</strong> necessário antes mesmo da primeira consulta.</p>
            <p>Utilizamos tecnologias modernas para garantir que sua autoridade seja transmitida com velocidade e elegância em qualquer tela.</p>
        `,
        benefits: [
            "Foco em Agendamento: Botões estratégicos para converter visitantes em pacientes.",
            "Design Humanizado: Estética que transmite confiança, saúde e bem-estar.",
            "SEO para Especialidades: Ranqueie para as patologias e procedimentos que você atende.",
            "Gestão de Conteúdo: Blog integrado para você compartilhar conhecimento e ganhar autoridade."
        ],
        faq: [
            { question: "Posso integrar com meu sistema de prontuário?", answer: "Sim, podemos integrar links de agendamento de plataformas como Doctoralia, iClinic, entre outros." },
            { question: "O site é seguro (LGPD)?", answer: "Sim, implementamos certificados SSL e seguimos boas práticas de proteção de dados e privacidade." },
            { question: "Funciona bem no celular?", answer: "Totalmente. Mais de 80% das buscas por saúde são mobile, por isso focamos prioritariamente nisso." }
        ],
        ctaText: "Quero Mais Pacientes Particulares"
    },
    {
        slug: "contadores",
        name: "Contadores",
        title: "Criação de Sites para Contadores e Escritórios Contábeis",
        heroTitle: "Sua Contabilidade com Imagem de Grande Empresa.",
        heroDesc: "Sites projetados para contadores que desejam atrair empresas de alto valor. Transmita organização, segurança e tecnologia, facilitando a prospecção de novos contratos com um design limpo e eficiente.",
        badge: "Branding para Contabilidades",
        keywords: ["site para contador", "site escritório contábil", "marketing para contadores", "presença digital contabilidade"],
        detailedContent: `
            <p>No setor contábil, a <strong>confiança</strong> é a moeda de troca. Um escritório de contabilidade que possui um site amador transmite insegurança para o empresário que precisa delegar seus números.</p>
            <p>Nossos sites para contadores são focados em <strong>Corporatividade Progressiva</strong>. Unimos o visual sério necessário com a tecnologia moderna que sua empresa usa (Nuvem, ERPs, etc). Mostre que sua contabilidade não é apenas 'DP e Impostos', mas um parceiro estratégico para o crescimento do cliente.</p>
        `,
        benefits: [
            "Atração de B2B: Design e textos focados em decisores de empresas.",
            "Institucional Forte: Páginas dedicadas a cada serviço contábil (Fiscal, RH, Auditoria).",
            "Blog de Notícias: Área para postar atualizações tributárias e atrair tráfego orgânico.",
            "Área do Cliente: Links de fácil acesso para portais de envio de documentos."
        ],
        faq: [
            { question: "Vocês escrevem os textos dos serviços?", answer: "Sim, temos especialistas em copy que criam os textos base focados no público de contabilidade." },
            { question: "O site ajuda a vender consultoria?", answer: "Com certeza. Estruturamos o site para que a consultoria apareça como um serviço premium e diferenciado." }
        ],
        ctaText: "Quero Atrair Grandes Empresas"
    },
    {
        slug: "arquitetos",
        name: "Arquitetos",
        title: "Criação de Sites para Arquitetos e Designers de Interiores",
        heroTitle: "Seus Projetos Merecem uma Moldura Digital de Luxo.",
        heroDesc: "Para quem vende estética, o site é o cartão de visitas mais importante. Projetamos portfólios imersivos para arquitetos que valorizam o visual, a luz e a sofisticação, transformando cada clique em um novo contrato.",
        badge: "Portfólios de Alto Luxo",
        keywords: ["site para arquiteto", "portfólio arquitetura", "site design de interiores", "marketing para arquitetos"],
        detailedContent: `
            <p>Arquitetura é sobre <strong>visual e experiência</strong>. Se o seu site não causa o efeito 'uau', dificilmente seu projeto causará no cliente. Muitas vezes, o Instagram é pouco para mostrar a profundidade de um conceito arquitetônico.</p>
            <p>Desenvolvemos sites que funcionam como <strong>galerias de arte digitais</strong>. Imagens em alta resolução com carregamento inteligente (Lazy Loading) e navegação fluida que permitem ao cliente 'passear' pelos seus projetos antes mesmo de te contratar.</p>
        `,
        benefits: [
            "Portfólio Imersivo: Galerias focadas na estética e nos detalhes dos projetos.",
            "Storytelling de Projeto: Espaço para contar a história e o conceito por trás de cada obra.",
            "SEO de Luxo: Ranqueie para termos como 'Arquiteto de Interiores Alto Padrão'.",
            "Design Minimalista: Menos elementos, mais foco no que importa: sua arte."
        ],
        faq: [
            { question: "As fotos pesadas não deixam o site lento?", answer: "Não, usamos as tecnologias mais modernas de compressão (WebP/AVIF) e carregamento sob demanda." },
            { question: "Consigo atualizar o portfólio sozinho?", answer: "Sim, entregamos com um painel administrativo intuitivo para você subir novos projetos sempre que desejar." }
        ],
        ctaText: "Quero um Portfólio de Luxo"
    },
    {
        slug: "psicologos",
        name: "Psicólogos",
        title: "Criação de Sites para Psicólogos e Clínicas de Psicologia",
        heroTitle: "O Paciente Pesquisa Seu Nome Antes de Agendar. O Que Ele Encontra?",
        heroDesc: "A indicação traz o paciente até o Google. Seu site define se ele entra no consultório. Desenvolvemos sites para psicólogos que transmitem segurança imediata, acolhimento e autoridade ética.",
        badge: "Posicionamento Digital para Psicólogos",
        keywords: ["site para psicólogo", "marketing para psicólogos", "site clínica psicologia", "presença digital psicólogo", "branding psicologia"],
        detailedContent: `
            <p>O cenário mudou. Antigamente, o boca a boca bastava. Hoje, mesmo com indicação, o paciente vai ao Google validar quem você é. Se ele encontra um site amador, lento ou inexistente, <strong>a dúvida se instala</strong>.</p>
            <p>Seu site é o seu consultório digital. Ele precisa ser tão seguro e acolhedor quanto o seu espaço físico. Nossa metodologia de <strong>Design de Acolhimento</strong> utiliza psicologia das cores e UX (Experiência do Usuário) para reduzir a ansiedade do visitante e guiá-lo naturalmente para o agendamento.</p>
            <p>Não vendemos apenas 'sites'. Vendemos a ferramenta que transforma a curiosidade das redes sociais em <strong>pacientes na agenda</strong> ativamente, tudo dentro das normas do CFP.</p>
        `,
        benefits: [
            "Autoridade Imediata: Quem acessa entende, em segundos, sua abordagem e seriedade.",
            "Filtro de Curiosos: Informações claras que trazem pacientes alinhados com seu valor.",
            "Ética e Segurança: Estrutura 100% adequada às normas de publicidade do Conselho.",
            "Agendamento Automático: Integre com Doctoralia, Google Agenda ou WhatsApp sem esforço."
        ],
        faq: [
            { question: "O site ajuda a captar pacientes particulares?", answer: "Sim. Um site profissional é a base para justificar valor e sair da guerra de preços de convênios." },
            { question: "Vocês cuidam da identidade visual?", answer: "Adaptamos o site perfeitamente à sua paleta de cores e logo, mantendo a consistência da sua marca pessoal." },
            { question: "É difícil atualizar textos ou fotos?", answer: "Zero. Entregamos um painel simples onde você mesmo pode alterar conteúdos se desejar, sem depender de técnicos." }
        ],
        ctaText: "Quero Lotar Minha Agenda"
    }
];
