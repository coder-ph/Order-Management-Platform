import React from 'react';
import '../assets/styles/UCategorySection.css';

const UserCategorySection = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="category-section horizontal">
      <div className="category-header">
        <h3 className="category-title">Categories</h3>
      </div>
      <div className="category-items">
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