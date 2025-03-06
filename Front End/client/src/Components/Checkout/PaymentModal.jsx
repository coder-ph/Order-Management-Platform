import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ totalAmount, onClose, onSubmit }) => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async () => {
    const API_URL = import.meta.env.VITE_APP_USER_URL;
    if (!phoneNumber) {
      setError("Please enter your phone number.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
   
      const response = await axios.post(`${API_URL}/api/v1/orders/checkout`, {
        phoneNumber,
        amount: totalAmount,
      });

      if (response.status === 200 && response.data.ResponseCode === "0") {
        
        setPaymentSuccess(true);
        onSubmit(phoneNumber); 

        
        setTimeout(() => {
          navigate("/track-order"); 
        }, 3000); 
      } else {
        setError("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-modal">
      <div className="modal-content">
        {paymentSuccess ? (
          <>
            <h2>Payment Successful!</h2>
            <p>Your payment has been processed successfully.</p>
            <p>You will be redirected to your orders shortly...</p>
          </>
        ) : (
          <>
            <h2>Confirm Payment</h2>
            <p>Total Amount: KSh {totalAmount}</p>
            <input
              type="text"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <div className="modal-buttons">
              <button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Processing..." : "Submit"}
              </button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
