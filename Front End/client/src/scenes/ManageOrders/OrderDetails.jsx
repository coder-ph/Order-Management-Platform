import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MainButton } from "../../Components/Buttons/Button";
import { mockDataDrivers } from "./mockDataOrders";
import "../../assets/styles/OrderDetails.css";
import { jsx } from "@emotion/react";

const OrderDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  const [selectedDriver, setSelectedDriver] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAssignDriver = async () => {
    if (selectedDriver) {
      setIsModalOpen(false);
      order.assignedDriver = selectedDriver;

    
      await sendSMSNotification(
        selectedDriver.phone,
        order.id,
        order.userLocation
      );
    }
  };

  const sendSMSNotification = async (
    driverPhoneNumber,
    orderId,
    userLocation
  ) => {
    const accountSid = import.meta.env.VITE_TWILIO_SID;
    const authToken = import.meta.env.VITE_TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = "+16514488785"; 

    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
        },
        body: new URLSearchParams({
          From: twilioPhoneNumber,
          To: "+17753603314",
          Body: `You have been assigned an order (Order ID: ${orderId}) to be shipped to ${userLocation}.`,
        }),
      });

      const data = await response.json();
      if (data.sid) {
        console.log("SMS sent successfully!", data.sid);
        alert("SMS sent successfully!");
      } else {
        console.error("Failed to send SMS:", data);
        alert("Failed to send SMS: " + data.message);
      }
    } catch (error) {
      console.error("Failed to send SMS:", error);
      alert("Failed to send SMS: " + error.message);
    }
  };

  if (!order) {
    return <div className="error-message">Order not found</div>;
  }

  return (
    <div className="order-details-container">
      <div className="order-details-card">
        <div className="order-left">
          <h1 className="order-title">Order Details</h1>
          <div className="order-status">
            <p>
              Order ID: <span>{order.id}</span>
            </p>
            <p>
              Status: <span className="badge">{order.status}</span>
            </p>
            <p>
              Total Amount: <span>{order.total_amount}</span>
            </p>
          </div>
          {/* Order Items */}
          <h2 className="order-items-title">Customer Orders</h2>
          <div className="order-items">
            {order.order_items && Array.isArray(order.order_items) && order.order_items.length > 0 ? (
                order.order_items.map((item, index) => (
                <div key={index} className="order-item">
                    <div className="order-item-details">
                        <h3>{item.product_id}</h3>
                        <p>{item.quantity} × ${item.price ? item.price.toFixed(2) : "0.00"}</p>
                    </div>
                 </div>
                 ))
                ) : (
                <p>No items in this order.</p>
                 )}
                 </div>


          
          <div className="back-navigate">
            <MainButton
              onClick={() => navigate(-2)}
              style={{
                backgroundColor: "transparent",
                border: "2px solid #1f2945",
                color: "black",
                cursor: "pointer",
                width: "100px",
                borderRadius: "0px",
                padding: "10px",
              }}
            >
              <IoIosArrowRoundBack
                style={{
                  fontSize: "20px",
                  marginRight: "5px",
                  color: "#1f2945",
                }}
              />
              <span>Back</span>
            </MainButton>
          </div>
        </div>

        <div className="order-right">
          <h2 className="order-section-title">Customer Detail</h2>
          <p className="customer-label">User ID</p>
          <p className="customer-info">{order.customer}</p>

          <hr className="horizontal-line" />

          {selectedDriver && (
            <div className="assigned-driver">
              <h3 className="assigned-driver-deets">Assigned Driver Details</h3>
              <p className="driver-label">Name</p>
              <p className="driver-info">{selectedDriver.name}</p>
              <p className="driver-label">Phone</p>
              <p
                className="drive-info"
                style={{ color: "white", fontWeight: "500" }}
              >
                {selectedDriver.phone}
              </p>
              <p className="driver-label">Email</p>
              <p className="driver-info">{selectedDriver.email}</p>
              <p className="driver-label">Vehicle</p>
              <p className="driver-info">{selectedDriver.vehicle}</p>
            </div>
          )}

          <div className="order-total">
            <div className="total-row">
              <span>Total</span>
              <span>${order.total_amount}</span>
            </div>
            <MainButton
              onClick={openModal}
              style={{
                borderRadius: "5px",
                backgroundColor: "black",
                color: "white",
                width: "200px",
                marginLeft: "100px",
              }}
            >
              Assign Driver
            </MainButton>
          </div>

          {isModalOpen && (
            <div className="custom-modal-overlay">
              <div className="custom-modal">
                <h2 className="modal-title">Assign Driver</h2>
                <select
                  onChange={(e) => {
                    const driver = mockDataDrivers.find(
                      (d) => d.id === parseInt(e.target.value)
                    );
                    setSelectedDriver(driver);
                  }}
                >
                  <option value="" style={{ background: "#3c4a75" }}>
                    Select a driver
                  </option>
                  {mockDataDrivers.map((driver) => (
                    <option
                      style={{ background: "#3c4a75" }}
                      key={driver.id}
                      value={driver.id}
                    >
                      {driver.name}
                    </option>
                  ))}
                </select>
                <div className="modal-buttons">
                  <MainButton
                    onClick={() => setIsModalOpen(false)}
                    style={{ backgroundColor: "transparent" }}
                  >
                    Cancel
                  </MainButton>
                  <MainButton
                    onClick={handleAssignDriver}
                    disabled={!selectedDriver}
                    style={{ backgroundColor: "#4cceac" }}
                  >
                    Assign
                  </MainButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
