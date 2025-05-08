import React, { useEffect, useState, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaFilter, FaChevronUp } from "react-icons/fa6";
import { Disclosure } from "@headlessui/react";
import Slider from "react-slider";
import FlightCard from "components/FrontPage/FlightCard";
import FlightSearchForm from "components/FrontPage/SearchFormFlight";
import TempBookingData from "../../views/Data/TempBooking";
import flightData from "../../views/Data/flightData.js";
import Navbar from "components/FrontPage/Navbar.js";
import Footer from "components/FrontPage/Footer.js";

const airports = [
  { value: "JFK", label: "John F. Kennedy International (JFK)" },
  { value: "LAX", label: "Los Angeles International (LAX)" },
  { value: "KUL", label: "Kuala Lumpur International (KUL)" },
  { value: "JHB", label: "Senai International (JHB)" },
  { value: "LHR", label: "London Heathrow (LHR)" },
  { value: "CDG", label: "Paris Charles de Gaulle (CDG)" },
  { value: "NRT", label: "Tokyo Narita (NRT)" },
  { value: "SYD", label: "Sydney Kingsford Smith (SYD)" },
  { value: "SFO", label: "San Francisco International (SFO)" },
  { value: "ORD", label: "Chicago O'Hare International (ORD)" },
  { value: "MIA", label: "Miami International (MIA)" },
  { value: "DXB", label: "Dubai International (DXB)" },
  { value: "HND", label: "Tokyo Haneda (HND)" },
  { value: "AMS", label: "Amsterdam Schiphol (AMS)" },
  { value: "FRA", label: "Frankfurt (FRA)" },
  { value: "SIN", label: "Singapore Changi (SIN)" },
];

// Filter and Sorting Functions (unchanged)
const applySearchFormFilters = (
  originalFlights,
  flyFrom,
  flyTo,
  tripType,
  travelClass,
  passengers,
  dateDepart,
  dateReturn,
  multiCityFlights
) => {
  const filtered = originalFlights.filter((flight) => {
    const flyFromMatch = !flyFrom || flight.departure.includes(flyFrom);
    const flyToMatch = !flyTo || flight.arrival.includes(flyTo);
    let tripTypeMatch = true;
    if (tripType === "One-way") tripTypeMatch = true;
    else if (tripType === "Round-trip") {
      /* Add logic if needed */
    } else if (tripType === "Multi-city") {
      tripTypeMatch = multiCityFlights.every((multiFlight, index) => {
        const leg = flight.legs[index];
        if (!leg) return false;
        const flyFromMatch =
          !multiFlight.flyFrom ||
          leg.departureAirport.includes(multiFlight.flyFrom);
        const flyToMatch =
          !multiFlight.flyTo || leg.arrivalAirport.includes(multiFlight.flyTo);
        const dateDepartMatch =
          !multiFlight.dateDepart ||
          (leg.departureTime instanceof Date &&
            leg.departureTime.toLocaleDateString() ===
            new Date(multiFlight.dateDepart).toLocaleDateString());
        return flyFromMatch && flyToMatch && dateDepartMatch;
      });
    }
    const travelClassMatch =
      !travelClass ||
      flight.fareTypes.some((fare) => fare.travelClass === travelClass);
    const passengerMatch = true;
    const dateDepartMatch =
      !dateDepart ||
      (flight.legs &&
        flight.legs.length > 0 &&
        flight.legs[0].departureTime instanceof Date &&
        flight.legs[0].departureTime.toLocaleDateString() ===
        dateDepart.toLocaleDateString());
    const dateReturnMatch =
      tripType === "One-way" ||
      !dateReturn ||
      (flight.legs &&
        flight.legs.length > 0 &&
        flight.legs[flight.legs.length - 1].arrivalTime instanceof Date &&
        flight.legs[flight.legs.length - 1].arrivalTime.toLocaleDateString() ===
        dateReturn.toLocaleDateString());
    return (
      flyFromMatch &&
      flyToMatch &&
      tripTypeMatch &&
      travelClassMatch &&
      passengerMatch &&
      dateDepartMatch &&
      dateReturnMatch
    );
  });
  return filtered;
};

