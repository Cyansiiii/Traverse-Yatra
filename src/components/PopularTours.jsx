import React from 'react';
import './PopularTours.css';

const tours = [
    {
        image: 'https://images.unsplash.com/photo-1544365558-3501acfa2de3?q=80&w=600&auto=format&fit=crop',
        name: 'Gangtok & Darjeeling Magic',
        location: 'Sikkim & West Bengal',
        price: '₹14,500',
        duration: '5 Days / 4 Nights'
    },
    {
        image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600&auto=format&fit=crop',
        name: 'North Sikkim Adventure',
        location: 'Lachung & Lachen',
        price: '₹18,200',
        duration: '6 Days / 5 Nights'
    },
    {
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop',
        name: 'Pelling Peaceful Retreat',
        location: 'West Sikkim',
        price: '₹12,000',
        duration: '4 Days / 3 Nights'
    }
];

const PopularTours = () => {
    return (
        <section className="tours-section" id="tours">
            <div className="tours-container">

                <div className="tours-header">
                    <h2 className="font-display">Popular Packages</h2>
                    <p>Handpicked itineraries for your perfect Himalayan escape.</p>
                </div>

                <div className="tours-grid">
                    {tours.map((tour, idx) => (
                        <div className="tour-card hover-scale" key={idx}>
                            <div className="tour-img-wrapper">
                                <img src={tour.image} alt={tour.name} />
                                <span className="tour-duration">{tour.duration}</span>
                            </div>
                            <div className="tour-info">
                                <div className="tour-loc">📍 {tour.location}</div>
                                <h3>{tour.name}</h3>
                                <div className="tour-footer">
                                    <div className="tour-price">
                                        <span className="price-val">{tour.price}</span>
                                        <span className="price-unit">/ person</span>
                                    </div>
                                    <button className="book-btn">Book Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default PopularTours;
