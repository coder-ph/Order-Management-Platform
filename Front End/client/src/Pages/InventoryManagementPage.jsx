import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../Components/InventoryList";
import ProductHeader from "../Components/InventoryHeader";
import ProductDialog from "../Components/InventoryDialog";
import FilterPopup from "../Components/InventoryFilter";
import { ProductServiceAPI } from "../Components/InventoryApi";
import "../assets/styles/ProductManagement.css";

// import CategorySection from "../Components/CategorySection";
import AdminSidebar from "../scenes/global/AdminSidebar";


const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({ category: '', priceRange: '', status: '' })
    const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '', image: null })
    const [dialogOpen, setDialogOpen] = useState(false)
    const [filterOpen, setFilterOpen] = useState(false)
    const navigate = useNavigate

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await ProductServiceAPI.fetchProducts();
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
            const addedProduct = await ProductServiceAPI.addProduct(newProduct);
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
            await ProductServiceAPI.updateProductStatus(productId, newStatus)
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
            <div className="admin-sidebar">
           <AdminSidebar />
           </div>

           {/* <div className="category-section">
            <CategorySection />
            </div>  */}

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