const applyFlightFilters = (flights, filters) => {
  let filtered = [...flights];
  if (filters.price[0] !== 1000 || filters.price[1] !== 10000) {
    filtered = filtered.filter((flight) => {
      const price = parseFloat(
        flight.fareTypes?.[0]?.price?.replace(/[^0-9.-]+/g, "") || "0"
      );
      return price >= filters.price[0] && price <= filters.price[1];
    });
  }
  if (filters.stops?.length > 0) {
    filtered = filtered.filter((flight) => {
      const stopCount = flight.stops || 0;
      const stopLabel =
        stopCount === 0 ? "Non-stop" : stopCount === 1 ? "1 stop" : "2+ stops";
      return filters.stops.includes(stopLabel);
    });
  }
  if (filters.departureTime?.length > 0) {
    filtered = filtered.filter((flight) => {
      if (!flight.departureTime) return false;
      const [hour, minute, ampm] =
        flight.departureTime.match(/(\d+):(\d+)\s*(AM|PM)/)?.slice(1) || [];
      const departureMinutes =
        (parseInt(hour) % 12 + (ampm === "PM" ? 12 : 0)) * 60 +
        parseInt(minute);
      return filters.departureTime.some((timeRange) => {
        switch (timeRange) {
          case "Morning":
            return departureMinutes <= 720;
          case "Afternoon":
            return departureMinutes > 720 && departureMinutes <= 1080;
          case "Evening":
            return departureMinutes > 1080;
          default:
            return false;
        }
      });
    });
  }
  if (filters.arrivalTime?.length > 0) {
    filtered = filtered.filter((flight) => {
      if (!flight.arrivalTime) return false;
      const [hour, minute, ampm] =
        flight.arrivalTime.match(/(\d+):(\d+)\s*(AM|PM)/)?.slice(1) || [];
      const arrivalMinutes =
        (parseInt(hour) % 12 + (ampm === "PM" ? 12 : 0)) * 60 +
        parseInt(minute);
      return filters.arrivalTime.some((timeRange) => {
        switch (timeRange) {
          case "Morning":
            return arrivalMinutes <= 720;
          case "Afternoon":
            return arrivalMinutes > 720 && arrivalMinutes <= 1080;
          case "Evening":
            return arrivalMinutes > 1080;
          default:
            return false;
        }
      });
    });
  }
  if (filters.airlines?.length > 0) {
    filtered = filtered.filter((flight) =>
      flight.airlines.some((airline) => filters.airlines.includes(airline))
    );
  }
  if (filters.duration?.length > 0) {
    filtered = filtered.filter((flight) => {
      const duration = flight.duration;
      return filters.duration.some((durationOption) => {
        if (durationOption === "Short") return duration <= 10 * 60;
        if (durationOption === "Medium")
          return duration > 10 * 60 && duration <= 15 * 60;
        if (durationOption === "Long") return duration > 15 * 60;
        return false;
      });
    });
  }
  if (Object.values(filters.fareOptions).some(Boolean)) {
    filtered = filtered.filter((flight) =>
      flight.fareTypes.some((fare) => {
        if (filters.fareOptions.baggage && fare.bags === "0 Checked Bags")
          return false;
        if (filters.fareOptions.seatSelection && !fare.seatSelection)
          return false;
        if (
          filters.fareOptions.refundable &&
          !fare.flexibility.includes("Refundable")
        )
          return false;
        if (
          filters.fareOptions.changeable &&
          !fare.flexibility.includes("Changeable")
        )
          return false;
        return true;
      })
    );
  }
  if (filters.layoverAirports?.length > 0) {
    filtered = filtered.filter((flight) => {
      const flightLayoverAirports = flight.layoverAirports || [];
      return flightLayoverAirports.some((airport) =>
        filters.layoverAirports.includes(airport)
      );
    });
  }
  if (
    filters.connectingFlightDuration[0] !== 0 ||
    filters.connectingFlightDuration[1] !== 1440
  ) {
    filtered = filtered.filter((flight) => {
      const duration = flight.connectionDuration || 0;
      return (
        duration >= filters.connectingFlightDuration[0] &&
        duration <= filters.connectingFlightDuration[1]
      );
    });
  }
  return filtered;
};

const sortFlights = (flights, sortBy) => {
  switch (sortBy) {
    case "price-low-high":
      return [...flights].sort(
        (a, b) =>
          parseFloat(a.fareTypes[0].price.replace(/[^0-9.-]+/g, "")) -
          parseFloat(b.fareTypes[0].price.replace(/[^0-9.-]+/g, ""))
      );
    case "price-high-low":
      return [...flights].sort(
        (a, b) =>
          parseFloat(b.fareTypes[0].price.replace(/[^0-9.-]+/g, "")) -
          parseFloat(a.fareTypes[0].price.replace(/[^0-9.-]+/g, ""))
      );
    case "duration-shortest":
      return [...flights].sort((a, b) => a.duration - b.duration);
    case "duration-longest":
      return [...flights].sort((a, b) => b.duration - a.duration);
    case "departure-earliest":
      return [...flights].sort((a, b) => {
        const [aHour, aMinute] = a.departureTime.split(":").map(Number);
        const [bHour, bMinute] = b.departureTime.split(":").map(Number);
        return aHour * 60 + aMinute - (bHour * 60 + bMinute);
      });
    case "departure-latest":
      return [...flights].sort((a, b) => {
        const [aHour, aMinute] = a.departureTime.split(":").map(Number);
        const [bHour, bMinute] = b.departureTime.split(":").map(Number);
        return bHour * 60 + bMinute - (aHour * 60 + aMinute);
      });
    case "arrival-earliest":
      return [...flights].sort((a, b) => {
        const [aHour, aMinute] = a.arrivalTime.split(":").map(Number);
        const [bHour, bMinute] = b.arrivalTime.split(":").map(Number);
        return aHour * 60 + aMinute - (bHour * 60 + bMinute);
      });
    case "arrival-latest":
      return [...flights].sort((a, b) => {
        const [aHour, aMinute] = a.arrivalTime.split(":").map(Number);
        const [bHour, bMinute] = b.arrivalTime.split(":").map(Number);
        return bHour * 60 + bMinute - (aHour * 60 + aMinute);
      });
    default:
      return flights;
  }
};

