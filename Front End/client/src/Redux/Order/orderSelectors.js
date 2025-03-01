// orderSelectors.js
import { createSelector } from "@reduxjs/toolkit";

export const selectCartItems = (state) => state.order.cart;
export const selectCartItemCount = (state) =>
  state.order.cart.reduce((total, item) => total + item.quantity, 0);
export const selectSelectedCategory = (state) => state.order.selectedCategory;
export const selectSearchTerm = (state) => state.order.searchTerm;
export const selectShowCart = (state) => state.order.showCart;
export const selectAllProducts = (state) => state.order.products || [];

export const selectProductById = createSelector(
  [selectAllProducts, (_, productId) => productId],
  (products, productId) =>
    products.find((product) => product.id === productId) || null
);
