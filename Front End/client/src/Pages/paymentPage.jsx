import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  removeFromCart,
  updateCartItem,
} from "../Redux/Order/orderActions";
import "../assets/styles/payment.css";
import { FaTrashAlt } from "react-icons/fa";

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.order.cart);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleIncreaseQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    if (item) {
      dispatch(updateCartItem({ id: productId, quantity: item.quantity + 1 }));
    }
  };

  const handleDecreaseQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    if (item) {
      if (item.quantity > 1) {
        dispatch(
          updateCartItem({ id: productId, quantity: item.quantity - 1 })
        );
      } else {
        dispatch(removeFromCart(productId));
      }
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="payment-page">
      <div className="cart-items-container">
        <h1>Payment Page</h1>

        <div className="delivery-slot">
          <p>Standard Today 2 PM - 4 PM</p>
          <p>Change this delivery slot at checkout</p>
        </div>

        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>KES {item.price.toFixed(2)}</p>
              </div>

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

              <button
                className="delete-btn"
                onClick={() => handleRemoveItem(item.id)}
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="order-summary">
        <h2>Order Summary</h2>

        <div className="subtotal">
          <p>Subtotal</p>
          <p>KES {subtotal.toFixed(2)}</p>
        </div>

        <div className="total">
          <p>Total</p>
          <p>KES {subtotal.toFixed(2)}</p>
        </div>

        <button className="checkout-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </button>

        <div className="payment-methods">
          <h3>Available payment methods</h3>
        </div>

        <button className="back-btn" onClick={handleBack}>
          Back to Cart
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
