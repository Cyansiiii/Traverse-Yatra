import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-col brand-col">
                    <a href="/" className="logo">
                        <span className="logo-icon">✈</span>
                        <span className="logo-text">Traverse Yatra</span>
                    </a>
                    <p className="footer-desc">
                        Your Gateway to the Eastern Himalayas. We make travel simple, joyful, and authentic.
                    </p>
                    <div className="social-links">
                        <a href="#">Fb</a>
                        <a href="#">Ig</a>
                        <a href="#">Tw</a>
                        <a href="#">Yt</a>
                    </div>
                </div>

                <div className="footer-col">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#destinations">Destinations</a></li>
                        <li><a href="#tours">Popular Tours</a></li>
                        <li><a href="#about">About Us</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h3>Support</h3>
                    <ul>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h3>Contact Info</h3>
                    <ul className="contact-info">
                        <li>📍 Gangtok, Sikkim, India</li>
                        <li>📞 +91 98765 43210</li>
                        <li>✉️ hello@traverseyatra.com</li>
                    </ul>
                </div>

            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Traverse Yatra. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
