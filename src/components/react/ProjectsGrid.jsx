import React, { useState } from 'react';
import { projectsData } from '../../data/projects';

export default function ProjectsGrid() {
    const [filter, setFilter] = useState('all');

    const filtered = filter === 'all' ? projectsData : projectsData.filter(p => p.category === filter);

    const categories = [
        { id: 'all', label: 'Todos' },
        { id: 'juridico', label: 'Jurídico' },
        { id: 'saude', label: 'Saúde' },
        { id: 'educacao', label: 'Educação' },
        { id: 'gastronomia', label: 'Gastronomia' },
        { id: 'institucional', label: 'Institucional' }
    ];

    return (
        <div>
            <div className="project-filters" style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 20px',
                            backgroundColor: 'var(--color-bg-surface)',
                            color: 'var(--color-text-main)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '1rem',
                            appearance: 'none',
                            cursor: 'pointer',
                            outline: 'none',
                            boxShadow: 'var(--shadow-sm)'
                        }}
                    >
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                    {/* Custom Arrow Icon */}
                    <div style={{
                        position: 'absolute',
                        right: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                        color: 'var(--color-text-main)'
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                </div>
            </div>

            <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                {filtered.map((project, i) => (
                    <div key={i} className="project-card fade-up" style={{
                        backgroundColor: 'var(--color-bg-surface)',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-soft)',
                        border: '1px solid var(--border-color)'
                    }}>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                            <div className="project-image" style={{ height: '200px', backgroundColor: '#ddd', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                                <img src={project.image} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                />
                            </div>
                            <div className="project-info" style={{ padding: '24px' }}>
                                <span className="project-type" style={{ display: 'block', marginBottom: '8px', fontSize: '0.85em', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                                    {project.type}
                                </span>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>{project.name}</h3>
                                <span className="project-link" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '600' }}>
                                    Ver Site
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                </span>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
