import React from 'react';
import './TourCategories.css';

const categories = [
    { name: 'Honeymoon', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=600&auto=format&fit=crop' },
    { name: 'Adventure', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop' },
    { name: 'Hill Station', image: 'https://images.unsplash.com/photo-1544365558-3501acfa2de3?q=80&w=600&auto=format&fit=crop' },
    { name: 'Wildlife', image: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?q=80&w=600&auto=format&fit=crop' },
    { name: 'Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop' },
];

const TourCategories = () => {
    return (
        <section className="categories-section">
            <div className="categories-header">
                <h2 className="font-display">Choose Your Vibe</h2>
            </div>

            <div className="categories-scroll">
                {categories.map((cat, idx) => (
                    <div className="category-card hover-scale" key={idx}>
                        <img src={cat.image} alt={cat.name} />
                        <div className="category-overlay">
                            <h3>{cat.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TourCategories;
