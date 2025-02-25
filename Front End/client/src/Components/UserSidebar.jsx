import React from "react";
import { MainButton } from "../Components/Buttons/Buttons";

const UserSidebar = ({activePage, onNavigate, userData, onLogout}) => {
    const menuItems = {
        dashboard: [
            {icon: 'home', text: 'Home', id: 'dashboard'},
            {icon: 'cart', text: 'My Orders', id: 'my-orders'},
            {icon: 'heart', text: 'Wishlist', id: 'wishlist'},
            {icon: 'star', text: 'My Reviews', id: 'reviews'}
        ],
        settings: [
            {icon: 'mtu', text: 'Personal Information', id: 'personal-info'},
            {icon: 'pin', text: 'Address Management', id: 'address-management'},
            {icon: 'card', text: 'Payment Methods', id: 'payment-methods'},
            {icon: 'bell', text: 'Notifications', id: 'notificatios'},
        ]
    }

    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="user-profile-top">
            <img
              src="/api/placeholder/32/32"
              alt="Profile picture"
              className="avatar"
            />
            <div className="user-info">
              <div className="user-name">Username</div>
              {/* {userData.name || 'User Name'} */}
              {/*<div className="user-username">{userData.username || '@username'}</div>*/}
            </div>
          </div>
          <h2 className="sidebar-title">My Account</h2>
        </div>

        <nav className="sidebar-nav">
          <div className="nanv-section">
            <h3 className="nav-title">Account Overview</h3>
            <ul className="nav-list">
              {menuItems.dashboard.map((item) => (
                <li
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`nav-item ${
                    activePage === item.id ? "active" : ""
                  }`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav-section">
            <h3 className="nav-title">Profile Settings</h3>
            <ul className="nav-list">
              {menuItems.settings.map((item) => (
                <li
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`nav-item ${
                    activePage === item.id ? "active" : ""
                  }`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div className="sidebar-footer">
          <mainButton onClick={onLogout}>
            <span className="logout-icon">mlango</span>
            <span>Logout</span>
          </mainButton>
        </div>
      </div>
    );
}

export default UserSidebar