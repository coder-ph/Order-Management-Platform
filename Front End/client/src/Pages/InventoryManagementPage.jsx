import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../Components/InventoryList";
import ProductHeader from "../Components/InventoryHeader";
import ProductDialog from "../Components/InventoryDialog";
import FilterPopup from "../Components/InventoryFilter";
import AdminSidebar from "../scenes/global/AdminSidebar";
// import Topbar from "../scenes/global/TopBar";
import "../assets/styles/ProductManagement.css";

const ProductManagement = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState({ category: '', priceRange: '', status: '' })
    const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', quantity: '', image: null })
    const [dialogOpen, setDialogOpen] = useState(false)
    const [filterOpen, setFilterOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetchCategories()
        fetchProducts()
    }, [])

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://order-management-platform.onrender.com/api/v1/products/categories')
            const data = await response.json()
            setCategories(data)
        } catch (err) {
            setError("Error fetching categories.")
        }
    }

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const response = await fetch('https://order-management-platform.onrender.com/api/v1/products')
            const result = await response.json()

            if (Array.isArray(result.data)) {
                setProducts(result.data);
            } else {
                console.error("Expected an array of products, but got:", result)
                setError("Received data is not an array of products.")
            }
        } catch (err) {
            setError("Error fetching products.")
        } finally {
            setLoading(false)
        }
    }

    const handleAddProduct = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const addedProduct = await fetch('https://order-management-platform.onrender.com/api/v1/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            }).then(res => res.json());
            setProducts([...products, addedProduct]);
            setDialogOpen(false);
            setNewProduct({ name: '', category: '', stock: '', image: null })
        } catch (err) {
            setError("Error adding product.")
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (productId, newStatus) => {
        try {
            await fetch(`https://order-management-platform.onrender.com/api/v1/products/${productId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            })
            setProducts(products.map(product =>
                product.id === productId ? { ...product, status: newStatus } : product
            ))
        } catch (err) {
            setError("Error updating product status.")
        }
    }

    const filteredProducts = Array.isArray(products) ? products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = !filters.category || product.category === filters.category
        const matchesStatus = filters.status === '' || product.status === filters.status
        const matchesPriceRange = !filters.priceRange || (() => {
            const [min, max] = filters.priceRange.split('-').map(Number)
            return product.price >= min && product.price <= max;
        })()
        return matchesSearch && matchesCategory && matchesStatus && matchesPriceRange
    }) : []

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

    return (
        <div className="flex min-h-screen">
            <div className="sticky h-full top-0 left-0">
                <AdminSidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
            </div>

            <div className="content" style={{ flex: "1", marginLeft: isSidebarCollapsed ? '80px' : '80px', transition: "margin 0.3s ease-in-out, width 0.3s ease-in-out", padding: "50px", paddingLeft: "0px", width: "100%", minHeight: "100vh" }}>
                <ProductHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} setFilterOpen={setFilterOpen} filterOpen={filterOpen} setDialogOpen={setDialogOpen} />

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
                    <ProductDialog newProduct={newProduct} setNewProduct={setNewProduct} handleAddProduct={handleAddProduct} setDialogOpen={setDialogOpen} categories={categories} />
                )}
            </div>
        </div>
    )
}

export default ProductManagement;
