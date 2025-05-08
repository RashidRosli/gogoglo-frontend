import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/UserRegister.css";
import Navbar from "components/FrontPage/Navbar.js";
import Footer from "components/FrontPage/Footer.js";
import { AuthContext } from "../../AuthContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const UserRegister = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "", visible: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{9,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 9-15 digits";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setNotification({ message: "", type: "", visible: false });

      try {
        const response = await axios.post(`${API_URL}/api/account/register`, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
        });

        setNotification({
          message: "Registration successful! Redirecting to login...",
          type: "success",
          visible: true,
        });
        login(response.data.token); // Use context login method
        setTimeout(() => {
          setNotification({ ...notification, visible: false });
          navigate("/login");
        }, 2000);
      } catch (error) {
        setNotification({
          message:
            error.response?.data?.error === "Email already registered"
              ? "Email already registered"
              : "Registration failed",
          type: "error",
          visible: true,
        });
        setTimeout(() => setNotification({ ...notification, visible: false }), 3000);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <Navbar transparent />
      <main>
        <div className="user-register-container">
          <h2 className="login-heading">Sign Up</h2>
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
                <div className="error-message">{errors.general}</div>
              </div>
            )}
            <div className="input-group">
              <label htmlFor="firstName" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`form-input ${errors.firstName ? "invalid" : ""}`}
                placeholder="Enter your first name"
                disabled={isSubmitting}
              />
              {errors.firstName && <div className="input-error">{errors.firstName}</div>}
            </div>
            <div className="input-group">
              <label htmlFor="lastName" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`form-input ${errors.lastName ? "invalid" : ""}`}
                placeholder="Enter your last name"
                disabled={isSubmitting}
              />
              {errors.lastName && <div className="input-error">{errors.lastName}</div>}
            </div>
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
                disabled={isSubmitting}
              />
              {errors.email && <div className="input-error">{errors.email}</div>}
            </div>
            <div className="input-group">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number:
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`form-input ${errors.phoneNumber ? "invalid" : ""}`}
                placeholder="Enter your phone number"
                disabled={isSubmitting}
              />
              {errors.phoneNumber && <div className="input-error">{errors.phoneNumber}</div>}
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
            <div className="input-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password:
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`form-input ${errors.confirmPassword ? "invalid" : ""} pr-12 w-full`}
                  placeholder="Confirm your password"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center justify-center w-10 h-full text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isSubmitting}
                >
                  {showConfirmPassword ? "👁️‍🗨️" : "👁️"}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="input-error">{errors.confirmPassword}</div>
              )}
            </div>
            <button
              type="submit"
              className={`login-button ${isSubmitting ? "disabled" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </button>
            <div className="terms-of-service">
              By signing up, you agree to our{" "}
              <a href="/terms" className="text-blue-500">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-500">
                Privacy Policy
              </a>.
            </div>
            <div className="already-member">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500">
                Sign In
              </a>
            </div>
            <div className="social-login">
              <h3>Or sign up with:</h3>
              <div className="social-buttons">
                <button className="social-btn facebook-btn" disabled>
                  <i className="fab fa-facebook-f"></i> Facebook (Coming Soon)
                </button>
                <button className="social-btn google-btn" disabled>
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

export default UserRegister;