// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("_id");

  // if NOT logged in → redirect to login
  if (!token || !userId) {
    return <Navigate to="/" replace />;
  }

  // if logged in → allow access
  return <Outlet />;
};

export default ProtectedRoute;
