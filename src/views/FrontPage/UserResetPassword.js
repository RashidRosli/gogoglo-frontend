import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './css/UserResetPassword.css'; // New CSS file
import Navbar from 'components/FrontPage/Navbar.js';
import Footer from 'components/FrontPage/Footer.js';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const ResetPassword = () => {
  const { token } = useParams(); // Extract token from URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!password || !confirmPassword) {
      setError('Both password fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Optional: Add password strength validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      setSuccessMessage(response.data.message || 'Your password has been reset successfully.');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password. The link may be invalid or expired.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar transparent />
      <main>
        <div className="passwordReset-container">
          <h2 className="passwordReset-heading">Reset Your Password</h2>
          <p className="passwordReset-description">
            Enter your new password below to reset your account.
          </p>

          <form onSubmit={handleSubmit} className="passwordReset-form">
            {successMessage && (
              <div className="passwordReset-success-message" aria-live="polite">
                <p>{successMessage} <Link to="/login">Sign in now</Link></p>
              </div>
            )}

            {error && (
              <div className="passwordReset-error-message" aria-live="polite">
                <p>{error}</p>
              </div>
            )}

            <div className="passwordReset-input-group">
              <label htmlFor="password" className="passwordReset-form-label">
                New Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`passwordReset-form-input ${error ? 'invalid' : ''}`}
                placeholder="Enter new password"
                required
              />
            </div>

            <div className="passwordReset-input-group">
              <label htmlFor="confirmPassword" className="passwordReset-form-label">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`passwordReset-form-input ${error ? 'invalid' : ''}`}
                placeholder="Confirm new password"
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
                  Resetting... <i className="fas passwordReset-fa-spinner fa-spin"></i>
                </span>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>

          <div className="passwordReset-back-to-login">
            <p>
              Back to <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ResetPassword;