import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <div className="hero-content fade-in">
                    <h1>Timeless Elegance <br /> Modern Living</h1>
                    <p>We design spaces that inspire and endure.</p>
                    <Link to="/portfolio" className="btn btn-primary">View Portfolio</Link>
                </div>
            </section>

            <section className="intro container">
                <div className="intro-text">
                    <h2>About Sonang</h2>
                    <p>
                        At Sonang, we believe that interior design is more than just aesthetics;
                        it's about creating an atmosphere that resonates with your soul.
                        Our team of dedicated professionals brings years of experience and a passion
                        for detail to every project, ensuring your space is not only beautiful but
                        functionally perfect.
                    </p>
                </div>
                <div className="intro-image">
                    {/* Placeholder for an image - using a colored block or generic placeholder if no image available */}
                    <div className="image-placeholder"></div>
                </div>
            </section>

            <section className="services">
                <div className="container">
                    <h2>Our Services</h2>
                    <div className="service-grid">
                        <div className="service-card">
                            <h3>Residential Design</h3>
                            <p>Transforming houses into homes with personalized design solutions.</p>
                        </div>
                        <div className="service-card">
                            <h3>Commercial Spaces</h3>
                            <p>Creating productive and inspiring environments for businesses.</p>
                        </div>
                        <div className="service-card">
                            <h3>Renovation</h3>
                            <p>Breathing new life into existing structures with modern updates.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
