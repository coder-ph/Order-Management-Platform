import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ totalAmount, onClose, onSubmit }) => {
   const nav = useNavigate()
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = () => {
    onSubmit(phoneNumber);
    nav('/track-order')
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
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
