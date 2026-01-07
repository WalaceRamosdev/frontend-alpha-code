import React, { useState } from 'react';
import { projectsData } from '../../data/projects';

export default function ProjectsGrid() {
    const [filter, setFilter] = useState('all');

    const [showPopup, setShowPopup] = useState(false);
    const [hasClosedPopup, setHasClosedPopup] = useState(false);

    const filtered = filter === 'all' ? projectsData : projectsData.filter(p => p.category === filter);

    const categories = [
        { id: 'all', label: 'Todos' },
        { id: 'juridico', label: 'Jurídico' },
        { id: 'saude', label: 'Saúde' },
        { id: 'educacao', label: 'Educação' },
        { id: 'gastronomia', label: 'Gastronomia' },
        { id: 'institucional', label: 'Institucional' }
    ];

    React.useEffect(() => {
        // Check session storage first
        const closed = sessionStorage.getItem('projectsPopupClosed') === 'true';
        setHasClosedPopup(closed);

        if (closed) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setShowPopup(true);
                    // Disconnect after triggering once to avoid annoyance
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });

        // Observe the 4th project (or the last one if fewer than 4)
        const targetIndex = Math.min(3, filtered.length - 1);
        const targetCard = document.querySelector(`#project-card-${targetIndex}`);

        if (targetCard) {
            observer.observe(targetCard);
        }

        return () => observer.disconnect();
    }, [filtered, hasClosedPopup]);

    const handleClosePopup = () => {
        setShowPopup(false);
        setHasClosedPopup(true);
        sessionStorage.setItem('projectsPopupClosed', 'true');
    };

    return (
        <div style={{ position: 'relative' }}>
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
                    <div key={i} id={`project-card-${i}`} className="project-card fade-up" style={{
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

            {/* CTA Popup */}
            {showPopup && !hasClosedPopup && (
                <div style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    backgroundColor: 'var(--color-bg-surface)',
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    zIndex: 1000,
                    maxWidth: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    border: '1px solid var(--color-primary)',
                    animation: 'slideIn 0.5s ease-out'
                }}>
                    <button
                        onClick={handleClosePopup}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--color-text-light)'
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <div>
                        <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: 'var(--color-text-main)' }}>Gostou do que viu?</h4>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                            Transforme sua ideia em um projeto incrível como estes.
                        </p>
                    </div>
                    <a href="/planos" style={{
                        display: 'block',
                        textAlign: 'center',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        padding: '10px 15px',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        transition: 'opacity 0.2s'
                    }} onMouseOver={e => e.currentTarget.style.opacity = '0.9'} onMouseOut={e => e.currentTarget.style.opacity = '1'}>
                        Ver Planos
                    </a>
                </div>
            )}
            <style>{`
                @keyframes slideIn {
                    from { transform: translateY(50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
