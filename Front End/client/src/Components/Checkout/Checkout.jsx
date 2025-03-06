import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { confirmPayment } from "../../Redux/Payment/paymentSlice";
import { v4 as uuidv4 } from "uuid"; 
import AddressSection from "./AddressSection";
import PaymentMethodSection from "./PaymentMethodSection";
import OrderSummarySection from "./OrderSummary";
import PaymentModal from "./PaymentModal";
import "./checkout.css";

const CheckoutPage = () => {
  const ORDER_API = import.meta.env.VITE_APP_USER_ORDER;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 }; 
  const isPaymentConfirmed = useSelector(
    (state) => state.payment.isPaymentConfirmed
  );
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const totalAmount = totalPrice; 

  
  const orderId = uuidv4();

  const handleConfirmPayment = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async (phoneNumber) => {
    
    const orderDate = new Date().toISOString(); 

    const orderData = {
      orderId, 
      order_date: orderDate, 
      total_amount: totalAmount, 
      cart, 
      paymentMethod, 
      phoneNumber, 
    };

    try {
    
      const response = await fetch(ORDER_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        
        dispatch(confirmPayment());
        setShowPaymentModal(false);
        navigate("/track-order", { state: { orderId } }); 
      } else {
        
        console.error("Failed to submit order");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  const isFormValid = paymentMethod;

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <AddressSection onAddressChange={() => navigate("/change-address")} />

      <PaymentMethodSection onPaymentMethodChange={setPaymentMethod} />

      <OrderSummarySection totalAmount={totalAmount} cart={cart} />

      <div className="confirm-payment">
        <button
          className={`confirm-btn ${isPaymentConfirmed ? "disabled" : ""}`}
          onClick={handleConfirmPayment}
          disabled={!isFormValid || isPaymentConfirmed}
        >
          {isPaymentConfirmed ? "Payment Confirmed" : "Confirm Payment Method"}
        </button>
        <p>
          By proceeding, you are automatically accepting the{" "}
          <a href="/terms">Terms & Conditions</a>.
        </p>
      </div>

      {showPaymentModal && (
        <PaymentModal
          totalAmount={totalAmount}
          onClose={() => setShowPaymentModal(false)}
          onSubmit={handlePaymentSubmit}
          orderId={orderId} 
        />
      )}
    </div>
  );
};

export default CheckoutPage;
