import React, { useState } from "react";
import { FaCreditCard, FaPaypal, FaBuildingColumns } from "react-icons/fa6";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe outside the component to avoid re-initialization
const stripePromise = loadStripe("pk_test_51PnztvDCo48pQfYszPLX5lvcbIgVLq8zBZYIr9g2nPupV65c93rIFLb6c6D2GqEZEeezBB8SDmLDkTU1OXNNhbt600lx99441p"); // Replace with your actual key

const BookingPayment = ({
  discount,
  couponCode,
  setCouponCode,
  handleApplyCoupon,
  handleCancelCoupon,
  prevStep,
  handleSubmit: parentHandleSubmit,
  finalPrice,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setError("");
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const amount = Math.round(finalPrice * 100); // Convert RM to cents

      // Call backend to create a Checkout Session
      const response = await fetch("http://localhost:3001/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "myr",
          success_url: window.location.origin + "/success", // Dynamic success URL
          cancel_url: window.location.href, // Return to current page on cancel
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { id: sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
      // Note: parentHandleSubmit is called after successful payment via success_url
    } catch (err) {
      setError(err.message || "Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Payment Information</h2>

      {/* Payment Method Selection */}
      <div className="space-y-4">
        <div className="flex flex-col space-y-3">
          <label
            className={`flex items-center space-x-3 p-4 rounded-lg border transition-all duration-300 cursor-pointer ${paymentMethod === "credit"
                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900"
                : "border-gray-300 hover:border-indigo-500 dark:border-gray-600 dark:hover:border-indigo-400"
              }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value="credit"
              checked={paymentMethod === "credit"}
              onChange={handlePaymentMethodChange}
              className="form-radio h-5 w-5 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700"
              disabled={loading}
            />
            <FaCreditCard className="text-xl text-gray-700 dark:text-gray-300" />
            <span className="text-gray-700 dark:text-gray-300">Credit/Debit Card</span>
          </label>

          <label
            className="flex items-center space-x-3 p-4 rounded-lg border border-gray-300 dark:border-gray-600 opacity-50 cursor-not-allowed"
            title="Coming Soon"
          >
            <input
              type="radio"
              name="paymentMethod"
              value="digital"
              disabled
              className="form-radio h-5 w-5 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700"
            />
            <FaPaypal className="text-xl text-gray-700 dark:text-gray-300" />
            <span className="text-gray-700 dark:text-gray-300">Digital Payment (Coming Soon)</span>
          </label>

          <label
            className="flex items-center space-x-3 p-4 rounded-lg border border-gray-300 dark:border-gray-600 opacity-50 cursor-not-allowed"
            title="Coming Soon"
          >
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              disabled
              className="form-radio h-5 w-5 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700"
            />
            <FaBuildingColumns className="text-xl text-gray-700 dark:text-gray-300" />
            <span className="text-gray-700 dark:text-gray-300">Online Banking (Coming Soon)</span>
          </label>
        </div>

        {/* Coupon Code Section */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-full sm:flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
            aria-label="Coupon code"
            disabled={loading}
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            disabled={!couponCode.trim() || loading}
            className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 disabled:bg-green-400 disabled:cursor-not-allowed"
          >
            Apply Coupon
          </button>
          {discount > 0 && (
            <button
              type="button"
              onClick={handleCancelCoupon}
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 disabled:bg-red-400 disabled:cursor-not-allowed"
            >
              Cancel Coupon
            </button>
          )}
        </div>

        {/* Discount Info */}
        {discount > 0 && (
          <p className="text-green-600 dark:text-green-400 text-sm">
            Coupon applied: {discount * 100}% discount
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm" role="alert">
            {error}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <button
            type="button"
            onClick={prevStep}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            aria-label="Back to previous step"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handlePayment}
            disabled={loading || !paymentMethod}
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPayment;