import React, { useEffect, useState, useCallback, memo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import tourData from "../../views/Data/tourData.js";
import TempBookingData, { saveBookingData } from "../../views/Data/TempBooking.js";
import SearchFormTour from "components/FrontPage/SearchFormTour.js";
import Navbar from "components/FrontPage/Navbar.js";
import Footer from "components/FrontPage/Footer.js";
import { FaPlaneDeparture, FaHotel, FaUtensils, FaHiking, FaTicketAlt, FaCheck, FaTaxi, FaArrowLeft, FaArrowRight, FaTimes, FaGift, FaShieldAlt, FaListAlt, FaCalendarAlt } from "react-icons/fa";

// Memoized IncludedItem Component
const IncludedItem = memo(({ icon, text }) => (
  <div className="flex items-center mb-2 sm:mb-3 transition-all duration-200 hover:pl-2">
    <span className="text-blue-600 mr-2 sm:mr-3 text-base sm:text-xl">{icon}</span>
    <span className="text-gray-700 text-xs sm:text-sm md:text-base">{text}</span>
  </div>
));

// Memoized DayButton Component
const DayButton = memo(({ day, activeDay, startDate, onClick }) => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + (day - 1));
  console.log(`Day ${day} calculated date:`, date.toLocaleDateString("en-GB", { day: "numeric", month: "short" }));
  return (
    <button
      className={`w-full px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-3 rounded-lg text-left transition-all duration-300 ${activeDay === day
          ? "bg-blue-50 text-blue-800 border-l-4 border-blue-600 shadow-md"
          : "bg-white text-gray-800 border-l-4 border-transparent hover:bg-blue-50 hover:shadow-md"
        }`}
      onClick={() => onClick(day)}
    >
      <span className="font-semibold text-xs sm:text-sm md:text-base">Day {day}</span> -{" "}
      <span className="text-xs sm:text-sm">{date.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
    </button>
  );
});

// Memoized GalleryImage Component (Grid, no click to open modal)
const GalleryImage = memo(({ image, alt }) => (
  <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-40 sm:h-48 md:h-60 lg:h-72 w-full">
    <LazyLoadImage
      src={image}
      alt={alt}
      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
      effect="blur"
      wrapperClassName="w-full h-full"
      placeholder={<div className="w-full h-full bg-gray-200 animate-pulse" />}
    />
  </div>
));

// Memoized ModalGridImage Component (Modal Grid, clickable to zoom)
const ModalGridImage = memo(({ image, alt, onClick }) => (
  <div className="relative h-28 sm:h-32 md:h-40 lg:h-48 w-full">
    <LazyLoadImage
      src={image}
      alt={alt}
      className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity duration-200"
      effect="blur"
      wrapperClassName="w-full h-full"
      onClick={onClick}
      placeholder={<div className="w-full h-full bg-gray-200 animate-pulse" />}
    />
  </div>
));