const generateUniqueId = () => {
  const randomPart = Math.random().toString(36).substring(2, 18);
  let lastSequenceNumber = 0;
  const lastBooking = TempBookingData[TempBookingData.length - 1];
  if (lastBooking && lastBooking.id) {
    const lastSequence = lastBooking.id.slice(-10);
    const parsedNumber = parseInt(lastSequence, 10);
    if (!isNaN(parsedNumber)) lastSequenceNumber = parsedNumber;
  }
  const newSequenceNumber = lastSequenceNumber + 1;
  const sequencePart = ("0000000000" + newSequenceNumber).slice(-10);
  return randomPart + sequencePart;
};

const FlightFilterBadges = ({ filters, handleFilterClear }) => {
  if (!filters) return null;

  return (
    <>
      {(filters.price?.[0] !== 1000 || filters.price?.[1] !== 10000) && (
        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
          RM {filters.price?.[0] ?? 1000} - RM {filters.price?.[1] ?? 10000}
          <button
            onClick={() => handleFilterClear("price")}
            className="ml-2 text-indigo-600 hover:text-indigo-800"
          >
            ×
          </button>
        </span>
      )}
      {filters.stops?.length > 0 && (
        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
          {filters.stops.join(", ")}
          <button
            onClick={() => handleFilterClear("stops")}
            className="ml-2 text-indigo-600 hover:text-indigo-800"
          >
            ×
          </button>
        </span>
      )}
      {filters.departureTime?.length > 0 && (
        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
          Departure: {filters.departureTime.join(", ")}
          <button
            onClick={() => handleFilterClear("departureTime")}
            className="ml-2 text-indigo-600 hover:text-indigo-800"
          >
            ×
          </button>
        </span>
      )}
      {filters.arrivalTime?.length > 0 && (
        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
          Arrival: {filters.arrivalTime.join(", ")}
          <button
            onClick={() => handleFilterClear("arrivalTime")}
            className="ml-2 text-indigo-600 hover:text-indigo-800"
          >
            ×
          </button>
        </span>
      )}
      {filters.airlines?.length > 0 && (
        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
          Airlines: {filters.airlines.join(", ")}
          <button
            onClick={() => handleFilterClear("airlines")}
            className="ml-2 text-indigo-600 hover:text-indigo-800"
          >
            ×
          </button>
        </span>
      )}
      {filters.duration?.length > 0 && (
        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
          Duration: {filters.duration.join(", ")}
          <button
            onClick={() => handleFilterClear("duration")}
            className="ml-2 text-indigo-600 hover:text-indigo-800"
          >
            ×
          </button>
        </span>
      )}
      {Object.values(filters.fareOptions || {}).some(Boolean) && (
        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
          Fare Options:{" "}
          {Object.entries(filters.fareOptions)
            .filter(([_, value]) => value)
            .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
            .join(", ")}
          <button
            onClick={() => handleFilterClear("fareOptions")}
            className="ml-2 text-indigo-600 hover:text-indigo-800"
          >
            ×
          </button>
        </span>
      )}
      {filters.layoverAirports?.length > 0 && (
        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
          Layovers: {filters.layoverAirports.join(", ")}
          <button
            onClick={() => handleFilterClear("layoverAirports")}
            className="ml-2 text-indigo-600 hover:text-indigo-800"
          >
            ×
          </button>
        </span>
      )}
      {(filters.connectingFlightDuration?.[0] !== 0 ||
        filters.connectingFlightDuration?.[1] !== 1440) && (
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
            Connection: {filters.connectingFlightDuration?.[0] ?? 0} -{" "}
            {filters.connectingFlightDuration?.[1] ?? 1440} min
            <button
              onClick={() => handleFilterClear("connectingFlightDuration")}
              className="ml-2 text-indigo-600 hover:text-indigo-800"
            >
              ×
            </button>
          </span>
        )}
    </>
  );
};

