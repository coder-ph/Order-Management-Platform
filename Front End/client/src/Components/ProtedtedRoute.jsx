import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import ProductManagement from './Pages/ProductManagement';
import TrackOrders from './Pages/TrackOrders';
import Settings from './Pages/Settings';
import Help from './Pages/Help';
import ChatSupport from './Pages/ChatSupport';
import NotFound from './Pages/NotFound';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/product-management" element={<ProtectedRoute><ProductManagement /></ProtectedRoute>} />
        <Route path="/track-orders" element={<ProtectedRoute><TrackOrders /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
        <Route path="/chat-support" element={<ProtectedRoute><ChatSupport /></ProtectedRoute>} />
        
        {/* Redirect to dashboard if accessing the base URL */}
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;