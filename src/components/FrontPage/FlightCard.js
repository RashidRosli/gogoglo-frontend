import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import PropTypes from "prop-types";

const FlightCard = ({
  airlines,
  departure,
  arrival,
  departureTime,
  arrivalTime,
  duration,
  stops,
  legs,
  fareTypes,
  travelClass = "Economy",
  onFareSelect,
}) => {
  const [selectedFare, setSelectedFare] = React.useState(null);

  const handleFareSelect = (fare) => {
    setSelectedFare(selectedFare?.name === fare.name ? null : fare); // Toggle selection
  };

  // Format duration for display
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 truncate" title={airlines.join(", ")}>
            {airlines.join(", ")}
          </h3>
          <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
            {travelClass}
          </span>
        </div>

        {/* Flight Times and Route */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-center">
            <span className="block text-2xl font-bold text-gray-900">{departureTime}</span>
            <span className="text-sm text-gray-600">{departure}</span>
          </div>
          <div className="flex-1 mx-4 relative">
            <div className="h-1 bg-gray-200 rounded-full">
              <div className="h-1 bg-indigo-500 rounded-full" style={{ width: "50%" }}></div>
            </div>
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-gray-500 bg-white px-1">
              {formatDuration(duration)}
            </span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-bold text-gray-900">{arrivalTime}</span>
            <span className="text-sm text-gray-600">{arrival}</span>
          </div>
        </div>

        {/* Flight Details */}
        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-6 bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>{stops === 0 ? "Non-stop" : `${stops} Stop${stops > 1 ? "s" : ""}`}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{formatDuration(duration)}</span>
          </div>
          <div className="flex items-center truncate">
            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m-12 5h12m0 0l-4-4m4 4l-4 4" />
            </svg>
            <span title={airlines.join(", ")}>{airlines[0]}</span>
          </div>
        </div>

        {/* Flight Segments */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Flight Segments</h4>
          {legs.map((leg, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">
                  {leg.departureAirport} → {leg.arrivalAirport}
                </div>
                <div className="text-xs text-gray-500">
                  {leg.departureTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                  {leg.arrivalTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <FaArrowRight className="text-indigo-500 mr-2" />
                <span>{leg.airplane}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Fare Options */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">Fare Options</h4>
          {fareTypes
            .filter((fare) => fare.travelClass === travelClass)
            .map((fare, index) => (
              <div
                key={index}
                className={`border rounded-lg p-4 transition-all duration-200 ${selectedFare?.name === fare.name
                    ? "bg-indigo-50 border-indigo-200 shadow-md"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
              >
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleFareSelect(fare)}
                    className="text-left flex-1"
                  >
                    <h5 className="text-md font-semibold text-gray-900">{fare.name}</h5>
                    <p className="text-xs text-gray-600 mt-1">
                      {fare.seat} | {fare.bags} | {fare.flexibility}
                    </p>
                  </button>
                  <span className="text-lg font-bold text-indigo-600">{fare.price}</span>
                </div>

                {selectedFare?.name === fare.name && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-700 space-y-2">
                      <div className="flex justify-between">
                        <span>Seat:</span>
                        <span className="font-medium">{selectedFare.seat}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bags:</span>
                        <span className="font-medium">{selectedFare.bags}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Flexibility:</span>
                        <span className="font-medium">{selectedFare.flexibility}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onFareSelect(selectedFare)}
                      className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
                    >
                      Book Now
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

FlightCard.propTypes = {
  airlines: PropTypes.arrayOf(PropTypes.string).isRequired,
  departure: PropTypes.string.isRequired,
  arrival: PropTypes.string.isRequired,
  departureTime: PropTypes.string.isRequired,
  arrivalTime: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  stops: PropTypes.number.isRequired,
  legs: PropTypes.arrayOf(
    PropTypes.shape({
      departureAirport: PropTypes.string,
      arrivalAirport: PropTypes.string,
      departureTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]), // Updated to accept Date
      arrivalTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),    // Updated to accept Date
      airplane: PropTypes.string,
    })
  ).isRequired,
  fareTypes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.string,
      seat: PropTypes.string,
      bags: PropTypes.string,
      flexibility: PropTypes.string,
      travelClass: PropTypes.string,
      seatSelection: PropTypes.bool,
    })
  ).isRequired,
  travelClass: PropTypes.string,
  onFareSelect: PropTypes.func.isRequired,
};

export default FlightCard;