// Memoized ItineraryContent Component
const ItineraryContent = memo(({ tour, startDate, activeDay, handleDayClick }) => (
  <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6 border border-gray-200">
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 flex items-center">
      <FaCalendarAlt className="text-blue-600 mr-2 sm:mr-3 text-base sm:text-lg md:text-xl" /> Itinerary
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      <div className="space-y-2 sm:space-y-3">
        {startDate && tour.itinerary && tour.itinerary.length > 0 ? (
          tour.itinerary.map((dayItem) => (
            <DayButton
              key={dayItem.day}
              day={dayItem.day}
              activeDay={activeDay}
              startDate={startDate}
              onClick={handleDayClick}
            />
          ))
        ) : (
          <p className="text-gray-500 italic text-xs sm:text-sm md:text-base">No itinerary available.</p>
        )}
      </div>
      <div className="md:col-span-1 lg:col-span-3">
        {startDate && tour.itinerary && tour.itinerary.length > 0 ? (
          tour.itinerary.map((dayItem) => {
            const date = new Date(startDate);
            date.setDate(date.getDate() + (dayItem.day - 1));
            console.log(`Day ${dayItem.day} content date:`, date.toLocaleDateString("en-GB", { day: "numeric", month: "short" }));
            return activeDay === dayItem.day ? (
              <div key={dayItem.day} className="p-3 sm:p-4 md:p-6 bg-gray-50 rounded-lg shadow-sm">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 sm:mb-3 md:mb-4">
                  {dayItem.title}{" "}
                  <span className="text-gray-600 font-normal text-xs sm:text-sm md:text-base">
                    - Day {dayItem.day} - {date.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </span>
                </h3>
                <div className="mb-2 sm:mb-3 md:mb-4">
                  <h4 className="text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-1 sm:mb-2">Included:</h4>
                  <div className="bg-white p-2 sm:p-3 md:p-4 rounded-md border border-gray-200">
                    {dayItem.included.map((item, index) => {
                      let icon = <FaCheck />;
                      if (item.includes("Transfer")) icon = <FaPlaneDeparture />;
                      else if (item.includes("hotel")) icon = <FaHotel />;
                      else if (
                        item.includes("Lunch") ||
                        item.includes("Dinner") ||
                        item.includes("Breakfast")
                      )
                        icon = <FaUtensils />;
                      else if (
                        item.includes("tour") ||
                        item.includes("entrance") ||
                        item.includes("excursion")
                      )
                        icon = <FaHiking />;
                      else if (item.includes("ticket")) icon = <FaTicketAlt />;
                      return <IncludedItem key={index} icon={icon} text={item} />;
                    })}
                  </div>
                </div>
                <div className="text-gray-600 leading-relaxed space-y-1 sm:space-y-2 md:space-y-3 text-xs sm:text-sm md:text-base">
                  {dayItem.details.map((detail, index) => (
                    <p key={index}>{detail}</p>
                  ))}
                </div>
              </div>
            ) : null;
          })
        ) : (
          <p className="text-gray-500 italic p-3 sm:p-4 md:p-6 text-xs sm:text-sm md:text-base">No itinerary details available.</p>
        )}
      </div>
    </div>
  </div>
));

// Memoized PoliciesContent Component
const PoliciesContent = memo(({ policies }) => (
  <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6 border border-gray-200">
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 flex items-center">
      <FaShieldAlt className="text-blue-600 mr-2 sm:mr-3 text-base sm:text-lg md:text-xl" /> Policies
    </h2>
    <div className="p-3 sm:p-4 md:p-6 bg-gray-50 rounded-lg shadow-sm">
      <ol className="ml-4 sm:ml-6 list-decimal space-y-2 sm:space-y-3 md:space-y-4 text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base">
        {policies.map((policy, index) => (
          <li
            key={index}
            className="pl-1 sm:pl-2 transition-all duration-200 hover:text-blue-600 hover:bg-blue-50 rounded-md py-1"
            dangerouslySetInnerHTML={{ __html: policy.replace(/\*\*(.*?)\*\*/g, "<strong class='text-blue-700'>$1</strong>") }}
          />
        ))}
      </ol>
    </div>
  </div>
));

// Memoized SummaryContent Component
const SummaryContent = memo(({ summary }) => (
  <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6 border border-gray-200">
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 flex items-center">
      <FaListAlt className="text-blue-600 mr-2 sm:mr-3 text-base sm:text-lg md:text-xl" /> Summary
    </h2>
    <div className="p-3 sm:p-4 md:p-6 bg-gray-50 rounded-lg shadow-sm space-y-3 sm:space-y-4 md:space-y-6">
      {summary.map((item, index) => (
        <div key={index} className="transition-all duration-200 hover:bg-blue-50 rounded-md p-2 sm:p-3">
          <div className="flex items-center mb-1 sm:mb-2">
            <span className="text-blue-600 text-base sm:text-lg md:text-xl mr-2 sm:mr-3">
              {item.label === "Flights" ? (
                <FaPlaneDeparture />
              ) : item.label === "Accommodation" ? (
                <FaHotel />
              ) : item.label === "Activities" ? (
                <FaHiking />
              ) : item.label === "Meals" ? (
                <FaUtensils />
              ) : item.label === "Transfers" ? (
                <FaTaxi />
              ) : (
                <FaCheck />
              )}
            </span>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">{item.label}</h3>
          </div>
          <ul className="list-disc ml-5 sm:ml-6 md:ml-8 space-y-1 sm:space-y-2 text-gray-600 text-xs sm:text-sm md:text-base">
            {item.items?.map((point, pIndex) => (
              <li key={pIndex}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
));

function DetailTour() {
  const [searchParams] = useSearchParams();
  const [startDate, setStartDate] = useState(() => {
    const dateStart = searchParams.get("startDate");
    console.log("Raw startDate from URL:", dateStart);
    return dateStart ? new Date(dateStart) : new Date();
  });
  const [tour, setTour] = useState(null);
  const [pricePerPerson, setPricePerPerson] = useState("");
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("itinerary");
  const [showGallery, setShowGallery] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState("gallery");
  const [activeDay, setActiveDay] = useState(1);
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    const id = searchParams.get("id")?.toLowerCase();
    if (!id) return;

    const foundTour = tourData.find((tour) => tour.id.toLowerCase() === id);
    if (!foundTour) return;

    setTour(foundTour);
    setPricePerPerson(foundTour.price.split(" Total Price ")[0]);
    const dateStart = searchParams.get("startDate");
    const parsedStartDate = dateStart ? new Date(dateStart) : new Date();
    setStartDate(parsedStartDate);
    console.log("Parsed startDate:", parsedStartDate.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }));

    console.log("Gallery Images:", foundTour.galleryImages);
    console.log("Activities Images:", foundTour.activitiesSightseeingImages);
    console.log("Property Images:", foundTour.propertyImages);
    console.log("Itinerary:", foundTour.itinerary);
  }, [searchParams]);

  const generateUniqueId = () => {
    const randomPart = Math.random().toString(36).substring(2, 18);
    let lastSequenceNumber = 0;
    const lastBooking = TempBookingData[TempBookingData.length - 1];
    if (lastBooking && lastBooking.id) {
      const lastSequence = parseInt(lastBooking.id.slice(-10), 10);
      if (!isNaN(lastSequence)) lastSequenceNumber = lastSequence;
    }
    const newSequenceNumber = lastSequenceNumber + 1;
    const sequencePart = ("0000000000" + newSequenceNumber).slice(-10);
    return randomPart + sequencePart;
  };

  const handleTourBookingClick = useCallback((bookingType) => {
    let timeout;
    const debouncedBooking = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const id = generateUniqueId();
        const perPersonPriceMatch = tour.price.match(/(\d+(?:,\d+)*(?:\.\d+)?)(?=\s*\/Person)/);
        let perPersonPrice = 0;

        if (perPersonPriceMatch) perPersonPrice = parseFloat(perPersonPriceMatch[1].replace(/,/g, ""));

        const bookingDetails = {
          id,
          type: bookingType,
          tourId: tour.id,
          title: tour.title,
          mainImage: tour.imageUrl,
          start: searchParams.get("destination"),
          dateStart: searchParams.get("startDate"),
          adults: searchParams.get("adults"),
          children: searchParams.get("children"),
          price: perPersonPrice,
        };

        saveBookingData(bookingDetails);
        navigate(`/booking?id=${id}`);
      }, 300);
    };
    debouncedBooking();
  }, [tour, searchParams, navigate]);

  if (!tour) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-8 text-center min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4">Tour Not Found</h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">Please check the tour ID and try again.</p>
        <button
          className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
          onClick={() => navigate("/")}
        >
          Go to Home Page
        </button>
      </div>
    );
  }

  const handleTabClick = (tab) => setActiveTab(tab);
  const handleImageClick = (tab) => {
    setShowGallery(true);
    setActiveGalleryTab(tab);
    setZoomedImage(null);
    console.log(`Opening modal with tab: ${tab}`);
  };
  const closeGallery = () => {
    setShowGallery(false);
    setZoomedImage(null);
  };
  const handleGalleryTabClick = (tab) => {
    setActiveGalleryTab(tab);
    setZoomedImage(null);
    console.log(`Switched to tab: ${tab}`);
  };
  const handleDayClick = (day) => setActiveDay(day);
  const closeZoom = () => setZoomedImage(null);

  const handlePrevImage = () => {
    const imagesArray =
      activeGalleryTab === "gallery"
        ? tour.galleryImages || []
        : activeGalleryTab === "activities"
          ? tour.activitiesSightseeingImages || []
          : tour.propertyImages || [];
    const currentIndex = imagesArray.indexOf(zoomedImage);
    const newIndex = currentIndex === 0 ? imagesArray.length - 1 : currentIndex - 1;
    setZoomedImage(imagesArray[newIndex]);
  };

  const handleNextImage = () => {
    const imagesArray =
      activeGalleryTab === "gallery"
        ? tour.galleryImages || []
        : activeGalleryTab === "activities"
          ? tour.activitiesSightseeingImages || []
          : tour.propertyImages || [];
    const currentIndex = imagesArray.indexOf(zoomedImage);
    const newIndex = currentIndex === imagesArray.length - 1 ? 0 : currentIndex + 1;
    setZoomedImage(imagesArray[newIndex]);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "itinerary":
        return <ItineraryContent tour={tour} startDate={startDate} activeDay={activeDay} handleDayClick={handleDayClick} />;
      case "policies":
        return <PoliciesContent policies={tour.policies} />;
      case "summary":
        return <SummaryContent summary={tour.summary} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar transparent />
      <main className="bg-gray-50 min-h-screen">
        <SearchFormTour />
        <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
          <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-sm mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight px-2 sm:px-0">{tour.title}</h1>
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 sm:mt-3 px-2 sm:px-0">
              {tour.locations.map((location, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                >
                  {location}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {(tour.galleryImages || []).slice(0, 4).map((image, index) => (
              <div key={index} className="relative">
                <GalleryImage image={image} alt={`${tour.title} - Gallery ${index + 1}`} />
                {index === 0 && (
                  <button
                    className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white/90 text-gray-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-white transition-all duration-200 whitespace-nowrap"
                    onClick={() => handleImageClick("gallery")}
                  >
                    View Gallery
                  </button>
                )}
              </div>
            ))}
            {(tour.activitiesSightseeingImages || []).slice(0, 1).map((image, index) => (
              <div key={index} className="relative">
                <GalleryImage image={image} alt={`${tour.title} - Activities & Sightseeing`} />
                <button
                  className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white/90 text-gray-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-white transition-all duration-200 whitespace-nowrap"
                  onClick={() => handleImageClick("activities")}
                >
                  Activities & Sightseeing
                </button>
              </div>
            ))}
            {(tour.propertyImages || []).slice(0, 1).map((image, index) => (
              <div key={index} className="relative">
                <GalleryImage image={image} alt={`${tour.title} - Property`} />
                <button
                  className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white/90 text-gray-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-white transition-all duration-200 whitespace-nowrap"
                  onClick={() => handleImageClick("property")}
                >
                  Property Photos
                </button>
              </div>
            ))}
          </div>

          {/* Responsive Tab UI */}
          <div className="sticky top-[6rem] sm:top-[7rem] z-40 bg-white rounded-lg shadow-lg border border-gray-200 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row justify-around items-center px-2 sm:p-2 gap-2 sm:gap-0">
              {["itinerary", "policies", "summary"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`relative w-full sm:flex-1 py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 rounded-md ${activeTab === tab
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                >
                  {tab.toUpperCase()}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 sm:w-10 md:w-12 h-1 bg-white rounded-t-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
            <div className="lg:w-2/3">{renderTabContent()}</div>

            <div className="lg:w-1/3">
              <div className="sticky top-[11rem] sm:top-[12rem] bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-xl p-3 sm:p-4 md:p-6 border border-blue-100">
                <div className="mb-3 sm:mb-4 md:mb-6">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Book Now & Save!</span>
                    <span className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold animate-pulse">
                      {tour.discount} OFF
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-700">{pricePerPerson}</div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">Excluding taxes • Limited Offer</p>
                  <p className="text-xs text-gray-500 mt-1">Total: {tour.price.split(" Total Price ")[1]}</p>
                </div>
                <button
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 sm:py-3 rounded-lg font-bold text-sm sm:text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg transform hover:scale-105"
                  onClick={() => handleTourBookingClick("tour")}
                >
                  Book Now Before It’s Gone!
                </button>
              </div>

              <div className="mt-4 sm:mt-6">
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">Special Offers</h2>
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6 border border-blue-100">
                  {tour.offers.map((offer, index) => (
                    <div
                      key={index}
                      className="mb-2 sm:mb-3 md:mb-4 last:mb-0 p-2 sm:p-3 md:p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500"
                    >
                      <div className="flex items-center mb-1 sm:mb-2">
                        <FaGift className="text-blue-600 mr-2 text-base sm:text-lg md:text-xl" />
                        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">{offer.title}</h3>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm">{offer.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {showGallery && (
        <div className="fixed inset-0 z-[99999999] bg-black/70 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-xl max-w-full sm:max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-3 sm:p-4 md:p-6">
              <div className="flex justify-between items-center mb-3 sm:mb-4 md:mb-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Image Gallery</h2>
                {!zoomedImage && (
                  <button
                    className="text-gray-600 hover:text-gray-900 text-lg sm:text-xl md:text-2xl font-bold"
                    onClick={closeGallery}
                  >
                    ×
                  </button>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-3 sm:mb-4 md:mb-6">
                {["gallery", "activities", "property"].map((tab) => (
                  <button
                    key={tab}
                    className={`w-full sm:w-auto px-3 sm:px-4 md:px-6 py-2 rounded-full font-medium transition-all duration-200 text-xs sm:text-sm md:text-base ${activeGalleryTab === tab
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    onClick={() => handleGalleryTabClick(tab)}
                  >
                    {tab === "gallery" ? "Gallery" : tab === "activities" ? "Activities" : "Property"}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
                {(activeGalleryTab === "gallery"
                  ? tour.galleryImages || []
                  : activeGalleryTab === "activities"
                    ? tour.activitiesSightseeingImages || []
                    : tour.propertyImages || []).map((image, index) => (
                      <ModalGridImage
                        key={index}
                        image={image}
                        alt={`${tour.title} - ${activeGalleryTab} ${index + 1}`}
                        onClick={() => setZoomedImage(image)}
                      />
                    ))}
              </div>
            </div>
          </div>
          {zoomedImage && (
            <div className="fixed inset-0 z-[99999999] bg-black/80 flex items-center justify-center">
              <div className="relative w-[90%] sm:w-[75%] md:w-[600px] h-[250px] sm:h-[300px] md:h-[400px]">
                <LazyLoadImage
                  src={zoomedImage}
                  alt={`${tour.title} - Zoomed`}
                  className="w-full h-full object-cover"
                  effect="blur"
                  wrapperClassName="w-full h-full"
                  placeholder={<div className="w-full h-full bg-gray-200 animate-pulse" />}
                />
                <button
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white text-lg sm:text-xl md:text-2xl bg-gray-800/50 p-1 sm:p-2 rounded-full hover:bg-gray-800/70"
                  onClick={handlePrevImage}
                >
                  <FaArrowLeft />
                </button>
                <button
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white text-lg sm:text-xl md:text-2xl bg-gray-800/50 p-1 sm:p-2 rounded-full hover:bg-gray-800/70"
                  onClick={handleNextImage}
                >
                  <FaArrowRight />
                </button>
                <button
                  className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white text-lg sm:text-xl md:text-2xl bg-gray-800/50 p-1 sm:p-2 rounded-full hover:bg-gray-800/70"
                  onClick={closeZoom}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default DetailTour;