import React, { useState } from "react";

const BookingForm = ({ formData, setFormData, handleGuestDetailsSubmit }) => {
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSpecialRequest, setShowSpecialRequest] = useState(!!formData.specialRequest); // Show if already filled

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{9,15}$/.test(formData.phoneNumber.replace(/\D/g, ""))) {
      newErrors.phoneNumber = "Phone number must be 9-15 digits";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    return newErrors;
  };

  const handleBlur = (e) => {
    const validationErrors = validateForm();
    setErrors((prev) => ({ ...prev, [e.target.name]: validationErrors[e.target.name] || "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await handleGuestDetailsSubmit(formData);
      } catch (error) {
        console.error("Submission failed:", error);
        setErrors({ ...errors, general: "Something went wrong. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const isFormValid =
    Object.values(errors).every((error) => error === "") &&
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.phoneNumber.trim() &&
    formData.email.trim();

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 15)}`;
  };

  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Guest Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.firstName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-indigo-500 dark:border-gray-600"
              } dark:bg-gray-700 dark:text-white`}
            aria-required="true"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            disabled={isSubmitting}
          />
          {errors.firstName && (
            <p id="firstName-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.lastName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-indigo-500 dark:border-gray-600"
              } dark:bg-gray-700 dark:text-white`}
            aria-required="true"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            disabled={isSubmitting}
          />
          {errors.lastName && (
            <p id="lastName-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.lastName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="e.g., 012-345-6789"
            value={formatPhoneNumber(formData.phoneNumber)}
            onChange={(e) =>
              handleChange({
                target: { name: "phoneNumber", value: e.target.value.replace(/\D/g, "") },
              })
            }
            onBlur={handleBlur}
            className={`mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.phoneNumber
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-indigo-500 dark:border-gray-600"
              } dark:bg-gray-700 dark:text-white`}
            aria-required="true"
            aria-invalid={!!errors.phoneNumber}
            aria-describedby={errors.phoneNumber ? "phoneNumber-error" : undefined}
            disabled={isSubmitting}
          />
          {errors.phoneNumber && (
            <p id="phoneNumber-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.phoneNumber}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-indigo-500 dark:border-gray-600"
              } dark:bg-gray-700 dark:text-white`}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="showSpecialRequest"
            checked={showSpecialRequest}
            onChange={() => setShowSpecialRequest(!showSpecialRequest)}
            className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700"
            disabled={isSubmitting}
          />
          <label
            htmlFor="showSpecialRequest"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Add a special request
          </label>
        </div>

        {showSpecialRequest && (
          <div>
            <label
              htmlFor="specialRequest"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Special Request
            </label>
            <textarea
              id="specialRequest"
              name="specialRequest"
              placeholder="Any special requests?"
              value={formData.specialRequest}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
              rows="3"
              aria-describedby="specialRequest-desc"
              disabled={isSubmitting}
            />
            <p id="specialRequest-desc" className="text-gray-500 text-sm mt-1 dark:text-gray-400">
              Let us know if you have any specific needs.
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`w-full px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${isFormValid && !isSubmitting
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-gray-400 cursor-not-allowed"
            }`}
          aria-label="Proceed to payment"
        >
          {isSubmitting ? "Submitting..." : "Next"}
        </button>

        {errors.general && (
          <p className="text-red-500 text-sm text-center" role="alert">
            {errors.general}
          </p>
        )}
      </form>
    </div>
  );
};

export default BookingForm;