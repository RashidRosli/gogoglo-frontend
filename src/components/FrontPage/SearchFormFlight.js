import React, { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon, CalendarIcon, MagnifyingGlassIcon, UserIcon, PlusIcon, MinusIcon, ArrowsRightLeftIcon } from "@heroicons/react/20/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

// Sample airport list (IATA code and name)
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

const PassengerMenu = forwardRef((
  {
    passengers: initialPassengers = { adults: 1, children: 0, infants: 0 }, // Default to 1 adult
    onPassengerChange = () => { },
    childrenAges: initialChildrenAges = [],
    infantAges: initialInfantAges = [],
    onChildrenAgesChange = () => { },
    onInfantAgesChange = () => { },
  },
  ref
) => {
  const [passengers, setPassengers] = useState(initialPassengers);
  const [childrenAges, setChildrenAges] = useState(initialChildrenAges);
  const [infantAges, setInfantAges] = useState(initialInfantAges);

  // Sync internal state with props and ensure age arrays match passenger counts
  useEffect(() => {
    setPassengers(initialPassengers);

    // Adjust childrenAges to match children count
    let newChildrenAges = [...initialChildrenAges];
    if (newChildrenAges.length < initialPassengers.children) {
      newChildrenAges = newChildrenAges.concat(
        Array(initialPassengers.children - newChildrenAges.length).fill(2)
      );
    } else if (newChildrenAges.length > initialPassengers.children) {
      newChildrenAges = newChildrenAges.slice(0, initialPassengers.children);
    }
    setChildrenAges(newChildrenAges);

    // Adjust infantAges to match infants count
    let newInfantAges = [...initialInfantAges];
    if (newInfantAges.length < initialPassengers.infants) {
      newInfantAges = newInfantAges.concat(
        Array(initialPassengers.infants - newInfantAges.length).fill(0)
      );
    } else if (newInfantAges.length > initialPassengers.infants) {
      newInfantAges = newInfantAges.slice(0, initialPassengers.infants);
    }
    setInfantAges(newInfantAges);
  }, [initialPassengers, initialChildrenAges, initialInfantAges]);

  // Expose current state to ref
  useImperativeHandle(ref, () => ({
    passengers,
    childrenAges,
    infantAges,
  }));

  const handlePassengerChange = (type, change) => {
    setPassengers((prevPassengers) => {
      let newCount = Math.max(0, prevPassengers[type] + change);
      if (type === "adults" && newCount < 1) newCount = 1;

      const updatedPassengers = { ...prevPassengers, [type]: newCount };
      const totalCount = updatedPassengers.adults + updatedPassengers.children + updatedPassengers.infants;

      if (totalCount > 10) return prevPassengers; // Enforce limit

      if (type === "adults" && newCount < prevPassengers.infants) {
        updatedPassengers.infants = newCount;
        setInfantAges((prevAges) => prevAges.slice(0, newCount));
      }

      if (type === "children") {
        setChildrenAges((prevAges) => {
          if (change > 0) return [...prevAges, 2];
          if (change < 0) return prevAges.slice(0, -1);
          return prevAges;
        });
      }

      if (type === "infants") {
        if (change > 0 && newCount <= updatedPassengers.adults) {
          setInfantAges((prevAges) => [...prevAges, 0]);
        } else if (change < 0) {
          setInfantAges((prevAges) => prevAges.slice(0, -1));
        } else if (newCount > updatedPassengers.adults) {
          updatedPassengers.infants = updatedPassengers.adults; // Cap at adults
          setInfantAges((prevAges) => prevAges.slice(0, updatedPassengers.adults));
        }
      }

      onPassengerChange(updatedPassengers);
      return updatedPassengers;
    });
  };

  const handleChildAgeChange = (index, age) => {
    setChildrenAges((prevAges) => {
      const newAges = [...prevAges];
      newAges[index] = age;
      onChildrenAgesChange(newAges);
      return newAges;
    });
  };

  const handleInfantAgeChange = (index, age) => {
    setInfantAges((prevAges) => {
      const newAges = [...prevAges];
      newAges[index] = age;
      onInfantAgesChange(newAges);
      return newAges;
    });
  };

  return (
    <div className="w-full">
      <label htmlFor="passengerSelect" className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
        Passengers
      </label>
      <Menu as="div" className="relative w-full">
        <MenuButton className="flex w-full items-center justify-between rounded-lg bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out">
          <span className="flex items-center">
            <UserIcon className="h-4 w-4 mr-2 text-gray-500" aria-hidden="true" />
            {passengers.adults + passengers.children + passengers.infants} Traveller(s)
          </span>
          <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </MenuButton>
        <MenuItems className="absolute left-0 right-0 z-50 mt-1 w-full rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-3 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-700">
                Adults <span className="block text-[10px] text-gray-500">12 and older</span>
              </label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handlePassengerChange("adults", -1)}
                  className="p-1 border rounded-lg text-gray-900 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 transition duration-150 ease-in-out"
                  disabled={passengers.adults <= 1}
                >
                  <MinusIcon className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="text-xs text-gray-700 w-6 text-center">{passengers.adults}</span>
                <button
                  type="button"
                  onClick={() => handlePassengerChange("adults", 1)}
                  className="p-1 border rounded-lg text-gray-900 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 transition duration-150 ease-in-out"
                  disabled={passengers.adults + passengers.children + passengers.infants >= 10}
                >
                  <PlusIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-700">
                Children <span className="block text-[10px] text-gray-500">2-12</span>
              </label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handlePassengerChange("children", -1)}
                  className="p-1 border rounded-lg text-gray-900 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 transition duration-150 ease-in-out"
                  disabled={passengers.children <= 0}
                >
                  <MinusIcon className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="text-xs text-gray-700 w-6 text-center">{passengers.children}</span>
                <button
                  type="button"
                  onClick={() => handlePassengerChange("children", 1)}
                  className="p-1 border rounded-lg text-gray-900 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 transition duration-150 ease-in-out"
                  disabled={passengers.adults + passengers.children + passengers.infants >= 10}
                >
                  <PlusIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            {passengers.children > 0 &&
              Array.from({ length: passengers.children }).map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-700">Child {index + 1} Age</label>
                  <select
                    value={childrenAges[index] ?? 2}
                    onChange={(e) => handleChildAgeChange(index, parseInt(e.target.value, 10))}
                    className="border rounded-md px-2 py-1 text-xs text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    {Array.from({ length: 11 }, (_, i) => i + 2).map((childAge) => (
                      <option key={childAge} value={childAge}>
                        {childAge}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-700">
                Infants <span className="block text-[10px] text-gray-500">Under 2</span>
              </label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handlePassengerChange("infants", -1)}
                  className="p-1 border rounded-lg text-gray-900 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 transition duration-150 ease-in-out"
                  disabled={passengers.infants <= 0}
                >
                  <MinusIcon className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="text-xs text-gray-700 w-6 text-center">{passengers.infants}</span>
                <button
                  type="button"
                  onClick={() => handlePassengerChange("infants", 1)}
                  className="p-1 border rounded-lg text-gray-900 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 transition duration-150 ease-in-out"
                  disabled={
                    passengers.infants >= passengers.adults ||
                    passengers.adults + passengers.children + passengers.infants >= 10
                  }
                >
                  <PlusIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            {passengers.infants > 0 &&
              Array.from({ length: passengers.infants }).map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-700">Infant {index + 1} Age</label>
                  <select
                    value={infantAges[index] ?? 0}
                    onChange={(e) => handleInfantAgeChange(index, parseInt(e.target.value, 10))}
                    className="border rounded-md px-2 py-1 text-xs text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    {[0, 1].map((infantAge) => (
                      <option key={infantAge} value={infantAge}>
                        {infantAge}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
});

