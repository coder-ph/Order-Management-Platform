import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { mockCategories, mockProducts } from "../assets/UserMockData";
// import Navbar from "../Components/UserNavBar";
import { Category } from "@mui/icons-material";

function ProductPage() {
    const [products, setProducts] = useState(mockProducts)
    const [categories] = useState(mockCategories)
    const [cart, setCart] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [showCart, setShowCart] = useState(false)
    const [selectedCategory, SetSelectedCategory] = useState(null)

    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory? product.category === selectedCategory : true
        return matchesSearch && matchesCategory
    })

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id)
        if (existingProduct) {
            setCart(cart.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item))
        } else {
            setCart([...cart, {...product, quantity: 1}])
        }
    }

    const handleCategorySelect = (categoryName) => {
        SetSelectedCategory(categoryName === selectedCategory ? null : categoryName)
    }

    const handleSearch = (term) => {
        setSearchTerm(term)
    }

    useEffect(() => {
        // const fetchProducts = async () => {
        //     try {
        //         const res = await fetch('/api/products')
        //         const data = await res.json()
        //         setProducts(data)
        //     } catch (error) {
        //         console.error('Error fetching products:', error)
        //     }
        // }
        // fetchProducts()
    }, [])

    return (
        <div className="product-page">
            <Navbar
                cartItemCount={cartItemCount}
                onSearch={handleSearch}
                onCartClick={toggleCart}
            />
            <div className="main-content">
                <CategorySection
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategorySelect={handleCategorySelect}
                />
                <div className="prods-container">
                    <h2 className="prods-title">Products List</h2>
                    <ProductGrid
                        products={filteredProducts}
                        addToCart={addToCart}
                    />
                </div>
            </div>

            {showCart && (
                <CartModal
                    cart={cart}
                    setCart={setCart}
                    onClose={toggleCart}
                />
            )}
        </div>
    )
}

export default ProductPage