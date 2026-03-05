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
    }
];

const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'saude', label: 'Saúde & Psicologia' },
    { id: 'juridico', label: 'Jurídico' },
    { id: 'institucional', label: 'Institucional/Empresas' },
    { id: 'gastronomia', label: 'Gastronomia' }
];

export default function PortfolioGrid() {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <div className="portfolio-content">
            {/* Filters */}
            <div className="filter-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '60px' }}>
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                        style={{
                            padding: '10px 24px',
                            borderRadius: '50px',
                            border: '2px solid',
                            borderColor: activeCategory === cat.id ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.1)',
                            backgroundColor: activeCategory === cat.id ? 'var(--color-primary)' : 'transparent',
                            color: activeCategory === cat.id ? 'white' : 'var(--color-text-secondary)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontSize: '0.9rem'
                        }}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="portfolio-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '40px'
            }}>
                {filteredProjects.map((project) => (
                    <div
                        key={project.name}
                        className="project-card"
                        style={{
                            backgroundColor: 'var(--color-bg-card)',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            transition: 'all 0.4s ease',
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

                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
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
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
