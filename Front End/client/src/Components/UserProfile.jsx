import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Components/UserSidebar";
import { MainButton } from "../Components/Buttons/Button";
import { orderHistory, currentUser } from "../assets/OrderMockData";
import '../assets/styles/UserProfile.css';
import CloseIcon from '@mui/icons-material/Close';
import UserSidebarr from "../scenes/global/UserSidebarr";

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
    // const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="profile-page">
            <div className="sticky h-full top-0 left-0 bg-[#a3a3a3]">
            <UserSidebarr />
            </div>
            <div className="content-area">
                <div className="profile-header">
                    <h2>My Profile</h2>
                    <Link to="/edit-profile">
                        <MainButton style={{ backgroundColor:"#1f2945", color: "white", padding:"10px 15px", border:"none", borderRadius:"5px", cursor:"pointer", transition: "0.3s"}}>Edit Profile</MainButton>
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
                                            <MainButton onClick={() => handleViewDetails(order)} style={{ backgroundColor:" #1f2945", color:"white", padding:"8px 12px", borderRadius:"5px", cursor: "pointer", border:"none", transition:"0.3s"}}>View</MainButton>
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
                            <MainButton onClick={closeModal} style={{ background: "none", color: "black", border: "none", fontSize: "18px", cursor: "pointer"}}><CloseIcon style={{ color: "black", fontSize:"14px", marginLeft:"200px"}} /></MainButton>
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