export default function Flight() {
  const [sortBy, setSortBy] = useState("recommended");
  const [flyFrom, setFlyFrom] = useState("");
  const [flyTo, setFlyTo] = useState("");
  const [dateDepart, setDateDepart] = useState(new Date());
  const [dateReturn, setDateReturn] = useState(null);
  const [tripType, setTripType] = useState("One-way");
  const [multiCityFlights, setMultiCityFlights] = useState([]);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [childrenAges, setChildrenAges] = useState([]);
  const [infantAges, setInfantAges] = useState([]);
  const [travelClass, setTravelClass] = useState("Economy");
  const passengerMenuRef = useRef(null);
  const [flights, setFlights] = useState([]);
  const [originalFlights] = useState(flightData);
  const [filters, setFilters] = useState({
    price: [1000, 10000],
    stops: [],
    departureTime: [],
    arrivalTime: [],
    airlines: [],
    duration: [],
    fareOptions: {
      baggage: false,
      seatSelection: false,
      refundable: false,
      changeable: false,
    },
    layoverAirports: [],
    connectingFlightDuration: [0, 1440],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePackages, setVisiblePackages] = useState(4);
  const [isFetching, setIsFetching] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const observer = useRef(null);
  const [showMultiCityErrors, setShowMultiCityErrors] = useState([]);
  const [showOneWayErrors, setShowOneWayErrors] = useState(false);
  const [showRoundtripErrors, setShowRoundtripErrors] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleFilterClear = (filterType) => {
    setFilters((prevFilters) => {
      switch (filterType) {
        case "price":
          return { ...prevFilters, price: [1000, 10000] };
        case "stops":
          return { ...prevFilters, stops: [] };
        case "departureTime":
          return { ...prevFilters, departureTime: [] };
        case "arrivalTime":
          return { ...prevFilters, arrivalTime: [] };
        case "airlines":
          return { ...prevFilters, airlines: [] };
        case "duration":
          return { ...prevFilters, duration: [] };
        case "fareOptions":
          return {
            ...prevFilters,
            fareOptions: {
              baggage: false,
              seatSelection: false,
              refundable: false,
              changeable: false,
            },
          };
        case "layoverAirports":
          return { ...prevFilters, layoverAirports: [] };
        case "connectingFlightDuration":
          return { ...prevFilters, connectingFlightDuration: [0, 1440] };
        default:
          return {
            price: [1000, 10000],
            stops: [],
            departureTime: [],
            arrivalTime: [],
            airlines: [],
            duration: [],
            fareOptions: {
              baggage: false,
              seatSelection: false,
              refundable: false,
              changeable: false,
            },
            layoverAirports: [],
            connectingFlightDuration: [0, 1440],
          };
      }
    });
  };

  const handleTripTypeChange = (newTripType) => {
    if (newTripType === "Multi-city") {
      if (tripType !== "Multi-city") {
        setMultiCityFlights([
          { flyFrom, flyTo, dateDepart },
          { flyFrom: "", flyTo: "", dateDepart: new Date() },
        ]);
        setFlyFrom("");
        setFlyTo("");
        setDateDepart(new Date());
        setDateReturn(null);
      }
    } else {
      if (tripType === "Multi-city" && multiCityFlights.length > 0) {
        setFlyFrom(multiCityFlights[0].flyFrom);
        setFlyTo(multiCityFlights[0].flyTo);
        setDateDepart(new Date(multiCityFlights[0].dateDepart));
      }
      if (newTripType === "One-way") setDateReturn(null);
    }
    setTripType(newTripType);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    console.log("Raw location.search:", location.search);
    console.log("Parsed Search Params:", Object.fromEntries(searchParams));

    let fromCode = searchParams.get("from")?.toUpperCase();
    let toCode = searchParams.get("to")?.toUpperCase();

    // Extract IATA code from full label if present (e.g., "Johor Bahru, Malaysia (JHB)" -> "JHB")
    const extractIataCode = (str) => {
      if (!str) return null;
      const match = str.match(/\(([A-Z]{3})\)$/); // Matches "(JHB)" at the end
      return match ? match[1] : str; // Returns "JHB" or original string if no match
    };

    fromCode = extractIataCode(fromCode);
    toCode = extractIataCode(toCode);
    console.log("Extracted Codes:", { fromCode, toCode });

    const newFlyFrom = fromCode ? airports.find(a => a.value === fromCode) || null : null;
    const newFlyTo = toCode ? airports.find(a => a.value === toCode) || null : null;
    console.log("Mapped Airports:", { newFlyFrom, newFlyTo });

    setFlyFrom(newFlyFrom);
    setFlyTo(newFlyTo);

    // Trip Type
    const tripTypeParam = searchParams.get("type")?.toLowerCase() || "one-way";
    const newTripType = {
      "one-way": "One-way",
      "round-trip": "Round-trip",
      "multi-city": "Multi-city",
    }[tripTypeParam] || "One-way";
    setTripType(newTripType);

    // Multi-city Flights
    if (tripTypeParam === "multi-city") {
      let newMultiCityFlights = [];

      // Check for new format (multiCityFlyFromX, etc.)
      const numFlights = parseInt(searchParams.get("multiCityFlights")) || 0;
      if (numFlights > 0) {
        for (let i = 1; i <= numFlights; i++) {
          const flyFromCode = searchParams.get(`multiCityFlyFrom${i}`);
          const flyToCode = searchParams.get(`multiCityFlyTo${i}`);
          const dateDepartStr = searchParams.get(`multiCityDateDepart${i}`);
          newMultiCityFlights.push({
            flyFrom: flyFromCode ? airports.find(a => a.value === flyFromCode) || null : null,
            flyTo: flyToCode ? airports.find(a => a.value === flyToCode) || null : null,
            dateDepart: dateDepartStr ? new Date(dateDepartStr) : null,
          });
        }
      }

      // Fallback for old format (flights JSON array)
      const flightsParam = searchParams.get("flights");
      if (flightsParam && newMultiCityFlights.length === 0) {
        try {
          const flightsArray = JSON.parse(decodeURIComponent(flightsParam));
          newMultiCityFlights = flightsArray.map(flight => ({
            flyFrom: flight.from
              ? airports.find(a => a.value === extractIataCode(flight.from)) || null
              : null,
            flyTo: flight.to
              ? airports.find(a => a.value === extractIataCode(flight.to)) || null
              : null,
            dateDepart: flight.date ? new Date(flight.date) : null,
          }));

          // Update travellers and travelClass from the first flight (assuming consistency)
          const firstFlight = flightsArray[0];
          if (firstFlight.travellers) {
            setPassengers({
              adults: firstFlight.travellers.adults || 1,
              children: firstFlight.travellers.children || 0,
              infants: firstFlight.travellers.infants || 0,
            });
          }
          if (firstFlight.travelClass) setTravelClass(firstFlight.travelClass);
        } catch (e) {
          console.error("Failed to parse flights:", e);
        }
      }

      // Ensure at least 2 flights for multi-city, add empty if needed
      if (newMultiCityFlights.length < 2) {
        newMultiCityFlights.push({ flyFrom: null, flyTo: null, dateDepart: null });
      }
      console.log("Parsed MultiCityFlights:", newMultiCityFlights);
      setMultiCityFlights(newMultiCityFlights);
    } else {
      setMultiCityFlights([]);
    }

    // Travellers
    const travellers = searchParams.get("travellers");
    if (travellers) {
      try {
        const parsedTravellers = JSON.parse(travellers);
        setPassengers({
          adults: parsedTravellers.adults || 1,
          children: parsedTravellers.children || 0,
          infants: parsedTravellers.infants || 0,
        });
        setChildrenAges(parsedTravellers.childrenAges || []);
        setInfantAges(parsedTravellers.infantAges || []);
      } catch (e) {
        console.error("Failed to parse travellers:", e);
      }
    }

    // Dates
    const dateDepartValue = searchParams.get("departureDate");
    if (dateDepartValue) {
      const date = new Date(dateDepartValue);
      setDateDepart(isNaN(date.getTime()) ? new Date() : date);
    }

    const dateReturnValue = searchParams.get("returnDate");
    if (dateReturnValue && tripTypeParam === "round-trip") {
      const date = new Date(dateReturnValue);
      setDateReturn(isNaN(date.getTime()) ? null : date);
    }

    // Travel Class
    const travelClassParam = searchParams.get("travelClass");
    if (travelClassParam) setTravelClass(travelClassParam);

  }, [location.search]);

  useEffect(() => {
    setTimeout(() => {
      let filteredFlights = applySearchFormFilters(
        originalFlights,
        flyFrom,
        flyTo,
        tripType,
        travelClass,
        passengers,
        dateDepart,
        dateReturn,
        multiCityFlights
      );
      filteredFlights = applyFlightFilters(filteredFlights, filters);
      setFlights(sortFlights(filteredFlights, sortBy));
      setIsLoading(false);
    }, 300);
  }, [
    flyFrom,
    flyTo,
    tripType,
    travelClass,
    passengers,
    dateDepart,
    dateReturn,
    originalFlights,
    multiCityFlights,
    sortBy,
    filters,
  ]);

  useEffect(() => {
    if (isLoading || isFetching) return;
    const options = { root: null, rootMargin: "20px", threshold: 0.1 };
    const callback = (entries) => {
      if (entries[0].isIntersecting && visiblePackages < flights.length) {
        setIsFetching(true);
        setVisiblePackages((prev) => prev + 4);
      }
    };
    observer.current = new IntersectionObserver(callback, options);
    const lastFlightCard = document.querySelector(".package-card:last-child");
    if (lastFlightCard) observer.current.observe(lastFlightCard);
    return () => observer.current?.disconnect();
  }, [flights, visiblePackages, isLoading, isFetching]);

  useEffect(() => {
    if (!isFetching || isLoading) return;
    setTimeout(() => setIsFetching(false), 1000);
  }, [isFetching, isLoading]);

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    let isValid = true;

    // Validation for One-way
    if (tripType === "One-way" && (!flyFrom || !flyTo || !dateDepart)) {
      setShowOneWayErrors(true);
      isValid = false;
    }
    // Validation for Roundtrip
    else if (
      tripType === "Round-trip" &&
      (!flyFrom || !flyTo || !dateDepart || !dateReturn)
    ) {
      setShowRoundtripErrors(true);
      isValid = false;
    }
    // Validation for Multi-city
    else if (tripType === "Multi-city") {
      isValid = multiCityFlights.every((flight, index) => {
        const nextFlight = multiCityFlights[index + 1];
        const currentFlightDate = new Date(flight.dateDepart);
        return (
          flight.flyFrom &&
          flight.flyTo &&
          currentFlightDate instanceof Date &&
          !isNaN(currentFlightDate) &&
          (!nextFlight || currentFlightDate < new Date(nextFlight.dateDepart))
        );
      });
      if (!isValid) {
        setShowMultiCityErrors(
          multiCityFlights.map((flight) => ({
            flyFrom: !flight.flyFrom,
            flyTo: !flight.flyTo,
            dateDepart: !flight.dateDepart,
          }))
        );
      }
    }

    // Exit if validation fails
    if (!isValid) return;

    // Common travellers data from passengerMenuRef
    let travellersData = {};
    if (passengerMenuRef.current) {
      const { passengers, childrenAges, infantAges } = passengerMenuRef.current;
      setPassengers(passengers);
      setChildrenAges(childrenAges);
      setInfantAges(infantAges);
      travellersData = {
        adults: passengers.adults,
        children: passengers.children,
        infants: passengers.infants,
        childrenAges,
        infantAges,
      };
    }

    if (tripType === "Multi-city") {
      // Construct flights array for multi-city
      const flightsArray = multiCityFlights.map(flight => ({
        from: flight.flyFrom ? flight.flyFrom.label : "",
        to: flight.flyTo ? flight.flyTo.label : "",
        date: new Date(flight.dateDepart).toISOString(),
        travellers: travellersData,
        travelClass,
      }));
      searchParams.set("type", "multi-city");
      searchParams.set("flights", JSON.stringify(flightsArray));
    } else {
      // One-way and Round-trip
      if (flyFrom) searchParams.set("from", flyFrom.value);
      if (flyTo) searchParams.set("to", flyTo.value);
      if (dateDepart)
        searchParams.set(
          "departureDate",
          new Date(dateDepart).toISOString().split("T")[0]
        );
      searchParams.set("type", tripType.toLowerCase());
      if (tripType === "Round-trip" && dateReturn)
        searchParams.set(
          "returnDate",
          new Date(dateReturn).toISOString().split("T")[0]
        );
      searchParams.set("travellers", JSON.stringify(travellersData));
      searchParams.set("travelClass", travelClass);
    }

    const url = `/flights?${searchParams.toString()}`;
    console.log("Generated URL:", url);
    navigate(url);
  };

  const handleSortChange = (event) => setSortBy(event.target.value);

  const handleFareBooking = (flight, selectedFare) => {
    const id = generateUniqueId();
    let legsDetails = [];
    let dateStart = null;
    let dateEnd = null;
    if (tripType === "Multi-city") {
      const validLegs = multiCityFlights.filter(
        (leg) => leg.dateDepart instanceof Date && leg.dateDepart >= new Date()
      );
      if (validLegs.length > 0) {
        validLegs.sort((a, b) => a.dateDepart - b.dateDepart);
        dateStart = validLegs[0].dateDepart.toISOString();
        dateEnd = validLegs[validLegs.length - 1].dateDepart.toISOString();
        legsDetails = validLegs.map((leg) => ({
          flyFrom: leg.flyFrom,
          flyTo: leg.flyTo,
          dateDepart: leg.dateDepart.toISOString(),
        }));
      }
    } else {
      dateStart = new Date(dateDepart).toISOString();
      legsDetails.push({ flyFrom, flyTo, dateDepart: dateStart });
      if (tripType === "Round-trip" && dateReturn) {
        dateEnd = new Date(dateReturn).toISOString();
        legsDetails.push({ flyFrom: flyTo, flyTo: flyFrom, dateDepart: dateEnd });
      }
    }
    const booking = {
      id,
      type: "flight",
      tripType,
      travelClass: selectedFare.travelClass,
      fareName: selectedFare.name,
      farePrice: selectedFare.price,
      passengers,
      dateStart,
      dateEnd,
      legsDetails,
      flightId: flight.id,
    };
    TempBookingData.push(booking);
    navigate(`/booking?id=${id}`);
  };

  const FilterPanel = ({ filters, setFilters, isOpen, onClose }) => (
    <div
      className={`fixed inset-0 z-[9999999] lg:static lg:z-auto bg-white lg:bg-transparent p-4 lg:p-0 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
    >
      <div
        className="bg-white rounded-xl p-4 shadow-sm lg:shadow-none w-full h-[calc(100vh-2rem)] lg:h-auto overflow-y-auto lg:overflow-y-visible"
      >
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4 lg:space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 hidden lg:block">
            Filter by
          </h2>

          <Disclosure defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full py-1 text-md font-medium text-gray-900">
                  Price (RM)
                  <FaChevronUp
                    className={`${open ? "rotate-180" : ""} w-4 h-4 text-gray-500 transition-transform`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pt-2">
                  <Slider
                    min={1000}
                    max={10000}
                    step={100}
                    value={filters.price}
                    onChange={(values) =>
                      setFilters((prev) => ({ ...prev, price: values }))
                    }
                    className="h-1 bg-gray-200 rounded-full"
                    thumbClassName="h-4 w-4 bg-indigo-600 rounded-full -mt-1.5 cursor-pointer"
                    trackClassName="bg-indigo-200"
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-600">
                    <span>RM {filters.price[0]}</span>
                    <span>RM {filters.price[1]}</span>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <Disclosure defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full py-1 text-md font-medium text-gray-900">
                  Stops
                  <FaChevronUp
                    className={`${open ? "rotate-180" : ""} w-4 h-4 text-gray-500 transition-transform`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pt-2 space-y-2">
                  {["Non-stop", "1 stop", "2+ stops"].map((stop) => (
                    <button
                      key={stop}
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          stops: prev.stops.includes(stop)
                            ? prev.stops.filter((s) => s !== stop)
                            : [...prev.stops, stop],
                        }))
                      }
                      className={`w-full text-left px-3 py-1 rounded-lg text-xs transition-colors ${filters.stops.includes(stop)
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {stop}
                    </button>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <Disclosure defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full py-1 text-md font-medium text-gray-900">
                  Departure Time
                  <FaChevronUp
                    className={`${open ? "rotate-180" : ""} w-4 h-4 text-gray-500 transition-transform`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pt-2 space-y-2">
                  {["Morning", "Afternoon", "Evening"].map((time) => (
                    <button
                      key={time}
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          departureTime: prev.departureTime.includes(time)
                            ? prev.departureTime.filter((t) => t !== time)
                            : [...prev.departureTime, time],
                        }))
                      }
                      className={`w-full text-left px-3 py-1 rounded-lg text-xs transition-colors ${filters.departureTime.includes(time)
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {time}
                    </button>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <Disclosure defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full py-1 text-md font-medium text-gray-900">
                  Arrival Time
                  <FaChevronUp
                    className={`${open ? "rotate-180" : ""} w-4 h-4 text-gray-500 transition-transform`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pt-2 space-y-2">
                  {["Morning", "Afternoon", "Evening"].map((time) => (
                    <button
                      key={time}
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          arrivalTime: prev.arrivalTime.includes(time)
                            ? prev.arrivalTime.filter((t) => t !== time)
                            : [...prev.arrivalTime, time],
                        }))
                      }
                      className={`w-full text-left px-3 py-1 rounded-lg text-xs transition-colors ${filters.arrivalTime.includes(time)
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {time}
                    </button>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <Disclosure defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full py-1 text-md font-medium text-gray-900">
                  Airlines
                  <FaChevronUp
                    className={`${open ? "rotate-180" : ""} w-4 h-4 text-gray-500 transition-transform`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pt-2 space-y-2">
                  {[
                    "Malaysia Airlines",
                    "Qatar Airways",
                    "British Airways",
                    "Emirates",
                    "Singapore Airlines",
                    "Turkish Airlines",
                    "KLM",
                    "Air France",
                    "Japan Airlines",
                    "Etihad Airways",
                    "Lufthansa",
                  ].map((airline) => (
                    <button
                      key={airline}
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          airlines: prev.airlines.includes(airline)
                            ? prev.airlines.filter((a) => a !== airline)
                            : [...prev.airlines, airline],
                        }))
                      }
                      className={`w-full text-left px-3 py-1 rounded-lg text-xs transition-colors ${filters.airlines.includes(airline)
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {airline}
                    </button>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <Disclosure defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full py-1 text-md font-medium text-gray-900">
                  Duration
                  <FaChevronUp
                    className={`${open ? "rotate-180" : ""} w-4 h-4 text-gray-500 transition-transform`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pt-2 space-y-2">
                  {["Short", "Medium", "Long"].map((duration) => (
                    <button
                      key={duration}
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          duration: prev.duration.includes(duration)
                            ? prev.duration.filter((d) => d !== duration)
                            : [...prev.duration, duration],
                        }))
                      }
                      className={`w-full text-left px-3 py-1 rounded-lg text-xs transition-colors ${filters.duration.includes(duration)
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {duration}
                    </button>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <Disclosure defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full py-1 text-md font-medium text-gray-900">
                  Fare Options
                  <FaChevronUp
                    className={`${open ? "rotate-180" : ""} w-4 h-4 text-gray-500 transition-transform`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pt-2 space-y-2">
                  {[
                    { key: "baggage", label: "Baggage Included" },
                    { key: "seatSelection", label: "Seat Selection" },
                    { key: "refundable", label: "Refundable" },
                    { key: "changeable", label: "Changeable" },
                  ].map((option) => (
                    <button
                      key={option.key}
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          fareOptions: {
                            ...prev.fareOptions,
                            [option.key]: !prev.fareOptions[option.key],
                          },
                        }))
                      }
                      className={`w-full text-left px-3 py-1 rounded-lg text-xs transition-colors ${filters.fareOptions[option.key]
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <Disclosure defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full py-1 text-md font-medium text-gray-900">
                  Layover Airports
                  <FaChevronUp
                    className={`${open ? "rotate-180" : ""} w-4 h-4 text-gray-500 transition-transform`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pt-2 space-y-2">
                  {[
                    "Doha (DOH)",
                    "Dubai (DXB)",
                    "Singapore (SIN)",
                    "Istanbul (IST)",
                    "Amsterdam (AMS)",
                    "Tokyo (NRT)",
                    "Abu Dhabi (AUH)",
                    "Frankfurt (FRA)",
                    "Paris (CDG)",
                  ].map((airport) => (
                    <button
                      key={airport}
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          layoverAirports: prev.layoverAirports.includes(airport)
                            ? prev.layoverAirports.filter((a) => a !== airport)
                            : [...prev.layoverAirports, airport],
                        }))
                      }
                      className={`w-full text-left px-3 py-1 rounded-lg text-xs transition-colors ${filters.layoverAirports.includes(airport)
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {airport}
                    </button>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <Disclosure defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full py-1 text-md font-medium text-gray-900">
                  Connecting Flight Duration (min)
                  <FaChevronUp
                    className={`${open ? "rotate-180" : ""} w-4 h-4 text-gray-500 transition-transform`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pt-2">
                  <Slider
                    min={0}
                    max={1440}
                    step={30}
                    value={filters.connectingFlightDuration}
                    onChange={(values) =>
                      setFilters((prev) => ({
                        ...prev,
                        connectingFlightDuration: values,
                      }))
                    }
                    className="h-1 bg-gray-200 rounded-full"
                    thumbClassName="h-4 w-4 bg-indigo-600 rounded-full -mt-1.5 cursor-pointer"
                    trackClassName="bg-indigo-200"
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-600">
                    <span>{filters.connectingFlightDuration[0]} min</span>
                    <span>{filters.connectingFlightDuration[1]} min</span>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar transparent />
      <main className="min-h-screen bg-gray-50">
        <FlightSearchForm
          flyFrom={flyFrom}
          setFlyFrom={setFlyFrom}
          flyTo={flyTo}
          setFlyTo={setFlyTo}
          tripType={tripType}
          setTripType={setTripType}
          passengers={passengers}
          setPassengers={setPassengers}
          childrenAges={childrenAges}
          setChildrenAges={setChildrenAges}
          infantAges={infantAges}
          setInfantAges={setInfantAges}
          travelClass={travelClass}
          setTravelClass={setTravelClass}
          dateDepart={dateDepart}
          setDateDepart={setDateDepart}
          dateReturn={dateReturn}
          setDateReturn={setDateReturn}
          multiCityFlights={multiCityFlights}
          setMultiCityFlights={setMultiCityFlights}
          handleSearch={handleSearch}
          handleTripTypeChange={handleTripTypeChange}
          passengerMenuRef={passengerMenuRef}
          showOneWayErrors={showOneWayErrors}
          showRoundtripErrors={showRoundtripErrors}
          showMultiCityErrors={showMultiCityErrors}
          className="z-50"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
          <button
            className="lg:hidden fixed bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg z-50"
            onClick={() => setIsFilterOpen(true)}
          >
            <FaFilter className="h-5 w-5" />
          </button>

          <div className="grid lg:grid-cols-4 gap-6">
            <aside className="hidden lg:block">
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                isOpen={true}
                onClose={() => { }}
              />
            </aside>

            {isFilterOpen && (
              <>
                <FilterPanel
                  filters={filters}
                  setFilters={setFilters}
                  isOpen={isFilterOpen}
                  onClose={() => setIsFilterOpen(false)}
                />
                <div
                  className="fixed inset-0 bg-black/50 z-[9999998] lg:hidden"
                  onClick={() => setIsFilterOpen(false)}
                />
              </>
            )}

            <div className="lg:col-span-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex flex-wrap gap-2">
                  <FlightFilterBadges
                    filters={filters}
                    handleFilterClear={handleFilterClear}
                  />
                  {(filters.price[0] !== 1000 ||
                    filters.price[1] !== 10000 ||
                    filters.stops?.length > 0 ||
                    filters.departureTime?.length > 0 ||
                    filters.arrivalTime?.length > 0 ||
                    filters.airlines?.length > 0 ||
                    filters.duration?.length > 0 ||
                    Object.values(filters.fareOptions).some(Boolean) ||
                    filters.layoverAirports?.length > 0 ||
                    filters.connectingFlightDuration[0] !== 0 ||
                    filters.connectingFlightDuration[1] !== 1440) && (
                      <button
                        onClick={() => handleFilterClear("all")}
                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                      >
                        Clear All
                      </button>
                    )}
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <label className="text-sm text-gray-600 whitespace-nowrap">
                    Sort By:
                  </label>
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="duration-shortest">Duration: Low to High</option>
                    <option value="duration-longest">Duration: High to Low</option>
                    <option value="departure-earliest">Departure: Earliest</option>
                    <option value="departure-latest">Departure: Latest</option>
                    <option value="arrival-earliest">Arrival: Earliest</option>
                    <option value="arrival-latest">Arrival: Latest</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {isLoading ? (
                  Array.from({ length: Math.min(visiblePackages, 4) }).map(
                    (_, index) => (
                      <div
                        key={index}
                        className="bg-gray-200 animate-pulse rounded-xl h-96"
                      />
                    )
                  )
                ) : flights.length > 0 ? (
                  flights.slice(0, visiblePackages).map((flight, index) => (
                    <div key={index} className="package-card">
                      <FlightCard
                        airlines={flight.airlines}
                        departure={flight.departure}
                        arrival={flight.arrival}
                        departureTime={flight.departureTime}
                        arrivalTime={flight.arrivalTime}
                        duration={flight.duration}
                        stops={flight.stops}
                        legs={flight.legs}
                        fareTypes={flight.fareTypes}
                        travelClass={travelClass}
                        onFareSelect={(selectedFare) =>
                          handleFareBooking(flight, selectedFare)
                        }
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-600 text-lg">
                      No flights match your criteria
                    </p>
                  </div>
                )}
              </div>

              {isFetching && (
                <div className="text-center py-4">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-500 border-r-transparent"></div>
                  <p className="text-gray-600 mt-2">Loading more flights...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}