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
    if (!phoneNumber) {
      setError("Please enter your phone number.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Step 1: Initiate the STK Push
      const response = await axios.post(
        "http://localhost:5555/api/initiate-payment",
        {
          phoneNumber,
          amount: totalAmount,
        }
      );

      if (response.status === 200 && response.data.ResponseCode === "0") {
        // Payment initiation successful
        setPaymentSuccess(true);
        onSubmit(phoneNumber); // Notify the parent component

        // Show success message and redirect after 3 seconds
        setTimeout(() => {
          navigate("/track-order"); // Redirect to track-order page
        }, 3000); // Wait for 3 seconds before redirecting
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
