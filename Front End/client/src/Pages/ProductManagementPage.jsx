import React, { useState, useEffect } from "react";
import { MainButton } from "../assets"

const ProductManagement = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState({ name: '', category: '', price: '', stock: '', image: null })
    const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '', image: null })
    // state for dialogs and popups
    const [dialogOpen, setDialogOpen] = useState(false)
    const [filterOpen, setFilterOpen] = useState(false)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            setLoading(true)
            //add api
            const res = await fetch('api/products')
            if (!res.ok) throw new Error('Failed to get products')
            const data = await res.json()
            setProducts(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            Object.entries(newProduct).forEach(([key, value]) => {
                formData.append(key, value)
            })

            const res = await fetch('api/products', { method: 'POST', body: formData })//add api

            if (!res.ok) throw new Error('Failed to add product')

            const addedProd = await res.json()
            setProducts([...products, addedProd])
            setDialogOpen(false)
            setNewProduct({ name: '', category: '', price: '', stock: '', image: null })
        } catch (err) {
            setError(err.message)
        }
    }

    const handleStatusChange = async (productId, newStatus) => {
        try {
            const res = await fetch(`/api/products/${productId}`, { //add api
                method: 'PATCH',
                headers: {
                    'Content-type': 'app/json',
                },
                body: JSON.stringify({ status: newStatus })
            })

            if (!res.ok) throw new Error('Failed to update status')

            setProducts(products.map(product =>
                product.id === productId ? { ...product, status: newStatus } : product
            ))
        } catch (err) {
            setError(err.message)
        }
    }

    //filtering
    const filteredProds = products.filter(product => {
        const matches = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !filters.category || product.category === filters.category;
        const matchesStatus = !filters.status || product.status === (filters.status === 'Active')
        const matchesPriceRange = !filters.priceRange || (() => {
            const [min, max] = filters.priceRange.split('-').map(Number)
            return product.price >= min && product.price <= max
        })()
        return matches && matchesCategory && matchesStatus && matchesPriceRange
    })

    //getting unique categories
    const categories = [...new Set(products.map(p => p.category))]

    return ( //add sidebar
        //main
        <div className="main-content">
            <div className="header">
                <div className="page-path">
                    <span>Home</span>
                    <span>/</span>
                    <span>Products</span>
                    <span>/</span>
                    <span>Product List</span>
                </div>
                <h1>Products</h1>
                <div className="notifications">
                    <MainButton onClick={() => {}} style={{ position: 'relative' }}>
                        <span className="notification-icon">🔔</span>
                        <span className="notification-badge"></span>
                    </MainButton>
                </div>
            </div>
            <div className="card">
                <div className="card-content">
                    <div className="toolbar">
                        <div className="search-filter">
                            <div className="search-container">
                                <span className="search-icon">🔍</span>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                            </div>

                            <div className="filter-container">
                                <MainButton
                                    onClick={() => setFilterOpen(!filterOpen)}
                                >
                                    Filter
                                </MainButton>
                                {filterOpen && (
                                    <div className="filter-pop">
                                        <div className="filter-content">
                                            <div className="filter-grp">
                                                <label>Category</label>
                                                <select
                                                    value={filters.category}
                                                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                                >
                                                    <option value=''>All Categories</option>
                                                    {categories.map((category) => (
                                                        <option key={category} value={category}>
                                                            {category}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="filter-grp">
                                                <label>Price Range</label>
                                                <select
                                                    value={filters.priceRange}
                                                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                                                >
                                                    <option value=''>All prices</option>
                                                    <option value='0-10'>$0 - $10</option>
                                                    <option value='10-20'>$10 - $20</option>
                                                    <option value='20-30'>$20 - $30</option>
                                                    <option value='30-40'>$30 - $40</option>
                                                    <option value='40-50'>$40 - $50</option>
                                                </select>
                                            </div>
                                            <div className="filter-grp">
                                                <label>Status</label>
                                                <select
                                                    value={filters.status}
                                                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                                >
                                                    <option value=''>All status</option>
                                                    <option value='active'>Active</option>
                                                    <option value='inactive'>Inactive</option>
                                                </select>
                                            </div>
                                            <MainButton
                                                onClick={() => setFilters({ category: '', priceRange: '', status: '' })}
                                            >
                                                Clear Filters
                                            </MainButton>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <MainButton
                            onClick={() => setDialogOpen(true)}
                        >
                            Add Product
                        </MainButton>
                    </div>

                    {loading ? (
                        <div className="loading">Loading...</div>
                    ) : error ? (
                        <div className="error">{error}</div>
                    ) : (
                        <table className="Products-table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProds.map((product) => (
                                    <tr key={product.id}>
                                        <td>
                                            <div className="product-info">
                                                <img
                                                    src={product.image || 'api/placeholder/48/48'}
                                                    alt={product.name}
                                                />
                                                <div>
                                                    <div className="product-name">{product.name}</div>
                                                    <div className="product-category">{product.category}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>${product.price.toFixed(2)}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <label className="switch">
                                                <input
                                                    type="checkbox"
                                                    checked={product.status}
                                                    onChange={(e) => handleStatusChange(product.id, e.target.checked)}
                                                />
                                                <span className="slider"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <MainButton onClick={() => {}}>⋮</MainButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {dialogOpen && (
                <div className="dg-overlay">
                    <div className="dialog">
                        <div className="dg-header">
                            <h2>Add Product</h2>
                            <MainButton
                                onClick={() => setDialogOpen(false)}
                            >
                                ×
                            </MainButton>
                        </div>
                        <form onSubmit={handleAddProduct} className="dg-content">
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    value={newProduct.category}
                                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                    required
                                >
                                    <option value=''>Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input
                                    type="number"
                                    min='0'
                                    step='0.01'
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Stock</label>
                                <input
                                    type="number"
                                    min='0'
                                    value={newProduct.stock}
                                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
                                    required
                                />
                            </div>
                            <div className="dg-actions">
                                <MainButton
                                    onClick={() => setDialogOpen(false)}
                                >
                                    Cancel
                                </MainButton>
                                <MainButton type='submit'>
                                    Add Product
                                </MainButton>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductManagement