import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={`navbar ${isOpen ? 'menu-open' : ''}`}>
            <div className="nav-container">
                <a href="/" className="logo">
                    <span className="logo-icon">✈</span>
                    <span className="logo-text">Traverse Yatra</span>
                </a>

                <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <a href="#home">Home</a>
                    <a href="#destinations">Destinations</a>
                    <a href="#tours">Tours</a>
                    <a href="#about">About</a>
                    <a href="#blog">Blog</a>
                    <button className="btn-primary mobile-cta">Contact Us &rarr;</button>
                </div>

                <button className="btn-primary desktop-cta">Contact Us &rarr;</button>

                <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
