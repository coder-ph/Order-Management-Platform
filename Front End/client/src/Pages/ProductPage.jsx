// ProductPage.js
import React, { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mockCategories, mockProducts } from "../assets/UserMockData";
import Navbar from "../Components/ProductNavbar";
import UserCategorySection from "../Components/UCategorySection";
import ProductGrid from "../Components/ProductGrid";
import CartModal from "../Components/CartModal";
import Sidebar from "../Components/UserSidebar";
import "../assets/styles/ProductPage.css";
import {
  addToCart,
  setSelectedCategory,
  setSearchTerm,
  setShowCart,
  setProducts, 
} from "../Redux/Order/orderActions";
import UserSidebarr from "../scenes/global/UserSidebarr";

function ProductPage() {
    
  const dispatch = useDispatch();
  const { cart, selectedCategory, searchTerm, showCart, products } =
    useSelector((state) => ({
      cart: state.order.cart,
      selectedCategory: state.order.selectedCategory,
      searchTerm: state.order.searchTerm,
      showCart: state.order.showCart,
      products: state.order.products, 
    }))

  
  useEffect(() => {
    dispatch(setProducts(mockProducts))
  }, [dispatch])

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true
      return matchesSearch && matchesCategory
    })
  }, [products, searchTerm, selectedCategory])

  const handleCategorySelect = (categoryName) => {
    dispatch(
      setSelectedCategory(
        categoryName === selectedCategory ? null : categoryName
      )
    )
  }

  const handleSearch = (term) => {
    dispatch(setSearchTerm(term))
  }

  const toggleCart = () => {
    dispatch(setShowCart(!showCart))
  }
  //add user data
  const userData = {
    username: "User",
    email: "user@example.com",
    profilePicture: "/api/placeholder/32/32"
  };

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logout clicked");
  };

  return (
    <div className="flex">
      <div>
        <UserSidebarr />
      </div>
      <div className="w-screen">
        <div className="product-page">
          <div className="pt-15 ">
            <Navbar
              cartItemCount={cartItemCount}
              onSearch={handleSearch}
              onCartClick={toggleCart}
            />
          </div>
          <div className="page-content bg-zinc-100">
            <div className="main-content">
              <div className="horizontal-category-section">
                <UserCategorySection
                  categories={mockCategories}
                  selectedCategory={selectedCategory}
                  onCategorySelect={handleCategorySelect}
                />
              </div>
              <div className="prods-container ">
                <h2 className="prods-title text-amber-50">Products List</h2>
                <ProductGrid
                  products={filteredProducts}
                  addToCart={(product) => dispatch(addToCart(product))}
                />
              </div>
            </div>
          </div>
          {showCart && <CartModal cart={cart} onClose={toggleCart} />}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;