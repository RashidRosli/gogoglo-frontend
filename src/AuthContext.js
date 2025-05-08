import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
    console.log("AuthContext: Logout completed, token cleared");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { logout, ...rest } = context;

  const logoutWithRedirect = () => {
    console.log("useAuth: Starting logout process");
    logout();
    console.log("useAuth: Logout called, attempting redirect");
    setTimeout(() => {
      navigate("/", { replace: true });
      console.log("useAuth: Redirected to / after logout");
    }, 0); // Delay to ensure state updates complete
  };

  return { ...rest, logout: logoutWithRedirect };
};