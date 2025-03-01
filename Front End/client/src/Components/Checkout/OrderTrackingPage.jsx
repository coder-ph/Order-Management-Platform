import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderTrackingPage = () => {
  const [paymentStatus, setPaymentStatus] = useState("Pending");

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5555/api/payment-status"
        );
        setPaymentStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching payment status:", error);
      }
    };

    fetchPaymentStatus();
  }, []);

  return (
    <div className="order-tracking">
      <h1>Order Tracking</h1>
      <p>Payment Status: {paymentStatus}</p>
    </div>
  );
};

export default OrderTrackingPage;
