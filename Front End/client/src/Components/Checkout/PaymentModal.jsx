import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ totalAmount, onClose, onSubmit, orderId }) => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async () => {
    const API_URL = import.meta.env.VITE_APP_USER_URL;

    // Validate phone number
    if (!phoneNumber || !/^\+2547\d{8}$/.test(phoneNumber)) {
      setError(
        "Please enter a valid Kenyan phone number (format: +2547XXXXXXXX)."
      );
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      
      const authToken = localStorage.getItem("token"); 
      console.log(authToken);

    
      const payload = {
        order_id: orderId, 
        amount: totalAmount.toString(), 
        billed_phone: phoneNumber.replace("+", ""), 
      };

      console.log("Payload:", payload);

      
      const response = await axios.post(
        `${API_URL}/api/v1/orders/checkout`,
        payload, 
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the authorization token
          },
        }
      );

      console.log("Response:", response);

      // Handle response
      if (response.status === 200 && response.data.ResponseCode === "0") {
        setPaymentSuccess(true);
        onSubmit(phoneNumber); // Notify parent component of successful payment

        // Redirect to track-order page after 3 seconds
        setTimeout(() => {
          navigate("/track-order");
        }, 3000);
      } else {
        setError("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      setError(
        error.response?.data?.error || "An error occurred. Please try again."
      );
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
              placeholder="Enter your phone number (format: +2547XXXXXXXX)"
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
