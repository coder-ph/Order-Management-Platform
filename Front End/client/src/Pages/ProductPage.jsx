import React, { useEffect, useState } from "react";
import { mockCategories, mockProducts } from "../assets/UserMockData";
import Navbar from "../Components/ProductNavbar";
import UserCategorySection from "../Components/UCategorySection";
import ProductGrid from "../Components/ProductGrid";
import CartModal from "../Components/CartModal";
import '../assets/styles/ProductPage.css';

function ProductPage() {
    const [products, setProducts] = useState(mockProducts);
    const [categories] = useState(mockCategories);
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCart, setShowCart] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });
    
    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            setCart(cart.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item));
        } else {
            setCart([...cart, {...product, quantity: 1}]);
        }
    };
    
    const handleCategorySelect = (categoryName) => {
        setSelectedCategory(categoryName === selectedCategory ? null : categoryName);
    };
    
    const handleSearch = (term) => {
        setSearchTerm(term);
    };
    
    const toggleCart = () => {
        setShowCart(!showCart);
    };
    
    useEffect(() => {
        // This would be replaced with actual API call in production
        // const fetchProducts = async () => {
        //     try {
        //         const res = await fetch('/api/products');
        //         const data = await res.json();
        //         setProducts(data);
        //     } catch (error) {
        //         console.error('Error fetching products:', error);
        //     }
        // };
        // fetchProducts();
    }, []);
    
    return (
        <div className="product-page">
            <Navbar
                cartItemCount={cartItemCount}
                onSearch={handleSearch}
                onCartClick={toggleCart}
            />
            <div className="main-content">
                <UserCategorySection
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
    );
}

export default ProductPage;