import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { confirmPayment } from "../../Redux/Payment/paymentSlice"; 
import AddressSection from "./AddressSection";
import PaymentMethodSection from "./PaymentMethodSection";
import OrderSummarySection from "./OrderSummary";
import PaymentModal from "./PaymentModal";
import "./checkout.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isPaymentConfirmed = useSelector(
    (state) => state.payment.isPaymentConfirmed
  ); // Get payment state from Redux
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const totalAmount = 2077; // Example total amount (you can dynamically calculate this)

  const handleChangeAddress = () => {
    navigate("/change-address");
  };

  const handleConfirmPayment = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async (phoneNumber) => {
    try {
      //  M-Pesa payment processing
      console.log("M-Pesa payment submitted for:", phoneNumber);

      // data ya invoice API
      const orderData = {
        phoneNumber,
        totalAmount,
        items: [
          // Add item details here (e.g., from the cart)
        ],
      };

      // const response = await fetch("https://your-api-endpoint.com/invoices", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(orderData),
      // });

      // if (response.ok) {
      //   // Send SMS notification
      //   await fetch("https://your-sms-api-endpoint.com/send-sms", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       phoneNumber,
      //       message: `Your order has been placed successfully. Total amount: KSh ${totalAmount}. Track your order here: https://your-app.com/track-order`,
      //     }),
      //   });

        // Update payment confirmation status in Redux
        dispatch(confirmPayment()); // Dispatch the confirmPayment action
        setShowPaymentModal(false);

        // Route to the order tracking page
        navigate("/track-order");
      // } else {
      //   console.error("Failed to post order to the backend.");
      // }
    } catch (error) {
      console.error("Error during payment submission:", error);
    }
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
  };

  const isFormValid = paymentMethod; // Add address validation if needed

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <AddressSection onAddressChange={handleChangeAddress} />

      <PaymentMethodSection onPaymentMethodChange={setPaymentMethod} />

      <OrderSummarySection totalAmount={totalAmount} />

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
          onClose={handleCloseModal}
          onSubmit={handlePaymentSubmit}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
