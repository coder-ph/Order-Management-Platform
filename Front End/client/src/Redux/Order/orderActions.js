// orderActions.js
export const addToCart = (product) => ({
  type: "order/addToCart",
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: "order/removeFromCart",
  payload: productId,
});

export const updateCartItem = (item) => ({
  type: "order/updateCartItem",
  payload: item,
});

export const setShowCart = (show) => ({
  type: "order/setShowCart",
  payload: show,
});

export const setSearchTerm = (term) => ({
  type: "order/setSearchTerm",
  payload: term,
});

export const setSelectedCategory = (category) => ({
  type: "order/setSelectedCategory",
  payload: category,
});

export const clearCart = () => ({
  type: "order/clearCart",
});
export const setProducts = (products) => ({
  type: "order/setProducts",
  payload: products,
});