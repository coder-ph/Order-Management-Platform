import React, { useState, useEffect } from "react";
import "../assets/styles/CategorySection.css";

const CategorySection = ({ setSelectedCategory }) => {
    const [selectedCategory, setLocalSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        fetchCategories()
    }, [])
    
    const fetchCategories = async () => {
        try {
            const response = await fetch('https://order-management-platform.onrender.com/api/v1/products/categories');
            const result = await response.json();
            
            if (result && Array.isArray(result.data)) {
                setCategories(result.data);
            } else {
                console.error("Expected an array of categories, but got:", result)
            }
        } catch (err) {
            console.error("Error fetching categories", err)
        }
    }
    
    const handleCategoryClick = (categoryName) => {
        setLocalSelectedCategory(prevCategory => prevCategory === categoryName ? null : categoryName)
        setSelectedCategory(prevCategory => prevCategory === categoryName ? '' : categoryName)
    }
    
    const addNewCategory = async (categoryName) => {
        try {
            const response = await fetch('https://order-management-platform.onrender.com/api/v1/products/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: categoryName })
            })
            
            const result = await response.json()
            
            if (result.success) {
                fetchCategories()
            } else {
                console.error("Error adding category:", result.message)
            }
        } catch (err) {
            console.error("Error adding category", err)
        }
    }
    
    return (
        <div className="ctg-section">
            <div className="categories">
                {categories.map((category) => (
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
        </div>
    )
}

export default CategorySection;