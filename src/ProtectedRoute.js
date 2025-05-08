import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom"; // Add useLocation
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, token } = useAuth();
  const location = useLocation(); // Get current location
  const userRole = token ? jwtDecode(token).role : null;

  if (!isLoggedIn && location.pathname !== "/") {
    console.log("ProtectedRoute: Not logged in, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  if (children && !children.includes(userRole)) {
    console.log(`ProtectedRoute: Role ${userRole} not allowed, redirecting to /`);
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;