import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ totalAmount, onClose, onSubmit }) => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isPaymentMade, setIsPaymentMade] = useState(false);

  
  useEffect(() => {
    const paymentMade = localStorage.getItem(
      `payment_made_${localStorage.getItem("order_id")}`
    );
    if (paymentMade === "true") {
      setIsPaymentMade(true);
    }
  }, []);

  const handleSubmit = async () => {
    const API_URL = import.meta.env.VITE_APP_USER_URL;

    
    if (!phoneNumber || !/^\+2547\d{8}$/.test(phoneNumber)) {
      setError(
        "Please enter a valid Kenyan phone number (format: +2547XXXXXXXX)."
      );
      return;
    }

    
    if (isPaymentMade) {
      setError("Payment has already been made for this order.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
   
      const authToken = localStorage.getItem("token");
      const orderId = localStorage.getItem("order_id");

      console.log("Auth Token:", authToken);
      console.log("Order ID:", orderId);

     
      const response = await axios.post(
        `${API_URL}/api/v1/orders/checkout`,
        {
          billed_phone: phoneNumber,
          amount: totalAmount,
          order_id: orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Response:", response);

      
      if (response.data.data.invoice_no ) {
        
        localStorage.setItem(`payment_made_${orderId}`, "true");
        setIsPaymentMade(true);

        
        setPaymentSuccess(true);
        onSubmit(phoneNumber);

       
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
              <button
                onClick={handleSubmit}
                disabled={isLoading || isPaymentMade}
              >
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
