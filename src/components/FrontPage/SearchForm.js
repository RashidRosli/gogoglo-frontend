import React, { useState, useEffect, forwardRef, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaArrowRightArrowLeft, FaHotel, FaPlane, FaSuitcaseRolling, FaChevronDown } from "react-icons/fa6";

const CustomDate = forwardRef(({ value, onClick, placeholder }, ref) => (
  <div className="relative" onClick={onClick}>
    <input
      type="text"
      className="w-full pl-10 pr-3 py-2.5 md:py-3 bg-transparent border-none text-gray-700 text-sm md:text-base font-medium placeholder-gray-400 focus:outline-none cursor-pointer"
      value={value || ''}
      ref={ref}
      readOnly
      placeholder={placeholder}
    />
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <svg className="h-4 w-4 md:h-5 md:w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
      </svg>
    </div>
  </div>
));

const CustomDateMulti = forwardRef(({ value, onClick, placeholder }, ref) => (
  <div className="relative" onClick={onClick}>
    <input
      type="text"
      className="w-full pl-10 pr-3 py-2.5 md:py-3 bg-transparent border-none text-gray-700 text-sm md:text-base font-medium placeholder-gray-400 focus:outline-none cursor-pointer"
      value={value || ''}
      ref={ref}
      readOnly
      placeholder={placeholder}
    />
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <svg className="h-4 w-4 md:h-5 md:w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
      </svg>
    </div>
  </div>
));

class FlightValidator {
  static validateFlights(flights) {
    const newErrors = {};

    flights.forEach((flight, index) => {
      if (!flight.from) {
        newErrors[`from-${index}`] = "Please select a departure airport";
      }
      if (!flight.to) {
        newErrors[`to-${index}`] = "Please select a destination airport";
      }
      if (!flight.date) {
        newErrors[`date-${index}`] = "Please select a departure date";
      }
    });

    return newErrors;
  }
}

const allAirports = [
  { code: "JFK", name: "John F. Kennedy International", city: "New York", country: "United States" },
  { code: "LAX", name: "Los Angeles International", city: "Los Angeles", country: "United States" },
  { code: "CDG", name: "Paris Charles de Gaulle", city: "Paris", country: "France" },
  { code: "NRT", name: "Tokyo Narita", city: "Tokyo", country: "Japan" },
  { code: "SYD", name: "Sydney Kingsford Smith", city: "Sydney", country: "Australia" },
  { code: "SFO", name: "San Francisco International", city: "San Francisco", country: "United States" },
  { code: "ORD", name: "Chicago O'Hare International", city: "Chicago", country: "United States" },
  { code: "MIA", name: "Miami International", city: "Miami", country: "United States" },
  { code: "DXB", name: "Dubai International", city: "Dubai", country: "United Arab Emirates" },
  { code: "HND", name: "Tokyo Haneda", city: "Tokyo", country: "Japan" },
  { code: "AMS", name: "Amsterdam Schiphol", city: "Amsterdam", country: "Netherlands" },
  { code: "FRA", name: "Frankfurt", city: "Frankfurt", country: "Germany" },
  { code: "SIN", name: "Singapore Changi", city: "Singapore", country: "Singapore" },
];

