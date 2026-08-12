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
        title: "Marketing Ético para Psicólogos: Autoridade e Presença Digital",
        heroTitle: "Sua competência clínica merece um posicionamento digital à altura. Com ética e acolhimento.",
        heroDesc: "Desenvolvemos sites para psicólogos que transmitem confiança e segurança, respeitando rigorosamente as normas do CFP enquanto constroem sua autoridade digital.",
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
            formula1: "Posicione-se com autoridade clínica através de um site profissional para Psicólogos. Design acolhedor, ético e otimizado para o Google. Orçamento em 24h!",
            formula2: "Marketing Ético para Psicólogos: Site profissional com tecnologia Astro.js e SEO focado em saúde mental. Construa sua presença digital com segurança.",
            formula3: "Seu consultório de psicologia é referência no Google? Criamos sites que geram autoridade ética e conectam você com quem precisa. Fale conosco!"
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
        title: "Energia Solar | Alta Conversão e SEO Nacional",
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
        keywords: ["site para dentista", "marketing odontológico", "site consultório odonto", "criação de sites para clínicas odontológicas", "SEO para dentistas", "implantes dentários site", "lentes de contato dental", "dentista perto de mim"],
        detailedContent: `
            <p>No mercado odontológico atual, a <strong>presença digital</strong> deixou de ser diferencial e se tornou obrigatória. Um site para dentistas de alto padrão precisa ir além de um cartão de visitas online: ele precisa <strong>atrair pacientes qualificados</strong>, transmitir autoridade clínica e facilitar o agendamento de tratamentos de alto valor como <strong>implantes, lentes de contato dental e Invisalign</strong>.</p>
            <p>Nossa metodologia para <strong>criação de sites para dentistas</strong> foca em três pilares: <strong>estética premium</strong> que valoriza o antes e depois dos seus casos, <strong>SEO odontológico local</strong> para aparecer nas buscas da sua região, e <strong>conversão por WhatsApp</strong> para que nenhum lead se perca. Respeitamos rigorosamente as normas do CRO, garantindo uma comunicação ética e informativa.</p>
            <p>Com tecnologia Astro.js, entregamos sites que carregam em menos de 1 segundo — fator essencial considerando que mais de 80% das buscas por tratamentos odontológicos são feitas pelo celular. Seja para clínicas de <strong>implantes, ortodontia, estética avançada ou odontopediatria</strong>, criamos a plataforma digital ideal para captar pacientes particulares na sua região.</p>
        `,
        benefits: [
            "Agendamento via WhatsApp: Botão estratégico para conversão imediata de leads.",
            "Galeria de Antes e Depois: Vitrine dos seus melhores casos clínicos.",
            "SEO Local para Bairros: Apareça no Google para 'dentista perto de mim'.",
            "Página de Especialidades: Destaque separado para implantes, lentes, Invisalign e mais.",
            "Site 100% Ético CRO: Comunicação informativa sem promessas de cura.",
            "Carregamento Ultra-Rápido: Performance que converte e segura o visitante."
        ],
        faq: [
            { question: "O site respeita as normas do CRO?", answer: "Sim, todos os nossos sites para dentistas seguem rigorosamente as diretrizes do Conselho Federal de Odontologia, com comunicação ética e informativa." },
            { question: "Como vou atrair pacientes pelo site?", answer: "Utilizamos SEO odontológico avançado para que sua clínica apareça no Google quando pacientes buscam por tratamentos como implantes, lentes de contato, clareamento ou 'dentista perto de mim'." },
            { question: "O site ajuda a vender tratamentos de alto valor?", answer: "Com certeza. Estruturamos páginas específicas para implantes, lentes e Invisalign com foco em desejo visual, prova social e agendamento direto." },
            { question: "Funciona bem no celular?", answer: "Sim, 100% mobile-first. Mais de 80% das buscas por dentistas são feitas pelo smartphone, e nosso design é otimizado para essa realidade." },
            { question: "Consigo mostrar meus casos clínicos?", answer: "Sim, criamos uma galeria de antes e depois com proteção de identidade dos pacientes, ideal para demonstrar resultados e gerar confiança." }
        ],
        ctaText: "QUERO MINHA AGENDA LOTADA",
        metaFormulas: {
            formula1: "Site profissional para Dentistas com foco em conversão e estética. Atraia mais pacientes particulares com SEO odontológico e design premium. +180 dentistas atendidos. Orçamento em 24h!",
            formula2: "Sua clínica odontológica no topo do Google. Design premium, SEO local e agendamento via WhatsApp. Criação de sites para dentistas que convertem. Confira!",
            formula3: "Otimize sua captação de pacientes com um site odontológico de elite. Implantes, lentes e Invisalign com alta conversão. Fale com a Alpha Code agora!"
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
    },
    {
        slug: "afiliados",
        name: "Afiliados",
        title: "Estrutura Própria para Afiliados Shopee, Mercado Livre e Amazon",
        heroTitle: "Pare de ser refém do algoritmo. Construa sua Estrutura Própria.",
        heroDesc: "Desenvolvemos o ecossistema definitivo para afiliados de elite. Fuja dos bloqueios, domine o Pixel e escale suas vendas com sites ultra-rápidos e focados em alta conversão.",
        badge: "Performance Máxima para Afiliados",
        keywords: ["estrutura própria para afiliados", "site para afiliados shopee", "marketing de afiliados", "página de pre-sell", "advertorial para afiliados"],
        detailedContent: `
            <p>No mercado de afiliados, a diferença entre quem ganha 'renda extra' e quem fatura <strong>múltiplos 5 e 6 dígitos</strong> é a estrutura. Depender apenas de redes sociais é construir um castelo em terreno alugado.</p>
            <p>Nossa <strong>estrutura própria para afiliados</strong> é baseada em Astro.js, garantindo que seu cliente nunca saia da página por lentidão. Integramos <strong>Pixel do Facebook, API de Conversão e Google Analytics</strong> para que você tenha o controle real dos seus dados e possa fazer retargeting de forma profissional.</p>
            <p>Seja com <strong>Link Hubs, Advertoriais ou Páginas de Pre-sell</strong>, entregamos a engenharia necessária para você se posicionar no Top 1% do mercado.</p>
        `,
        benefits: [
            "Velocidade Insana: Carregamento em menos de 0.8s para não perder nenhum clique.",
            "Controle Total de Dados: Pixel e API de Conversão configurados para escala real.",
            "Fim dos Bloqueios: Links hospedados no seu próprio domínio, com autoridade e segurança.",
            "Design de Autoridade: Passe a confiança necessária para vender produtos físicos de alto ticket."
        ],
        faq: [
            { question: "O site ajuda a evitar bloqueios?", answer: "Sim. Ao usar seu próprio domínio e uma estrutura profissional, você evita ser marcado como spam por agregadores de links gratuitos." },
            { question: "Vocês configuram o Pixel e a API?", answer: "Sim, entregamos o setup técnico pronto para que você possa focar apenas em rodar o tráfego e vender." },
            { question: "Consigo criar páginas para vários produtos?", answer: "Com certeza. Nossa estrutura é modular, permitindo que você escale para dezenas de produtos vencedores rapidamente." }
        ],
        ctaText: "QUERO MINHA ESTRUTURA PRÓPRIA",
        metaFormulas: {
            formula1: "Escala real para afiliados Shopee e Mercado Livre. Tenha sua estrutura própria com Astro.js e Pixel integrado. Orçamento em 24h!",
            formula2: "Pare de perder dinheiro com sites lentos. Criamos sua estrutura de afiliado ultra-rápida e focada em conversão. Saiba mais!",
            formula3: "Domine o mercado de afiliados com profissionalismo. Estruturas próprias, advertoriais e pré-sells de alta performance. Fale conosco!"
        }
    },
    {
        slug: "imobiliarias",
        name: "Imobiliárias",
        title: "Criação de Sites para Imobiliárias e Incorporadoras",
        heroTitle: "Seus Imóveis Vendidos Antes Mesmo da Visita Presencial.",
        heroDesc: "Sites para imobiliárias e incorporadoras que transformam a busca por imóveis em uma experiência imersiva. Mostre seus empreendimentos com tours virtuais, facilite o contato com corretores e conquiste mais vendas com SEO local dominante.",
        badge: "Marketing Imobiliário Digital",
        keywords: ["site para imobiliária", "site incorporadora", "marketing imobiliário", "site imobiliário", "SEO imobiliário"],
        detailedContent: `
            <p>No mercado imobiliário, a <strong>primeira visita virtual</strong> decide o sucesso de uma venda. Enquanto compradores pesquisam no Google por imóveis na sua região, muitas imobiliárias ainda dependem apenas de portais de anúncios e indicações. Um <strong>site profissional para imobiliária</strong> muda completamente esse cenário.</p>
            <p>Desenvolvemos sites que funcionam como <strong>vitrines digitais imersivas</strong>. Com galerias de fotos em alta resolução, tours virtuais integrados e filtros de busca por bairro, preço e tipo de imóvel, seu cliente encontra o apartamento ideal antes mesmo de ligar para o corretor.</p>
            <p>Nossa metodologia foca em <strong>SEO local imobiliário</strong>, garantindo que seu site apareça quando alguém busca por 'imobiliária perto de mim' ou 'comprar apartamento em [bairro]'. Integramos WhatsApp e formulários inteligentes para que nenhum lead se perca.</p>
        `,
        benefits: [
            "Galeria de Imóveis: Filtros por preço, bairro, área e tipo para facilitar a busca do comprador.",
            "Tours Virtuais: Integração com Google Street View e vídeos 360° dos empreendimentos.",
            "SEO Local Dominante: Apareça nas buscas por imóveis na sua região exata.",
            "WhatsApp Integrado: Botão estratégico para contato direto com o corretor responsável.",
            "Captação de Leads: Formulários inteligentes que qualificam o comprador antes do contato.",
            "Página de Empreendimentos: Vitrines exclusivas para cada lançamento ou condomínio."
        ],
        faq: [
            { question: "O site mostra os imóveis disponíveis em tempo real?", answer: "Sim, podemos integrar com seus sistemas de gestão de imóveis (CRM) para atualizar automaticamente as disponibilidades e preços." },
            { question: "Funciona para incorporadoras e lançamentos?", answer: "Com certeza. Criamos páginas específicas para cada empreendimento com plantas, simulações e tabela de preços." },
            { question: "O site aparece no Google quando alguém busca por imóveis?", answer: "Sim, implementamos SEO local focado em buscas imobiliárias, incluindo termos como 'comprar apartamento', 'imobiliária perto de mim' e bairros específicos." },
            { question: "Consigo atualizar as fotos e preços dos imóveis?", answer: "Sim, entregamos um painel administrativo intuitivo para você gerenciar todo o catálogo de imóveis sem depender de ninguém." }
        ],
        ctaText: "QUERO VENDER MAIS IMÓVEIS",
        metaFormulas: {
            formula1: "Site profissional para Imobiliárias com tours virtuais, galeria de imóveis e SEO local. Atraia mais compradores e feche mais vendas. Orçamento em 24h!",
            formula2: "Sua imobiliária no topo do Google. Sites imersivos com filtros de busca, WhatsApp integrado e captação de leads. Criação de sites para imobiliárias. Confira!",
            formula3: "Pare de depender apenas de portais de anúncios. Tenha seu próprio site imobiliário com SEO dominante e conversão por WhatsApp. Fale conosco!"
        }
    },
    {
        slug: "estetica",
        name: "Estética",
        title: "Sites para Clínicas de Estética e Beauty Profissional",
        heroTitle: "Seu Salão com a Vitrine que Encanta e Converte.",
        heroDesc: "Sites para clínicas de estética e profissionais de beleza que valorizam o visual premium. Mostre seus resultados com galeria antes e depois, facilite o agendamento e destaque sua autoridade com um design sofisticado.",
        badge: "Marketing de Beleza Digital",
        keywords: ["site clínica estética", "marketing estética", "site salão beleza", "site estética profissional", "SEO estética"],
        detailedContent: `
            <p>No mercado da <strong>estética e beleza</strong>, a imagem é tudo. Seu site é a primeira impressão que uma cliente potencial terá sobre o nível de qualidade do seu trabalho. Um site amador transmite amadorismo no atendimento.</p>
            <p>Criamos <strong>sites para clínicas de estética</strong> focados em <strong>experiência visual premium</strong>. Galerias de antes e depois com proteção de identidade, agendamento online simplificado e depoimentos de clientes reais que geram prova social imediata.</p>
            <p>Nossa abordagem combina <strong>design sofisticado</strong> com <strong>SEO local</strong> para que suas clientes encontrem sua clínica quando buscam por procedimentos como botox, preenchimento, limpeza de pele ou design de sobrancelhas na sua região.</p>
        `,
        benefits: [
            "Galeria Antes e Depois: Vitrine dos seus melhores resultados com design elegante.",
            "Agendamento Online: Botão estratégico para que a cliente reserve horário pelo WhatsApp.",
            "SEO Local para Beleza: Apareça quando buscarem por 'clínica de estética perto de mim'.",
            "Design Premium: Estética sofisticada que transmite exclusividade e qualidade.",
            "Depoimentos Integrados: Prova social de clientes reais aumentando a confiança.",
            "Páginas de Procedimentos: Destaque separado para cada serviço que você oferece."
        ],
        faq: [
            { question: "O site transmite a sofisticação que minha clínica tem?", answer: "Sim, criamos design premium com paleta de cores e tipografia que valorizam a identidade visual do seu espaço." },
            { question: "Consigo mostrar os procedimentos que faço?", answer: "Com certeza. Criamos páginas detalhadas para cada procedimento com fotos, descrições e valores." },
            { question: "A cliente consegue agendar pelo site?", answer: "Sim, integramos botão de WhatsApp e formulário de agendamento para facilitar o processo de reserva." },
            { question: "O site aparece nas buscas locais?", answer: "Sim, implementamos SEO focado em termos como 'estética perto de mim', 'clínica de beleza [bairro]' e procedimentos específicos." }
        ],
        ctaText: "QUERO MAIS CLIENTES PARA MEU SALÃO",
        metaFormulas: {
            formula1: "Site profissional para Clínicas de Estética com galeria antes e depois, agendamento online e SEO local. Transmite sofisticação e converte. Orçamento em 24h!",
            formula2: "Sua clínica de estética merece um site de elite. Design premium, depoimentos reais e agendamento via WhatsApp. Atraia mais clientes. Peça seu orçamento!",
            formula3: "Pare de perder clientes por falta de presença digital. Site para estética com SEO local e conversão por WhatsApp. +1.400 sites entregues. Fale conosco!"
        }
    },
    {
        slug: "escolas",
        name: "Escolas",
        title: "Sites para Escolas, Colégios e Cursos",
        heroTitle: "Sua Escola com a Presença Digital que os Pais Confiam.",
        heroDesc: "Sites para escolas, colégios e instituições de ensino que transmitem credibilidade e facilitam a comunicação com pais e alunos. Mostre sua metodologia, facilite matrículas e destaque os diferenciais da sua instituição.",
        badge: "Marketing Educacional Digital",
        keywords: ["site escola", "site colégio", "marketing escolar", "site instituição de ensino", "SEO escolar"],
        detailedContent: `
            <p>Para pais que buscam a <strong>melhor escola</strong> para seus filhos, a primeira pesquisa começa no Google. Uma instituição de ensino sem presença digital perde espaço para concorrentes que investem em marketing educacional.</p>
            <p>Desenvolvemos <strong>sites para escolas</strong> que transmitem <strong>confiança e credibilidade</strong>. Com páginas dedicadas a metodologia, corpo docente, infraestrutura e depoimentos de pais, seu site se torna a vitrine que convence na hora da decisão.</p>
            <p>Implementamos <strong>SEO educacional local</strong> para que sua escola apareça quando pais buscam por 'escola perto de mim', 'colégio em [bairro]' ou 'melhor escola da região'. Integramos formulários de matrícula e comunicação via WhatsApp.</p>
        `,
        benefits: [
            "Página de Metodologia: Espaço dedicado para mostrar os diferenciais do ensino.",
            "Depoimentos de Pais: Prova social que gera confiança na decisão de matrícula.",
            "Formulário de Matrícula: Processo online simplificado para novas inscrições.",
            "SEO Local Educacional: Apareça nas buscas por escolas na sua região.",
            "Galeria de Infraestrutura: Mostre as salas, quadras e espaços da escola.",
            "Comunicação via WhatsApp: Canal direto para dúvidas de pais e responsáveis."
        ],
        faq: [
            { question: "O site transmite a credibilidade que os pais esperam?", answer: "Sim, criamos design profissional com foco em confiança, usando depoimentos reais e informações detalhadas sobre a metodologia." },
            { question: "Posso atualizar as informações de matrícula?", answer: "Sim, entregamos um painel administrativo para você atualizar vagas, valores e prazos sempre que necessário." },
            { question: "O site aparece quando pais buscam por escolas?", answer: "Sim, implementamos SEO local educacional focado em termos como 'escola perto de mim', 'colégio [cidade]' e 'melhor escola da região'." },
            { question: "Consigo receber solicitações de matrícula pelo site?", answer: "Com certeza. Criamos formulários inteligentes que coletam informações do aluno e enviam notificação via WhatsApp e e-mail." }
        ],
        ctaText: "QUERO MAIS MATRÍCULAS",
        metaFormulas: {
            formula1: "Site profissional para Escolas e Colégios com foco em credibilidade e matrículas. SEO local educacional e design que transmite confiança. Orçamento em 24h!",
            formula2: "Sua escola merece uma presença digital de elite. Site educacional com depoimentos, galeria de infraestrutura e formulário de matrícula. Peça seu orçamento!",
            formula3: "Pais pesquisam no Google antes de escolher a escola. Apareça com um site profissional que transmite credibilidade e facilita matrículas. Fale conosco!"
        }
    },
    {
        slug: "restaurantes",
        name: "Restaurantes",
        title: "Sites para Restaurantes, Lanchonetes e Delivery",
        heroTitle: "Seu Cardápio Digital que Fome e Encanta.",
        heroDesc: "Sites para restaurantes e lanchonetes que combinam apetite visual com funcionalidade. Mostre seu cardápio, facilite pedidos via WhatsApp e destaque sua culinária com um design que água a boca.",
        badge: "Marketing Gastronômico Digital",
        keywords: ["site restaurante", "site delivery", "cardápio digital", "site lanchonete", "SEO restaurante"],
        detailedContent: `
            <p>No mercado gastronômico, a <strong>primeira fome começa no visual</strong>. Antes mesmo de provar seu prato, o cliente decide pelo site ou Instagram. Um <strong>site profissional para restaurante</strong> transforma essa decisão em pedido.</p>
            <p>Criamos sites que funcionam como <strong>cardápios digitais imersivos</strong>. Fotos de alta qualidade dos pratos, organização por categorias, preços atualizados e botão de pedido direto pelo WhatsApp. Tudo para que o cliente sinta fome apenas de olhar.</p>
            <p>Nossa abordagem foca em <strong>SEO local gastronômico</strong>, garantindo que seu restaurante apareça quando alguém busca por 'restaurante perto de mim', 'comida [tipo] em [bairro]' ou 'delivery na região'. Integramos com iFood, Rappi e outros agregadores.</p>
        `,
        benefits: [
            "Cardápio Digital: Fotos dos pratos com descrições, preços e categorias organizadas.",
            "Pedido via WhatsApp: Botão estratégico para facilitar encomendas e reservas.",
            "SEO Local Gastronômico: Apareça nas buscas por restaurantes na sua região.",
            "Galeria de Ambiente: Mostre a decoração e o clima do seu restaurante.",
            "Integração com Delivery: Links para iFood, Rappi e outros canais de venda.",
            "Horário e Localização: Mapa integrado e horário de funcionamento em destaque."
        ],
        faq: [
            { question: "O site mostra o cardápio completo?", answer: "Sim, criamos páginas detalhadas com fotos de cada prato, descrições apetitosas e preços atualizados." },
            { question: "Posso atualizar o cardápio sozinho?", answer: "Com certeza. Entregamos um painel administrativo intuitivo para você adicionar, remover e alterar pratos e preços." },
            { question: "O site aparece quando alguém busca por restaurante?", answer: "Sim, implementamos SEO local gastronômico focado em termos como 'restaurante perto de mim', 'delivery [bairro]' e tipo de comida." },
            { question: "Consigo receber pedidos pelo site?", answer: "Sim, integramos botão de WhatsApp para pedidos diretos e também links para plataformas de delivery como iFood e Rappi." }
        ],
        ctaText: "QUERO MAIS PEDIDOS",
        metaFormulas: {
            formula1: "Site profissional para Restaurantes com cardápio digital, fotos de pratos e pedido via WhatsApp. Atraia mais clientes e aumente suas vendas. Orçamento em 24h!",
            formula2: "Seu restaurante no topo do Google. Site gastronômico com design apetitoso, SEO local e integração com delivery. Peça seu orçamento agora!",
            formula3: "Pare de depender apenas do iFood. Tenha seu próprio site de restaurante com pedidos diretos e SEO dominante. +1.400 sites entregues. Fale conosco!"
        }
    },
    {
        slug: "pet",
        name: "Pet",
        title: "Sites para Pet Shops, Veterinárias e Clínicas Veterinárias",
        heroTitle: "Seu Negócio Pet com a Presença Digital que os Tutores Confiam.",
        heroDesc: "Sites para pet shops e clínicas veterinárias que transmitem cuidado e profissionalismo. Mostre seus serviços, facilite agendamentos e destaque sua autoridade no mercado pet com um design acolhedor.",
        badge: "Marketing Pet Digital",
        keywords: ["site pet shop", "site veterinária", "marketing pet", "site clínica veterinária", "SEO pet"],
        detailedContent: `
            <p>O mercado <strong>pet no Brasil</strong> cresce acima de 15% ao ano, e os tutores cada vez mais pesquisam no Google antes de escolher onde levar seus pets. Uma <strong>pet shop ou clínica veterinária</strong> sem presença digital está perdendo clientes todos os dias.</p>
            <p>Desenvolvemos <strong>sites para o mercado pet</strong> focados em <strong>confiança e cuidado</strong>. Com galeria de animais atendidos, depoimentos de tutores, catálogo de serviços e agendamento online, seu site se torna a referência na região.</p>
            <p>Nossa metodologia foca em <strong>SEO local pet</strong>, garantindo que seu negócio apareça quando tutores buscam por 'pet shop perto de mim', 'veterinária 24 horas' ou 'clínica veterinária [bairro]'. Integramos WhatsApp para agendamentos e emergências.</p>
        `,
        benefits: [
            "Catálogo de Serviços: Páginas detalhadas para banho, tosa, consultas, vacinas e cirurgias.",
            "Agendamento Online: Botão estratégico para tutores reservarem horários pelo WhatsApp.",
            "Galeria de Animais: Mostre os pets atendidos e gere prova social.",
            "SEO Local Pet: Apareça nas buscas por serviços pet na sua região.",
            "Emergência Veterinária: Botão destaque para atendimentos de urgência 24h.",
            "Depoimentos de Tutores: Prova social que gera confiança nos serviços."
        ],
        faq: [
            { question: "O site transmite o cuidado que os tutores esperam?", answer: "Sim, criamos design acolhedor com paleta de cores e imagens que transmitem carinho e profissionalismo." },
            { question: "Consigo mostrar todos os serviços que ofereço?", answer: "Com certeza. Criamos páginas detalhadas para cada serviço com descrições, valores e fotos." },
            { question: "O tutor consegue agendar pelo site?", answer: "Sim, integramos botão de WhatsApp e formulário de agendamento para facilitar a marcação de consultas e banho-tosa." },
            { question: "O site aparece quando alguém busca por pet shop?", answer: "Sim, implementamos SEO local pet focado em termos como 'pet shop perto de mim', 'veterinária [bairro]' e serviços específicos." }
        ],
        ctaText: "QUERO MAIS CLIENTES PET",
        metaFormulas: {
            formula1: "Site profissional para Pet Shops e Veterinárias com catálogo de serviços, agendamento online e SEO local. Atraia mais tutores e seus pets. Orçamento em 24h!",
            formula2: "Sua pet shop ou clínica veterinária no topo do Google. Site pet com design acolhedor, galeria de animais e pedido via WhatsApp. Peça seu orçamento!",
            formula3: "O mercado pet está em crescimento. Tenha um site profissional que converte tutores em clientes fiéis. SEO local e agendamento integrado. Fale conosco!"
        }
    }
];
