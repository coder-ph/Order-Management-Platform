import { useContext } from "react"
import React from "react"
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { selectRole, selectisAuthenticated } from "./Redux/Auth/authsSelectors"
import Login from './Pages/LoginPage'
import ForgotPassword from "./Pages/ForgotPassword"
import AdminDashboard from "./Components/AdminDashboard"
import UserDashboard from "./Components/UserDashboard"
import DriverDashboard from "./Components/DriverDashboard"
import SetNewPassword from "./Pages/SetNewPassword"
import SignupPage from './Pages/SignupPage'
import AdminMap from "./Pages/AdminMap"
import AdminSidebar from "./Components/AdminSidebar"
import LoginForm from "./Pages/LoginPage"
// import UserSidebar from "./Components/UserSidebar"
import ResetPasswordPage from "./Pages/ResetPasswordPage"
import ProductPage from "./Pages/ProductPage"

import ProductManagement from "./Pages/InventoryManagementPage"
import UserSidebar from "./Components/UserSidebar"
import LandingPage from "./Pages/LandingPage"
import Ap from "./scenes/dashboard/App"
import AdDashboard from "./scenes/dashboard/AdDashboard"
import CategorySection from "./Components/CategorySection"
import './App.css'
import Orders from "./scenes/ManageOrders/ManageOrders"
import ProductDetails from "./Components/ProductDetails"
import { mockProducts } from "./assets/UserMockData";
import PaymentPage from "./Pages/paymentPage"
import CheckoutPage from "./Components/Checkout/Checkout"
import ChangeDeliveryPage from "./Components/Checkout/ChangeDeliveryPage"
import ChangeAddressPage from "./Components/Checkout/ChangeAddressPage"
import Tracking from "./Components/tracking/Tracking"
import UserProfile from "./Components/UserProfile"
import OrderDetails from "./scenes/ManageOrders/OrderDetails"
import EditUserProfile from "./Components/EditProfile"


const PrivateRoute = ({ role, element, fallbackPath }) => {
  const isAuthenticated = true; 
  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} replace />;
  }
  return role ? element : <Navigate to="/login" replace />;
};

const App = () => {
  const isAuthenticated = true; 
  const role = "user"; 

  return (
    <Router>
      <Routes>
        
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<SetNewPassword />} />
        <Route path="/reset-code" element={<ResetPasswordPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/products" element={<ProductManagement />} />
        <Route path="/user-products" element={<ProductPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/change-address" element={<ChangeAddressPage />} />
        <Route path="/change-delivery" element={<ChangeDeliveryPage />} />
        <Route path="/track-order" element={<Tracking />} />
        <Route path="/product/:id" element={<ProductDetails products={mockProducts} />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/edit-profile" element={<EditUserProfile />} />
        <Route path="/dashboard/orders/:id" element={<OrderDetails />} />

       
        <Route path="/dashboard/*" element={<Ap />} />

        
        <Route
          path="/admin/*"
          element={
            <PrivateRoute
              role={role === "Admin"}
              element={<AdminDashboard />}
              fallbackPath="/login"
            />
          }
        />
        <Route
          path="/user/*"
          element={
            <PrivateRoute
              role={role === "user"}
              element={<UserDashboard />}
              fallbackPath="/login"
            />
          }
        />
        <Route
          path="/driver/*"
          element={
            <PrivateRoute
              role={role === "driver"}
              element={<DriverDashboard />}
              fallbackPath="/login"
            />
          }
        />

        
        <Route
          path="*"
          element={
            isAuthenticated ? (
              role === "Admin" ? (
                <Navigate to="/admin" replace />
              ) : role === "user" ? (
                <Navigate to="/user" replace />
              ) : role === "driver" ? (
                <Navigate to="/driver" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;