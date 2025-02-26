import React, { useState } from "react";
import { mockCategories, mockProducts } from "../assets/UserMockData";
import '../assets/styles/CategorySection.css'

const CategorySection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleCategoryClick = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryName)
    }
  }

  const filteredProducts = selectedCategory
    ? mockProducts.filter(product => product.category === selectedCategory)
    : []

  return (
    <div className="ctg-section">
      <div className="categories">
        {mockCategories.map((category) => (
          <div
            key={category.id}
            className={`ctg-card ${selectedCategory === category.name ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="ctg-icon">{category.icon}</div>
            <div className="ctg-name">{category.name}</div>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="products-section">
          <h2>{selectedCategory} Products</h2>
          <div className="product-list">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-price">Ksh {product.price}</div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available in this category.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CategorySection;
