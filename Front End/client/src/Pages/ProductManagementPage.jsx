import React, { useState, useEffect } from "react";
import ProductList from "../Components/ProductList";
import ProductHeader from "../Components/ProductHeader";
import ProductDialog from "../Components/ProductDialog";
import FilterPopup from "../Components/ProductFilter";
import { fetchProductsApi, addProductApi, updateProductStatusApi } from "../Components/ProductApi";
import "../Components/Buttons/Buttons/styles/ProductManagement.css"


const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({ category: '', priceRange: '', status: '' });
    const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '', image: null })
    // dialog and popups
    const [dialogOpen, setDialogOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await fetchProductsApi();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const addedProduct = await addProductApi(newProduct);
            setProducts([...products, addedProduct]);
            setDialogOpen(false);
            setNewProduct({ name: '', category: '', price: '', stock: '', image: null });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (productId, newStatus) => {
        try {
            await updateProductStatusApi(productId, newStatus);
            setProducts(products.map(product =>
                product.id === productId ? { ...product, status: newStatus } : product
            ));
        } catch (err) {
            setError(err.message);
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !filters.category || product.category === filters.category;
        const matchesStatus = filters.status === '' ? true : 
                             filters.status === 'active' ? product.status : 
                             !product.status;
        const matchesPriceRange = !filters.priceRange || (() => {
            const [min, max] = filters.priceRange.split('-').map(Number);
            return product.price >= min && product.price <= max;
        })();
        return matchesSearch && matchesCategory && matchesStatus && matchesPriceRange;
    });

    // Get unique categories for filters and dropdowns
    const categories = [...new Set(products.map(p => p.category))];

    return (
        <div className="main-content">
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
    )
}

export default ProductManagement;