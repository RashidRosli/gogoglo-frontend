import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

import Home from "views/FrontPage/Home.js";
import ListTour from "views/FrontPage/ListTour.js";
import ListHotel from "views/FrontPage/ListHotel.js";
import ListFlight from "views/FrontPage/ListFlight.js";
import DetailTour from "views/FrontPage/DetailTour.js";
import DetailHotel from "views/FrontPage/DetailHotel.js";
import Booking from "views/FrontPage/Booking.js";
import Checkout from "views/FrontPage/Checkout.js";
import Confirmation from "views/FrontPage/Confirmation.js";
import About from "views/FrontPage/About.js";
import Contact from "views/FrontPage/Contact.js";
import FAQs from "views/FrontPage/FAQs.js";
import Destination from "views/FrontPage/Destination.js";
import UserRegister from "views/FrontPage/UserRegister.js";
import UserLogin from "views/FrontPage/UserLogin.js";
import UserForgotPassword from "views/FrontPage/UserForgotPassword.js";
import UserResetPassword from "views/FrontPage/UserResetPassword.js";
import PaymentSuccess from "views/FrontPage/PaymentSuccess.js";
import PaymentCancel from "views/FrontPage/PaymentCancel.js";
import Dashboard from "views/Dashboard/Dashboard.js";
import SuperAdminDashboard from "views/Dashboard/SuperAdminDashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<ListTour />} />
          <Route path="/hotels" element={<ListHotel />} />
          <Route path="/flights" element={<ListFlight />} />
          <Route path="/tours/detail-tour" element={<DetailTour />} />
          <Route path="/hotels/detail-hotel" element={<DetailHotel />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thank-you" element={<Confirmation />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/destination" element={<Destination />} />

          {/* Public routes for logged-out users */}
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/forgot-password" element={<UserForgotPassword />} />
          <Route path="/reset-password/:token" element={<UserResetPassword />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/cancel" element={<PaymentCancel />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<SuperAdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </AuthProvider>
  </>
);