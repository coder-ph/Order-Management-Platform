import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Components/UserSidebar";
import { orderHistory, currentUser } from "../assets/OrderMockData";
import '../assets/styles/UserProfile.css';

const ProfilePage = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const getStatus = (status) => {
        switch(status) {
            case 'Delivered':
                return 'status-delivered'
            case 'Canceled':
                return 'status-canceled'
            case 'Ongoing':
                return 'status-ongoing'
            default:
                return ''
        }
    }

    const handleViewDetails = (order) => {
        setSelectedOrder(order)
        setShowModal(true)
    }

    const handleCancelOrder = (orderId) => {
        alert(`Cancelling order ${orderId}.`)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <div className="profile-page">
            <Sidebar/>
            <div className="content-area">
                <div className="profile-header">
                    <h2>My Profile</h2>
                    <Link to="/edit-profile">
                        <button className="edit-btn">Edit</button>
                    </Link>
                </div>
                <div className="profile-info">
                    <img src={currentUser.profilePicture} alt="Profile" className="profile-image" />
                    <div className="profile-details">
                        <p><strong>Full Name:</strong> {currentUser.fullName}</p>
                        <p><strong>Email:</strong> {currentUser.email}</p>
                        <p><strong>Phone Number:</strong> {currentUser.phoneNumber}</p>
                        <p><strong>Address:</strong> {currentUser.address}</p>
                    </div>
                </div>

                <div className="order-hist">
                    <div className="order-hist-header">
                        <h3>Order History</h3>
                        <select className="order-filter">
                            <option>All Orders</option>
                            <option>Last 1 Month</option>
                            <option>Last 3 Months</option>
                            <option>Last 6 Months</option>
                        </select>
                    </div>
                    <div className="tbl-cont">
                        <table className="order-tbl">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderHistory.map((order, index) => (
                                    <tr key={order.id}>
                                        <td>{index + 1}</td>
                                        <td>{order.orderNumber}</td>
                                        <td>{order.date}</td>
                                        <td>
                                            <span className={getStatus(order.status)}>{order.status}</span>
                                        </td>
                                        <td>{order.total}</td>
                                        <td className="detail-btn">
                                            <button className="details-btn" onClick={() => handleViewDetails(order)}>View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Order Details Modal */}
            {showModal && selectedOrder && (
                <div className="order-details-modal" style={{ display: 'flex' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Order Details - {selectedOrder.orderNumber}</h3>
                            <button className="close-btn" onClick={closeModal}>×</button>
                        </div>
                        
                        <p><strong>Date:</strong> {selectedOrder.date}</p>
                        <p><strong>Status:</strong> <span className={getStatus(selectedOrder.status)}>{selectedOrder.status}</span></p>
                        <p><strong>Shipping Address:</strong> {selectedOrder.shippingAddress}</p>
                        <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                        
                        <div className="product-list">
                            <h4>Products</h4>
                            {selectedOrder.products.map(product => (
                                <div className="product-item" key={product.id}>
                                    <img src={product.image} alt={product.name} className="product-image" />
                                    <div className="product-details">
                                        <p><strong>{product.name}</strong></p>
                                        <p>Quantity: {product.quantity}</p>
                                        <p className="product-price">{product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="order-summary">
                            <p><strong>Total:</strong> {selectedOrder.total}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfilePage;