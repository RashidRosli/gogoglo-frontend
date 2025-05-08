import React, { useEffect, useState, useRef } from "react";
import Slider from 'react-slider';
import { FaCheck, FaChevronUp, FaFilter, FaStar } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { Disclosure } from "@headlessui/react";

import hotelData from '../../views/Data/hotelData.js'; // Adjust path as needed
import Navbar from "components/FrontPage/Navbar.js";
import Footer from "components/FrontPage/Footer.js";
import SearchFormHotel from "components/FrontPage/SearchFormHotel.js";

// Hotel Card Component
const HotelCard = ({
  hotelName, location, features, price, discount, images, starRating,
  guestRating, comments, nearestLandmark, offers, exclusiveOffer, earlyBirdDeal,
  id
}) => {
  const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
  const originalPrice = discount ? numericPrice + parseFloat(discount.replace(/[^0-9.-]+/g, "")) : null;
  const sst = numericPrice * 0.06;
  const serviceCharge = numericPrice * 0.1;
  const totalPrice = numericPrice + sst + serviceCharge;

  const [mainImage, setMainImage] = useState(images[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getGuestRatingCategory = (rating) => {
    const categories = {
      9: "Exceptional", 8: "Excellent", 7: "Very Good", 6: "Good",
      5: "Fair", 4: "Below Average", 3: "Poor", 2: "Very Poor", 1: "Terrible"
    };
    return categories[Math.floor(rating)] || "";
  };

  const handleViewDetails = () => {
    const baseUrl = "/hotels/detail-hotel";
    const queryParams = new URLSearchParams({
      id: id || "H0001",
      destination: "King Edward Point, South Georgia",
      startDate: "2025-02-24",
      endDate: "2025-02-26",
      rooms: "1",
      roomData: JSON.stringify([{ adults: 2, children: 0, childrenAges: [] }])
    }).toString();
    window.open(`${baseUrl}?${queryParams}`, '_blank', 'noopener,noreferrer');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="hotel-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="w-full sm:w-1/3 flex flex-col">
          <div className="relative h-48 sm:h-56 md:h-64">
            <img
              src={mainImage}
              alt={hotelName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
            {earlyBirdDeal && (
              <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs sm:text-sm font-semibold">
                Early Bird
              </span>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto p-2 bg-gray-100">
            {images.slice(0, 4).map((image, index) => (
              <button
                key={index}
                onClick={index === 3 && images.length > 4 ? openModal : () => setMainImage(image)}
                className="w-16 h-10 flex-shrink-0 rounded-md overflow-hidden border-2 border-white hover:border-blue-400 transition-colors relative"
              >
                <img
                  src={image}
                  alt={`${hotelName}-${index}`}
                  className="w-full h-full object-cover"
                />
                {index === 3 && images.length > 4 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs">
                    +{images.length - 4}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="p-4 sm:p-5 flex flex-col gap-3 w-full sm:w-1/3">
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 line-clamp-1">{hotelName}</h3>
            <div className="flex gap-1 mt-1">
              {Array(Math.floor(starRating)).fill().map((_, i) => (
                <FaStar key={i} className="text-yellow-400 h-3 w-3 sm:h-4 sm:w-4" />
              ))}
            </div>
          </div>

          <div className="text-xs sm:text-sm text-gray-600">
            <span className="font-medium text-gray-900">{location.area} | </span>
            {nearestLandmark}
          </div>

          <div className="flex flex-wrap gap-2">
            {features.map((feature, index) => (
              <span key={index} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                {feature}
              </span>
            ))}
          </div>

          {offers?.length > 0 && (
            <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
              {offers.map((offer, index) => (
                <li key={index} className="flex items-center gap-2">
                  <FaCheck className="text-green-500 h-3 w-3" />
                  {offer}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pricing Section */}
        <div className="p-4 sm:p-5 bg-gray-50 flex flex-col justify-between items-end w-full sm:w-1/3">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-semibold text-blue-600">
              {getGuestRatingCategory(guestRating)}
            </span>
            <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-bold">
              {guestRating}
            </span>
          </div>

          <div className="text-right space-y-2">
            {discount && (
              <span className="text-xs sm:text-sm text-gray-500 line-through block">
                RM{originalPrice.toFixed(2)}
              </span>
            )}
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{price}</div>
            <div className="text-xs sm:text-sm text-gray-600">
              RM{totalPrice.toFixed(2)} incl. taxes
            </div>
            <button
              onClick={handleViewDetails}
              className="bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {exclusiveOffer && (
        <div className="bg-green-500 p-3 text-white text-xs sm:text-sm font-medium text-center">
          {exclusiveOffer}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-[90vw] w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <FaTimes className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-4">{hotelName} - Image Gallery</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${hotelName}-${index}`}
                  className="w-full h-20 sm:h-24 md:h-32 object-cover rounded-md cursor-pointer hover:opacity-90"
                  onClick={() => {
                    setMainImage(image);
                    closeModal();
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Filter Panel Component
const FilterPanel = ({ filters, onChange, onClear, onToggleCheckbox, isOpen, onClose }) => (
  <div className={`fixed inset-0 z-[9999999] lg:static lg:z-auto bg-white lg:bg-transparent p-6 lg:p-0 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
    <div className="lg:sticky lg:top-24 self-start bg-white rounded-xl p-6 shadow-sm h-[calc(100vh-8rem)] lg:h-auto overflow-y-auto">
      <div className="flex justify-between items-center mb-6 lg:hidden">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
          ✕
        </button>
      </div>
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-900 hidden lg:block">Filters</h2>

        {/* Price Filter */}
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full py-2 text-md font-medium text-gray-900">
                Price Range (per night)
                <FaChevronUp className={`${open ? "rotate-180" : ""} h-5 w-5 text-gray-500 transition-transform`} />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4 pb-2">
                <Slider
                  min={500}
                  max={5000}
                  step={100}
                  value={filters.price}
                  onChange={values => onChange("price", values)}
                  className="w-full h-2 bg-gray-200 rounded-full"
                  thumbClassName="w-5 h-5 bg-blue-600 rounded-full -mt-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  trackClassName="h-2 bg-blue-200 rounded-full"
                />
                <div className="flex justify-between mt-3 text-sm text-gray-600">
                  <span>RM {filters.price[0]}</span>
                  <span>RM {filters.price[1]}</span>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Star Rating Filter */}
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full py-2 text-md font-medium text-gray-900">
                Star Rating
                <FaChevronUp className={`${open ? "rotate-180" : ""} h-5 w-5 text-gray-500 transition-transform`} />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4 pb-2">
                {filterOptions.starRating.map(star => {
                  const count = hotelData.filter(h => Math.floor(h.starRating) === star).length;
                  if (!count) return null;
                  return (
                    <div key={star} className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        id={`star-${star}`}
                        checked={filters.starRating.includes(String(star))}
                        onChange={() => onToggleCheckbox("starRating", String(star))}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor={`star-${star}`} className="flex items-center gap-1 text-sm text-gray-700">
                        {Array(star).fill().map((_, i) => (
                          <FaStar key={i} className="h-4 w-4 text-yellow-400" />
                        ))}
                        <span>({count})</span>
                      </label>
                    </div>
                  );
                })}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Guest Rating Filter */}
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full py-2 text-md font-medium text-gray-900">
                Guest Rating
                <FaChevronUp className={`${open ? "rotate-180" : ""} h-5 w-5 text-gray-500 transition-transform`} />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4 pb-2">
                {filterOptions.guestRating.map(range => {
                  const [max, min] = range.split('-').map(Number);
                  const count = hotelData.filter(h => h.guestRating >= min && h.guestRating <= max).length;
                  if (!count) return null;
                  return (
                    <div key={range} className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        id={`guest-${range}`}
                        checked={filters.guestRating.includes(range)}
                        onChange={() => onToggleCheckbox("guestRating", range)}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor={`guest-${range}`} className="text-sm text-gray-700">
                        {max}+ {guestRatingLabels[range]} ({count})
                      </label>
                    </div>
                  );
                })}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Property Facilities Filter */}
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full py-2 text-md font-medium text-gray-900">
                Property Facilities
                <FaChevronUp className={`${open ? "rotate-180" : ""} h-5 w-5 text-gray-500 transition-transform`} />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4 pb-2">
                {filterOptions.propertyFacilities.map(facility => {
                  const count = hotelData.filter(h =>
                    h.features.some(f => f.toLowerCase().includes(facility.toLowerCase()))
                  ).length;
                  if (!count) return null;
                  return (
                    <div key={facility} className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        id={`facility-${facility}`}
                        checked={filters.propertyFacilities.includes(facility)}
                        onChange={() => onToggleCheckbox("propertyFacilities", facility)}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor={`facility-${facility}`} className="text-sm text-gray-700">
                        {facility} ({count})
                      </label>
                    </div>
                  );
                })}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Offers Filter */}
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full py-2 text-md font-medium text-gray-900">
                Offers
                <FaChevronUp className={`${open ? "rotate-180" : ""} h-5 w-5 text-gray-500 transition-transform`} />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4 pb-2">
                {filterOptions.offers.map(offer => {
                  const count = hotelData.filter(h =>
                    h.offers?.some(o => o.toLowerCase().includes(offer.toLowerCase()))
                  ).length;
                  if (!count) return null;
                  return (
                    <div key={offer} className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        id={`offer-${offer}`}
                        checked={filters.offers.includes(offer)}
                        onChange={() => onToggleCheckbox("offers", offer)}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label htmlFor={`offer-${offer}`} className="text-sm text-gray-700">
                        {offer} ({count})
                      </label>
                    </div>
                  );
                })}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  </div>
);

// Filter Options and Guest Rating Labels (Defined Globally for Accessibility)
const filterOptions = {
  starRating: [5, 4, 3, 2, 1],
  guestRating: ["9.9-9.0", "8.9-8.0", "7.9-7.0", "6.9-6.0", "5.9-5.0"],
  propertyFacilities: ["Swimming Pool", "Spa", "Gym", "Restaurant", "Bar", "Parking", "Wi-Fi"],
  offers: ["Free breakfast", "Free Wi-Fi", "Airport transfer", "Spa credit"]
};

const guestRatingLabels = {
  "9.9-9.0": "Exceptional",
  "8.9-8.0": "Excellent",
  "7.9-7.0": "Very Good",
  "6.9-6.0": "Good",
  "5.9-5.0": "Fair"
};

// Main Hotel Component
export default function Hotel() {
  const [sortBy, setSortBy] = useState("recommended");
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [visibleHotels, setVisibleHotels] = useState([]);
  const [filters, setFilters] = useState({
    price: [500, 5000],
    starRating: [],
    guestRating: [],
    propertyFacilities: [],
    offers: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // For mobile filter toggle
  const loaderRef = useRef(null);
  const itemsPerPage = 4;

  // Filter Handlers
  const handleFilterClear = (type) => {
    const resetValues = {
      price: [500, 5000],
      starRating: [],
      guestRating: [],
      propertyFacilities: [],
      offers: []
    };
    setFilters(type === "all" ? resetValues : { ...filters, [type]: resetValues[type] });
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleCheckbox = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };

  // Filter and Sort Effect
  useEffect(() => {
    setIsLoading(true);
    const filtered = hotelData.filter(hotel => {
      const priceValue = parseFloat(hotel.price.replace(/[^0-9.-]+/g, ""));
      return (
        priceValue >= filters.price[0] && priceValue <= filters.price[1] &&
        (!filters.starRating.length || filters.starRating.includes(String(Math.floor(hotel.starRating)))) &&
        (!filters.guestRating.length || filters.guestRating.some(range => {
          const [max, min] = range.split('-').map(Number);
          return hotel.guestRating >= min && hotel.guestRating <= max;
        })) &&
        (!filters.propertyFacilities.length || filters.propertyFacilities.every(f =>
          hotel.features.some(feature => feature.toLowerCase().includes(f.toLowerCase()))
        )) &&
        (!filters.offers.length || filters.offers.every(o =>
          hotel.offers?.some(offer => offer.toLowerCase().includes(o.toLowerCase()))
        ))
      );
    });

    const sorted = [...filtered].sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
      const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
      const discountA = parseFloat(a.discount?.replace(/[^0-9.-]+/g, "") || 0);
      const discountB = parseFloat(b.discount?.replace(/[^0-9.-]+/g, "") || 0);

      return {
        popular: b.comments - a.comments,
        discount: discountB - discountA,
        "price-low-high": priceA - priceB,
        "price-high-low": priceB - priceA,
        "rating-high-low": b.guestRating - a.guestRating,
        "rating-low-high": a.guestRating - b.guestRating,
        "star-rating-high-low": b.starRating - a.starRating,
        "star-rating-low-high": a.starRating - b.starRating
      }[sortBy] || 0;
    });

    setFilteredHotels(sorted);
    setVisibleHotels(sorted.slice(0, itemsPerPage));
    setIsLoading(false);
  }, [filters, sortBy]);

  // Infinite Scroll Effect
  useEffect(() => {
    const currentLoader = loaderRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleHotels(prev => {
              const nextIndex = prev.length + itemsPerPage;
              return filteredHotels.slice(0, nextIndex);
            });
            setIsLoading(false);
          }, 500);
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0
      }
    );

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [filteredHotels, isLoading]);

  return (
    <>
      <Navbar transparent />
      <main className="bg-gray-50 min-h-screen">
        <SearchFormHotel />
        <div className="max-w-full sm:max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8 relative">
          {/* Filter Toggle Button for Mobile */}
          <button
            className="lg:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
            onClick={() => setIsFilterOpen(true)}
          >
            <FaFilter className="h-5 w-5" />
          </button>

          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Filter Sidebar */}
            <aside className="hidden lg:block">
              <FilterPanel
                filters={filters}
                onChange={handleFilterChange}
                onClear={handleFilterClear}
                onToggleCheckbox={handleToggleCheckbox}
                isOpen={true}
                onClose={() => { }}
              />
            </aside>

            {/* Mobile Filter Panel with Backdrop */}
            {isFilterOpen && (
              <>
                <FilterPanel
                  filters={filters}
                  onChange={handleFilterChange}
                  onClear={handleFilterClear}
                  onToggleCheckbox={handleToggleCheckbox}
                  isOpen={isFilterOpen}
                  onClose={() => setIsFilterOpen(false)}
                />
                <div
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                  onClick={() => setIsFilterOpen(false)}
                />
              </>
            )}

            {/* Hotel Listings */}
            <div className="w-full lg:col-span-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
                <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 w-full">
                  {Object.entries(filters).map(([key, value]) => {
                    if ((key === "price" && (value[0] !== 500 || value[1] !== 5000)) ||
                      (key !== "price" && value.length > 0)) {
                      return (
                        <span key={key} className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs whitespace-nowrap">
                          {key === "price"
                            ? `RM ${value[0]} - ${value[1]}`
                            : key === "guestRating"
                              ? value.map(r => `${r.split('-')[0]}+ ${guestRatingLabels[r]}`).join(", ")
                              : value.join(", ")}
                          <button
                            onClick={() => handleFilterClear(key)}
                            className="ml-1 text-blue-600 hover:text-blue-800 text-base sm:text-lg leading-none"
                          >
                            ×
                          </button>
                        </span>
                      );
                    }
                    return null;
                  })}
                  {(filters.price[0] !== 500 || filters.price[1] !== 5000 ||
                    filters.starRating.length > 0 || filters.guestRating.length > 0 ||
                    filters.propertyFacilities.length > 0 || filters.offers.length > 0) && (
                      <button
                        onClick={() => handleFilterClear("all")}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Clear All
                      </button>
                    )}
                </div>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="w-full sm:w-48 md:w-56 border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="recommended">Recommended</option>
                  <option value="popular">Most Popular</option>
                  <option value="discount">Best Discounts</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating-high-low">Rating: High to Low</option>
                  <option value="rating-low-high">Rating: Low to High</option>
                  <option value="star-rating-high-low">Stars: High to Low</option>
                  <option value="star-rating-low-high">Stars: Low to High</option>
                </select>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {visibleHotels.length > 0 ? (
                  visibleHotels.map((hotel, i) => (
                    <HotelCard key={i} {...hotel} />
                  ))
                ) : (
                  <div className="text-center py-8 sm:py-12 bg-white rounded-xl shadow-md">
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg">No hotels match your criteria</p>
                    <button
                      onClick={() => handleFilterClear("all")}
                      className="mt-2 sm:mt-4 text-blue-600 hover:underline text-sm sm:text-base"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
                {visibleHotels.length < filteredHotels.length && (
                  <div ref={loaderRef} className="text-center py-4 sm:py-6">
                    {isLoading ? (
                      <div className="space-y-4 sm:space-y-6">
                        {Array(itemsPerPage).fill().map((_, i) => (
                          <div key={i} className="bg-white rounded-xl animate-pulse flex flex-col sm:flex-row">
                            <div className="w-full sm:w-1/3 flex flex-col">
                              <div className="h-48 sm:h-56 md:h-64 bg-gray-200" />
                              <div className="h-10 bg-gray-300" />
                            </div>
                            <div className="w-full sm:w-2/3 p-4 sm:p-5 flex flex-col gap-3">
                              <div className="h-6 bg-gray-200 rounded w-3/4" />
                              <div className="h-4 bg-gray-200 rounded w-1/2" />
                              <div className="h-4 bg-gray-200 rounded w-2/3" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm sm:text-base">Scroll to load more...</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}