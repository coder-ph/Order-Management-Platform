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
  );
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const totalAmount = 1; // Example total amount ndio isitest na pesa mob

  const handleConfirmPayment = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = (phoneNumber) => {
    dispatch(confirmPayment()); 
    setShowPaymentModal(false);
    navigate("/track-order");
  };

  const isFormValid = paymentMethod;

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <AddressSection onAddressChange={() => navigate("/change-address")} />

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
          onClose={() => setShowPaymentModal(false)}
          onSubmit={handlePaymentSubmit}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
