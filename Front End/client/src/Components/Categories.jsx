import React, { useState, useEffect } from "react";
import "../assets/styles/CategorySection.css"

function CategoryCards() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");

   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("YOUR_API_ENDPOINT_HERE");
                const result = await response.json();
                setData(result);
                setFilteredData(result); 
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === "all") {
            setFilteredData(data);
        } else {
            const filtered = data.filter(item => item.category === category);
            setFilteredData(filtered);
        }
    };

    return (
        <div>
            <h2>Category Cards</h2>

            
            <div>
                <button onClick={() => handleCategoryChange("all")}>All</button>
                <button onClick={() => handleCategoryChange("electronics")}>Electronics</button>
                <button onClick={() => handleCategoryChange("fashion")}>Fashion</button>
                <button onClick={() => handleCategoryChange("books")}>Books</button>
            </div>

            
            <div>
                {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                        <div key={item.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
                            <h3>{item.name}</h3>
                            <p>Category: {item.category}</p>
                        </div>
                    ))
                ) : (
                    <p>No items found in this category.</p>
                )}
            </div>
        </div>
    );
}

export default CategoryCards;

