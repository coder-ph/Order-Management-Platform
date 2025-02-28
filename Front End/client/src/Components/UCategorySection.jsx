import React from "react";
import '../assets/styles/UCategorySection.css'

const CategorySection = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="ctg-section">
      <div className="categories">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`ctg-card ${selectedCategory === category.name ? 'active' : ''}`}
            onClick={() => onCategorySelect(category.name)}
          >
            <div className="ctg-icon">{category.icon}</div>
            <div className="ctg-name">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;