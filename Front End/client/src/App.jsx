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

function App() {
  const isAuthenticated = useSelector(selectisAuthenticated);
  const role = useSelector(selectRole);

  return (
    <Router>
      <Routes>
        {/* The dashboard layout is rendered for any route starting with /dashboard */}
        <Route path="/dashboard/*" element={<Ap />} />
        <Route path="/" element={<LandingPage />} />

        {/* Other public routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<SetNewPassword />} />
        <Route path="/reset-code" element={<ResetPasswordPage />} />
        <Route path="/signup" element={<SignupPage />} />


        {/* Role-based private routes */}
        {isAuthenticated ? (
          <>
            {role === "Admin" && (
              <Route path="/admin/*" element={<AdminDashboard />} />
            )}
            {role === "user" && (
              <Route path="/user/*" element={<UserDashboard />} />
            )}
            {role === "driver" && (
              <Route path="/driver/*" element={<DriverDashboard />} />
            )}
            {/* Fallback redirect based on role */}
            <Route
              path="*"
              element={
                role === "Admin" ? (
                  <Navigate to="/admin" replace />
                ) : role === "user" ? (
                  <Navigate to="/user" replace />
                ) : role === "driver" ? (
                  <Navigate to="/driver" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;