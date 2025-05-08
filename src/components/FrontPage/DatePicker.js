import React from "react";

function DatePicker({ bookingType, onDatesChange }) {
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    onDatesChange({ start: selectedDate, end: selectedDate });
  };

  return (
    <div className="mb-4">
      <label htmlFor="dates" className="block font-medium mb-2">
        {bookingType === "hotel" ? "Check-in/Check-out Dates" : "Select Dates"}
      </label>
      <input
        type="date"
        id="dates"
        className="border border-gray-400 p-2 rounded-md w-full"
        onChange={handleDateChange}
      />
    </div>
  );
}

export default DatePicker;