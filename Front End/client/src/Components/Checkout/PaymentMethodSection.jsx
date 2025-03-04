import React, { useState } from "react";

const PaymentMethodSection = ({ onPaymentMethodChange }) => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleChange = (method) => {
    setPaymentMethod(method);
    onPaymentMethodChange(method);
  };

  return (
    <div className="section">
      <h2>PAYMENT METHOD</h2>
      <p>Payment Options</p>
      <div className="payment-options">
        <div className="payment-option">
          <input
            type="radio"
            id="bank-card"
            name="payment"
            onChange={() => handleChange("bank-card")}
          />
          <label htmlFor="bank-card">Pay Now With Bank Card</label>
        </div>
        <div className="payment-option">
          <input
            type="radio"
            id="mpesa"
            name="payment"
            onChange={() => handleChange("mpesa")}
          />
          <label htmlFor="mpesa">Pay Now with M-Pesa</label>
        </div>
        <div className="payment-option">
          <input
            type="radio"
            id="payondelivery"
            name="payment"
            onChange={() => handleChange("Payondelivery")}
          />
          <label htmlFor="payondelivery">Pay on Deilery</label>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSection;
