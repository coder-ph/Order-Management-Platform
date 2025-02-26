import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../Components/ProductList";
import ProductHeader from "../Components/ProductHeader";
import ProductDialog from "../Components/ProductDialog";
import FilterPopup from "../Components/ProductFilter";
import { fetchProductsApi, addProductApi, updateProductStatusApi } from "../Components/ProductApi";
import "../assets/styles/ProductManagement.css";
import Sidebar from "../Components/UserSidebar"; 

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({ category: '', priceRange: '', status: '' })
    const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '', image: null })
    const [dialogOpen, setDialogOpen] = useState(false)
    const [filterOpen, setFilterOpen] = useState(false)
    const [activePage, setActivePage] = useState("dashboard")

    const userData = {
        username: "HIM",
        email: "him@example.com",
        profilePicture: "pic"
    }

    const handleLogout = () => {
        // Implement your logout logic here (e.g., clear session, cookies, etc.)
        console.log("Logging out...");

        // Clear session or token if you're using localStorage or sessionStorage
        localStorage.removeItem("userToken");
        navigate("/login")
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await fetchProductsApi();
            setProducts(data);
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const addedProduct = await addProductApi(newProduct);
            setProducts([...products, addedProduct]);
            setDialogOpen(false);
            setNewProduct({ name: '', category: '', price: '', stock: '', image: null })
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (productId, newStatus) => {
        try {
            await updateProductStatusApi(productId, newStatus)
            setProducts(products.map(product =>
                product.id === productId ? { ...product, status: newStatus } : product
            ))
        } catch (err) {
            setError(err.message)
        }
    }

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = !filters.category || product.category === filters.category
        const matchesStatus = filters.status === '' || product.status === filters.status
        const matchesPriceRange = !filters.priceRange || (() => {
            const [min, max] = filters.priceRange.split('-').map(Number)
            return product.price >= min && product.price <= max
        })();
        return matchesSearch && matchesCategory && matchesStatus && matchesPriceRange
    })

    const categories = [...new Set(products.map(p => p.category))];

    return (
        <div className="flex">
            {/* Sidebar Component with handleLogout passed as prop */}
            <Sidebar
                activePage={activePage}
                userData={userData}
                onLogout={handleLogout}
            />

            <div className="main-content flex-1 p-6">
                <ProductHeader
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    setFilterOpen={setFilterOpen}
                    filterOpen={filterOpen}
                    setDialogOpen={setDialogOpen}
                />

                {filterOpen && (
                    <FilterPopup
                        filters={filters}
                        setFilters={setFilters}
                        categories={categories}
                    />
                )}

                {loading ? (
                    <div className="loading">Loading...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : (
                    <ProductList
                        products={filteredProducts}
                        handleStatusChange={handleStatusChange}
                    />
                )}

                {dialogOpen && (
                    <ProductDialog
                        newProduct={newProduct}
                        setNewProduct={setNewProduct}
                        handleAddProduct={handleAddProduct}
                        setDialogOpen={setDialogOpen}
                        categories={categories}
                    />
                )}
            </div>
        </div>
    )
}

export default ProductManagement;
