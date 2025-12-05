import React from 'react';
import { FaInstagram, FaFacebookF, FaPinterestP } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-section">
                    <h3>SONANG</h3>
                    <p>Creating spaces that tell your story.</p>
                </div>
                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>123 Design Avenue, Seoul, KR</p>
                    <p>+82 10-1234-5678</p>
                    <p>hello@sonang.com</p>
                </div>
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="#" className="social-icon"><FaInstagram /></a>
                        <a href="#" className="social-icon"><FaFacebookF /></a>
                        <a href="#" className="social-icon"><FaPinterestP /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Sonang Interior. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
