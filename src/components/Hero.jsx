import React, { useRef, useEffect, useState } from 'react';
import heroBg from '../assets/hero-bg.jpg';
import trekkerImg from '../assets/trekker.png';
import { NumberTicker } from './magicui/number-ticker';
import './Hero.css';

const Hero = () => {
    const textRef = useRef(null);
    const searchRef = useRef(null);
    const sectionRef = useRef(null);
    const [linePath, setLinePath] = useState('');
    const [svgBox, setSvgBox] = useState({ left: 0, top: 0, width: 0, height: 0 });

    useEffect(() => {
        const drawLine = () => {
            if (!textRef.current || !searchRef.current || !sectionRef.current) return;

            const section = sectionRef.current.getBoundingClientRect();
            const text = textRef.current.getBoundingClientRect();
            const search = searchRef.current.getBoundingClientRect();

            // All coordinates relative to the section container
            const startX = text.right - section.left;          // dot: right edge of text
            const startY = text.top + text.height / 2 - section.top; // dot: vertical midpoint of text

            const endX = search.left - section.left;         // line end: left edge of search bar
            const endY = search.top - section.top;           // line end: top edge of search bar

            // Midpoint for the corner turn
            const midX = startX + (endX - startX) * 0.5;

            // SVG bounding box with padding
            const pad = 10;
            const boxLeft = Math.min(startX, endX) - pad;
            const boxTop = Math.min(startY, endY) - pad;
            const boxWidth = Math.abs(endX - startX) + pad * 2;
            const boxHeight = Math.abs(endY - startY) + pad * 2;

            // Path in local SVG coords
            const lx = startX - boxLeft;
            const ly = startY - boxTop;
            const rx = endX - boxLeft;
            const ry = endY - boxTop;

            // L-shape: go right to midX, then down to endY, then right to endX
            setLinePath(`M ${lx} ${ly} H ${midX - boxLeft} V ${ry} H ${rx}`);
            setSvgBox({ left: boxLeft, top: boxTop, width: boxWidth, height: boxHeight });
        };

        drawLine();
        window.addEventListener('resize', drawLine);
        return () => window.removeEventListener('resize', drawLine);
    }, []);

    return (
        <section className="hero">
            <div className="hero-background">
                <img
                    src={heroBg}
                    alt="Himalayan Mountains"
                    className="hero-image"
                />
                <div className="hero-overlay"></div>
            </div>

            <div className="hero-content">
                <h2 className="font-display text-huge animate-fade-in-up">
                    Explore the<br />Himalayas
                </h2>

                {/* Text + Search container */}
                <div className="hero-bottom" ref={sectionRef}>

                    {/* Description text */}
                    <div className="stats-container animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <p className="hero-subtext" ref={textRef}>

                            Discover unique places beyond the tourist path, with carefully
                            planned trips that balance adventure, comfort, and authenticity.
                        </p>
                    </div>

                    {/* Dynamic SVG connector line */}
                    {linePath && (
                        <svg
                            className="animate-fade-in-up"
                            style={{
                                position: 'absolute',
                                left: svgBox.left,
                                top: svgBox.top,
                                width: svgBox.width,
                                height: svgBox.height,
                                pointerEvents: 'none',
                                zIndex: 10,
                                overflow: 'visible',
                                animationDelay: '0.2s'
                            }}
                        >
                            {/* Dot at start */}
                            <circle
                                cx={parseFloat(linePath.split(' ')[1])}
                                cy={parseFloat(linePath.split(' ')[2])}
                                r="3.5"
                                fill="white"
                                fillOpacity="0.75"
                            />
                            {/* L-shaped path */}
                            <path
                                d={linePath}
                                stroke="white"
                                strokeWidth="1.2"
                                strokeOpacity="0.65"
                                fill="none"
                            />
                        </svg>
                    )}

                    {/* Search Bar */}
                    <div className="search-bar-wrapper" ref={searchRef}>
                        <div className="search-bar glass animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="search-field">
                                <span className="search-label">Location</span>
                                <div className="search-input">
                                    <span className="icon">📍</span>
                                    <input type="text" placeholder="Sikkim, India" />
                                </div>
                            </div>

                            <div className="search-field">
                                <span className="search-label">Date</span>
                                <div className="search-input">
                                    <span className="icon">📅</span>
                                    <input type="text" placeholder="Select Date" />
                                </div>
                            </div>

                            <div className="search-field">
                                <span className="search-label">Guests</span>
                                <div className="search-input">
                                    <span className="icon">👥</span>
                                    <select>
                                        <option>2 People</option>
                                        <option>3 People</option>
                                        <option>4+ People</option>
                                    </select>
                                </div>
                            </div>

                            <button className="search-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <div className="stats-container animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div className="stats-card">
                    <div className="stats-info">
                        <h3>Making Travel<br />Simple & Joyful</h3>
                        <a href="#about" className="learn-more">Learn More &rarr;</a>
                    </div>
                    <div className="stats-image">
                        <img src={trekkerImg} alt="Trekker" />
                    </div>
                </div>

                <div className="stats-grid">
                    <div className="stat-item">
                        <h2 className="font-display">
                            <NumberTicker value={34} />k
                        </h2>
                        <p>Total Customers</p>
                    </div>
                    <div className="stat-item">
                        <h2 className="font-display">
                            <NumberTicker value={12} />+
                        </h2>
                        <p>Years Of Experience</p>
                    </div>
                    <div className="stat-item">
                        <h2 className="font-display">
                            <NumberTicker value={15} />k
                        </h2>
                        <p>Total Destinations</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
