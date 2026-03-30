import React, { useState } from 'react';

const projects = [
    {
        name: 'Dra. Alzimara Nunes',
        niche: 'Psicologia',
        category: 'saude',
        result: 'Agenda lotada em 45 dias',
        image: '/assets/imagens-de-paginas/alzimara.svg',
        link: 'https://www.alzimaranunes.com.br'
    },
    {
        name: 'Dra. Aline Barbosa',
        niche: 'Advocacia',
        category: 'juridico',
        result: 'Autoridade digital estabelecida',
        image: '/assets/imagens-de-paginas/alineBarbosa.svg',
        link: 'https://advogada-aline-barbosa.vercel.app/'
    },
    {
        name: 'Camila Ferraz',
        niche: 'Personal Trainer',
        category: 'saude',
        result: '+30% conversão de leads',
        image: '/assets/imagens-de-paginas/camilaFerrazPersonal.svg',
        link: 'https://camilaferrazpersonal.vercel.app/'
    },
    {
        name: 'Nexus Contabilidade',
        niche: 'Contabilidade',
        category: 'institucional',
        result: 'Posicionamento B2B Premium',
        image: '/assets/imagens-de-paginas/nexusContabilidade.svg',
        link: 'https://nexuscontabilidades.vercel.app/'
    },
    {
        name: 'Elegance Advocacia',
        niche: 'Advocacia',
        category: 'juridico',
        result: 'Site jurídico de alta performance',
        image: '/assets/imagens-de-paginas/eleganceAdvocacia.svg',
        link: 'https://eleganceadvocacia.vercel.app/'
    },
    {
        name: 'Studio de Fotografia',
        niche: 'Fotografia',
        category: 'institucional',
        result: 'Portfólio visual imersivo',
        image: '/assets/imagens-de-paginas/fotografia.svg',
        link: 'https://projeto-fotografo-two.vercel.app/'
    },
    {
        name: 'Drª. Silvia Orlandi',
        niche: 'Terapias',
        category: 'saude',
        result: 'Acolhimento digital humanizado',
        image: '/assets/imagens-de-paginas/silviaOrlandi.svg',
        link: 'https://silvia-terapeuta.vercel.app/'
    },
    {
        name: 'Ana Ribeiro',
        niche: 'Nutricionista',
        category: 'saude',
        result: 'Marketing nutricional de elite',
        image: '/assets/imagens-de-paginas/anaRibeiroNutri.svg',
        link: 'https://nutricao-pied.vercel.app/'
    },
    {
        name: 'Ricardo Silva',
        niche: 'Psicanálise',
        category: 'saude',
        result: 'Aumento de pacientes online',
        image: '/assets/imagens-de-paginas/ricardoSilva.svg',
        link: 'https://psicanalista-online.vercel.app/'
    },
    {
        name: 'CTIM',
        niche: 'Clínica',
        category: 'saude',
        result: 'Agendamentos simplificados',
        image: '/assets/imagens-de-paginas/ctim.svg',
        link: 'https://ctim.vercel.app/'
    },
    {
        name: 'Pizzaria',
        niche: 'Gastronomia',
        category: 'gastronomia',
        result: 'Cardápio digital de alta conversão',
        image: '/assets/imagens-de-paginas/pizzaria.svg',
        link: 'https://projeto-pizzaria-ecru.vercel.app/'
    },
    {
        name: 'Cafeteria Premium',
        niche: 'Gastronomia',
        category: 'gastronomia',
        result: 'Experiência online elegante',
        image: '/assets/imagens-de-paginas/cafeteria.svg',
        link: 'https://cafeteria-premium.vercel.app/'
    },
    {
        name: 'ARQ.',
        niche: 'Arquitetura',
        category: 'institucional',
        result: 'Projetos que inspiram confiança',
        image: '/assets/imagens-de-paginas/arquiteto.svg',
        link: 'https://projeto-arquiteto.vercel.app/'
    },
    {
        name: 'Joalheria LUMIÈRE',
        niche: 'Joalheria',
        category: 'institucional',
        result: 'Design sofisticado e premium',
        image: '/assets/imagens-de-paginas/lumiere.svg',
        link: 'https://lumiere-joias.vercel.app/'
    },
    {
        name: 'João Silva',
        niche: 'Educação',
        category: 'educacao',
        result: 'Captação de alunos otimizada',
        image: '/assets/imagens-de-paginas/profJoao.svg',
        link: 'https://landing-page-professor.vercel.app/'
    }
];

const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'saude', label: 'Saúde & Psicologia' },
    { id: 'juridico', label: 'Jurídico' },
    { id: 'institucional', label: 'Institucional/Empresas' },
    { id: 'gastronomia', label: 'Gastronomia' },
    { id: 'educacao', label: 'Educação' }
];

export default function PortfolioGrid() {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <div className="portfolio-content">
            {/* Filters */}
            <div className="filter-container" style={{ display: 'flex', justifyContent: 'center', marginBottom: '60px' }}>
                <select 
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                    style={{
                        padding: '14px 40px 14px 24px',
                        borderRadius: '50px',
                        border: '2px solid var(--color-primary)',
                        backgroundColor: 'rgba(138, 28, 38, 0.05)',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        outline: 'none',
                        appearance: 'none',
                        minWidth: '280px',
                        backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 24px center',
                        backgroundSize: '12px auto',
                        boxShadow: '0 4px 12px rgba(138, 28, 38, 0.15)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(138, 28, 38, 0.15)')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgba(138, 28, 38, 0.05)')}
                >
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id} style={{ backgroundColor: '#050505', color: 'white', padding: '10px' }}>
                            {cat.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Grid */}
            <div className="portfolio-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '40px'
            }}>
                {filteredProjects.map((project) => (
                    <a
                        key={project.name}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card block no-underline"
                        style={{
                            backgroundColor: 'var(--color-bg-card)',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            transition: 'all 0.4s ease',
                            display: 'block',
                            textDecoration: 'none'
                        }}
                    >
                        <div className="project-thumbnail" style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                            <img
                                src={project.image}
                                alt={project.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                            <div style={{ position: 'absolute', bottom: '16px', left: '20px' }}>
                                <span style={{
                                    fontSize: '10px',
                                    textTransform: 'uppercase',
                                    fontWeight: '900',
                                    color: 'var(--color-primary)',
                                    backgroundColor: 'rgba(138, 28, 38, 0.15)',
                                    padding: '4px 8px',
                                    borderRadius: '4px'
                                }}>
                                    {project.niche}
                                </span>
                            </div>
                        </div>

                        <div className="project-details" style={{ padding: '30px' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'white', marginBottom: '8px' }}>
                                {project.name}
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: '#4ade80', fontWeight: '600', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ width: '8px', height: '8px', backgroundColor: '#4ade80', borderRadius: '50%' }}></span>
                                {project.result}
                            </p>

                            <div
                                style={{
                                    color: 'white',
                                    fontWeight: '800',
                                    fontSize: '0.8rem',
                                    textDecoration: 'none',
                                    letterSpacing: '1px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                VISITAR SITE <span>→</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
