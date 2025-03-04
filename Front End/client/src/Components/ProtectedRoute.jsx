import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roles }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; 
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/unauthorized" replace />; 
  }

  return <Outlet />; 
};

export default ProtectedRoute;
