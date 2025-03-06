import React, { useMemo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Components/ProductNavbar";
import UserCategorySection from "../Components/UCategorySection";
import ProductGrid from "../Components/ProductGrid";
import CartModal from "../Components/CartModal";
import UserSidebarr from "../scenes/global/UserSidebarr";
import "../assets/styles/ProductPage.css";
import { addToCart, setSelectedCategory, setSearchTerm, setShowCart, setProducts } from "../Redux/Order/orderActions";

const API_URL = 'https://order-management-platform.onrender.com/api/v1';

function ProductPage() {
  const dispatch = useDispatch();
  const { cart, selectedCategory, searchTerm, showCart, products } = useSelector((state) => state.order)
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (url, errorMessage) => {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`${errorMessage}: ${response.statusText}`)
    const { data } = await response.json()
    return data || []
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await fetchData(`${API_URL}/products`, 'Failed to fetch products')
        dispatch(setProducts(productsData))
      } catch (err) {
        setError(err.message)
        dispatch(setProducts([]))
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [dispatch])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await fetchData(`${API_URL}/products/categories`, 'Failed to fetch categories')
        setCategories(categoriesData)
      } catch (err) {
        setCategories([])
      }
    }

    fetchCategories()
  }, [])

  const cartItemCount = useMemo(() => 
    cart.reduce((total, item) => total + item.quantity, 0), 
    [cart]
  )

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return []
    
    return products.filter((product) => {
      if (!product?.name) return false
      
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [products, searchTerm, selectedCategory])

  const formattedCategories = useMemo(() => 
    categories.map(category => ({
      id: category.id,
      name: category.name 
    })), 
    [categories]
  )
  
  const handleCategorySelect = (categoryName) => {
    dispatch(setSelectedCategory(categoryName === selectedCategory ? null : categoryName))
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div>
          <p className="text-lg">Loading products...</p>
        </div>
      )
    }

    if (error) {
      return (
        <div>
          <p className="text-lg text-red-500">Error: {error}</p>
        </div>
      )
    }

    if (filteredProducts.length === 0) {
      return (
        <div>
          <p className="text-lg mb-2">No products found</p>
          {searchTerm && <p>Try clearing your search or selecting a different category</p>}
          {selectedCategory && (
            <button 
              onClick={() => dispatch(setSelectedCategory(null))}
            >
              Clear category filter
            </button>
          )}
        </div>
      )
    }

    return (
      <ProductGrid products={filteredProducts} addToCart={(product) => dispatch(addToCart(product))} />
    )
  }

  return (
    <div className="flex bg-amber-50">
      <div>
        <UserSidebarr />
      </div>
      <div className="w-screen">
        <div className="product-page">
          <div className="pt-15">
            <Navbar cartItemCount={cartItemCount} onSearch={(term) => dispatch(setSearchTerm(term))} onCartClick={() => dispatch(setShowCart(!showCart))} />
          </div>
          <div className="page-content bg-zinc-100">
            <div className="main-content">
              <div className="horizontal-category-section">
                <UserCategorySection categories={formattedCategories} selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />
              </div>
              <div className="prods-container">
                <h2 className="prods-title text-amber-50">Products List</h2>
                {renderContent()}
              </div>
            </div>
          </div>
          {showCart && <CartModal cart={cart} onClose={() => dispatch(setShowCart(false))} />}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;