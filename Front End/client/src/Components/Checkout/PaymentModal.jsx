import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ totalAmount, onClose, onSubmit }) => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!phoneNumber) {
      setError("Please enter your phone number.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Call the backend to initiate the STK Push
      const response = await axios.post(
        "http://localhost:5555/api/initiate-payment",
        {
          phoneNumber,
          amount: totalAmount,
        }
      );

      if (response.data.success) {
        onSubmit(phoneNumber); // Notify the parent component
        navigate("/track-order"); // Redirect to the tracking page
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
      </div>
    </div>
  );
};

export default PaymentModal;