const FlightSearchForm = ({
  flyFrom: initialFlyFrom,
  setFlyFrom,
  flyTo: initialFlyTo,
  setFlyTo,
  tripType: initialTripType,
  setTripType,
  passengers: initialPassengers,
  setPassengers,
  childrenAges: initialChildrenAges,
  setChildrenAges,
  infantAges: initialInfantAges,
  setInfantAges,
  travelClass: initialTravelClass,
  setTravelClass,
  dateDepart: initialDateDepart,
  setDateDepart,
  dateReturn: initialDateReturn,
  setDateReturn,
  multiCityFlights: initialMultiCityFlights,
  setMultiCityFlights,
  handleSearch: originalHandleSearch,
  handleTripTypeChange,
  passengerMenuRef,
  showOneWayErrors,
  showRoundtripErrors,
  showMultiCityErrors,
}) => {
  console.log("FlightSearchForm Props:", { initialFlyFrom, initialFlyTo });

  const [isOpen, setIsOpen] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  const handleAddFlight = () => {
    setMultiCityFlights((prev) => [
      ...prev,
      { flyFrom: null, flyTo: null, dateDepart: "" },
    ]);
  };

  const handleRemoveFlight = (index) => {
    setMultiCityFlights((prev) => {
      const updatedFlights = prev.filter((_, i) => i !== index);
      if (updatedFlights.length === 1) {
        setTripType("One-way");
        setFlyFrom(updatedFlights[0].flyFrom);
        setFlyTo(updatedFlights[0].flyTo);
        setDateDepart(updatedFlights[0].dateDepart);
      }
      return updatedFlights;
    });
  };

  const handleSwap = (index = null) => {
    setIsSwapping(true);
    if (index === null) {
      setFlyFrom(initialFlyTo); // Use prop values if needed initially
      setFlyTo(initialFlyFrom);
    } else {
      setMultiCityFlights((prev) =>
        prev.map((flight, i) =>
          i === index ? { ...flight, flyFrom: flight.flyTo, flyTo: flight.flyFrom } : flight
        )
      );
    }
    setTimeout(() => setIsSwapping(false), 300);
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      height: "40px",
      minHeight: "40px",
      fontSize: "14px",
      borderRadius: "0.5rem",
      borderColor: "gray",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
      "&:hover": { borderColor: "#9CA3AF" },
      transition: "all 0.15s ease-in-out",
      zIndex: 0,
    }),
    singleValue: (base) => ({ ...base, color: "#374151" }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      borderRadius: "0.5rem",
      marginTop: "8px",
      position: "absolute",
    }),
    option: (base, { isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? "#6B7280" : "white",
      color: isSelected ? "white" : "#374151",
      "&:hover": { backgroundColor: "#6B7280", color: "white" },
    }),
  };

  return (
    <div className="w-full">
      {/* Mobile Trigger Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-2 rounded-full shadow-md hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out active:scale-95"
        >
          <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-75 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Slide-In Form */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 transform transition-transform duration-300 ease-in-out z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-gray-200 hover:text-white focus:outline-none transition duration-150 ease-in-out"
        >
          <ChevronDownIcon className="h-6 w-6 rotate-90" aria-hidden="true" />
        </button>
        <div className="flex flex-col gap-6 mt-16">
          {/* Single Row for Trip Type, Travel Class, Passengers */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="tripType" className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                Trip Type
              </label>
              <Menu as="div" className="relative">
                <MenuButton className="flex w-full items-center justify-between rounded-lg bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out">
                  {initialTripType}
                  <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </MenuButton>
                <MenuItems className="absolute left-0 right-0 z-50 mt-1 w-full rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => handleTripTypeChange("One-way")}
                        className={`${active ? "bg-gray-100 text-gray-900" : "text-gray-700"} w-full block px-4 py-2 text-sm`}
                      >
                        One-Way
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => handleTripTypeChange("Round-trip")}
                        className={`${active ? "bg-gray-100 text-gray-900" : "text-gray-700"} w-full block px-4 py-2 text-sm`}
                      >
                        Round-trip
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => handleTripTypeChange("Multi-city")}
                        className={`${active ? "bg-gray-100 text-gray-900" : "text-gray-700"} w-full block px-4 py-2 text-sm`}
                      >
                        Multi-City
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
            <div>
              <label htmlFor="travelClass" className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                Travel Class
              </label>
              <Menu as="div" className="relative">
                <MenuButton className="flex w-full items-center justify-between rounded-lg bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out">
                  {initialTravelClass}
                  <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </MenuButton>
                <MenuItems className="absolute left-0 right-0 z-50 mt-1 w-full rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {["Economy", "Premium Economy", "Business", "First"].map((cls) => (
                    <MenuItem key={cls}>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={() => setTravelClass(cls)}
                          className={`${active ? "bg-gray-100 text-gray-900" : "text-gray-700"} w-full block px-4 py-2 text-sm`}
                        >
                          {cls}
                        </button>
                      )}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
            <PassengerMenu
              ref={passengerMenuRef}
              passengers={initialPassengers}
              onPassengerChange={setPassengers}
              childrenAges={initialChildrenAges}
              infantAges={initialInfantAges}
              onChildrenAgesChange={setChildrenAges}
              onInfantAgesChange={setInfantAges}
            />
          </div>

          {initialTripType === "One-way" && (
            <>
              <div className="relative">
                <label htmlFor="flyFrom" className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                  Fly From
                </label>
                <Select
                  id="flyFrom"
                  value={initialFlyFrom}
                  onChange={setFlyFrom}
                  options={airports}
                  className="text-gray-700"
                  placeholder="Select airport"
                  styles={selectStyles}
                />
              </div>
              <div className="relative flex items-center gap-2">
                <label htmlFor="flyTo" className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                  Fly To
                </label>
                <button
                  onClick={() => handleSwap()}
                  className={`bg-gray-600 text-white p-2 rounded-full hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out transform ${isSwapping ? "rotate-180 scale-95" : "rotate-0 scale-100"}`}
                >
                  <ArrowsRightLeftIcon className="h-4 w-4" aria-hidden="true" />
                </button>
                <Select
                  id="flyTo"
                  value={initialFlyTo}
                  onChange={setFlyTo}
                  options={airports}
                  className="text-gray-700 w-full"
                  placeholder="Select airport"
                  styles={selectStyles}
                />
                {showOneWayErrors && (!initialFlyFrom || !initialFlyTo) && (
                  <p className="text-red-300 text-xs mt-1">
                    {(!initialFlyFrom && !initialFlyTo) ? "Please select departure and arrival airports" : !initialFlyFrom ? "Please select a departure airport" : "Please select an arrival airport"}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="dateDepart" className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                  Depart Date
                </label>
                <div className="relative">
                  <DatePicker
                    id="dateDepart"
                    selected={initialDateDepart}
                    onChange={(date) => setDateDepart(date)}
                    dateFormat="d MMM yyyy"
                    minDate={new Date()}
                    className="w-full h-10 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 hover:border-gray-500 transition duration-150 ease-in-out"
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {showOneWayErrors && !initialDateDepart && (
                  <p className="text-red-300 text-xs mt-1">Please select a departure date</p>
                )}
              </div>
            </>
          )}
          {initialTripType === "Round-trip" && (
            <>
              <div className="relative">
                <label htmlFor="flyFrom" className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                  Fly From
                </label>
                <Select
                  id="flyFrom"
                  value={initialFlyFrom}
                  onChange={setFlyFrom}
                  options={airports}
                  className="text-gray-700"
                  placeholder="Select airport"
                  styles={selectStyles}
                />
              </div>
              <div className="relative flex items-center gap-2">
                <label htmlFor="flyTo" className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                  Fly To
                </label>
                <button
                  onClick={() => handleSwap()}
                  className={`bg-gray-600 text-white p-2 rounded-full hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out transform ${isSwapping ? "rotate-180 scale-95" : "rotate-0 scale-100"}`}
                >
                  <ArrowsRightLeftIcon className="h-4 w-4" aria-hidden="true" />
                </button>
                <Select
                  id="flyTo"
                  value={initialFlyTo}
                  onChange={setFlyTo}
                  options={airports}
                  className="text-gray-700 w-full"
                  placeholder="Select airport"
                  styles={selectStyles}
                />
                {showRoundtripErrors && (!initialFlyFrom || !initialFlyTo) && (
                  <p className="text-red-300 text-xs mt-1">
                    {(!initialFlyFrom && !initialFlyTo) ? "Please select departure and arrival airports" : !initialFlyFrom ? "Please select a departure airport" : "Please select an arrival airport"}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="dateDepart" className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                  Depart Date
                </label>
                <div className="relative">
                  <DatePicker
                    id="dateDepart"
                    selected={initialDateDepart}
                    onChange={(date) => setDateDepart(date)}
                    dateFormat="d MMM yyyy"
                    minDate={new Date()}
                    className="w-full h-10 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 hover:border-gray-500 transition duration-150 ease-in-out"
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {showRoundtripErrors && !initialDateDepart && (
                  <p className="text-red-300 text-xs mt-1">Please select a departure date</p>
                )}
              </div>
              <div>
                <label htmlFor="dateReturn" className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                  Return Date
                </label>
                <div className="relative">
                  <DatePicker
                    id="dateReturn"
                    selected={initialDateReturn}
                    onChange={(date) => setDateReturn(date)}
                    dateFormat="d MMM yyyy"
                    minDate={initialDateDepart}
                    className="w-full h-10 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 hover:border-gray-500 transition duration-150 ease-in-out"
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {showRoundtripErrors && !initialDateReturn && (
                  <p className="text-red-300 text-xs mt-1">Please select a return date</p>
                )}
              </div>
            </>
          )}
          {initialTripType === "Multi-city" && (
            <div className="space-y-10">
              {initialMultiCityFlights.map((flight, index) => (
                <div key={index} className="space-y-2">
                  <div className="grid grid-cols-1 gap-8">
                    <div className="relative">
                      <label htmlFor={`flyFrom${index}`} className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                        Fly From
                      </label>
                      <Select
                        id={`flyFrom${index}`}
                        value={flight.flyFrom}
                        onChange={(value) =>
                          setMultiCityFlights((prev) =>
                            prev.map((f, i) => (i === index ? { ...f, flyFrom: value } : f))
                          )
                        }
                        options={airports}
                        className="text-gray-700"
                        placeholder="Select airport"
                        styles={selectStyles}
                      />
                    </div>
                    <div className="relative flex items-center gap-2">
                      <label htmlFor={`flyTo${index}`} className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                        Fly To
                      </label>
                      <button
                        onClick={() => handleSwap(index)}
                        className={`bg-gray-600 text-white p-2 rounded-full hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out transform ${isSwapping ? "rotate-180 scale-95" : "rotate-0 scale-100"}`}
                      >
                        <ArrowsRightLeftIcon className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <Select
                        id={`flyTo${index}`}
                        value={flight.flyTo}
                        onChange={(value) =>
                          setMultiCityFlights((prev) =>
                            prev.map((f, i) => (i === index ? { ...f, flyTo: value } : f))
                          )
                        }
                        options={airports}
                        className="text-gray-700 w-full"
                        placeholder="Select airport"
                        styles={selectStyles}
                      />
                      {showMultiCityErrors[index] && (!flight.flyFrom || !flight.flyTo) && (
                        <p className="text-red-300 text-xs mt-1">
                          {(!flight.flyFrom && !flight.flyTo) ? "Please select departure and arrival airports" : !flight.flyFrom ? "Please select a departure airport" : "Please select an arrival airport"}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor={`dateDepart${index}`} className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                        Depart Date
                      </label>
                      <div className="relative">
                        <DatePicker
                          id={`dateDepart${index}`}
                          selected={flight.dateDepart}
                          onChange={(date) =>
                            setMultiCityFlights((prev) =>
                              prev.map((f, i) => (i === index ? { ...f, dateDepart: date } : f))
                            )
                          }
                          dateFormat="d MMM yyyy"
                          minDate={index === 0 ? new Date() : initialMultiCityFlights[index - 1].dateDepart}
                          className="w-full h-10 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 hover:border-gray-500 transition duration-150 ease-in-out"
                        />
                        <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                      {showMultiCityErrors[index]?.dateDepart && (
                        <p className="text-red-300 text-xs mt-1">Please select a departure date</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFlight(index)}
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed h-10 transition duration-150 ease-in-out active:scale-95"
                      disabled={initialMultiCityFlights.length <= 1}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddFlight}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed h-10 transition duration-150 ease-in-out active:scale-95"
                disabled={initialMultiCityFlights.length >= 5}
              >
                Add Flight
              </button>
            </div>
          )}
          <button
            onClick={originalHandleSearch}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-10 transition duration-150 ease-in-out active:scale-95"
          >
            Search
          </button>
        </div>
      </div>

      {/* Desktop Form */}
      <div className={`hidden md:block w-full ${window.location.pathname === "/flights" ? "sticky top-0" : "relative"} bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 shadow-lg z-50`}>
        <div className="container mx-auto max-w-7xl px-4 space-y-6">
          {/* Single Row for Trip Type, Travel Class, Passengers */}
          <div className="flex items-end gap-4">
            <div className="flex-1 min-w-0">
              <label htmlFor="tripType" className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                Trip Type
              </label>
              <Menu as="div" className="relative z-10">
                <MenuButton className="flex w-full items-center justify-between rounded-lg bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out">
                  {initialTripType}
                  <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </MenuButton>
                <MenuItems className="absolute left-0 z-50 mt-1 w-full rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => handleTripTypeChange("One-way")}
                        className={`${active ? "bg-gray-100 text-gray-900" : "text-gray-700"} w-full block px-4 py-2 text-sm`}
                      >
                        One-Way
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => handleTripTypeChange("Round-trip")}
                        className={`${active ? "bg-gray-100 text-gray-900" : "text-gray-700"} w-full block px-4 py-2 text-sm`}
                      >
                        Round-trip
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => handleTripTypeChange("Multi-city")}
                        className={`${active ? "bg-gray-100 text-gray-900" : "text-gray-700"} w-full block px-4 py-2 text-sm`}
                      >
                        Multi-City
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
            <div className="flex-1 min-w-0">
              <label htmlFor="travelClass" className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                Travel Class
              </label>
              <Menu as="div" className="relative z-10">
                <MenuButton className="flex w-full items-center justify-between rounded-lg bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out">
                  {initialTravelClass}
                  <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </MenuButton>
                <MenuItems className="absolute left-0 z-50 mt-1 w-full rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {["Economy", "Premium Economy", "Business", "First"].map((cls) => (
                    <MenuItem key={cls}>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={() => setTravelClass(cls)}
                          className={`${active ? "bg-gray-100 text-gray-900" : "text-gray-700"} w-full block px-4 py-2 text-sm`}
                        >
                          {cls}
                        </button>
                      )}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
            <div className="flex-1 min-w-0">
              <PassengerMenu
                ref={passengerMenuRef}
                passengers={initialPassengers}
                onPassengerChange={setPassengers}
                childrenAges={initialChildrenAges}
                infantAges={initialInfantAges}
                onChildrenAgesChange={setChildrenAges}
                onInfantAgesChange={setInfantAges}
              />
            </div>
          </div>

          {/* One-way */}
          {initialTripType === "One-way" && (
            <div className="flex items-end gap-4">
              <div className="flex-[2] min-w-0">
                <label htmlFor="flyFrom" className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                  Fly From
                </label>
                <Select
                  id="flyFrom"
                  value={initialFlyFrom}
                  onChange={setFlyFrom}
                  options={airports}
                  className="text-gray-700"
                  placeholder="Select airport"
                  styles={selectStyles}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                />
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleSwap()}
                  className={`bg-gray-600 text-white p-2 rounded-full hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out transform ${isSwapping ? "rotate-180 scale-95" : "rotate-0 scale-100"}`}
                >
                  <ArrowsRightLeftIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <div className="flex-[2] min-w-0">
                <label htmlFor="flyTo" className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                  Fly To
                </label>
                <Select
                  id="flyTo"
                  value={initialFlyTo}
                  onChange={setFlyTo}
                  options={airports}
                  className="text-gray-700"
                  placeholder="Select airport"
                  styles={selectStyles}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                />
              </div>
              <div className="flex-1 min-w-0">
                <label htmlFor="dateDepart" className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                  Depart
                </label>
                <div className="relative">
                  <DatePicker
                    id="dateDepart"
                    selected={initialDateDepart}
                    onChange={(date) => setDateDepart(date)}
                    dateFormat="d MMM yyyy"
                    minDate={new Date()}
                    className="w-full h-10 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 hover:border-gray-500 transition duration-150 ease-in-out"
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="flex-shrink-0">
                <label className="block text-xs font-semibold text-gray-200 mb-1 invisible">SEARCH</label>
                <button
                  onClick={originalHandleSearch}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-10 transition duration-150 ease-in-out active:scale-95"
                >
                  Search
                </button>
              </div>
            </div>
          )}

          {/* Roundtrip */}
          {initialTripType === "Round-trip" && (
            <div className="flex items-end gap-4">
              <div className="flex-[2] min-w-0">
                <label htmlFor="flyFrom" className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                  Fly From
                </label>
                <Select
                  id="flyFrom"
                  value={initialFlyFrom}
                  onChange={setFlyFrom}
                  options={airports}
                  className="text-gray-700"
                  placeholder="Select airport"
                  styles={selectStyles}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                />
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleSwap()}
                  className={`bg-gray-600 text-white p-2 rounded-full hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out transform ${isSwapping ? "rotate-180 scale-95" : "rotate-0 scale-100"}`}
                >
                  <ArrowsRightLeftIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <div className="flex-[2] min-w-0">
                <label htmlFor="flyTo" className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                  Fly To
                </label>
                <Select
                  id="flyTo"
                  value={initialFlyTo}
                  onChange={setFlyTo}
                  options={airports}
                  className="text-gray-700"
                  placeholder="Select airport"
                  styles={selectStyles}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                />
              </div>
              <div className="flex-1 min-w-0">
                <label htmlFor="dateDepart" className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                  Depart
                </label>
                <div className="relative">
                  <DatePicker
                    id="dateDepart"
                    selected={initialDateDepart}
                    onChange={(date) => setDateDepart(date)}
                    dateFormat="d MMM yyyy"
                    minDate={new Date()}
                    className="w-full h-10 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 hover:border-gray-500 transition duration-150 ease-in-out"
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <label htmlFor="dateReturn" className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                  Return
                </label>
                <div className="relative">
                  <DatePicker
                    id="dateReturn"
                    selected={initialDateReturn}
                    onChange={(date) => setDateReturn(date)}
                    dateFormat="d MMM yyyy"
                    minDate={initialDateDepart}
                    className="w-full h-10 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 hover:border-gray-500 transition duration-150 ease-in-out"
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="flex-shrink-0">
                <label className="block text-xs font-semibold text-gray-200 mb-1 invisible">SEARCH</label>
                <button
                  onClick={originalHandleSearch}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-10 transition duration-150 ease-in-out active:scale-95"
                >
                  Search
                </button>
              </div>
            </div>
          )}

          {/* Multi-city */}
          {initialTripType === "Multi-city" && (
            <div className="space-y-6">
              {initialMultiCityFlights.map((flight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-gradient-to-r from-gray-700 to-gray-800 p-3 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition duration-200 ease-in-out"
                >
                  <div className="flex-[2] min-w-0">
                    <label htmlFor={`flyFrom${index}`} className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                      Fly From
                    </label>
                    <Select
                      id={`flyFrom${index}`}
                      value={flight.flyFrom}
                      onChange={(value) =>
                        setMultiCityFlights((prev) =>
                          prev.map((f, i) => (i === index ? { ...f, flyFrom: value } : f))
                        )
                      }
                      options={airports}
                      className="text-gray-700"
                      placeholder="Select airport"
                      styles={selectStyles}
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                    />
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleSwap(index)}
                      className={`bg-gray-600 text-white p-2 rounded-full hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out transform ${isSwapping ? "rotate-180 scale-95" : "rotate-0 scale-100"}`}
                    >
                      <ArrowsRightLeftIcon className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex-[2] min-w-0">
                    <label htmlFor={`flyTo${index}`} className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                      Fly To
                    </label>
                    <Select
                      id={`flyTo${index}`}
                      value={flight.flyTo}
                      onChange={(value) =>
                        setMultiCityFlights((prev) =>
                          prev.map((f, i) => (i === index ? { ...f, flyTo: value } : f))
                        )
                      }
                      options={airports}
                      className="text-gray-700"
                      placeholder="Select airport"
                      styles={selectStyles}
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label htmlFor={`dateDepart${index}`} className="block text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1 truncate">
                      Depart
                    </label>
                    <div className="relative">
                      <DatePicker
                        id={`dateDepart${index}`}
                        selected={flight.dateDepart}
                        onChange={(date) =>
                          setMultiCityFlights((prev) =>
                            prev.map((f, i) => (i === index ? { ...f, dateDepart: date } : f))
                          )
                        }
                        dateFormat="d MMM yyyy"
                        minDate={index === 0 ? new Date() : initialMultiCityFlights[index - 1].dateDepart}
                        className="w-full h-10 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 hover:border-gray-500 transition duration-150 ease-in-out"
                      />
                      <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFlight(index)}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed h-10 transition duration-150 ease-in-out active:scale-95"
                    disabled={initialMultiCityFlights.length <= 1}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="flex items-end gap-4 justify-between">
                <button
                  type="button"
                  onClick={handleAddFlight}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed h-10 transition duration-150 ease-in-out active:scale-95"
                  disabled={initialMultiCityFlights.length >= 5}
                >
                  Add Flight
                </button>
                <button
                  onClick={originalHandleSearch}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-10 transition duration-150 ease-in-out active:scale-95"
                >
                  Search
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightSearchForm;