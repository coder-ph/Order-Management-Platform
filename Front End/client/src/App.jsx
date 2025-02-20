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

function App() {
  
  const isAuthenticated = useSelector(selectisAuthenticated);
  const role = useSelector(selectRole);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SetNewPassword />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>

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
            <Route
              path="*"
              element={
                role === "admin" ? (
                  <Navigate to="/admin" />
                ) : role === "user" ? (
                  <Navigate to="/user" />
                ) : role === "driver" ? (
                  <Navigate to="/driver" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
  
}

export default App
