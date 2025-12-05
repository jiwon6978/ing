import React from 'react';
import './Portfolio.css';

const projects = [
    {
        id: 1,
        title: 'Modern Minimalist Apartment',
        category: 'Residential',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 2,
        title: 'Luxury Boutique Hotel',
        category: 'Commercial',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 3,
        title: 'Urban Loft Renovation',
        category: 'Renovation',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 4,
        title: 'Cozy Family Home',
        category: 'Residential',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 5,
        title: 'Corporate Office Space',
        category: 'Commercial',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 6,
        title: 'Scandinavian Kitchen',
        category: 'Residential',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop'
    }
];

const Portfolio = () => {
    return (
        <div className="portfolio container fade-in">
            <div className="page-header">
                <h1>Our Portfolio</h1>
                <p>A curated selection of our finest work.</p>
            </div>

            <div className="portfolio-grid">
                {projects.map((project) => (
                    <div key={project.id} className="project-card">
                        <div className="project-image">
                            <img src={project.image} alt={project.title} />
                            <div className="project-overlay">
                                <h3>{project.title}</h3>
                                <span>{project.category}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Portfolio;
