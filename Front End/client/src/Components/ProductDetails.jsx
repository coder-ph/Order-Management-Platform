import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  setShowCart,
} from "../Redux/Order/orderActions";
import { selectProductById } from "../Redux/Order/orderSelectors";
import Navbar from "./ProductNavbar";
import "../../src/assets/styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => selectProductById(state, Number(id)));
  const cart = useSelector((state) => state.order.cart);
  const [quantity, setQuantity] = useState(1);

  // Check if the product is in the cart
  const isProductInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  // Handle add/remove from cart
  const handleCartAction = () => {
    if (isProductInCart(product.id)) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  // Handle opening the cart modal
  const handleOpenCart = () => {
    dispatch(setShowCart(true));
  };

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-details-container">
      {/* Pass handleOpenCart to Navbar */}
      <Navbar onCartClick={handleOpenCart} />
      <div className="product-image-section">
        <img
          src={product.image}
          alt={product.name}
          className="product-main-image"
        />
      </div>
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price">Ksh {product.price}</p>
        <p className="product-description">{product.description}</p>

        {/* Quantity Input */}
        <div className="quantity-control">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        {/* Add/Remove from Cart Button */}
        <button
          className={`add-to-cart-btn ${
            isProductInCart(product.id) ? "remove-from-cart" : ""
          }`}
          onClick={handleCartAction}
        >
          {isProductInCart(product.id) ? "Remove from Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
