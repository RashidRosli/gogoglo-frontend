import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import TempBookingData from "../../views/Data/TempBooking";
import TourData from "../../views/Data/tourData";
import HotelData from "../../views/Data/hotelData";
import FlightData from "../../views/Data/flightData";
import BookingSummary from "components/FrontPage/BookingSummary";
import BookingPayment from "components/FrontPage/BookingPayment";
import BookingForm from "components/FrontPage/BookingForm"; // Updated import
import Navbar from "components/FrontPage/Navbar.js";
import Footer from "components/FrontPage/Footer.js";

// Progress Bar Component (unchanged)
const ProgressBar = ({ steps, currentStep }) => {
  const progressWidth = ((currentStep - 1) / (steps.length - 1)) * 100;
  return (
    <div className="w-full max-w-3xl mx-auto mb-12 px-4">
      <div className="relative bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-blue-600 transition-all duration-500 ease-in-out"
          style={{ width: `${progressWidth}%` }}
        />
      </div>
      <div className="flex justify-between mt-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col items-center transition-all duration-300 ${currentStep > index
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-gray-500 dark:text-gray-400"
              }`}
          >
            <span
              className={`w-10 h-10 flex items-center justify-center rounded-full mb-2 text-sm font-semibold ${currentStep > index
                ? "bg-indigo-600 text-white dark:bg-indigo-500"
                : "bg-gray-200 text-gray-500 dark:bg-gray-600 dark:text-gray-300"
                }`}
            >
              {index + 1}
            </span>
            <span className="text-sm font-medium">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Booking = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [tourDetails, setTourDetails] = useState(null);
  const [hotelDetails, setHotelDetails] = useState(null);
  const [flightDetails, setFlightDetails] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [isLoading, setIsLoading] = useState(true);

  // Lifted form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    specialRequest: "",
  });

  const steps = ["Guest Details", "Payment", "Confirmation"];
  const coupons = { DISCOUNT10: 0.1, SUMMER20: 0.2, WELCOME5: 0.05 };

  useEffect(() => {
    const fetchData = async () => {
      const bookingId = searchParams.get("id");
      if (!bookingId) return console.error("No booking ID found in URL");

      const booking = TempBookingData.find((data) => data.id === bookingId);
      if (!booking) return console.error("Booking not found");

      const normalizedBooking = {
        ...booking,
        passengers: {
          adults: booking.type === "flight" ? booking.passengers?.adults : booking.adults || 0,
          children: booking.type === "flight" ? booking.passengers?.children : booking.children || 0,
          infants: booking.type === "flight" ? booking.passengers?.infants : 0,
        },
      };
      setBookingDetails(normalizedBooking);

      if (booking.type === "tour") {
        setTourDetails(TourData.find((tour) => tour.id === booking.tourId) || null);
      } else if (booking.type === "hotel") {
        setHotelDetails(HotelData.find((hotel) => hotel.id === booking.hotelId) || null);
      } else if (booking.type === "flight") {
        setFlightDetails(FlightData.find((flight) => flight.id === booking.flightId) || null);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [searchParams]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isModalOpen) setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isModalOpen]);

  const calculateTotalPrice = () => {
    if (!bookingDetails) return 0;
    switch (bookingDetails.type) {
      case "tour":
        return bookingDetails.price * (bookingDetails.adults + bookingDetails.children);
      case "hotel":
        return parseFloat(hotelDetails?.price.replace(/[^\d.-]/g, "") || 0);
      case "flight":
        return (
          parseFloat(bookingDetails.farePrice.replace(/[^\d.-]/g, "") || 0) *
          (bookingDetails.passengers.adults + bookingDetails.passengers.children + bookingDetails.passengers.infants)
        );
      default:
        return 0;
    }
  };

  const handleApplyCoupon = () => {
    const discountValue = coupons[couponCode.trim()];
    if (discountValue) {
      setDiscount(discountValue);
      alert(`Coupon applied! ${discountValue * 100}% discount added.`);
    } else {
      alert("Invalid coupon code.");
    }
  };

  const handlePaymentSubmit = () => {
    setCurrentStep(3);
    setTimeout(() => {
      alert("Booking confirmed! A confirmation email has been sent to your inbox.");
    }, 1000);
  };

  const totalPrice = calculateTotalPrice();
  const discountedPrice = (totalPrice * (1 - discount)).toFixed(2);
  const serviceFee = (discountedPrice * 0.1).toFixed(2);
  const finalPrice = (+discountedPrice + +serviceFee).toFixed(2);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <ClipLoader color={darkMode ? "#fff" : "#4f46e5"} size={50} />
      </div>
    );
  }

  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Booking Not Found</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Please check your URL or contact support.</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar transparent />
      <div
        className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-gray-100"
          } transition-colors duration-500`}
      >
        <div className="max-w-7xl mx-auto relative">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="fixed top-4 right-4 z-50 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-lg"
            aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <h1
            className={`text-4xl font-extrabold text-center mb-12 ${darkMode ? "text-white" : "text-gray-800"
              } animate-fade-in`}
          >
            Complete Your Booking
          </h1>

          <ProgressBar steps={steps} currentStep={currentStep} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-20 transition-all duration-300 hover:shadow-xl">
                <BookingSummary
                  details={bookingDetails}
                  tourDetails={tourDetails}
                  hotelDetails={hotelDetails}
                  flightDetails={flightDetails}
                  totalPrice={totalPrice}
                  discountedPrice={discountedPrice}
                  serviceFee={serviceFee}
                  finalPrice={finalPrice}
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Price Breakdown</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Base Price</span>
                    <span className="font-medium text-gray-900 dark:text-white">RM {totalPrice.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Discount ({discount * 100}%)</span>
                      <span className="text-green-600 dark:text-green-400">
                        - RM {(totalPrice * discount).toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Service Fee (10%)</span>
                    <span className="font-medium text-gray-900 dark:text-white">RM {serviceFee}</span>
                  </div>
                  <div className="flex justify-between border-t pt-3 dark:border-gray-700">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                    <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                      RM {finalPrice}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                {currentStep === 1 && (
                  <BookingForm
                    formData={formData}
                    setFormData={setFormData}
                    handleGuestDetailsSubmit={(details) => {
                      setFormData(details); // Update parent state
                      console.log("Guest Details:", details);
                      setCurrentStep(2);
                    }}
                  />
                )}
                {currentStep === 2 && (
                  <BookingPayment
                    discount={discount}
                    couponCode={couponCode}
                    setCouponCode={setCouponCode}
                    handleApplyCoupon={handleApplyCoupon}
                    handleCancelCoupon={() => {
                      setCouponCode("");
                      setDiscount(0);
                      alert("Coupon canceled.");
                    }}
                    prevStep={() => setCurrentStep(1)}
                    handleSubmit={handlePaymentSubmit}
                    finalPrice={finalPrice}
                  />
                )}
                {currentStep === 3 && (
                  <div className="text-center animate-fade-in">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Booking Confirmed!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Reference: <span className="font-medium">{bookingDetails.id}</span>
                    </p>
                    <button
                      onClick={() => (window.location.href = "/")}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md"
                    >
                      Return Home
                    </button>
                  </div>
                )}
              </div>

              {(bookingDetails.type === "tour" && tourDetails?.policies) ||
                (bookingDetails.type === "hotel" && hotelDetails?.policies) ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {bookingDetails.type === "tour" ? "Tour Policies" : "Hotel Policies"}
                  </h3>
                  {bookingDetails.type === "tour" && (
                    <ul className="space-y-2 list-disc pl-5 text-gray-600 dark:text-gray-300">
                      {tourDetails.policies.slice(0, 3).map((policy, index) => (
                        <li key={index}>{policy}</li>
                      ))}
                    </ul>
                  )}
                  {bookingDetails.type === "hotel" && (
                    <div className="space-y-4">
                      {hotelDetails.policies.slice(0, 2).map((category, index) => (
                        <div key={index}>
                          <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                            {category.name}
                          </h4>
                          <ul className="space-y-2 list-disc pl-5 text-gray-600 dark:text-gray-300">
                            {category.items.slice(0, 3).map((policy, idx) => (
                              <li key={idx}>{policy}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                  {((bookingDetails.type === "tour" && tourDetails.policies.length > 3) ||
                    (bookingDetails.type === "hotel" && hotelDetails.policies.length > 2)) && (
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-300"
                      >
                        View Full Policies
                      </button>
                    )}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in"
            role="dialog"
            aria-labelledby="modal-title"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-[90vw] sm:max-w-2xl max-h-[80vh] overflow-y-auto p-4 sm:p-6">
              <h3
                id="modal-title"
                className="text-2xl font-semibold text-gray-900 dark:text-white mb-4"
              >
                {bookingDetails.type === "tour" ? "Full Tour Policies" : "Full Hotel Policies"}
              </h3>
              {bookingDetails.type === "tour" ? (
                <ul className="space-y-2 list-disc pl-5 text-gray-600 dark:text-gray-300">
                  {tourDetails?.policies.map((policy, index) => (
                    <li key={index}>{policy}</li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-4">
                  {hotelDetails?.policies.map((category, index) => (
                    <div key={index}>
                      <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">{category.name}</h4>
                      <ul className="space-y-2 list-disc pl-5 text-gray-600 dark:text-gray-300">
                        {category.items.map((policy, idx) => (
                          <li key={idx}>{policy}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md"
                  aria-label="Close modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Booking;