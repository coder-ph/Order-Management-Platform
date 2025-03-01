import React from "react";

const OrderSummarySection = ({ totalAmount }) => {
  return (
    <div className="section">
      <h2>Order Summary</h2>
      <div className="order-details">
        <p>Items total (number) | Ksh (number)</p>
        <p>Delivery fees KSh</p>
        <p className="total">Total KSh {totalAmount}</p>
      </div>
    </div>
  );
};

export default OrderSummarySection;
