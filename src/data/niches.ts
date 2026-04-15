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
    stats?: { number: string; label: string }[];
    metaFormulas: {
        formula1: string;
        formula2: string;
        formula3: string;
    };
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
        ctaText: "Quero Mais Clientes na Advocacia",
        metaFormulas: {
            formula1: "Atraia mais clientes com um site profissional para Advogados. Design sério, conformidade OAB e SEO jurídico. +1.400 sites entregues. Orçamento em 24h!",
            formula2: "Site para Advogado com carregamento ultrarrápido, SEO otimizado e integração com WhatsApp. Destaque-se no Google Search. Solicite orçamento gratuito!",
            formula3: "Seu escritório de advocacia é encontrado no Google? Criamos sites que geram autoridade e convertem leads. +20 anos de experiência. Fale conosco!"
        }
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
            { question: "O site é seguro (LGPD)?", answer: "Sim, implementamos certificados SSL e seguimos boas práticas de proteção de dados e privacy." },
            { question: "Funciona bem no celular?", answer: "Totalmente. Mais de 80% das buscas por saúde são mobile, por isso focamos prioritariamente nisso." }
        ],
        ctaText: "Quero Mais Pacientes Particulares",
        metaFormulas: {
            formula1: "Atraia mais pacientes com um site profissional para Médicos. Design humanizado, agendamento online e SEO. +1.400 sites entregues. Orçamento em 24h!",
            formula2: "Site para Médico com carregamento ultrarrápido, UX focado em saúde e integração com WhatsApp. Destaque-se no Google. Solicite um diagnóstico!",
            formula3: "Médico, seja encontrado por quem precisa de você. Criamos sites que geram autoridade e facilitam agendamentos. +20 anos de mercado. Fale conosco!"
        }
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
        ctaText: "Quero Atrair Grandes Empresas",
        metaFormulas: {
            formula1: "Atraia mais clientes B2B com um site profissional para Contadores. Design sério, blog de notícias e área do cliente. +1.400 sites entregues. Orçamento em 24h!",
            formula2: "Site para Contabilidade focado em autoridade e prospecção de empresas. SEO otimizado e integração WhatsApp. Solicite seu diagnóstico gratuito!",
            formula3: "Seu escritório de contabilidade transparece segurança? Criamos sites que geram confiança e novos contratos. +20 anos de experiência. Fale conosco!"
        }
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
        ctaText: "Quero um Portfólio de Luxo",
        metaFormulas: {
            formula1: "Destaque seus projetos com um site para Arquitetos. Portfólio imersivo, carregamento ultrarrápido e SEO de luxo. +1.400 sites entregues. Orçamento em 24h!",
            formula2: "Site de arquitetura focado em visual e experiência. Transforme sua arte em novos contratos. SEO otimizado para alto padrão. Solicite orçamento!",
            formula3: "Seu escritório de arquitetura merece uma moldura digital de luxo. Criamos sites que encantam e convertem. +20 anos de experiência. Saiba mais!"
        }
    },
    {
        slug: "psicologos",
        name: "Psicólogos",
        title: "Criação de Sites para Psicólogos - Atue com Ética e Autoridade",
        heroTitle: "Todos os dias, Psicólogos perdem pacientes por não serem encontrados no Google. Vamos mudar isso.",
        heroDesc: "Sites profissionais que transmitem acolhimento, autoridade e segurança. Conquiste mais pacientes particulares sem depender apenas de redes sociais ou indicações.",
        badge: "Estratégia Digital Ética",
        keywords: ["site para psicólogo", "marketing para psicólogos", "agenda lotada psicologia", "site profissional saúde mental"],
        detailedContent: `
            <p>Um site para psicólogos deve ser um ambiente de <strong>acolhimento digital</strong>. Muito mais do que um portfólio, ele é a primeira etapa do vínculo terapêutico.</p>
            <p>Nossa abordagem foca no <strong>Marketing Ético</strong>, respeitando as diretrizes do CRP enquanto utilizamos o poder do SEO (Otimização para Buscas) para que você seja encontrado por quem busca ajuda agora. Oferecemos integração com agendamento online e blogs para que você compartilhe conhecimento e gere autoridade.</p>
        `,
        benefits: [
            "Acolhimento Digital: Design que transmite calma, segurança e profissionalismo.",
            "SEO para Terapia: Apareça quando buscarem por termos como 'psicólogo online' ou especialidades.",
            "Agendamento Facilitado: Botões direto para WhatsApp ou sistemas de reserva.",
            "Segurança de Dados: Site seguro e em conformidade com as normas de privacidade."
        ],
        faq: [
            { question: "O site segue as normas do CRP?", answer: "Sim, cuidamos para que toda a comunicação seja ética e baseada em informação, evitando promessas de cura ou sensacionalismo." },
            { question: "Como vou atrair pacientes?", answer: "O site é otimizado para o Google. Quando alguém buscar por um psicólogo na sua região ou especialidade, você estará lá." },
            { question: "Eu preciso aparecer em vídeos?", answer: "Não! Um bom site com SEO focado em conteúdo e prova social é suficiente para gerar autoridade sem exposição excessiva." }
        ],
        ctaText: "QUERO MEU ORÇAMENTO EM 24H",
        metaFormulas: {
            formula1: "Atraia mais pacientes com um site profissional para Psicólogo. Design acolhedor, blog para artigos e agendamento online. +1.400 sites entregues. Orçamento em 24h!",
            formula2: "Site para Psicólogo com carregamento ultrarrápido (Astro.js), SEO otimizado e integração com WhatsApp. Destaque-se no Google. Solicite um diagnóstico gratuito!",
            formula3: "Psicólogo, você é encontrado no Google? Criamos sites que geram autoridade, atraem pacientes e convertem. +20 anos de experiência. Fale conosco!"
        }
    },
    {
        slug: "fotografos",
        name: "Fotógrafos",
        title: "Criação de Sites para Fotógrafos - Onde Sua Arte Ganha Vida",
        heroTitle: "Destaque seu trabalho com um portfólio online impecável.",
        heroDesc: "Galerias de alta resolução, carregamento ultrarrápido e SEO para garantir que seus cliques sejam vistos e seus contratos assinados. O portfólio que seu talento merece.",
        badge: "Portfólios de Alta Performance",
        keywords: ["site para fotógrafo", "portfólio fotografia", "marketing para fotógrafos", "site de foto profissional"],
        detailedContent: `
            <p>Para fotógrafos, o site é a prova real da sua técnica. No Instagram, as fotos perdem qualidade e somem no feed. No seu site, elas são as protagonistas em <strong>glórias de alta resolução</strong>.</p>
            <p>Desenvolvemos sites que carregam instantaneamente, mesmo com centenas de imagens, usando tecnologia de compressão de última geração (WebP). Focamos no <strong>SEO local</strong> para que noivos, empresas e famílias te encontrem na hora certa.</p>
        `,
        benefits: [
            "Velocidade com Qualidade: Imagens nítidas que carregam em milissegundos.",
            "Galerias Categorizadas: Organize seu trabalho por casamentos, retratos, eventos, etc.",
            "Foco em Orçamento: Landing pages específicas para converter interessados rápido.",
            "Blog de Ensaios: Conte a história de cada sessão e melhore seu ranqueamento no Google."
        ],
        faq: [
            { question: "As fotos perdem qualidade?", answer: "Não, usamos compressão inteligente que mantém a nitidez perfeita para telas Retina enquanto reduz o peso do arquivo." },
            { question: "Funciona bem no celular?", answer: "Sim, o portfólio se adapta perfeitamente, permitindo que seus clientes vejam suas fotos em qualquer lugar." }
        ],
        ctaText: "CRIAR MEU PORTFÓLIO AGORA",
        metaFormulas: {
            formula1: "Destaque seu trabalho com um portfólio online para Fotógrafos. Galerias de alta resolução, carregamento ultrarrápido e SEO. +1.400 clientes satisfeitos. Orçamento em 24h!",
            formula2: "Site para Fotógrafo com galerias profissionais, carregamento instantâneo e SEO para casamentos e eventos. Apareça na frente. Peça seu orçamento!",
            formula3: "Sua fotografia merece um site de elite. Portfólios imersivos que convertem cliques em contratos. +20 anos de mercado. Confira nossos modelos!"
        }
    },
    {
        slug: "energia-solar",
        name: "Energia Solar",
        title: "Site para Empresa de Energia Solar | Alta Conversão e SEO Nacional",
        heroTitle: "Sua empresa de energia solar merece um site que vende enquanto você instala.",
        heroDesc: "Sites profissionais para instaladores de painéis solares. Apareça no topo do Google, gere orçamentos todos os dias e conquiste mais clientes em qualquer estado do Brasil.",
        badge: "Marketing Digital para Energia Solar",
        keywords: ["site para empresa de energia solar", "marketing energia solar", "instalação painéis solares", "site empresa fotovoltaica", "seo energia solar"],
        detailedContent: `
            <p>O mercado de <strong>energia solar no Brasil</strong> cresce acima de 30% ao ano. Mas enquanto a demanda explode, a maioria das empresas instaladoras ainda depende de indicações e não aparece no Google. Isso é dinheiro deixado na mesa todos os dias.</p>
            <p>Um <strong>site profissional para empresa de energia solar</strong> funciona como um vendedor digital de alta performance: atrai clientes que já estão buscando por instalação fotovoltaica na sua região, apresenta seus projetos realizados, educa sobre o retorno do investimento e converte contato em orçamento.</p>
            <p>Com a Alpha Code, sua empresa de energia solar terá presença digital de <strong>nível corporativo</strong>, com carregamento ultrarrápido, SEO técnico avançado e design que transmite a seriedade e a inovação que o mercado energético exige.</p>
        `,
        benefits: [
            "SEO Nacional e Local: Apareça para quem busca instalação solar em todo o Brasil.",
            "Gerador de Orçamentos: Formulários e CTAs estratégicos que transformam visitas em pedidos.",
            "Portfólio de Projetos: Exiba instalações realizadas e gere confiança instantaneamente.",
            "Calculadora de Economia: Ferramenta interativa que mostra a economia ao cliente antes mesmo do orçamento."
        ],
        faq: [
            { question: "O site vai me trazer clientes de outros estados?", answer: "Sim! Desenvolvemos a estrutura com SEO voltado para alcance nacional, criando páginas específicas para cada estado ou região de atuação da sua empresa." },
            { question: "Posso mostrar meus projetos e instalações?", answer: "Com certeza. Criamos uma seção de portfólio profissional com antes e depois, dados técnicos e depoimentos de clientes para gerar máxima confiança." },
            { question: "O site explica o retorno do investimento?", answer: "Sim! Incluímos seções estratégicas que educam o cliente sobre economia na conta de luz, payback e benefícios fiscais, reduzindo objeções de venda." },
            { question: "Funciona bem no celular?", answer: "100%. A maioria das buscas por energia solar é feita via smartphone. Nosso design é mobile-first, garantindo a melhor experiência em qualquer dispositivo." }
        ],
        ctaText: "QUERO GERAR MAIS ORÇAMENTOS",
        metaFormulas: {
            formula1: "Site profissional para empresa de energia solar. Atraia mais clientes, gere orçamentos e apareça no Google em todo o Brasil. +1.400 projetos entregues. Orçamento em 24h!",
            formula2: "Site para instaladora de painéis solares com SEO nacional, alta performance e design de autoridade. Transforme cliques em orçamentos. Solicite diagnóstico gratuito!",
            formula3: "Empresa de energia solar fotovoltaica? Construa sua autoridade digital e gere pedidos de orçamento todos os dias. Especialistas em marketing para o setor solar. Fale conosco!"
        }
    },
    {
        slug: "dentistas",
        name: "Dentistas",
        title: "Criação de Sites para Dentistas e Clínicas Odontológicas",
        heroTitle: "Sua Clínica Odontológica com a Vitrine que Merece.",
        heroDesc: "Desenvolvemos sites para dentistas focados em estética e confiança. Mostre seus casos de sucesso, facilite o agendamento e destaque sua especialidade com um design limpo e profissional.",
        badge: "Marketing Odontológico Premium",
        keywords: ["site para dentista", "marketing odontológico", "site consultório odonto"],
        detailedContent: "<p>Sites para dentistas devem focar na <strong>transformação do sorriso</strong> e na biossegurança.</p>",
        benefits: ["Agendamento via WhatsApp", "Galeria de Antes e Depois", "SEO Local para Bairros", "Página de Especialidades"],
        faq: [{ question: "O site é responsivo?", answer: "Sim, perfeito para celulares." }],
        ctaText: "QUERO MINHA AGENDA LOTADA",
        metaFormulas: {
            formula1: "Site para Dentistas com foco em conversão e estética. Atraia mais pacientes particulares hoje!",
            formula2: "Sua clínica odontológica no topo do Google. Design premium e SEO local. Confira!",
            formula3: "Otimize sua captação de pacientes com um site odontológico de elite. Saiba mais!"
        }
    },
    {
        slug: "manutencao",
        name: "Manutenção",
        title: "Criação de Sites para Empresas de Manutenção e Reformas",
        heroTitle: "Sua Empresa de Manutenção com Imagem de Grande Engenharia.",
        heroDesc: "Sites para prestadores de serviço que desejam transmitir profissionalismo e segurança. Destaque sua equipe, portfólio de obras e facilite a solicitação de orçamentos rápidos.",
        badge: "Sites para Prestadores de Serviço",
        keywords: ["site para manutenção", "site de reformas", "marketing para empreiteiras"],
        detailedContent: "<p>A confiança é base para serviços de <strong>manutenção e reformas</strong>.</p>",
        benefits: ["Solicitação de Orçamento PDF", "Portfólio de Obras Realizadas", "SEO para Serviços Específicos", "Área de Atendimento por Região"],
        faq: [{ question: "Como recebo os orçamentos?", answer: "Direto no seu WhatsApp ou E-mail." }],
        ctaText: "QUERO MAIS OBRAS",
        metaFormulas: {
            formula1: "Site para empresas de manutenção e reformas. Transmita segurança e gere orçamentos!",
            formula2: "Sua empreiteira ou empresa de serviços no Google. SEO local forte. Peça seu site!",
            formula3: "Venda mais serviços de manutenção with um site profissional da Alpha Code."
        }
    }
];
