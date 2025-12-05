import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact container fade-in">
            <div className="page-header">
                <h1>Get in Touch</h1>
                <p>We'd love to hear from you. Visit us or send us a message.</p>
            </div>

            <div className="contact-content">
                <div className="contact-info">
                    <div className="info-item">
                        <div className="icon-box">
                            <FaMapMarkerAlt />
                        </div>
                        <div className="info-text">
                            <h3>Visit Us</h3>
                            <p>123 Design Avenue, Gangnam-gu</p>
                            <p>Seoul, South Korea 06000</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="icon-box">
                            <FaPhone />
                        </div>
                        <div className="info-text">
                            <h3>Call Us</h3>
                            <p>+82 10-1234-5678</p>
                            <p>+82 02-987-6543</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="icon-box">
                            <FaEnvelope />
                        </div>
                        <div className="info-text">
                            <h3>Email Us</h3>
                            <p>hello@sonang.com</p>
                            <p>support@sonang.com</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="icon-box">
                            <FaClock />
                        </div>
                        <div className="info-text">
                            <h3>Opening Hours</h3>
                            <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                            <p>Sat: 10:00 AM - 4:00 PM</p>
                        </div>
                    </div>
                </div>

                <div className="contact-map">
                    {/* Placeholder for Map - In a real app, use Google Maps API */}
                    <div className="map-placeholder">
                        <div className="map-overlay">
                            <span>Map View</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
