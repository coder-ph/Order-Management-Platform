import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  removeFromCart,
  updateCartItem,
} from "../Redux/Order/orderActions";
import axios from "axios";
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

  const handleCheckout = async () => {
    try {
      const userLocation = JSON.parse(localStorage.getItem("userLocation"));
      const { latitude, longitude } = userLocation || {
        lattitude: null,
        longitude: null,
      };

      if (!latitude || !longitude) {
        alert("Location is required to proceed with payment.");
      }

      const orderItems = cart.map((item) => ({
        quantity: item.quantity.toString(),
        product_id: item.id,
      }));

      const payload = {
        total_amount: subtotal.toFixed(2),
        order_items: orderItems,
        location: {
          lattitude: latitude.toString(),
          longitude: longitude.toString(),
        },
      };

      console.log("Payload:", payload);

      const API_URL = import.meta.env.VITE_APP_USER_SERVER;
      const response = await axios.post(`${API_URL}/api/v1/orders`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        console.log(response);
        console.log(response.data.data.id)
        localStorage.setItem('order_id',response.data.data.id)
        

        navigate("/checkout", { state: { cart, totalPrice: subtotal } });
      } else {
        alert("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="payment-page pl-6">
      <div className="cart-items-container">
        <h1>Payment Page</h1>

        <div className="delivery-slot">
          <p>Standard Today 2 PM - 4 PM</p>
          <p className="font-semibold">Change this delivery slot at checkout</p>
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
          Proceed to Payment
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
