import React from 'react';

// FilterBadge Component
const FilterBadge = ({ label, value, onClear }) => (
  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
    {label}: {value}
    <button
      type="button"
      onClick={onClear}
      className="ml-1.5 -mr-1.5 inline-flex items-center h-4 w-4 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
    >
      <span className="sr-only">Remove filter</span>
      <svg
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  </span>
);

// FlightFilterBadges Component
const FlightFilterBadges = ({ filters, handleFilterClear }) => {
  const badges = [];

  // Price Badge
  if (filters.price[0] !== 1000 || filters.price[1] !== 10000) {
    badges.push(
      <FilterBadge
        key="price-badge"
        label="Price"
        value={`RM ${filters.price[0]} - RM ${filters.price[1]}`}
        onClear={() => handleFilterClear("price")}
      />
    );
  }

  // Stops Badge
  if (filters.stops.length > 0) {
    badges.push(
      <FilterBadge
        key="stops-badge"
        label="Stops"
        value={filters.stops.join(", ")}
        onClear={() => handleFilterClear("stops")}
      />
    );
  }

  // Departure Time Badge
  if (filters.departureTime.length > 0) {
    badges.push(
      <FilterBadge
        key="departure-badge"
        label="Departure"
        value={filters.departureTime.join(", ")}
        onClear={() => handleFilterClear("departureTime")}
      />
    );
  }

  // Arrival Time Badge
  if (filters.arrivalTime.length > 0) {
    badges.push(
      <FilterBadge
        key="arrival-badge"
        label="Arrival"
        value={filters.arrivalTime.join(", ")}
        onClear={() => handleFilterClear("arrivalTime")}
      />
    );
  }

  // Airlines Badge
  if (filters.airlines.length > 0) {
    badges.push(
      <FilterBadge
        key="airlines-badge"
        label="Airlines"
        value={filters.airlines.join(", ")}
        onClear={() => handleFilterClear("airlines")}
      />
    );
  }

  // Duration Badge
  if (filters.duration.length > 0) {
    badges.push(
      <FilterBadge
        key="duration-badge"
        label="Duration"
        value={filters.duration.join(", ")}
        onClear={() => handleFilterClear("duration")}
      />
    );
  }

  // Fare Options Badges
  if (Object.values(filters.fareOptions).some(Boolean)) {
    const fareOptionBadges = [];
    if (filters.fareOptions.baggage) {
      fareOptionBadges.push(
        <FilterBadge
          key="baggage-badge"
          label="Baggage"
          value="No Checked Bags"
          onClear={() => handleFilterClear("fareOptions.baggage")}
        />
      );
    }
    if (filters.fareOptions.seatSelection) {
      fareOptionBadges.push(
        <FilterBadge
          key="seat-badge"
          label="Seat Selection"
          value="Available"
          onClear={() => handleFilterClear("fareOptions.seatSelection")}
        />
      );
    }
    if (filters.fareOptions.refundable) {
      fareOptionBadges.push(
        <FilterBadge
          key="refundable-badge"
          label="Refundable"
          value="Yes"
          onClear={() => handleFilterClear("fareOptions.refundable")}
        />
      );
    }
    if (filters.fareOptions.changeable) {
      fareOptionBadges.push(
        <FilterBadge
          key="changeable-badge"
          label="Changeable"
          value="Yes"
          onClear={() => handleFilterClear("fareOptions.changeable")}
        />
      );
    }

    if (fareOptionBadges.length > 0) {
      badges.push(
        <span key="fare-options-badge" className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Fare Options: {fareOptionBadges}
        </span>
      );
    }
  }

  // Layover Airports Badge
  if (filters.layoverAirports.length > 0) {
    badges.push(
      <FilterBadge
        key="layover-badge"
        label="Layover Airports"
        value={filters.layoverAirports.join(", ")}
        onClear={() => handleFilterClear("layoverAirports")}
      />
    );
  }

  // Connecting Flight Duration Badge
  if (filters.connectingFlightDuration[0] !== 0 || filters.connectingFlightDuration[1] !== 1440) {
    badges.push(
      <FilterBadge
        key="connection-badge"
        label="Connection Time"
        value={`${filters.connectingFlightDuration[0]} - ${filters.connectingFlightDuration[1]} mins`}
        onClear={() => handleFilterClear("connectingFlightDuration")}
      />
    );
  }

  // Aircraft Types Badge
  if (filters.aircraftTypes.length > 0) {
    badges.push(
      <FilterBadge
        key="aircraft-badge"
        label="Aircraft Types"
        value={filters.aircraftTypes.join(", ")}
        onClear={() => handleFilterClear("aircraftTypes")}
      />
    );
  }

  return (
    <div className="p-4 flex flex-wrap gap-2">
      {badges}
      {badges.length > 0 && (
        <button
          onClick={() => handleFilterClear("all")}
          className="text-blue-600 hover:text-blue-800"
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default FlightFilterBadges;
