import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  ShoppingBag,
  Heart,
  Star,
  User,
  MapPin,
  CreditCard,
  Bell,
  LogOut
} from "lucide-react"

const Sidebar = ({ activePage, userData, onLogout }) => {
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
      { icon: <Home size={24} />, text: 'Home', id: 'dashboard' },
      { icon: <ShoppingBag size={24} />, text: 'My Orders', id: 'my-orders' },
      { icon: <Heart size={24} />, text: 'Wishlist', id: 'wishlist' },
      { icon: <Star size={24} />, text: 'My Reviews', id: 'reviews' }
    ],
    settings: [
      { icon: <User size={24} />, text: 'Personal Info', id: 'personal-info' },
      { icon: <MapPin size={24} />, text: 'Addresses', id: 'addresses' },
      { icon: <CreditCard size={24} />, text: 'Payment Methods', id: 'payment-methods' },
      { icon: <Bell size={24} />, text: 'Notifications', id: 'notifications' }
    ]
  }

  //default values
  const username = userData?.username || "Him";
  const profilePicture = userData?.profilePicture || "/api/placeholder/32/32";

  return (
    <div
      className={`h-screen bg-gray-700 text-white ${
        minimized ? "w-24" : "w-64"
      } transition-all duration-300 p-3 relative`}
    >
      <button onClick={toggleSidebar} className="absolute top-4 right-4 text-white">
        {minimized ? <Menu size={24} /> : <X size={24} />}
      </button>

      <div className="flex flex-col items-center mt-10">
        <img
          src={profilePicture}
          alt="Profile"
          className="w-16 h-16 rounded-full bg-gray-500 mb-3"
        />
        {!minimized && (
          <div className="text-center">
            <p className="font-medium text-lg">{username}</p>
            {userData?.email && <p className="text-xs text-gray-300">{userData.email}</p>}
          </div>
        )}
      </div>

      {!minimized && <h2 className="text-xl font-semibold mt-6 text-center">My Account</h2>}

      <div className="mt-10">
        {!minimized && <p className="text-gray-400 text-sm mb-3 pl-2">ACCOUNT OVERVIEW</p>}
        <ul className="space-y-3">
          {menuItems.dashboard.map(item => (
            <li
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`p-3 rounded-md flex items-center cursor-pointer ${
                activePage === item.id ? "bg-gray-600" : "hover:bg-gray-600"
              }`}
            >
              <span className="mr-4">{item.icon}</span>
              {!minimized && <span className="text-base">{item.text}</span>}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        {!minimized && <p className="text-gray-400 text-sm mb-3 pl-2">PROFILE SETTINGS</p>}
        <ul className="space-y-3">
          {menuItems.settings.map(item => (
            <li
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`p-3 rounded-md flex items-center cursor-pointer ${
                activePage === item.id ? "bg-gray-600" : "hover:bg-gray-600"
              }`}
            >
              <span className="mr-4">{item.icon}</span>
              {!minimized && <span className="text-base">{item.text}</span>}
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-8 left-0 right-0 px-3">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center text-red-400 hover:text-red-300 w-full p-3 rounded-md hover:bg-gray-600"
        >
          <LogOut size={24} className="mr-2" />
          {!minimized && <span className="text-base">Logout</span>}
        </button>
      </div>
    </div>
  )
}

export default Sidebar;