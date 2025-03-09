import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MainButton } from "../../Components/Buttons/Button";
import { mockDataDrivers } from "./mockDataOrders"
import "../../assets/styles/OrderDetails.css";
import { jsx } from "@emotion/react";


const OrderDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const order = location.state?.order

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedDriver, setSelectedDriver] = useState(order?.assignedDriver || "")

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const handleAssignDriver = () => {
        if (selectedDriver) {
            setIsModalOpen(false);
    
            // Update the order state correctly
            setOrders((prevOrders) =>
                prevOrders.map((o) =>
                    o.id === order.id ? { ...o, assignedDriver: selectedDriver } : o
                )
            );
    
            // Store in localStorage
            localStorage.setItem(`assignedDriver_${order.id}`, JSON.stringify(selectedDriver));
    
            // Pass the correct state to match useEffect
            navigate("dashboard/orders", {
                state: { updatedOrder: { id: order.id, assignedDriver: selectedDriver } },
            });
        }
    };
    
    useEffect(() => {
        if (order) {
        const storedDriver = localStorage.getItem(`assignedDriver_${order.id}`)
        if (storedDriver) {
            setSelectedDriver(JSON.parse(storedDriver))
        }
        }
    }, [order])

   


    if (!order) {
        return <div className="error-message">Order not found</div>;
    }

    return (
        <div className="order-details-container">
            <div className="order-details-card">
                <div className="order-left">
                    <h1 className="order-title">Order Details</h1>

                    {/* Order Status */}
                    <div className="order-status">
                        <p>Order ID: <span>{order.id}</span></p>
                        <p>Status: <span className="badge">{order.status}</span></p>
                        <p>Total Amount: <span>{order.total_amount}</span></p>
                       
                    </div>
                  

                    {/* Order Items */}
                    <h2 className="order-items-title">Customer Orders</h2>
                    <div className="order-items">
                        {order.order_items && Array.isArray(order.order_items) && order.order_items.length > 0 ? (
                            order.order_items.map((item, index) => (
                            <div key={index} className="order-item">
                                <img src={item.image} alt={item.name} className="order-item-image" />
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


                     {/* Back Button */}
                     <div className="back-navigate">
                     <MainButton onClick={() => navigate(-2)} style={{ backgroundColor: "transparent", border: "2px solid #1f2945", color: "black", cursor: "pointer", width: "100px", borderRadius: "0px", padding: "10px" }}>
                        <IoIosArrowRoundBack style={{ fontSize: "20px", marginRight:"5px", color:"#1f2945" }} />
                        <span>Back</span>
                    </MainButton>
                    </div>
                </div>

                {/* Right Sidebar - Customer Details */}
                <div className="order-right">
                    <h2 className="order-section-title">Customer Detail</h2>
                    <p className="customer-label">User ID</p>
                    <p className="customer-info">{order.customer}</p>

                    {/* <p className="customer-label">Email</p>
                    <p className="customer-info">{order.email}</p>

                    <p className="customer-label">Address</p>
                    <p className="customer-info">{order.address}</p> */}
                    {/* </div> */}
                    <hr className="horizontal-line" />

                    {selectedDriver && (
                        <div className="assigned-driver">
                            <h3 className="assigned-driver-deets">Assigned Driver Details</h3>
                            <p className="driver-label">Name</p>
                            <p className="driver-info">{selectedDriver.name}</p>

                            <p className="driver-label">Phone</p>
                            <p className="drive-info" style={{ color: "white", fontWeight: "500"}}>{selectedDriver.phone}</p>

                            <p className="driver-label">Email</p>
                            <p className="driver-info">{selectedDriver.email}</p>

                            <p className="driver-label">Vehicle</p>
                            <p className="driver-info">{selectedDriver.vehicle}</p>
                        </div>
                    )}
        

                    {/* Total & Process Order Button */}
                    <div className="order-total">
                        <div className="total-row">
                            <span>Total</span>
                            <span>${order.total_amount}</span>
                        </div>
                        <MainButton onClick={openModal} style={{ borderRadius: "5px", backgroundColor: "black", color: "white", width: "200px",marginLeft: "100px"}}>Assign Driver</MainButton>
                    </div>

                    {/* Custom Modal */}
                    {isModalOpen && (
                        <div className="custom-modal-overlay">
                            <div className="custom-modal">
                                <h2 className="modal-title">Assign Driver</h2>
                                {/* <label>Drivers</label> */}
                                <select onChange={(e) => {
                                    const driver = mockDataDrivers.find(d => d.id === parseInt(e.target.value));
                                    setSelectedDriver(driver);
                                }}
                                >
                                    <option value="" style={{ background: "#3c4a75"}}>Select a driver</option>
                                    {mockDataDrivers.map(driver => (
                                        <option style={{ background: "#3c4a75"}}key={driver.id} value={driver.id}>{driver.name}</option>
                                    ))}
                                </select>
                                <div className="modal-buttons">
                                    <MainButton onClick={closeModal} style={{ backgroundColor: "transparent"}}>Cancel</MainButton>
                                    <MainButton onClick={handleAssignDriver} disabled={!selectedDriver} style={{ backgroundColor: "#4cceac"}}>Assign</MainButton>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default OrderDetails