function SearchForm() {
  const [activeTab, setActiveTab] = useState("tours");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [rooms, setRooms] = useState([{ adults: 2, children: 0, childrenAges: [] }]);
  const departureDateRef = useRef(null);
  const returnDateRef = useRef(null);
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);
  const [startDate, setStartDate] = useState(new Date());
  const [flightType, setFlightType] = useState("one-way");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [travellers, setTravellers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    childrenAges: [],
    infantAges: []
  });
  const [travelClass, setTravelClass] = useState("Economy");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [airportOptions, setAirportOptions] = useState([]);
  const [multiCityFlights, setMultiCityFlights] = useState([
    { from: "", to: "", date: new Date(), travellers: { adults: 1, children: 0, infants: 0 }, travelClass: "Economy" },
    { from: "", to: "", date: new Date() },
  ]);
  const [destination, setDestination] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [errors, setErrors] = useState({});
  const [groupSizeOpen, setGroupSizeOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [travellersOpen, setTravellersOpen] = useState(false);
  const [travelClassOpen, setTravelClassOpen] = useState(false);
  const groupSizeRef = useRef(null);
  const guestsRef = useRef(null);
  const travellersRef = useRef(null);
  const travelClassRef = useRef(null);

  // Function to get 7 random airports excluding required ones
  const getRandomAirports = (allAirports, count, requiredCodes) => {
    const filtered = allAirports.filter(
      airport => !requiredCodes.includes(airport.code)
    );
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const requiredAirports = [
      { code: "KUL", name: "Kuala Lumpur International", city: "Kuala Lumpur", country: "Malaysia" },
      { code: "JHB", name: "Senai International", city: "Johor Bahru", country: "Malaysia" },
      { code: "LHR", name: "London Heathrow", city: "London", country: "United Kingdom" },
    ];

    const randomAirports = getRandomAirports(allAirports, 7, ["KUL", "JHB", "LHR"]);
    const finalAirports = [...requiredAirports, ...randomAirports];

    setAirportOptions(finalAirports);
    setLocationOptions(finalAirports.map(airport => ({
      city: airport.city,
      country: airport.country
    })));
  }, []);

  const [filteredLocations, setFilteredLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const locationInputRef = useRef(null);

  useEffect(() => {
    setFilteredLocations(
      locationOptions.filter((option) => {
        const query = searchQuery.toLowerCase();
        return (
          option.city.toLowerCase().includes(query) ||
          option.country.toLowerCase().includes(query)
        );
      })
    );
  }, [searchQuery, locationOptions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target) && showDropdown
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown",
        handleClickOutside);
    };
  }, [showDropdown, locationInputRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (groupSizeRef.current && !groupSizeRef.current.contains(event.target)) setGroupSizeOpen(false);
      if (guestsRef.current && !guestsRef.current.contains(event.target)) setGuestsOpen(false);
      if (travellersRef.current && !travellersRef.current.contains(event.target)) setTravellersOpen(false);
      if (travelClassRef.current && !travelClassRef.current.contains(event.target)) setTravelClassOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    setSearchQuery("");
    setShowDropdown(false);
  };

  const handleInputChange = (e) => {
    if (selectedLocation) {
      setSelectedLocation("");
    }
    setSearchQuery(e.target.value);
    setShowDropdown(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    if (activeTab === "tours") {
      if (!destination) {
        newErrors.destination = "Please select a destination";
      }
      if (!startDate) {
        newErrors.startDate = "Please select a start date";
      }
    } else if (activeTab === "hotels") {
      if (!selectedLocation) {
        newErrors.location = "Please select a location";
      }
      if (!checkInDate) {
        newErrors.checkInDate = "Please select a check-in date";
      }
      if (!checkOutDate) {
        newErrors.checkOutDate = "Please select a check-out date";
      }
      if (rooms.length === 0) {
        newErrors.rooms = "Please add at least one room";
      } else {
        rooms.forEach((room, index) => {
          if (room.adults <= 0) {
            newErrors[`adults-${index}`] = `Please specify at least one adult for room ${index + 1}`;
          }
          if (room.children < 0) {
            newErrors[`children-${index}`] = `Children count cannot be negative for room ${index + 1}`;
          }
          if (room.childrenAges.some(age => age < 0)) {
            newErrors[`childrenAges-${index}`] = `Child ages cannot be negative for room ${index + 1}`;
          }
        });
      }
    } else if (activeTab === "flights") {
      if (flightType === "one-way" || flightType === "round-trip") {
        if (!fromLocation) newErrors.fromLocation = "Please select a departure airport";
        if (!toLocation) newErrors.toLocation = "Please select a destination airport";
        if (!departureDate) newErrors.departureDate = "Please select a departure date";
        if (flightType === "round-trip" && !returnDate) newErrors.returnDate = "Please select a return date";
        if (travellers.children > 0 && travellers.childrenAges.some(age => age < 2 || age > 13)) {
          newErrors.childrenAges = "Children ages must be between 2 and 13";
        }
        if (travellers.infants > 0 && travellers.infantAges.some(age => age < 0 || age > 1)) {
          newErrors.infantAges = "Infant ages must be between 0 and 1";
        }

        console.log("Travellers State:", travellers);
        console.log("Errors:", newErrors);

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
          const url = "/flights?" +
            `from=${encodeURIComponent(fromLocation)}` +
            `&to=${encodeURIComponent(toLocation)}` +
            `&departureDate=${departureDate.toISOString().split('T')[0]}` +
            `&type=${flightType}` +
            `&travellers=${encodeURIComponent(JSON.stringify(travellers))}` +
            `&travelClass=${encodeURIComponent(travelClass)}` +
            (flightType === "round-trip" ? `&returnDate=${returnDate.toISOString().split('T')[0]}` : "");
          console.log("Redirecting to:", url);
          window.location.href = url;
        }
      } else if (flightType === "multi-city") {
        const multiCityErrors = FlightValidator.validateFlights(multiCityFlights);
        Object.assign(newErrors, multiCityErrors);
        if (travellers.children > 0 && travellers.childrenAges.some(age => age < 2 || age > 13)) {
          newErrors.childrenAges = "Children ages must be between 2 and 13";
        }
        if (travellers.infants > 0 && travellers.infantAges.some(age => age < 0 || age > 1)) {
          newErrors.infantAges = "Infant ages must be between 0 and 1";
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
          const updatedMultiCityFlights = multiCityFlights.map(flight => ({
            ...flight,
            travellers,
            travelClass
          }));
          const url = "/flights?" +
            `type=${flightType}` +
            `&flights=${encodeURIComponent(JSON.stringify(updatedMultiCityFlights))}`;
          console.log("Redirecting to:", url);
          window.location.href = url;
        }
      }
    }

    setErrors(newErrors);

    // Move tours and hotels redirects inside their respective blocks
    if (Object.keys(newErrors).length === 0) {
      if (activeTab === "tours") {
        const queryTour = new URLSearchParams({
          destination,
          startDate: startDate.toISOString().split('T')[0],
          adults,
          children
        }).toString();
        console.log("Redirecting to:", `/tours?${queryTour}`);
        window.location.href = `/tours?${queryTour}`;
      } else if (activeTab === "hotels") {
        const roomData = JSON.stringify(rooms);
        const encodedRoomData = encodeURIComponent(roomData);
        const queryParams = new URLSearchParams({
          destination: selectedLocation,
          startDate: checkInDate.toISOString().split('T')[0],
          endDate: checkOutDate.toISOString().split('T')[0],
          rooms: rooms.length,
          roomData: encodedRoomData,
        });
        console.log("Redirecting to:", `/hotels?${queryParams.toString()}`);
        window.location.href = `/hotels?${queryParams.toString()}`;
      }
    }
  };

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    setCheckOutDate(null);
    if (checkOutRef.current) {
      checkOutRef.current.setState({ startDate: null, endDate: null });
      checkOutRef.current.setOpen(true);
    }
  };

  const handleGuestChange = (roomIndex, field, value) => {
    setRooms((prevRooms) => {
      const updatedRooms = [...prevRooms];
      updatedRooms[roomIndex][field] = value;
      if (field === "children") {
        updatedRooms[roomIndex].childrenAges = new Array(value).fill(0);
      }
      return updatedRooms;
    });
  };

  const handleChildAgeChange = (roomIndex, childIndex, age) => {
    setRooms((prevRooms) => {
      const updatedRooms = [...prevRooms];
      updatedRooms[roomIndex].childrenAges[childIndex] = age;
      return updatedRooms;
    });
  };

  const addRoom = () => {
    setRooms((prevRooms) => [
      ...prevRooms,
      { adults: 2, children: 0, childrenAges: [] },
    ]);
  };

  const removeRoom = (roomIndex) => {
    if (rooms.length > 1) {
      setRooms((prevRooms) =>
        prevRooms.filter((_, index) => index !== roomIndex)
      );
    }
  };

  const resetInputs = () => {
    setSelectedLocation("");
    setCheckInDate(new Date());
    setCheckOutDate(null);
    setStartDate(new Date());
    setRooms([{ adults: 2, children: 0, childrenAges: [] }]);
    setFlightType("one-way");
    setDepartureDate(new Date());
    setReturnDate(null);
    setTravellers({ adults: 1, children: 0, infants: 0 });
    setTravelClass("Economy");
    setFromLocation("");
    setToLocation("");
  };

  const handleFlightTypeChange = (type) => {
    setFlightType(type);
    setDepartureDate(new Date());
    setReturnDate(null);
    setMultiCityFlights([
      { from: '', to: '', date: new Date() },
      { from: '', to: '', date: new Date() }
    ]);
    setErrors({});
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetInputs();
    setErrors({});
  };

  const [filteredAirports, setFilteredAirports] = useState([]);
  const [airportSearchQuery, setAirportSearchQuery] = useState("");
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [showFromDropdowns, setShowFromDropdowns] = useState([]);
  const [showToDropdowns, setShowToDropdowns] = useState([]);
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const fromInputRefs = useRef([]);
  const toInputRefs = useRef([]);

  useEffect(() => {
    setFilteredAirports(
      airportOptions.filter((option) => {
        const query = airportSearchQuery ? airportSearchQuery.toLowerCase() : '';
        return (
          option.name.toLowerCase().includes(query) ||
          option.city.toLowerCase().includes(query) ||
          option.country.toLowerCase().includes(query) ||
          option.code.toLowerCase().includes(query)
        );
      })
    );
  }, [airportSearchQuery, airportOptions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        fromInputRef.current &&
        !fromInputRef.current.contains(event.target) &&
        showFromDropdown
      ) {
        setShowFromDropdown(false);
      }

      if (
        toInputRef.current &&
        !toInputRef.current.contains(event.target) &&
        showToDropdown
      ) {
        setShowToDropdown(false);
      }

      fromInputRefs.current.forEach((ref, index) => {
        if (
          ref &&
          !ref.contains(event.target) &&
          showFromDropdowns[index]
        ) {
          setShowFromDropdowns((prevDropdowns) => {
            const updatedDropdowns = [...prevDropdowns];
            updatedDropdowns[index] = false;
            return updatedDropdowns;
          });
        }
      });

      toInputRefs.current.forEach((ref, index) => {
        if (
          ref &&
          !ref.contains(event.target) &&
          showToDropdowns[index]
        ) {
          setShowToDropdowns((prevDropdowns) => {
            const updatedDropdowns = [...prevDropdowns];
            updatedDropdowns[index] = false;
            return updatedDropdowns;
          });
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFromDropdown, showToDropdown, showFromDropdowns, showToDropdowns]);

  const handleAirportChange = (airport, index) => {
    const locationString = `${airport.city}, ${airport.country} (${airport.code})`;
    if (index === 0) {
      setFromLocation(locationString);
    } else if (index === 1) {
      setToLocation(locationString);
    }
    setAirportSearchQuery("");
    setShowFromDropdown(false);
    setShowToDropdown(false);
  };

  const handleAirportInputChange = (e, index) => {
    setAirportSearchQuery(e.target.value);
    if (index === 0) {
      setShowFromDropdown(true);
      setShowToDropdown(false);
    } else if (index === 1) {
      setShowToDropdown(true);
      setShowFromDropdown(false);
    }
  };

  const [isRotating, setIsRotating] = useState(false);

  const handleSwapLocations = () => {
    setIsRotating(!isRotating);
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleFlightChildAgeChange = (index, age) => {
    setTravellers((prevTravellers) => {
      const updatedChildrenAges = [...prevTravellers.childrenAges];
      updatedChildrenAges[index] = age;
      return { ...prevTravellers, childrenAges: updatedChildrenAges };
    });
  };

  const handleFlightInfantAgeChange = (index, age) => {
    setTravellers((prevTravellers) => {
      const updatedInfantAges = [...prevTravellers.infantAges];
      updatedInfantAges[index] = age;
      return { ...prevTravellers, infantAges: updatedInfantAges };
    });
  };

  const handleTravellerChange = (field, value) => {
    setTravellers((prevTravellers) => {
      const updatedTravellers = { ...prevTravellers, [field]: value };
      if (field === "children") {
        updatedTravellers.childrenAges = Array(value).fill(2);
      }
      if (field === "infants") {
        updatedTravellers.infantAges = Array(value).fill(0);
      }
      return updatedTravellers;
    });
  };

  const handleDepartureDateChange = (date) => {
    setDepartureDate(date);
    if (returnDateRef.current) {
      returnDateRef.current.setOpen(true);
    }
  };

  const handleReturnDateChange = (date) => {
    setReturnDate(date);
    setTimeout(() => {
      if (returnDateRef.current) {
        returnDateRef.current.setOpen(false);
      }
    }, 100);
  };

  const handleMultiCityAirportChange = (airport, flightIndex, inputType) => {
    const locationString = `${airport.city}, ${airport.country} (${airport.code})`;
    setMultiCityFlights((prevFlights) => {
      const updatedFlights = [...prevFlights];
      updatedFlights[flightIndex][inputType] = locationString;
      return updatedFlights;
    });

    setAirportSearchQuery("");
    if (inputType === "from") {
      setShowFromDropdowns((prevDropdowns) => {
        const updatedDropdowns = [...prevDropdowns];
        updatedDropdowns[flightIndex] = false;
        return updatedDropdowns;
      });
    } else if (inputType === "to") {
      setShowToDropdowns((prevDropdowns) => {
        const updatedDropdowns = [...prevDropdowns];
        updatedDropdowns[flightIndex] = false;
        return updatedDropdowns;
      });
    }
  };

  const handleMultiCityAirportInputChange = (e, index, inputType) => {
    setAirportSearchQuery(e.target.value);
    if (inputType === "from") {
      setShowFromDropdowns((prevDropdowns) => {
        const updatedDropdowns = Array(multiCityFlights.length).fill(false);
        updatedDropdowns[index] = !updatedDropdowns[index];
        return updatedDropdowns;
      });
    } else if (inputType === "to") {
      setShowToDropdowns((prevDropdowns) => {
        const updatedDropdowns = Array(multiCityFlights.length).fill(false);
        updatedDropdowns[index] = !updatedDropdowns[index];
        return updatedDropdowns;
      });
    }
  };

  const handleMultiCityFlightChange = (index, field, value) => {
    setMultiCityFlights((prevFlights) => {
      const updatedFlights = [...prevFlights];
      updatedFlights[index][field] = value;
      if (field === "from" || field === "to") {
        setAirportSearchQuery(value);
      }
      return updatedFlights;
    });
  };

  const handleAddMultiCityFlight = () => {
    if (multiCityFlights.length < 5) {
      setMultiCityFlights((prevFlights) => [
        ...prevFlights,
        { from: "", to: "", date: new Date(), travellers: { adults: 1, children: 0, infants: 0 }, travelClass: "Economy" },
      ]);
      setShowFromDropdowns((prevDropdowns) => [...prevDropdowns, false]);
      setShowToDropdowns((prevDropdowns) => [...prevDropdowns, false]);
    }
  };

  const handleRemoveMultiCityFlight = (index) => {
    if (multiCityFlights.length > 2) {
      setMultiCityFlights(prevFlights => {
        const updatedFlights = [...prevFlights];
        updatedFlights.splice(index, 1);
        return updatedFlights;
      });
    }
  };

  const handleSwapMultiCityLocations = (index) => {
    setIsRotating((prevRotating) => {
      const updatedRotating = prevRotating.length > 0 ? [...prevRotating] : [false];
      updatedRotating[index] = !updatedRotating[index];
      return updatedRotating;
    });
    setMultiCityFlights((prevFlights) => {
      const updatedFlights = [...prevFlights];
      const temp = updatedFlights[index].from;
      updatedFlights[index].from = updatedFlights[index].to;
      updatedFlights[index].to = temp;
      return updatedFlights;
    });
  };

  return (
    <div className="bg-white p-4 md:p-6 shadow-md rounded-xl mt-10 max-w-3xl md:max-w-5xl mx-auto border border-gray-100">
      <ul className="flex justify-center gap-2 bg-gray-50 shadow-sm rounded-full p-1 md:p-2 mb-4 md:mb-6 border border-gray-200">
        {['tours', 'hotels', 'flights'].map((tab) => (
          <li
            key={tab}
            className={`flex-1 text-center cursor-pointer py-2 px-3 md:py-3 md:px-4 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 ${activeTab === tab
              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
            onClick={() => handleTabChange(tab)}
          >
            <div className="flex items-center justify-center gap-1 md:gap-2">
              {tab === 'tours' && <FaSuitcaseRolling className="w-4 h-4 md:w-5 md:h-5" />}
              {tab === 'hotels' && <FaHotel className="w-4 h-4 md:w-5 md:h-5" />}
              {tab === 'flights' && <FaPlane className="w-4 h-4 md:w-5 md:h-5" />}
              <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
        {activeTab === "tours" && (
          <div className="space-y-3 md:space-y-4">
            <div className={`relative rounded-md border ${errors.destination ? 'border-red-500' : 'border-gray-200'} bg-white hover:border-gray-300 transition-colors`}>
              <label htmlFor="destination" className="absolute -top-2 left-2 bg-white px-1 text-xs md:text-sm text-gray-600 font-medium">
                Destination
              </label>
              <div className="flex items-center p-2 md:p-3">
                <svg className="h-4 w-4 md:h-5 md:w-5 text-gray-500 mr-2 md:mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <input
                  type="text"
                  placeholder="Enter destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-transparent text-sm md:text-base font-medium text-gray-700 placeholder-gray-400 focus:outline-none"
                />
              </div>
              {errors.destination && (
                <p className="text-red-500 text-xs md:text-sm px-2 md:px-3 pb-1">{errors.destination}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-2 md:gap-4">
              <div className={`relative rounded-md border ${errors.startDate ? 'border-red-500' : 'border-gray-200'} bg-white hover:border-gray-300 transition-colors`}>
                <label className="absolute -top-2 left-2 bg-white px-1 text-xs md:text-sm text-gray-600 font-medium">
                  Start Date
                </label>
                <DatePicker
                  id="startDate"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd MMMM yyyy"
                  minDate={new Date()}
                  customInput={<CustomDate />}
                  className="w-full"
                />
                {errors.startDate && (
                  <p className="text-red-500 text-xs md:text-sm px-2 md:px-3 pb-1">{errors.startDate}</p>
                )}
              </div>

              <div className="relative" ref={groupSizeRef}>
                <div
                  className={`relative rounded-md border ${errors.groupSize ? 'border-red-500' : 'border-gray-200'} bg-white hover:border-gray-300 cursor-pointer transition-colors`}
                  onClick={() => setGroupSizeOpen(!groupSizeOpen)}
                >
                  <label className="absolute -top-2 left-2 bg-white px-1 text-xs md:text-sm text-gray-600 font-medium">
                    Group Size
                  </label>
                  <div className="flex items-center p-2 md:p-3">
                    <svg className="h-4 w-4 md:h-5 md:w-5 text-gray-500 mr-2 md:mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm md:text-base text-gray-700 font-medium flex-1">
                      {parseInt(adults, 10) + parseInt(children, 10)} guests
                    </span>
                    <FaChevronDown className={`h-4 w-4 md:h-5 md:w-5 text-gray-500 transition-transform ${groupSizeOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>
                {groupSizeOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-3 md:p-4">
                    <div className="space-y-2 md:space-y-3">
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Adults</label>
                        <select
                          value={adults}
                          onChange={(e) => setAdults(parseInt(e.target.value, 10))}
                          className="w-full p-2 md:p-3 border border-gray-200 rounded-md text-sm md:text-base focus:ring-1 focus:ring-red-500 focus:border-transparent"
                        >
                          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Children</label>
                        <select
                          value={children}
                          onChange={(e) => setChildren(parseInt(e.target.value, 10))}
                          className="w-full p-2 md:p-3 border border-gray-200 rounded-md text-sm md:text-base focus:ring-1 focus:ring-red-500 focus:border-transparent"
                        >
                          {Array.from({ length: 10 }, (_, i) => i).map((num) => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
                {errors.groupSize && (
                  <p className="text-red-500 text-xs md:text-sm px-2 md:px-3 pt-1">{errors.groupSize}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full md:w-1/3 mx-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2 md:py-3 px-4 md:px-6 rounded-md shadow-sm transition-all"
            >
              Search
            </button>
          </div>
        )}

        {activeTab === "hotels" && (
          <div className="space-y-3 md:space-y-4">
            <div className={`relative rounded-md border ${errors.location ? 'border-red-500' : 'border-gray-200'} bg-white hover:border-gray-300 transition-colors`}>
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs md:text-sm text-gray-600 font-medium">
                Destination
              </label>
              <div className="relative p-2 md:p-3" ref={locationInputRef}>
                <div className="flex items-center">
                  <svg className="h-4 w-4 md:h-5 md:w-5 text-gray-500 mr-2 md:mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search location..."
                    value={selectedLocation || searchQuery}
                    onChange={handleInputChange}
                    className="w-full bg-transparent text-sm md:text-base font-medium text-gray-700 placeholder-gray-400 focus:outline-none"
                    onClick={() => setShowDropdown(true)}
                  />
                </div>
                {showDropdown && (
                  <ul className="absolute z-20 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-40 md:max-h-48 overflow-y-auto shadow-md">
                    {filteredLocations.map((option) => (
                      <li
                        key={option.country}
                        className="p-2 md:p-3 cursor-pointer hover:bg-gray-100 text-gray-700 text-sm md:text-base"
                        onClick={() => handleLocationChange(`${option.city}, ${option.country}`)}
                      >
                        {option.city}, {option.country}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {errors.location && (
                <p className="text-red-500 text-xs md:text-sm px-2 md:px-3 pb-1">{errors.location}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-2 md:gap-4">
              <div className="grid sm:grid-cols-2 gap-2 md:gap-4">
                <div className={`relative rounded-md border ${errors.checkInDate ? 'border-red-500' : 'border-gray-200'} bg-white hover:border-gray-300 transition-colors`}>
                  <label className="absolute -top-2 left-2 bg-white px-1 text-xs md:text-sm text-gray-600 font-medium">
                    Check-in
                  </label>
                  <DatePicker
                    id="checkInDate"
                    ref={checkInRef}
                    selected={checkInDate}
                    onChange={handleCheckInChange}
                    dateFormat="dd MMMM yyyy"
                    minDate={new Date()}
                    selectsStart
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    customInput={<CustomDate />}
                    className="w-full"
                  />
                  {errors.checkInDate && (
                    <p className="text-red-500 text-xs md:text-sm px-2 md:px-3 pb-1">{errors.checkInDate}</p>
                  )}
                </div>

                <div className={`relative rounded-md border ${errors.checkOutDate ? 'border-red-500' : 'border-gray-200'} bg-white hover:border-gray-300 transition-colors`}>
                  <label className="absolute -top-2 left-2 bg-white px-1 text-xs md:text-sm text-gray-600 font-medium">
                    Check-out
                  </label>
                  <DatePicker
                    id="checkOutDate"
                    ref={checkOutRef}
                    selected={checkOutDate}
                    onChange={(date) => setCheckOutDate(date)}
                    dateFormat="dd MMMM yyyy"
                    minDate={checkInDate || new Date()}
                    selectsEnd
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    customInput={<CustomDate placeholder="Check-out date" />}
                    placeholderText="Check-out date"
                    className="w-full"
                  />
                  {errors.checkOutDate && (
                    <p className="text-red-500 text-xs md:text-sm px-2 md:px-3 pb-1">{errors.checkOutDate}</p>
                  )}
                </div>
              </div>

              <div className="relative" ref={guestsRef}>
                <div
                  className={`relative rounded-md border ${errors.rooms ? 'border-red-500' : 'border-gray-200'} bg-white hover:border-gray-300 cursor-pointer transition-colors`}
                  onClick={() => setGuestsOpen(!guestsOpen)}
                >
                  <label className="absolute -top-2 left-2 bg-white px-1 text-xs md:text-sm text-gray-600 font-medium">
                    Guests
                  </label>
                  <div className="flex items-center p-2 md:p-3">
                    <svg className="h-4 w-4 md:h-5 md:w-5 text-gray-500 mr-2 md:mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm md:text-base font-medium text-gray-700 flex-1 truncate">
                      {rooms.length > 0 && `${rooms.length} rooms, `}
                      {rooms.reduce((total, room) => total + room.adults, 0)} adults
                      {rooms.reduce((total, room) => total + room.children, 0) > 0 &&
                        `, ${rooms.reduce((total, room) => total + room.children, 0)} children`}
                    </span>
                    <FaChevronDown className={`h-4 w-4 md:h-5 md:w-5 text-gray-500 transition-transform ${guestsOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>
                {guestsOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-3 md:p-4 max-h-64 md:max-h-72 overflow-y-auto">
                    {rooms.map((room, roomIndex) => (
                      <div key={roomIndex} className="pb-2 md:pb-3 border-b last:border-b-0 last:pb-0">
                        <h3 className="text-xs md:text-sm font-semibold text-gray-800 mb-2">Room {roomIndex + 1}</h3>
                        <div className="grid grid-cols-2 gap-2 md:gap-3">
                          <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Adults</label>
                            <select
                              value={room.adults}
                              onChange={(e) => handleGuestChange(roomIndex, "adults", parseInt(e.target.value, 10))}
                              className="w-full p-2 md:p-3 border border-gray-200 rounded-md text-sm md:text-base focus:ring-1 focus:ring-red-500 focus:border-transparent"
                            >
                              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Children</label>
                            <select
                              value={room.children}
                              onChange={(e) => handleGuestChange(roomIndex, "children", parseInt(e.target.value, 10))}
                              className="w-full p-2 md:p-3 border border-gray-200 rounded-md text-sm md:text-base focus:ring-1 focus:ring-red-500 focus:border-transparent"
                            >
                              {Array.from({ length: 10 }, (_, i) => i).map((num) => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {room.children > 0 && (
                          <div className="mt-2 md:mt-3 grid grid-cols-2 gap-2 md:gap-3">
                            {room.childrenAges.map((age, childIndex) => (
                              <div key={childIndex}>
                                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Child {childIndex + 1}</label>
                                <select
                                  value={age}
                                  onChange={(e) => handleChildAgeChange(roomIndex, childIndex, parseInt(e.target.value, 10))}
                                  className="w-full p-2 md:p-3 border border-gray-200 rounded-md text-sm md:text-base focus:ring-1 focus:ring-red-500 focus:border-transparent"
                                >
                                  {Array.from({ length: 18 }, (_, i) => i).map((age) => (
                                    <option key={age} value={age}>{age}</option>
                                  ))}
                                </select>
                              </div>
                            ))}
                          </div>
                        )}
                        {rooms.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRoom(roomIndex)}
                            className="mt-2 md:mt-3 text-red-500 hover:text-red-600 text-xs md:text-sm"
                          >
                            Remove Room
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addRoom}
                      className="mt-2 md:mt-3 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 md:py-3 rounded-md text-sm md:text-base"
                    >
                      Add Room
                    </button>
                  </div>
                )}
                {errors.rooms && (
                  <p className="text-red-500 text-xs md:text-sm px-2 md:px-3 pt-1">{errors.rooms}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full md:w-1/3 mx-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2 md:py-3 px-4 md:px-6 rounded-md shadow-sm transition-all"
            >
              Search
            </button>
          </div>
        )}

        {activeTab === "flights" && (
          <div className="space-y-3 md:space-y-4">
            <div className="flex flex-wrap gap-1 md:gap-2">
              {["one-way", "round-trip", "multi-city"].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all ${flightType === type
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  onClick={() => handleFlightTypeChange(type)}
                >
                  {type.replace('-', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())}
                </button>
              ))}
            </div>

            {(flightType === "one-way" || flightType === "round-trip") && (
              <div className="space-y-3 md:space-y-4">
                <div className="grid md:grid-cols-[1fr_auto_1fr] gap-2 md:gap-4 items-center">
                  <div className={`relative rounded-md border ${errors.fromLocation ? 'border-red-500' : 'border-gray-200'} bg-white hover:border-gray-300 transition-colors`} ref={fromInputRef}>
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs md:text-sm text-gray-600 font-medium">
                      From
                    </label>
                    <div className="relative p-2 md:p-3">
                      <div className="flex items-center">
                        <svg className="h-4 w-4 md:h-5 md:w-5 text-gray-500 mr-2 md:mr-3 transform -rotate-45" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search airport..."
                          value={fromLocation}
                          onChange={(e) => {
                            handleAirportInputChange(e, 0);
                            setFromLocation(e.target.value);
                          }}
                          className="w-full bg-transparent text-sm md:text-base font-medium text-gray-700 placeholder-gray-400 focus:outline-none"
                          onClick={() => setShowFromDropdown(true)}
                        />
                      </div>
                      {showFromDropdown && (
                        <ul className="absolute z-20 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-40 md:max-h-48 overflow-y-auto shadow-md">
                          {filteredAirports.map((airport, index) => (
                            <li
                              key={index}
                              className="p-2 md:p-3 cursor-pointer hover:bg-gray-100 text-gray-700 text-sm md:text-base"
                              onClick={() => handleAirportChange(airport, 0)}
                            >
                              {airport.city}, {airport.country} ({airport.code})
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {errors.fromLocation && (
                      <p className="text-red-500 text-xs md:text-sm px-2 md:px-3 pb-1">{errors.fromLocation}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 md:p-3 rounded-full self-center transition-colors"
                    onClick={handleSwapLocations}
                  >
                    <FaArrowRightArrowLeft className={`h-4 w-4 md:h-5 md:w-5 transform transition-transform duration-200 ${isRotating ? 'rotate-180' : ''}`} />
                  </button>

                  <div className={`relative rounded-md border ${errors.toLocation ? 'border-red-500' : 'border-gray-200'} bg-white hover:border-gray-300 transition-colors`} ref={toInputRef}>
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs md:text-sm text-gray-600 font-medium">
                      To
                    </label>
                    <div className="relative p-2 md:p-3">
                      <div className="flex items-center">
                        <svg className="h-4 w-4 md:h-5 md:w-5 text-gray-500 mr-2 md:mr-3 transform rotate-45" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search airport..."
                          value={toLocation}
                          onChange={(e) => {
                            handleAirportInputChange(e, 1);
                            setToLocation(e.target.value);
                          }}
                          className="w-full bg-transparent text-sm md:text-base font-medium text-gray-700 placeholder-gray-400 focus:outline-none"
                          onClick={() => setShowToDropdown(true)}
                        />
                      </div>
                      {showToDropdown && (
                        <ul className="absolute z-20 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-40 md:max-h-48 overflow-y-auto shadow-md">
                          {filteredAirports.map((airport, index) => (
                            <li
                              key={index}
                              className="p-2 md:p-3 cursor-pointer hover:bg-gray-100 text-gray-700 text-sm md:text-base"
                              onClick={() => handleAirportChange(airport, 1)}
                            >
                              {airport.city}, {airport.country} ({airport.code})
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {errors.toLocation && (
                      <p className="text-red-500 text-xs md:text-sm px-2 md:px-3 pb-1">{errors.toLocation}</p>
                    )}
                  </div>
                </div>

                <div className={`grid ${flightType === "round-trip" ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-2 md:gap-4`}>
                  <div className={`relative rounded-md border ${errors.departureDate ? 'border-red-500' : 'border-gray-200'} bg-white hover:border-gray-300 transition-colors`}>
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs md:text-sm text-gray-600 font-medium">
                      Departure
                    </label>
                    <DatePicker
                      id="departureDate"
                      ref={departureDateRef}
                      selected={departureDate}
                      onChange={flightType === "round-trip" ? handleDepartureDateChange : (date) => setDepartureDate(date)}
                      dateFormat="dd MMMM yyyy"
                      minDate={new Date()}
                      selectsStart={flightType === "round-trip"}
                      startDate={flightType === "round-trip" ? departureDate : undefined}
                      endDate={flightType === "round-trip" ? returnDate : undefined}
                      customInput={<CustomDate />}
                      className="w-full"
                    />
                    {errors.departureDate && (
                      <p className="text-red-500 text-xs md:text-sm px-2 md:px-3 pb-1">{errors.departureDate}</p>
                    )}
                  </div>

                  {flightType === "round-trip" && (
                    <div className={`relative rounded-md border ${errors.returnDate ? 'border-red-500' : 'border-gray-200'} bg-white hover:border-gray-300 transition-colors`}>
                      <label className="absolute -top-2 left-2 bg-white px-1 text-xs md:text-sm text-gray-600 font-medium">
                        Return
                      </label>
                      <DatePicker
                        id="returnDate"
                        ref={returnDateRef}
                        selected={returnDate}
                        onChange={handleReturnDateChange}
                        dateFormat="dd MMMM yyyy"
                        minDate={departureDate}
                        selectsEnd
                        startDate={departureDate}
                        endDate={returnDate}
                        customInput={<CustomDate placeholder="Return date" />}
                        placeholderText="Return date"
                        className="w-full"
                      />
                      {errors.returnDate && (
                        <p className="text-red-500 text-xs md:text-sm px-2 md:px-3 pb-1">{errors.returnDate}</p>
                      )}
                    </div>
                  )}

                  <div className="relative" ref={travellersRef}>
                    <div
                      className="relative rounded-md border border-gray-200 bg-white hover:border-gray-300 cursor-pointer transition-colors"
                      onClick={() => setTravellersOpen(!travellersOpen)}
                    >
                      <label className="absolute -top-2 left-2 bg-white px-1 text-xs md:text-sm text-gray-600 font-medium">
                        Travellers
                      </label>
                      <div className="flex items-center p-2 md:p-3">
                        <svg className="h-4 w-4 md:h-5 md:w-5 text-gray-500 mr-2 md:mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm md:text-base font-medium text-gray-700 flex-1 truncate">
                          {travellers.adults} adults
                          {travellers.children > 0 && `, ${travellers.children} children`}
                          {travellers.infants > 0 && `, ${travellers.infants} infants`}
                        </span>
                        <FaChevronDown className={`h-4 w-4 md:h-5 md:w-5 text-gray-500 transition-transform ${travellersOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                    {travellersOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-3 md:p-4">
                        <div className="grid grid-cols-3 gap-2 md:gap-3">
                          <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Adults</label>
                            <select
                              value={travellers.adults}
                              onChange={(e) => handleTravellerChange("adults", parseInt(e.target.value, 10))}
                              className="w-full p-2 md:p-3 border border-gray-200 rounded-md text-sm md:text-base focus:ring-1 focus:ring-red-500 focus:border-transparent"
                            >
                              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Children</label>
                            <select
                              value={travellers.children}
                              onChange={(e) => handleTravellerChange("children", parseInt(e.target.value, 10))}
                              className="w-full p-2 md:p-3 border border-gray-200 rounded-md text-sm md:text-base focus:ring-1 focus:ring-red-500 focus:border-transparent"
                            >
                              {Array.from({ length: 10 }, (_, i) => i).map((num) => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Infants</label>
                            <select
                              value={travellers.infants}
                              onChange={(e) => handleTravellerChange("infants", parseInt(e.target.value, 10))}
                              className="w-full p-2 md:p-3 border border-gray-200 rounded-md text-sm md:text-base focus:ring-1 focus:ring-red-500 focus:border-transparent"
                            >
                              {Array.from({ length: 10 }, (_, i) => i).map((num) => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {travellers.children > 0 && (
                          <div className="mt-2 md:mt-3">
                            <h3 className="text-xs md:text-sm font-semibold text-gray-800 mb-1 md:mb-2">Children Ages</h3>
                            <div className="grid grid-cols-2 gap-2 md:gap-3">
                              {Array.from({ length: travellers.children }).map((_, index) => (
                                <div key={`child-${index}`}>
                                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Child {index + 1}</label>
                                  <select
                                    value={travellers.childrenAges[index] || 0}
                                    onChange={(e) => handleFlightChildAgeChange(index, parseInt(e.target.value, 10))}
                                    className="w-full p-2 md:p-3 border border-gray-200 rounded-md text-sm md:text-base focus:ring-1 focus:ring-red-500 focus:border-transparent"
                                  >
                                    {Array.from({ length: 12 }, (_, i) => i + 2).map((age) => (
                                      <option key={age} value={age}>{age}</option>
                                    ))}
                                  </select>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {travellers.infants > 0 && (
                          <div className="mt-2 md:mt-3">
                            <h3 className="text-xs md:text-sm font-semibold text-gray-800 mb-1 md:mb-2">Infant Ages</h3>
                            <div className="grid grid-cols-2 gap-2 md:gap-3">
                              {Array.from({ length: travellers.infants }).map((_, index) => (
                                <div key={`infant-${index}`}>
                                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Infant {index + 1}</label>
                                  <select
                                    value={travellers.infantAges[index] || 0}
                                    onChange={(e) => handleFlightInfantAgeChange(index, parseInt(e.target.value, 10))}
                                    className="w-full p-2 md:p-3 border border-gray-200 rounded-md text-sm md:text-base focus:ring-1 focus:ring-red-500 focus:border-transparent"
                                  >
                                    {Array.from({ length: 2 }, (_, i) => i).map((age) => (
                                      <option key={age} value={age}>{age}</option>
                                    ))}
                                  </select>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="relative" ref={travelClassRef}>
                    <div
                      className="relative rounded-md border border-gray-200 bg-white hover:border-gray-300 cursor-pointer transition-colors"
                      onClick={() => setTravelClassOpen(!travelClassOpen)}
                    >
                      <label className="absolute -top-2 left-2 bg-white px-1 text-xs md:text-sm text-gray-600 font-medium">
                        Travel Class
                      </label>
                      <div className="flex items-center p-2 md:p-3">
                        <span className="text-sm md:text-base font-medium text-gray-700 flex-1 truncate">{travelClass}</span>
                        <FaChevronDown className={`h-4 w-4 md:h-5 md:w-5 text-gray-500 transition-transform ${travelClassOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                    {travelClassOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                        {["Economy", "Premium Economy", "Business Class", "First Class"].map((classOption) => (
                          <div
                            key={classOption}
                            className="p-2 md:p-3 cursor-pointer hover:bg-gray-100 text-gray-700 text-sm md:text-base"
                            onClick={() => {
                              setTravelClass(classOption);
                              setTravelClassOpen(false);
                            }}
                          >
                            {classOption}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {flightType === "multi-city" && (
              <div className="space-y-3 md:space-y-4">
                <div className="grid md:grid-cols-2 gap-2 md:gap-4">
                  <div className="relative" ref={travellersRef}>
                    <div
                      className="relative rounded-md border border-gray-200 bg-white hover:border-gray-300 cursor-pointer transition-colors"
                      onClick={() => setTravellersOpen(!travellersOpen)}
                    >
                      <label className="absolute -top-2 left-2 bg-white px-1 text-xs md:text-sm text-gray-600 font-medium">
                        Travellers
                      </label>
                      <div className="flex items-center p-2 md:p-3">
                        <svg className="h-4 w-4 md:h-5 md:w-5 text-gray-500 mr-2 md:mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm md:text-base font-medium text-gray-700 flex-1 truncate">
                          {travellers.adults} adults
                          {travellers.children > 0 && `, ${travellers.children} children`}
                          {travellers.infants > 0 && `, ${travellers.infants} infants`}
                        </span>
                        <FaChevronDown className={`h-4 w-4 md:h-5 md:w-5 text-gray-500 transition-transform ${travellersOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                    {travellersOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-3 md:p-4">
                        <div className="grid grid-cols-3 gap-2 md:gap-3">
                          <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Adults</label>
                            <select
                              value={travellers.adults}
                              onChange={(e) => handleTravellerChange("adults", parseInt(e.target.value, 10))}
                              className="w-full p-2 md:p-3 border border-gray-200 rounded-md text-sm md:text-base focus:ring-1 focus:ring-red-500 focus:border-transparent"
                            >
                              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Children</label>
                            <select
                              value={travellers.children}
                              onChange={(e) => handleTravellerChange("children", parseInt(e.target.value, 10))}
                              className="w-full p-2 md:p-3 border border-gray-200 rounded-md text-sm md:text-base focus:ring-1 focus:ring-red-500 focus:border-transparent"
                            >
                              {Array.from({ length: 10 }, (_, i) => i).map((num) => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Infants</label>
                            <select
                              value={travellers.infants}
                              onChange={(e) => handleTravellerChange("infants", parseInt(e.target.value, 10))}
                              className="w-full p-2 md:p-3 border border-gray-200 rounded-md text-sm md:text-base focus:ring-1 focus:ring-red-500 focus:border-transparent"
                            >
                              {Array.from({ length: 10 }, (_, i) => i).map((num) => (
                                <option key={num} value={num}>{num}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {travellers.children > 0 && (
                          <div className="mt-2 md:mt-3">
                            <h3 className="text-xs md:text-sm font-semibold text-gray-800 mb-1 md:mb-2">Children Ages</h3>
                            <div className="grid grid-cols-2 gap-2 md:gap-3">
                              {Array.from({ length: travellers.children }).map((_, index) => (
                                <div key={`child-${index}`}>
                                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Child {index + 1}</label>
                                  <select
                                    value={travellers.childrenAges[index] || 0}
                                    onChange={(e) => handleFlightChildAgeChange(index, parseInt(e.target.value, 10))}
                                    className="w-full p-2 md:p-3 border border-gray-200 rounded-md text-sm md:text-base focus:ring-1 focus:ring-red-500 focus:border-transparent"
                                  >
                                    {Array.from({ length: 12 }, (_, i) => i + 2).map((age) => (
                                      <option key={age} value={age}>{age}</option>
                                    ))}
                                  </select>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {travellers.infants > 0 && (
                          <div className="mt-2 md:mt-3">
                            <h3 className="text-xs md:text-sm font-semibold text-gray-800 mb-1 md:mb-2">Infant Ages</h3>
                            <div className="grid grid-cols-2 gap-2 md:gap-3">
                              {Array.from({ length: travellers.infants }).map((_, index) => (
                                <div key={`infant-${index}`}>
                                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Infant {index + 1}</label>
                                  <select
                                    value={travellers.infantAges[index] || 0}
                                    onChange={(e) => handleFlightInfantAgeChange(index, parseInt(e.target.value, 10))}
                                    className="w-full p-2 md:p-3 border border-gray-200 rounded-md text-sm md:text-base focus:ring-1 focus:ring-red-500 focus:border-transparent"
                                  >
                                    {Array.from({ length: 2 }, (_, i) => i).map((age) => (
                                      <option key={age} value={age}>{age}</option>
                                    ))}
                                  </select>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="relative" ref={travelClassRef}>
                    <div
                      className="relative rounded-md border border-gray-200 bg-white hover:border-gray-300 cursor-pointer transition-colors"
                      onClick={() => setTravelClassOpen(!travelClassOpen)}
                    >
                      <label className="absolute -top-2 left-2 bg-white                       px-1 text-xs md:text-sm text-gray-600 font-medium">
                        Travel Class
                      </label>
                      <div className="flex items-center p-2 md:p-3">
                        <span className="text-sm md:text-base font-medium text-gray-700 flex-1 truncate">{travelClass}</span>
                        <FaChevronDown className={`h-4 w-4 md:h-5 md:w-5 text-gray-500 transition-transform ${travelClassOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                    {travelClassOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                        {["Economy", "Premium Economy", "Business Class", "First Class"].map((classOption) => (
                          <div
                            key={classOption}
                            className="p-2 md:p-3 cursor-pointer hover:bg-gray-100 text-gray-700 text-sm md:text-base"
                            onClick={() => {
                              setTravelClass(classOption);
                              setTravelClassOpen(false);
                            }}
                          >
                            {classOption}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {multiCityFlights.map((flight, index) => (
                  <div key={index} className="space-y-2 md:space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm md:text-base font-semibold text-gray-800">Flight {index + 1}</span>
                      {multiCityFlights.length > 2 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMultiCityFlight(index)}
                          className="text-red-500 hover:text-red-600 text-xs md:text-sm flex items-center gap-1"
                        >
                          <svg className="h-4 w-4 md:h-5 md:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-2 md:gap-4 items-center">
                      <div className={`relative rounded-md border ${errors[`from-${index}`] ? 'border-red-500' : 'border-gray-200'} bg-white hover:border-gray-300 transition-colors`} ref={(el) => (fromInputRefs.current[index] = el)}>
                        <label className="absolute -top-2 left-2 bg-white px-1 text-xs md:text-sm text-gray-600 font-medium">
                          From
                        </label>
                        <div className="relative p-2 md:p-3">
                          <div className="flex items-center">
                            <svg className="h-4 w-4 md:h-5 md:w-5 text-gray-500 mr-2 md:mr-3 transform -rotate-45" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                            </svg>
                            <input
                              type="text"
                              placeholder="Search airport..."
                              value={flight.from}
                              onChange={(e) => {
                                handleMultiCityAirportInputChange(e, index, "from");
                                handleMultiCityFlightChange(index, "from", e.target.value);
                              }}
                              className="w-full bg-transparent text-sm md:text-base font-medium text-gray-700 placeholder-gray-400 focus:outline-none"
                              onClick={() => {
                                setShowFromDropdowns((prev) => {
                                  const newDropdowns = [...prev];
                                  newDropdowns[index] = true;
                                  return newDropdowns;
                                });
                              }}
                            />
                          </div>
                          {showFromDropdowns[index] && (
                            <ul className="absolute z-20 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-40 md:max-h-48 overflow-y-auto shadow-md">
                              {filteredAirports.map((airport, idx) => (
                                <li
                                  key={idx}
                                  className="p-2 md:p-3 cursor-pointer hover:bg-gray-100 text-gray-700 text-sm md:text-base"
                                  onClick={() => handleMultiCityAirportChange(airport, index, "from")}
                                >
                                  {airport.city}, {airport.country} ({airport.code})
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        {errors[`from-${index}`] && (
                          <p className="text-red-500 text-xs md:text-sm px-2 md:px-3 pb-1">{errors[`from-${index}`]}</p>
                        )}
                      </div>

                      <button
                        type="button"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 md:p-3 rounded-full self-center transition-colors md:col-start-2"
                        onClick={() => handleSwapMultiCityLocations(index)}
                      >
                        <FaArrowRightArrowLeft className={`h-4 w-4 md:h-5 md:w-5 transform transition-transform duration-200 ${isRotating[index] ? 'rotate-180' : ''}`} />
                      </button>

                      <div className={`relative rounded-md border ${errors[`to-${index}`] ? 'border-red-500' : 'border-gray-200'} bg-white hover:border-gray-300 transition-colors md:col-start-3`} ref={(el) => (toInputRefs.current[index] = el)}>
                        <label className="absolute -top-2 left-2 bg-white px-1 text-xs md:text-sm text-gray-600 font-medium">
                          To
                        </label>
                        <div className="relative p-2 md:p-3">
                          <div className="flex items-center">
                            <svg className="h-4 w-4 md:h-5 md:w-5 text-gray-500 mr-2 md:mr-3 transform rotate-45" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                            </svg>
                            <input
                              type="text"
                              placeholder="Search airport..."
                              value={flight.to}
                              onChange={(e) => {
                                handleMultiCityAirportInputChange(e, index, "to");
                                handleMultiCityFlightChange(index, "to", e.target.value);
                              }}
                              className="w-full bg-transparent text-sm md:text-base font-medium text-gray-700 placeholder-gray-400 focus:outline-none"
                              onClick={() => {
                                setShowToDropdowns((prev) => {
                                  const newDropdowns = [...prev];
                                  newDropdowns[index] = true;
                                  return newDropdowns;
                                });
                              }}
                            />
                          </div>
                          {showToDropdowns[index] && (
                            <ul className="absolute z-20 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-40 md:max-h-48 overflow-y-auto shadow-md">
                              {filteredAirports.map((airport, idx) => (
                                <li
                                  key={idx}
                                  className="p-2 md:p-3 cursor-pointer hover:bg-gray-100 text-gray-700 text-sm md:text-base"
                                  onClick={() => handleMultiCityAirportChange(airport, index, "to")}
                                >
                                  {airport.city}, {airport.country} ({airport.code})
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        {errors[`to-${index}`] && (
                          <p className="text-red-500 text-xs md:text-sm px-2 md:px-3 pb-1">{errors[`to-${index}`]}</p>
                        )}
                      </div>

                      <div className={`relative rounded-md border ${errors[`date-${index}`] ? 'border-red-500' : 'border-gray-200'} bg-white hover:border-gray-300 transition-colors md:col-start-5`}>
                        <label className="absolute -top-2 left-2 bg-white px-1 text-xs md:text-sm text-gray-600 font-medium">
                          Departure
                        </label>
                        <DatePicker
                          id={`multi-date-${index}`}
                          selected={flight.date}
                          onChange={(date) => handleMultiCityFlightChange(index, "date", date)}
                          dateFormat="dd MMMM yyyy"
                          minDate={index === 0 ? new Date() : multiCityFlights[index - 1].date}
                          customInput={<CustomDateMulti placeholder="Departure date" />}
                          placeholderText="Departure date"
                          className="w-full"
                        />
                        {errors[`date-${index}`] && (
                          <p className="text-red-500 text-xs md:text-sm px-2 md:px-3 pb-1">{errors[`date-${index}`]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {multiCityFlights.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddMultiCityFlight}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2 md:py-3 px-4 md:px-6 rounded-md shadow-sm transition-all"
                  >
                    Add Flight
                  </button>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full md:w-1/3 mx-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2 md:py-3 px-4 md:px-6 rounded-md shadow-sm transition-all"
            >
              Search
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchForm;