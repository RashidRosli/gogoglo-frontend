import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./css/UserLogin.css";
import Navbar from "components/FrontPage/Navbar.js";
import Footer from "components/FrontPage/Footer.js";
import { AuthContext } from "../../AuthContext";

console.log("UserLogin component loaded"); // Log component load

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const UserLogin = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "", visible: false });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("Form submission triggered");
      console.log("Form submitted with data:", formData);

      const newErrors = validateForm();
      setErrors(newErrors);
      console.log("Validation errors:", newErrors);

      if (Object.keys(newErrors).length === 0) {
        setIsSubmitting(true);
        setNotification({ message: "", type: "", visible: false });
        console.log("Submitting login request to:", `${API_URL}/api/account/login`);

        try {
          const response = await axios.post(`${API_URL}/api/account/login`, {
            email: formData.email,
            password: formData.password,
          });
          console.log("Login response:", response.data);

          const { token } = response.data;
          console.log("Raw token:", token);

          const decodedToken = jwtDecode(token);
          console.log("Decoded Token:", decodedToken);

          const userRole = decodedToken.role;
          console.log("Extracted User Role:", userRole);

          setNotification({
            message: "Login successful! Redirecting...",
            type: "success",
            visible: true,
          });
          login(token);
          console.log("AuthContext login called with token");

          setTimeout(() => {
            setNotification({ ...notification, visible: false });
            const roleLower = userRole ? userRole.toLowerCase() : "undefined";
            console.log("Normalized Role:", roleLower);

            console.log("Redirect decision starting...");
            if (roleLower === "customer") {
              console.log("Redirecting to / (customer)");
              navigate("/");
            } else if (roleLower === "superadmin") {
              console.log("Redirecting to /admin-dashboard (superadmin)");
              navigate("/admin-dashboard");
            } else {
              console.log("Redirecting to /dashboard (default)", { role: roleLower });
              navigate("/dashboard");
            }
            console.log("Redirect decision completed");
          }, 2000);
        } catch (error) {
          console.error("Login error:", error.response ? error.response.data : error.message);
          setNotification({
            message:
              error.response?.data?.error === "Invalid email or password"
                ? "Invalid email or password"
                : "Login failed",
            type: "error",
            visible: true,
          });
          setTimeout(() => setNotification({ ...notification, visible: false }), 3000);
        } finally {
          setIsSubmitting(false);
          console.log("Submission complete, isSubmitting set to false");
        }
      } else {
        console.log("Form validation failed, not submitting");
      }
    } catch (error) {
      console.error("Unexpected error in handleSubmit:", error);
    }
  };

  return (
    <>
      <Navbar transparent />
      <main>
        <div className="user-login-container">
          <h2 className="login-heading">Sign In</h2>

          {notification.visible && (
            <div
              className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg text-white z-50 transition-all duration-300 ${notification.type === "success" ? "bg-green-500" : "bg-red-500"
                }`}
            >
              {notification.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {errors.general && (
              <div className="error-message-container">
                <span className="error-message">{errors.general}</span>
              </div>
            )}

            <div className="input-group">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? "invalid" : ""}`}
                placeholder="Enter your email"
                aria-label="Email"
                disabled={isSubmitting}
              />
              {errors.email && <div className="input-error">{errors.email}</div>}
            </div>

            <div className="input-group">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? "invalid" : ""} pr-12 w-full`}
                  placeholder="Enter your password"
                  aria-label="Password"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center justify-center w-10 h-full text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                >
                  {showPassword ? "👁️‍🗨️" : "👁️"}
                </button>
              </div>
              {errors.password && <div className="input-error">{errors.password}</div>}
            </div>

            <button
              type="submit"
              className={`login-button ${isSubmitting ? "disabled" : ""}`}
              disabled={isSubmitting}
              aria-label="Sign In"
              onClick={() => console.log("Submit button clicked")}
            >
              {isSubmitting ? (
                <span className="loading-text">Loading...</span>
              ) : (
                "Sign In"
              )}
              {isSubmitting && (
                <span className="spinner-container">
                  <div className="spinner" aria-hidden="true"></div>
                </span>
              )}
            </button>

            <div className="forgot-password">
              <a href="/forgot-password" aria-label="Forgot your password?">
                Forgot your password?
              </a>
            </div>

            <div className="signup-section">
              <p>
                Don’t have an account?{" "}
                <a href="/register" aria-label="Sign up">
                  Sign Up
                </a>
              </p>
            </div>

            <div className="social-login">
              <h3>Or sign in with:</h3>
              <div className="social-buttons">
                <button
                  className="social-btn facebook-btn"
                  disabled
                  aria-label="Sign in with Facebook"
                >
                  <i className="fab fa-facebook-f"></i> Facebook (Coming Soon)
                </button>
                <button
                  className="social-btn google-btn"
                  disabled
                  aria-label="Sign in with Google"
                >
                  <i className="fab fa-google"></i> Google (Coming Soon)
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UserLogin;