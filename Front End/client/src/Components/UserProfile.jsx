import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Components/UserSidebar"
import '../assets/styles/UserProfile.css'

const ProfilePage = () => {
    // Mock current user 
    const currentUser = {
        address: '1942 Main Street, Nakuru',
        fullName: 'Chris Brown',
        email: 'chrisB@gmail.com',
        phoneNumber: '0700234786',
        profilePicture: '/api/placeholder/80/80'
    }

    const orderHistory = [
        { id: 1, orderNumber: "ORD-2025001", date: "2025-02-28", status: "Delivered", total: "$125.50" },
        { id: 2, orderNumber: "ORD-2025002", date: "2025-02-15", status: "Canceled", total: "$85.20" },
        { id: 3, orderNumber: "ORD-2025003", date: "2024-12-01", status: "Ongoing", total: "$210.75" },
        { id: 4, orderNumber: "ORD-2025004", date: "2025-01-20", status: "Delivered", total: "$45.99" },
        { id: 5, orderNumber: "ORD-2025005", date: "2024-02-25", status: "Ongoing", total: "$150.30" },
    ]

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

    return (
        <div className="profile-page">
            <Sidebar/>
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
                        <option>Last 1 Months</option>
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
                                        <button className="details-btn">See Details</button>
                                        {order.status === 'Ongoing' && (
                                            <button className="cancel-btn">Cancel</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;
