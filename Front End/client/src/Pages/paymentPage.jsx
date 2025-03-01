import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  removeFromCart,
  updateCartItem,
} from "../Redux/Order/orderActions";
import "../assets/styles/payment.css";
import { FaTrashAlt } from "react-icons/fa"; // Import a delete icon from react-icons

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.order.cart); // Access cart data

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle increasing quantity
  const handleIncreaseQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    if (item) {
      dispatch(updateCartItem({ id: productId, quantity: item.quantity + 1 }));
    }
  };

  // Handle decreasing quantity
  const handleDecreaseQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    if (item) {
      if (item.quantity > 1) {
        dispatch(
          updateCartItem({ id: productId, quantity: item.quantity - 1 })
        );
      } else {
        dispatch(removeFromCart(productId)); // Remove item if quantity is 1
      }
    }
  };

  // Handle removing item from cart
  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="payment-page">
      {/* Left Side: Cart Items */}
      <div className="cart-items-container">
        <h1>Payment Page</h1>

        {/* Delivery Slot */}
        <div className="delivery-slot">
          <p>Standard Today 2 PM - 4 PM</p>
          <p>Change this delivery slot at checkout</p>
        </div>

        {/* Cart Items */}
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>KES {item.price.toFixed(2)}</p>
              </div>

              {/* Quantity Controls */}
              <div className="quantity-controls">
                <button
                  className="quantity-btn minus"
                  onClick={() => handleDecreaseQuantity(item.id)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="quantity-btn plus"
                  onClick={() => handleIncreaseQuantity(item.id)}
                >
                  +
                </button>
              </div>

              {/* Delete Button */}
              <button
                className="delete-btn"
                onClick={() => handleRemoveItem(item.id)}
              >
                <FaTrashAlt /> {/* Use the delete icon */}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Order Summary (Sticky) */}
      <div className="order-summary">
        <h2>Order Summary</h2>

        {/* Subtotal */}
        <div className="subtotal">
          <p>Subtotal</p>
          <p>KES {subtotal.toFixed(2)}</p>
        </div>

        {/* Total */}
        <div className="total">
          <p>Total</p>
          <p>KES {subtotal.toFixed(2)}</p>
        </div>

        {/* Checkout Button */}
        <button className="checkout-btn">Proceed to Checkout</button>

        {/* Available Payment Methods */}
        <div className="payment-methods">
          <h3>Available payment methods</h3>
          {/* Add payment method icons or options here */}
        </div>

        {/* Back Button */}
        <button className="back-btn" onClick={handleBack}>
          Back to Cart
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
