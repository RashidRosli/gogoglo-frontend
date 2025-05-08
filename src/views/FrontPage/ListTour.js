import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Slider from 'react-slider';
import { FaCheck, FaChevronUp, FaFilter } from "react-icons/fa6";
import { Disclosure } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import SearchFormTour from "components/FrontPage/SearchFormTour.js";
import tourData from '../../views/Data/tourData.js';
import Navbar from "components/FrontPage/Navbar.js";
import Footer from "components/FrontPage/Footer.js";

// Constants
const FILTER_DEFAULTS = {
  duration: [2, 11],
  budget: [500, 10000],
  hotelCategory: [],
};
const TABS = ["all", "honeymoon", "family vacation", "group tours", "long stays", "premium holidays", "fresh arrivals"];
const STAR_RATINGS = [1, 2, 3, 4, 5];

// Memoized PackageCard Component with Updated Price Styling
const PackageCard = memo(({
  title, duration, locations, features, provide, price, discount, imageUrl, rating, onViewDetails
}) => {
  const featuresSplit = Math.ceil(features.length / 2);
  const [pricePerPerson, totalPrice] = price.split(" Total Price ");
  const numericPrice = parseFloat(pricePerPerson.replace(/[^0-9.-]+/g, ""));
  const originalPrice = discount ? numericPrice + parseFloat(discount.replace(/[^0-9.-]+/g, "")) : null;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
          src={imageUrl}
          alt={title}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
        <span className="absolute top-2 left-2 bg-yellow-400 text-white px-2 py-1 rounded-full text-xs font-semibold">
          {rating}
        </span>
        {title === "Couples Choice - Thailand" && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
            DEAL OF THE DAY
          </span>
        )}
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{title}</h3>
          <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {duration}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {locations.map((location, index) => (
            <span key={index} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600">
              {location}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
          <ul className="list-disc pl-4">
            {features.slice(0, featuresSplit).map((feature, index) => (
              <li key={index} className="line-clamp-1">{feature}</li>
            ))}
          </ul>
          <ul className="list-disc pl-4">
            {features.slice(featuresSplit).map((feature, index) => (
              <li key={index} className="line-clamp-1">{feature}</li>
            ))}
          </ul>
        </div>

        <ul className="space-y-2 text-sm text-gray-600">
          {provide.map((item, index) => (
            <li key={index} className="flex items-center">
              <FaCheck className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="line-clamp-1">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex-grow">
          {discount && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold mb-3 inline-block">
              Save {discount}!
            </span>
          )}
          <div className="bg-gray-100 p-3 rounded-lg">
            <div className="flex items-baseline gap-3">
              {originalPrice && (
                <span className="text-base text-gray-500 line-through font-medium">
                  RM{originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-3xl font-bold text-indigo-600">
                {pricePerPerson.replace("/Person", "")}
              </span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm text-gray-600">per person</span>
              <span className="text-sm text-gray-600 font-medium">
                Total: {totalPrice}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onViewDetails}
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  );
});

PackageCard.propTypes = {
  title: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  provide: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.string.isRequired,
  discount: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

// Filter Panel Component (unchanged)
const FilterPanel = ({ filters, onChange, onClear, onToggleHotel, isOpen, onClose }) => (
  <div className={`fixed inset-0 z-[9999999] lg:static lg:z-auto bg-white lg:bg-transparent p-6 lg:p-0 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
    <div className="lg:sticky lg:top-24 self-start bg-white rounded-xl p-6 shadow-sm h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="flex justify-between items-center mb-6 lg:hidden">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
          ✕
        </button>
      </div>
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-800 hidden lg:block">Filter by</h2>

        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full py-2 text-md font-medium text-gray-900">
                Duration (Nights)
                <FaChevronUp className={`${open ? "rotate-180" : ""} w-5 h-5 text-gray-500 transition-transform`} />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4">
                <Slider
                  min={2}
                  max={11}
                  step={1}
                  value={filters.duration}
                  onChange={values => onChange("duration", values)}
                  className="h-1 bg-gray-200 rounded-full"
                  thumbClassName="h-5 w-5 bg-indigo-600 rounded-full -mt-2 cursor-pointer"
                  trackClassName="bg-indigo-200"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>{filters.duration[0]}N</span>
                  <span>{filters.duration[1]}N</span>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full py-2 text-md font-medium text-gray-900">
                Price (per person)
                <FaChevronUp className={`${open ? "rotate-180" : ""} w-5 h-5 text-gray-500 transition-transform`} />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4">
                <Slider
                  min={500}
                  max={10000}
                  step={100}
                  value={filters.budget}
                  onChange={values => onChange("budget", values)}
                  className="h-1 bg-gray-200 rounded-full"
                  thumbClassName="h-5 w-5 bg-indigo-600 rounded-full -mt-2 cursor-pointer"
                  trackClassName="bg-indigo-200"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>RM {filters.budget[0]}</span>
                  <span>RM {filters.budget[1]}</span>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full py-2 text-md font-medium text-gray-900">
                Hotel Category
                <FaChevronUp className={`${open ? "rotate-180" : ""} w-5 h-5 text-gray-500 transition-transform`} />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4 space-y-3">
                {STAR_RATINGS.map(star => {
                  const count = tourData.filter(pkg => pkg.rating.includes(star)).length;
                  return (
                    <button
                      key={star}
                      onClick={() => onToggleHotel(star.toString())}
                      disabled={!count}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${filters.hotelCategory.includes(star.toString())
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } ${!count ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {star} Star ({count})
                    </button>
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

FilterPanel.propTypes = {
  filters: PropTypes.shape({
    duration: PropTypes.arrayOf(PropTypes.number).isRequired,
    budget: PropTypes.arrayOf(PropTypes.number).isRequired,
    hotelCategory: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onToggleHotel: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

// Main Tour Component (unchanged)
export default function Tour() {
  const [sortBy, setSortBy] = useState("recommended");
  const [packages, setPackages] = useState(tourData);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState(FILTER_DEFAULTS);
  const [visiblePackages, setVisiblePackages] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const observer = useRef(null);
  const filterTimeout = useRef(null);

  const filterAndSortPackages = useCallback(() => {
    setIsLoading(true);
    const filtered = tourData.filter((pkg) => {
      const durationMatch = pkg.duration.match(/(\d+)N\/(\d+)D/);
      const pkgDuration = durationMatch ? parseInt(durationMatch[1]) : 0;
      const [pricePerPerson] = pkg.price.split(" Total Price ");
      const numericPrice = parseFloat(pricePerPerson.replace(/[^0-9.-]+/g, ""));

      return (
        pkgDuration >= filters.duration[0] &&
        pkgDuration <= filters.duration[1] &&
        numericPrice >= filters.budget[0] &&
        numericPrice <= filters.budget[1] &&
        (filters.hotelCategory.length === 0 || filters.hotelCategory.includes(pkg.rating.split(" ")[0])) &&
        (activeTab === "all" || pkg.types.includes(activeTab))
      );
    });

    const sorted = filtered.sort((a, b) => {
      const getPrice = pkg => parseFloat(pkg.price.split("/")[0].replace(/[^0-9.-]+/g, ""));
      const getDuration = pkg => parseInt(pkg.duration.match(/(\d+)N/)[1]);
      const getDiscount = pkg => parseFloat(pkg.discount?.replace(/[^0-9.-]+/g, "") || 0);

      switch (sortBy) {
        case "popular": return b.title.length - a.title.length;
        case "discount": return getDiscount(b) - getDiscount(a);
        case "price-low-high": return getPrice(a) - getPrice(b);
        case "price-high-low": return getPrice(b) - getPrice(a);
        case "duration-low-high": return getDuration(a) - getDuration(b);
        case "duration-high-low": return getDuration(b) - getDuration(a);
        default: return 0;
      }
    });

    setPackages(sorted);
    setIsLoading(false);
  }, [filters, sortBy, activeTab]);

  useEffect(() => {
    clearTimeout(filterTimeout.current);
    filterTimeout.current = setTimeout(() => {
      filterAndSortPackages();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
    return () => clearTimeout(filterTimeout.current);
  }, [filterAndSortPackages]);

  useEffect(() => {
    if (isLoading) return;

    const observerCallback = (entries) => {
      if (entries[0].isIntersecting && visiblePackages < packages.length) {
        setVisiblePackages(prev => Math.min(prev + 4, packages.length));
      }
    };

    observer.current = new IntersectionObserver(observerCallback, {
      rootMargin: "100px",
      threshold: 0.1,
    });

    const lastCard = document.querySelector(".package-card:last-child");
    if (lastCard) observer.current.observe(lastCard);

    return () => observer.current?.disconnect();
  }, [visiblePackages, packages, isLoading]);

  const handleFilterChange = useCallback((type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  }, []);

  const handleFilterClear = useCallback((filterType) => {
    setFilters(prev => ({
      ...prev,
      ...(filterType === "all" ? FILTER_DEFAULTS : { [filterType]: FILTER_DEFAULTS[filterType] })
    }));
  }, []);

  const toggleHotelCategory = useCallback((value) => {
    setFilters(prev => ({
      ...prev,
      hotelCategory: prev.hotelCategory.includes(value)
        ? prev.hotelCategory.filter(cat => cat !== value)
        : [...prev.hotelCategory, value]
    }));
  }, []);

  const handleViewDetails = (id) => {
    const queryParams = new URLSearchParams(window.location.search);
    navigate(`/tours/detail-tour?id=${id}&${queryParams.toString()}`);
  };

  return (
    <>
      <Navbar transparent />
      <main className="min-h-screen bg-gray-50">
        <SearchFormTour />

        <div className="sticky top-0 z-40 bg-white shadow-sm py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex flex-wrap gap-4 overflow-x-auto pb-2" aria-label="Tabs">
              {TABS.map(tab => {
                const count = tourData.filter(pkg => tab === "all" || pkg.types.includes(tab)).length;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${activeTab === tab
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    role="tab"
                    aria-selected={activeTab === tab}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} ({count})
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

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
                onChange={handleFilterChange}
                onClear={handleFilterClear}
                onToggleHotel={toggleHotelCategory}
                isOpen={true}
                onClose={() => { }}
              />
            </aside>

            {isFilterOpen && (
              <div className="lg:hidden">
                <FilterPanel
                  filters={filters}
                  onChange={handleFilterChange}
                  onClear={handleFilterClear}
                  onToggleHotel={toggleHotelCategory}
                  isOpen={isFilterOpen}
                  onClose={() => setIsFilterOpen(false)}
                />
                <div
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                  onClick={() => setIsFilterOpen(false)}
                />
              </div>
            )}

            <div className="lg:col-span-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex flex-wrap gap-2">
                  {filters.duration[0] !== FILTER_DEFAULTS.duration[0] || filters.duration[1] !== FILTER_DEFAULTS.duration[1] ? (
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
                      {filters.duration[0]}N - {filters.duration[1]}N
                      <button onClick={() => handleFilterClear("duration")} className="ml-2 text-indigo-600 hover:text-indigo-800">
                        ×
                      </button>
                    </span>
                  ) : null}
                  {filters.budget[0] !== FILTER_DEFAULTS.budget[0] || filters.budget[1] !== FILTER_DEFAULTS.budget[1] ? (
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
                      RM {filters.budget[0]} - RM {filters.budget[1]}
                      <button onClick={() => handleFilterClear("budget")} className="ml-2 text-indigo-600 hover:text-indigo-800">
                        ×
                      </button>
                    </span>
                  ) : null}
                  {filters.hotelCategory.length > 0 && (
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
                      {filters.hotelCategory.map(cat => `${cat}★`).join(", ")}
                      <button onClick={() => handleFilterClear("hotelCategory")} className="ml-2 text-indigo-600 hover:text-indigo-800">
                        ×
                      </button>
                    </span>
                  )}
                  {(filters.duration[0] !== FILTER_DEFAULTS.duration[0] ||
                    filters.duration[1] !== FILTER_DEFAULTS.duration[1] ||
                    filters.budget[0] !== FILTER_DEFAULTS.budget[0] ||
                    filters.budget[1] !== FILTER_DEFAULTS.budget[1] ||
                    filters.hotelCategory.length > 0) && (
                      <button
                        onClick={() => handleFilterClear("all")}
                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                      >
                        Clear All
                      </button>
                    )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <label className="text-sm text-gray-600 whitespace-nowrap">Sort By:</label>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="popular">Popular</option>
                    <option value="discount">Discount</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="duration-low-high">Duration: Low to High</option>
                    <option value="duration-high-low">Duration: High to Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {isLoading ? (
                  Array.from({ length: Math.min(visiblePackages, 4) }).map((_, index) => (
                    <div key={index} className="bg-gray-200 animate-pulse rounded-xl h-96" />
                  ))
                ) : packages.length > 0 ? (
                  packages.slice(0, visiblePackages).map((pkg, index) => (
                    <div
                      key={pkg.id || index}
                      className="package-card"
                    >
                      <PackageCard
                        {...pkg}
                        onViewDetails={() => handleViewDetails(pkg.id)}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-600 text-lg">No packages match your criteria</p>
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