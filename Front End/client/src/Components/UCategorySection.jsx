import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../assets/styles/UCategorySection.css';

const UserCategorySection = ({ categories, selectedCategory, onCategorySelect }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200; // Adjust scroll amount as needed
      const currentScroll = scrollContainerRef.current.scrollLeft;
      
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="category-section horizontal">
      <div className="category-header">
        <h3 className="category-title">Categories</h3>
        <div className="category-nav-buttons">
          <button 
            className="category-nav-button" 
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            className="category-nav-button" 
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="category-items" ref={scrollContainerRef}>
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-item ${selectedCategory === category.name ? 'selected' : ''}`}
            onClick={() => onCategorySelect(category.name)}
          >
            <img src={category.icon} alt={category.name} className="category-icon" />
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCategorySection;