import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/UserForgotPassword.css';
import Navbar from 'components/FrontPage/Navbar.js';
import Footer from 'components/FrontPage/Footer.js';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_URL}/api/account/forgot-password`, { email });
      setSuccessMessage(response.data.message || 'Password reset link has been sent to your email.');
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar transparent />
      <main>
        <div className="passwordReset-container">
          <h2 className="passwordReset-heading">Forgot Your Password?</h2>
          <p className="passwordReset-description">
            Enter your email address below, and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="passwordReset-form">
            {successMessage && (
              <div className="passwordReset-success-message" aria-live="polite">
                <p>{successMessage}</p>
              </div>
            )}

            {error && (
              <div className="passwordReset-error-message" aria-live="polite">
                <p>{error}</p>
              </div>
            )}

            <div className="passwordReset-input-group">
              <label htmlFor="email" className="passwordReset-form-label">
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`passwordReset-form-input ${error ? 'invalid' : ''}`}
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              className={`passwordReset-submit-button ${isSubmitting ? 'disabled' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>
                  Sending... <i className="fas passwordReset-fa-spinner fa-spin"></i>
                </span>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          <div className="passwordReset-back-to-login">
            <p>
              Remembered your password? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ForgotPassword;