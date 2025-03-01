import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../Redux/Order/orderActions";
import "../assets/styles/ProductGrid.css";

const ProductGrid = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.order.cart); 

  // Check if a product is in the cart
  const isProductInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  return (
    <div className="product-grid">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className="product-item"
            onClick={() => navigate(`/product/${product.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">ksh {Number(product.price)}</p>
              <p className="product-description">
                {product.description.length > 50
                  ? `${product.description.substring(0, 50)}...`
                  : product.description}
              </p>
            </div>
            <button
              className={`add-to-cart-btn ${
                isProductInCart(product.id) ? "remove-from-cart" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (isProductInCart(product.id)) {
                  dispatch(removeFromCart(product.id)); // Remove from cart
                } else {
                  dispatch(addToCart(product)); // Add to cart
                }
              }}
            >
              {isProductInCart(product.id) ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        ))
      ) : (
        <p className="no-products">No products found matching your criteria.</p>
      )}
    </div>
  );
};

export default ProductGrid;
