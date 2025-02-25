import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {MainButton} from '../Components/Buttons/Buttons'
import "../assets/styles/UserSidebar.css"

const UserSidebar = ({activePage, userData, onLogout}) => {
    const [minimized, setMinimized] = useState(false)
    const navigate = useNavigate()

    const handleNavigate = (path) => {
        navigate(`/${path}`)
    }

    const handleLogout = () => {
        if (onLogout) {
            onLogout()
        }
        navigate('/login')
    }

    const toggleSidebar = () => {
        setMinimized(prevState => !prevState)
    }

    const menuItems = {
        dashboard: [
            { icon: '🏠', text: 'Home', id: 'dashboard' },
            { icon: '📦', text: 'My Orders', id: 'my-orders' },
            { icon: '❤️', text: 'Wishlist', id: 'wishlist' },
            { icon: '⭐', text: 'My Reviews', id: 'reviews' }
        ],
        settings: [
            { icon: '👤', text: 'Personal Info', id: 'personal-info' },
            { icon: '📍', text: 'Addresses', id: 'addresses' },
            { icon: '💳', text: 'Payment Methods', id: 'payment-methods' },
            { icon: '🔔', text: 'Notifications', id: 'notifications' }
        ]
    }

    return (
      <div className={`sidebar ${minimized ? 'minimised' : 'expanded'}`}>
            <button className="toggle-btn" onClick={toggleSidebar}>
                {minimized ? '>' : '<'}
            </button>
        <div className="sidebar-header">
          <div className="user-profile-top">
            <img
              src="/api/placeholder/32/32"
              alt="Profile picture"
              className="avatar"
            />
            <div className="user-info">
              <div className="user-name">Username</div>
              {/* username */}
              {/*<div className="user-username">{userData.username || '@username'}</div>*/}
            </div>
          </div>
          <h2 className="sidebar-title">My Account</h2>
        </div>

            <nav className="sidebar-nav">
                <div className="nanv-section">
                    <h3 className="nav-title">Account Overview</h3>
                    <ul className="nav-list">
                        {menuItems.dashboard.map(item => (
                            <li
                                key={item.id}
                                onClick={() => onNavigate(item.id)}
                                className={`nav-item ${activePage === item.id ? 'active' : ''}`}
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
                            {menuItems.settings.map(item => (
                                <li
                                    key={item.id}
                                    onClick={() => handleNavigate(item.id)}
                                    className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                                >
                                    <span className="nav-icon">{item.icon}</span>
                                    <span className="nav-text">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            )}

            <div className="sidebar-footer">
                <MainButton onClick={handleLogout}>
                    <span className="logout-icon">🚪</span>
                    <span>Logout</span>
                </MainButton>
            </div>
        </div>
    )
}

export default UserSidebar