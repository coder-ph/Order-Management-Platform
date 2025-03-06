import React, { useState, useEffect } from "react";
import ProductList from "../Components/InventoryList";
import ProductHeader from "../Components/InventoryHeader";
import ProductDialog from "../Components/InventoryDialog";
import FilterPopup from "../Components/InventoryFilter";
import AdminSidebar from "../scenes/global/AdminSidebar";
import "../assets/styles/ProductManagement.css";

const API_URL = 'https://order-management-platform.onrender.com/api/v1'

const ProductManagement = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [filters, setFilters] = useState({ category: '', priceRange: '', status: '' })
    const [newProduct, setNewProduct] = useState({product_name: '', category_id: '', price: '', quantity: '', description: '', image: null})
    const [dialogOpen, setDialogOpen] = useState(false)
    const [filterOpen, setFilterOpen] = useState(false)
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

    useEffect(() => {
        const fetchInitialData = async () => {
            await fetchCategories()
            await fetchProducts()
        }
        fetchInitialData()
    }, [])

    useEffect(() => {
        setFilters(prev => ({ ...prev, category: selectedCategory }))
    }, [selectedCategory])

    const apiRequest = async (endpoint, method = 'GET', body = null) => {
        try {
            const options = { method }
            if (body) {
                options.body = body instanceof FormData ? body : JSON.stringify(body)
                if (!(body instanceof FormData)) options.headers = { 'Content-Type': 'application/json' }
            }
            const response = await fetch(`${API_URL}${endpoint}`, options)
            const data = await response.json()
            if (!response.ok) throw new Error(data.message || `API error: ${response.status}`)
            return data;
        } catch (err) {
            setError(err.message)
            console.error(err)
            throw err
        }
    }

    const fetchCategories = async () => {
        try {
            const data = await apiRequest('/products/categories')
            if (Array.isArray(data.data)) {
                setCategories(data.data.map(category => ({ id: category.id, name: category.name })))
            }
        } catch (error) {}
    }

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const result = await apiRequest('/products')
            if (Array.isArray(result.data)) {
                setProducts(result.data.map(product => ({
                    id: product.id,
                    product_name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                    description: product.description,
                    category_name: product.category,
                    category_id: categories.find(c => c.name === product.category)?.id || "",
                    status: product.quantity > 0 ? "In Stock" : "Out of Stock",
                    store_id: product.store
                })))
            }
        } catch (error) {} finally {
            setLoading(false)
        }
    }

    const prepareProductData = (productData) => {
        const formData = new FormData()
        formData.append('name', productData.product_name)
        formData.append('category', categories.find(c => c.id === productData.category_id)?.name || "")
        formData.append('price', productData.price)
        formData.append('quantity', productData.quantity)
        formData.append('description', productData.description)
        if (productData.image && productData.image instanceof File) formData.append('image', productData.image)
        return formData;
    }

    const handleAddProduct = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const formData = prepareProductData(newProduct)
            await apiRequest('/products', 'POST', formData)
            await fetchProducts()
            resetProductForm()
        } catch (error) {} finally {
            setLoading(false)
        }
    }

    const handleEditProduct = async (productId, updatedProduct) => {
        try {
            setLoading(true);
            const formData = prepareProductData(updatedProduct);
            const result = await apiRequest(`/products/${productId}`, 'PUT', formData)
            if (result.success) {
                updateProductInState(productId, result.data)
                resetProductForm()
            }
        } catch (error) {} finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (productId, newStatus) => {
        try {
            const product = products.find(p => p.id === productId)
            if (!product) return
            const newQuantity = newStatus === "Out of Stock" ? 0 : (product.quantity === 0 ? 1 : product.quantity)
            const body = { name: product.product_name, category: product.category_name, price: product.price, quantity: newQuantity, description: product.description }
            const result = await apiRequest(`/products/${productId}`, 'PUT', body)
            if (result.success) {
                setProducts(products.map(p => p.id === productId ? { ...p, quantity: newQuantity, status: newStatus } : p))
            }
        } catch (error) {}
    }

    const handleDeleteProduct = async (productId) => {
        try {
            const result = await apiRequest(`/products/${productId}`, 'DELETE')
            if (result.success) {
                setProducts(products.filter(product => product.id !== productId))
            }
        } catch (error) {}
    }

    const resetProductForm = () => {
        setDialogOpen(false);
        setNewProduct({ product_name: '', category_id: '', price: '', quantity: '', description: '', image: null });
    }

    const updateProductInState = (productId, productData) => {
        setProducts(products.map(p => p.id === productId ? {
            ...p,
            product_name: productData.name,
            price: productData.price,
            quantity: productData.quantity,
            description: productData.description,
            category_name: productData.category,
            category_id: categories.find(c => c.name === productData.category)?.id || "",
            status: productData.quantity > 0 ? "In Stock" : "Out of Stock",
            store_id: productData.store
        } : p))
    }

    const handleEditButtonClick = (product) => {
        setNewProduct({ product_name: product.product_name, category_id: product.category_id, price: product.price, quantity: product.quantity, description: product.description, image: product.image})
        setDialogOpen(true)
    }

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = !filters.category || product.category_name === filters.category
        const matchesStatus = !filters.status || product.status === filters.status
        let matchesPriceRange = true
        if (filters.priceRange) {
            const [min, max] = filters.priceRange.split('-').map(Number)
            matchesPriceRange = product.price >= min && product.price <= max
        }
        return matchesSearch && matchesCategory && matchesStatus && matchesPriceRange
    })

    const contentStyle = {
        flex: "1",
        marginLeft: '80px',
        transition: "margin 0.3s ease-in-out, width 0.3s ease-in-out",
        padding: "50px",
        paddingLeft: "0px",
        width: "100%",
        minHeight: "100vh"
    }

    return (
        <div className="flex min-h-screen">
            <AdminSidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
            <div className="content" style={contentStyle}>
                <ProductHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} setFilterOpen={setFilterOpen} filterOpen={filterOpen} setDialogOpen={setDialogOpen} setSelectedCategory={setSelectedCategory} />
                {filterOpen && (
                    <FilterPopup filters={filters} setFilters={setFilters} categories={categories.map(cat => cat.name)} />
                )}
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : (
                    <ProductList products={filteredProducts} handleStatusChange={handleStatusChange} onEdit={handleEditButtonClick} onDelete={handleDeleteProduct} />
                )}
                {dialogOpen && (
                    <ProductDialog newProduct={newProduct} setNewProduct={setNewProduct} handleAddProduct={handleAddProduct} handleEditProduct={handleEditProduct} setDialogOpen={setDialogOpen} categories={categories} isEditing={newProduct.product_name !== ''} />
                )}
            </div>
        </div>
    )
}

export default ProductManagement;