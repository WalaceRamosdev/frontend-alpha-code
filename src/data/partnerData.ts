
export const partnerTiers = [
    {
        id: 'bronze',
        name: 'Bronze',
        badge: '🥉',
        req: '02 indicações/mês',
        reqN: 2,
        benefits: ['Site Profissional Grátis', 'Suporte Técnico Standard'],
        color: '#cd7f32'
    },
    {
        id: 'silver',
        name: 'Silver',
        badge: '🥈',
        req: '04 indicações/mês',
        reqN: 4,
        benefits: ['Lógica Bronze', '10% de Cashback em Leads Fechados', 'Upgrade de Funcionalidade'],
        color: '#c0c0c0'
    },
    {
        id: 'gold',
        name: 'Gold',
        badge: '🥇',
        req: '08+ indicações/mês',
        reqN: 8,
        benefits: ['Lógica Silver', '20% de Cashback', 'Selo Embaixador Alpha', 'Consultoria VIP'],
        color: '#ffd700'
    }
];

export const marketingResources = [
    {
        title: 'CRM para Parceiros (Template Notion)',
        type: 'Ferramenta',
        icon: 'fas fa-columns',
        externalUrl: 'https://www.notion.so/',
        description: 'Template completo para você organizar seus leads, gerenciar o funil de indicações e projetar seus ganhos mensais de forma inteligente.'
    },
    {
        title: 'Scripts de Alta Conversão',
        type: 'Texto',
        icon: 'fab fa-whatsapp',
        copyText: '📋 *COPIE O SCRIPT QUE MAIS COMBINA COM SEU CLIENTE:*\n\n🔥 *OPÇÃO 1: Foco em Escassez (Direto ao Ponto)*\n"Fala, [Nome/Empresa]! Acompanho o trabalho de vocês e percebi que estão deixando muito dinheiro na mesa com vendas apenas pelo WhatsApp/Instagram, sem uma conversão automatizada.\n\nSou parceiro da *Alpha Code*, uma agência de tecnologia de elite. Eles abriram 3 vagas exclusivas para construir a infraestrutura digital (Sites/Páginas de Vendas) sem cobrar o alto custo inicial de setup.\n\nQuer que eu indique a sua empresa para uma dessas vagas? Me avisa que te passo o contato deles!"\n\n🤝 *OPÇÃO 2: Conexão Amigável (Para conhecidos)*\n"Tudo bem, [Nome]? Lembrei muito de você hoje.\n\nAcabei de fechar negócio com uma agência de tecnologia fortíssima chamada Alpha Code. O trabalho dos caras é surreal em aumento de vendas pela internet.\n\nEles estão expandindo e tem um programa fechado de criação de sites premium com custo zero de setup (você só paga a manutenção do servidor). Achei que faria total sentido pro seu momento atual. Topa bater um papo rápido pra eu te apresentar o modelo?"\n\n🏢 *OPÇÃO 3: Posicionamento B2B (Empresas Maiores)*\n"Olá, [Nome do Gestor]. Excelente o posicionamento da sua marca no mercado físico.\n\nSou um dos parceiros atuantes da *Alpha Code*. Nós projetamos máquinas de conversão digital e notei algumas brechas tecnológicas que os seus concorrentes estão explorando no Google neste momento.\n\nTemos um plano parceiro exclusivo que zera qualquer taxa de desenvolvimento inicial. Gostaria de entender se faz sentido para sua diretoria alavancar o braço digital nos próximos 15 dias. Como está sua agenda para amanhã?"',
        description: 'Três modelos psicológicos (Escassez, Conexão e B2B corporativo) altamente persuasivos. Basta copiar e colar.'
    },
    {
        title: 'Apresentação Premium (PDF)',
        type: 'PDF',
        icon: 'fas fa-file-pdf',
        downloadUrl: '/assets/marketing/presentation/Apresentacao-Alpha-Code-Premium.pdf',
        description: 'Portfolio completo com tecnologia e processos da Alpha Code.'
    },
    {
        title: 'Página do Programa (Regras)',
        type: 'Link',
        icon: 'fas fa-external-link-alt',
        externalUrl: 'https://sitesalphacode.com.br/parceiro-alpha',
        description: 'Link direto para a landing page com todas as regras do programa.'
    }
];
