import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  User,
  ShoppingCart,
  MapPin,
  Settings,
  LayoutDashboard,
  HelpCircle,
  MessageCircle,
  LogOut,
} from "lucide-react";

const AdminSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [active, setActive] = useState("Products");

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`h-screen bg-gray-700 text-white ${
        isExpanded ? "w-40 h-screen" : "w-30"
      } transition-all duration-300 p-3 relative`}
    >
      <button onClick={toggleSidebar} className="absolute top-4 right-4">
        {isExpanded ? <X size={20} /> : <Menu size={20} />}
      </button>
      <div className="flex flex-col items-center mt-10">
        <User size={50} className="mb-2 rounded-full bg-gray-500 p-1" />
        {isExpanded && <p className="text-sm">Administrator</p>}
      </div>
      <div className="mt-10">
        <p className="text-gray-400 text-sm mb-2 pt-15">MASTER DATA</p>
        <ul>
          <li
            className={`p-2 flex items-center ${
              active === "Products" ? "bg-gray-600" : ""
            }`}
          >
            <Link
              to="/products"
              onClick={() => setActive("Products")}
              className="flex items-center w-full"
            >
              <ShoppingCart size={20} className="mr-2" />
              {isExpanded && "Products"}
            </Link>
          </li>
          <li
            className={`p-2 flex items-center ${
              active === "Track Order" ? "bg-gray-600" : ""
            }`}
          >
            <Link
              to="/track-orders"
              onClick={() => setActive("Track Order")}
              className="flex items-center w-full"
            >
              <MapPin size={20} className="mr-2" />
              {isExpanded && "Track Orders"}
            </Link>
          </li>
          <li
            className={`p-2 flex items-center ${
              active === "Settings" ? "bg-gray-600" : ""
            }`}
          >
            <Link
              to="/settings"
              onClick={() => setActive("Settings")}
              className="flex items-center w-full"
            >
              <Settings size={20} className="mr-2" />
              {isExpanded && "Settings"}
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-6 pt-8">
        <p className="text-gray-400 text-sm mb-2">MAIN MENU</p>
        <ul>
          <li
            className={`p-2 flex items-center ${
              active === "Dashboard" ? "bg-gray-600" : ""
            }`}
          >
            <Link
              to="/dashboard"
              onClick={() => setActive("Dashboard")}
              className="flex items-center w-full"
            >
              <LayoutDashboard size={20} className="mr-2" />
              {isExpanded && "Dashboard"}
            </Link>
          </li>
          <li
            className={`p-2 flex items-center ${
              active === "Help" ? "bg-gray-600" : ""
            }`}
          >
            <Link
              to="/help"
              onClick={() => setActive("Help")}
              className="flex items-center w-full"
            >
              <HelpCircle size={20} className="mr-2" />
              {isExpanded && "Help"}
            </Link>
          </li>
          <li
            className={`p-2 flex items-center ${
              active === "Chat Support" ? "bg-gray-600" : ""
            }`}
          >
            <Link
              to="/chat-support"
              onClick={() => setActive("Chat Support")}
              className="flex items-center w-full"
            >
              <MessageCircle size={20} className="mr-2" />
              {isExpanded && "Chat"}
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-6">
        <ul>
          <li className="p-2 flex items-center cursor-pointer text-red-400 hover:bg-transparent pt-30">
            <LogOut size={20} className="mr-2" />
            {isExpanded && "Log Out"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
