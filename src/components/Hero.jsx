import React, { useRef, useEffect, useState } from 'react';
import trekkerImg from '../assets/trekker.png';
import { NumberTicker } from './magicui/number-ticker';
import './Hero.css';

const HERO_BACKGROUNDS = [
    {
        src: 'https://montaxe.com/wp-content/uploads/2024/04/Sikkim-Tourism.webp',
        alt: 'Sikkim mountain landscape'
    },
    {
        src: 'https://www.remotelands.com/travelogues/app/uploads/2019/12/Sikkim-India-1.jpg',
        alt: 'Sikkim valley and mountain view'
    },
    {
        src: 'https://northbengaltourism.com/images/offbeat/tingchim_1.webp',
        alt: 'Tingchim mountain scenery, Sikkim'
    },
    {
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Gurudongmar.Lake.jpg/3840px-Gurudongmar.Lake.jpg',
        alt: 'Gurudongmar Lake, Sikkim mountains'
    },
    {
        src: 'https://images.unsplash.com/photo-1612866001494-8273f33e5cd3?auto=format&fit=crop&w=1920&q=80',
        alt: 'Kerala mountain landscape'
    },
    {
        src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80',
        alt: 'Snow mountain peaks'
    },
    {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
        alt: 'Misty mountain valley'
    },
    {
        src: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1920&q=80',
        alt: 'Cloudy mountain range'
    },
    {
        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80',
        alt: 'Himalayan sunrise view'
    },
    {
        src: 'https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?auto=format&fit=crop&w=1920&q=80',
        alt: 'Green mountain landscape'
    },
    {
        src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1920&q=80',
        alt: 'Mountain and river scene'
    },
    {
        src: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80',
        alt: 'Mountain wilderness'
    },
    {
        src: 'https://images.unsplash.com/photo-1463694775559-eea25626346b?auto=format&fit=crop&w=1920&q=80',
        alt: 'High altitude mountain pass'
    },
    {
        src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
        alt: 'Mountain ridge under dramatic sky'
    }
];

const HERO_BG_INTERVAL_MS = 100;

const Hero = () => {
    const textRef = useRef(null);
    const searchRef = useRef(null);
    const sectionRef = useRef(null);
    const [linePath, setLinePath] = useState('');
    const [svgBox, setSvgBox] = useState({ left: 0, top: 0, width: 0, height: 0 });
    const [activeBackgroundIndex, setActiveBackgroundIndex] = useState(0);

    useEffect(() => {
        if (HERO_BACKGROUNDS.length <= 1) return undefined;

        const intervalId = window.setInterval(() => {
            setActiveBackgroundIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
        }, HERO_BG_INTERVAL_MS);

        return () => window.clearInterval(intervalId);
    }, []);

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
                {HERO_BACKGROUNDS.map((background, index) => (
                    <img
                        key={background.src}
                        src={background.src}
                        alt={background.alt}
                        className={`hero-image ${index === activeBackgroundIndex ? 'is-active' : ''}`}
                        loading={index === 0 ? 'eager' : 'lazy'}
                    />
                ))}
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
                                    <span className="icon">{'\u{1F4CD}'}</span>
                                    <input type="text" placeholder="Sikkim, India" />
                                </div>
                            </div>

                            <div className="search-field">
                                <span className="search-label">Date</span>
                                <div className="search-input">
                                    <span className="icon">{'\u{1F4C5}'}</span>
                                    <input type="text" placeholder="Select Date" />
                                </div>
                            </div>

                            <div className="search-field">
                                <span className="search-label">Guests</span>
                                <div className="search-input">
                                    <span className="icon">{'\u{1F465}'}</span>
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
