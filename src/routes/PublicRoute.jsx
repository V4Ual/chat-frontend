// src/routes/PublicRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("_id");

  if (token && userId) {
    return <Navigate to={`/${userId}/chat`} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
