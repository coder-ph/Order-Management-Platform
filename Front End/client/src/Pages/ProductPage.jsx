// ProductPage.js
import React, { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mockCategories, mockProducts } from "../assets/UserMockData";
import Navbar from "../Components/ProductNavbar";
import UserCategorySection from "../Components/UCategorySection";
import ProductGrid from "../Components/ProductGrid";
import CartModal from "../Components/CartModal";
import "../assets/styles/ProductPage.css";
import {
  addToCart,
  setSelectedCategory,
  setSearchTerm,
  setShowCart,
  setProducts, 
} from "../Redux/Order/orderActions";

function ProductPage() {
  const dispatch = useDispatch();
  const { cart, selectedCategory, searchTerm, showCart, products } =
    useSelector((state) => ({
      cart: state.order.cart,
      selectedCategory: state.order.selectedCategory,
      searchTerm: state.order.searchTerm,
      showCart: state.order.showCart,
      products: state.order.products, 
    }));

  
  useEffect(() => {
    dispatch(setProducts(mockProducts));
  }, [dispatch]);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const handleCategorySelect = (categoryName) => {
    dispatch(
      setSelectedCategory(
        categoryName === selectedCategory ? null : categoryName
      )
    );
  };

  const handleSearch = (term) => {
    dispatch(setSearchTerm(term));
  };

  const toggleCart = () => {
    dispatch(setShowCart(!showCart));
  };

  return (
    <div className="product-page">
      <Navbar
        cartItemCount={cartItemCount}
        onSearch={handleSearch}
        onCartClick={toggleCart}
      />
      <div className="main-content">
        <UserCategorySection
          categories={mockCategories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        <div className="prods-container">
          <h2 className="prods-title">Products List</h2>
          <ProductGrid
            products={filteredProducts}
            addToCart={(product) => dispatch(addToCart(product))}
          />
        </div>
      </div>
      {showCart && <CartModal cart={cart} onClose={toggleCart} />}
    </div>
  );
}

export default ProductPage;
