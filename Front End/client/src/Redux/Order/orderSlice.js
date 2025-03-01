import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  searchTerm: "",
  selectedCategory: null,
  showCart: false,
  products: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity; 
      } else {
        state.cart.push({
          ...action.payload,
          quantity: action.payload.quantity,
        }); 
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload); 
    },
    updateCartItem: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    setShowCart: (state, action) => {
      state.showCart = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export default orderSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  updateCartItem,
  setShowCart,
  setSearchTerm,
  setSelectedCategory,
  clearCart,
  setProducts,
} = orderSlice.actions;
