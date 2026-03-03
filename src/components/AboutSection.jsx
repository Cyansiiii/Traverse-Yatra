import React from 'react';
import './AboutSection.css';

const AboutSection = () => {
    return (
        <section className="about-section" id="about">
            <div className="about-container">

                <div className="about-content">
                    <h2 className="font-display">Plan Your Trip<br />With Us</h2>
                    <p className="about-desc">
                        We provide the best experiences for you, from booking flights to planning your perfect Himalayan itinerary. Experience a journey like never before.
                    </p>

                    <ul className="about-list">
                        <li>
                            <span className="check">✓</span>
                            Best Price Guarantee
                        </li>
                        <li>
                            <span className="check">✓</span>
                            Experienced Local Guides
                        </li>
                        <li>
                            <span className="check">✓</span>
                            Custom Tailored Itineraries
                        </li>
                        <li>
                            <span className="check">✓</span>
                            24/7 Customer Support
                        </li>
                    </ul>

                    <a href="#tours" className="btn-primary mt-4">Learn More &rarr;</a>
                </div>

                <div className="about-images">
                    <div className="img-stack-1">
                        <img src="https://images.unsplash.com/photo-1544365558-3501acfa2de3?q=80&w=400&auto=format&fit=crop" alt="Mountain Scene" />
                    </div>
                    <div className="img-stack-2">
                        <img src="https://images.unsplash.com/photo-1522881110825-95123dadddf3?q=80&w=400&auto=format&fit=crop" alt="Trekking" />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutSection;
