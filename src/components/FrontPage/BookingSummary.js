import React from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaClock,
  FaHourglass,
  FaStopCircle,
  FaPlane,
  FaBed,
  FaCheckCircle,
  FaWifi,
  FaSwimmingPool,
  FaDumbbell,
  FaConciergeBell
} from "react-icons/fa";

const BookingSummary = ({
  details,
  tourDetails,
  hotelDetails,
  flightDetails,
  totalPrice,
  discountedPrice,
  serviceFee,
  finalPrice
}) => {
  if (!details) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    );
  }

  const {
    type,
    passengers = {},
    dateStart,
    start,
    end,
    hotelName,
    hotelLocation,
    features,
    hotelFacilities,
    size,
    startDate,
    endDate,
    flightNumber,
    fareName,
    combinedRoomData = []
  } = details;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  };

  const formattedStartDate = formatDate(dateStart);
  const fareType = flightDetails?.fareTypes?.find(fare => fare.name === fareName);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const renderImage = () => {
    if (details.mainImage) {
      return (
        <div className="relative overflow-hidden rounded-lg shadow-md w-full h-48">
          <img
            src={details.mainImage}
            alt={type === "tour" ? details.title : type === "hotel" ? hotelName : `Flight ${flightNumber}`}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      );
    } else if (type === "flight") {
      return (
        <div className="h-48 flex items-center justify-center bg-blue-600 rounded-lg shadow-md w-full">
          <FaPlane className="text-white text-5xl" />
        </div>
      );
    } else {
      return (
        <div className="h-48 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md w-full">
          <p className="text-gray-500 dark:text-gray-400">No image available</p>
        </div>
      );
    }
  };

  const renderFlightRoute = () => {
    if (!flightDetails || !flightDetails.legs || flightDetails.legs.length === 0) {
      return (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Flight Route</h3>
          <p className="text-gray-600 dark:text-gray-300 truncate">No flight route information available.</p>
        </div>
      );
    }

    const firstLeg = flightDetails.legs[0];
    const lastLeg = flightDetails.legs[flightDetails.legs.length - 1];
    const layoverAirports = flightDetails.legs.slice(1, -1).map(leg => leg.departureAirport);

    return (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Flight Route</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <FaMapMarkerAlt className="text-red-500 text-lg flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-gray-800 dark:text-gray-200 truncate">{firstLeg?.departureAirport}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Departure</p>
            </div>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <FaMapMarkerAlt className="text-green-500 text-lg flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-medium text-gray-800 dark:text-gray-200 truncate">{lastLeg?.arrivalAirport}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Arrival</p>
            </div>
          </div>
          {layoverAirports.length > 0 && (
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-yellow-500 text-lg flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300 truncate">
                <span className="font-medium">Layovers:</span> {layoverAirports.join(', ')}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center truncate">
        {type === "tour" ? details.title : type === "hotel" ? hotelName : `Flight ${flightNumber || 'Booking'}`}
      </h2>

      {/* Image */}
      {renderImage()}

      {/* Flight-specific Details */}
      {type === "flight" && renderFlightRoute()}

      {/* General Details */}
      {(type === "tour" || type === "hotel") && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Locations</h3>
          <div className="space-y-2">
            {type === "tour" ? (
              <>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500 text-lg flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300 truncate">
                    <span className="font-medium">From:</span> {start}
                  </p>
                </div>
                {end && (
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500 text-lg flex-shrink-0" />
                    <p className="text-gray-600 dark:text-gray-300 truncate">
                      <span className="font-medium">To:</span> {end}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500 text-lg flex-shrink-0" />
                <p className="text-gray-600 dark:text-gray-300 truncate">
                  <span className="font-medium">Location:</span> {hotelLocation}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dates */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Dates</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500 text-lg flex-shrink-0" />
            <p className="text-gray-600 dark:text-gray-300 truncate">
              <span className="font-medium">Start:</span> {formattedStartDate || startDate}
            </p>
          </div>
          {endDate && (
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500 text-lg flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300 truncate">
                <span className="font-medium">End:</span> {endDate}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Guest Details */}
      {(type === "flight" || type === "tour") && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Guest Details</h3>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center gap-2">
              <FaUsers className="text-green-500 text-lg flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300 truncate">
                <span className="font-medium">Adults:</span> {passengers?.adults || 0}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="text-green-500 text-lg flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300 truncate">
                <span className="font-medium">Children:</span> {passengers?.children || 0}
              </p>
            </div>
            {type === "flight" && (
              <div className="flex items-center gap-2">
                <FaUsers className="text-green-500 text-lg flex-shrink-0" />
                <p className="text-gray-600 dark:text-gray-300 truncate">
                  <span className="font-medium">Infants:</span> {passengers?.infants || 0}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Flight Details */}
      {type === "flight" && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Flight Details</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FaClock className="text-blue-500 text-lg flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300 truncate">
                <span className="font-medium">Departure:</span> {flightDetails.departureTime}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-blue-500 text-lg flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300 truncate">
                <span className="font-medium">Arrival:</span> {flightDetails.arrivalTime}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaHourglass className="text-blue-500 text-lg flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300 truncate">
                <span className="font-medium">Duration:</span> {formatDuration(flightDetails.duration)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaStopCircle className="text-yellow-500 text-lg flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300 truncate">
                <span className="font-medium">Stops:</span> {flightDetails.stops} stop{flightDetails.stops > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Selected Fare Details */}
      {type === "flight" && fareType && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Selected Fare</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500 text-lg flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300 truncate">
                <span className="font-medium">Fare:</span> {fareType.name}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500 text-lg flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300 truncate">
                <span className="font-medium">Price:</span> {fareType.price}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500 text-lg flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300 truncate">
                <span className="font-medium">Bags:</span> {fareType.bags}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500 text-lg flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300 truncate">
                <span className="font-medium">Flexibility:</span> {fareType.flexibility}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500 text-lg flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300 truncate">
                <span className="font-medium">Lounge:</span> {fareType.loungeAccess ? 'Yes' : 'No'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500 text-lg flex-shrink-0" />
              <p className="text-gray-600 dark:text-gray-300 truncate">
                <span className="font-medium">Seat:</span> {fareType.seat}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hotel Specific Details */}
      {type === "hotel" && (
        <>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Guest Details</h3>
            <div className="space-y-2">
              {combinedRoomData.map((room, index) => (
                <div key={index} className="flex items-center gap-2">
                  <FaBed className="text-green-500 text-lg flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300 truncate">
                    <span className="font-medium">Room {index + 1}:</span> {room.adults} adults, {room.children} children (Age: {room.childrenAges?.join(', ') || 'N/A'})
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Room Features</h3>
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                <FaBed className="text-sm flex-shrink-0" />
                <span className="truncate">{size}</span>
              </span>
              {features?.map((feature, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-sm"
                >
                  <FaCheckCircle className="text-sm flex-shrink-0" />
                  <span className="truncate">{feature}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Hotel Facilities</h3>
            <div className="flex flex-wrap gap-2">
              {hotelFacilities?.map((facility, index) => {
                const facilityIcon = facility.includes("WiFi") ? (
                  <FaWifi className="text-blue-500 dark:text-blue-400 text-sm flex-shrink-0" />
                ) : facility.includes("Pool") ? (
                  <FaSwimmingPool className="text-blue-500 dark:text-blue-400 text-sm flex-shrink-0" />
                ) : facility.includes("Gym") ? (
                  <FaDumbbell className="text-blue-500 dark:text-blue-400 text-sm flex-shrink-0" />
                ) : facility.includes("Service") ? (
                  <FaConciergeBell className="text-blue-500 dark:text-blue-400 text-sm flex-shrink-0" />
                ) : null;

                return (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm"
                  >
                    {facilityIcon}
                    <span className="truncate">{facility}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingSummary;