import React, { useEffect, useState, useRef, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useInView } from "react-intersection-observer";
import hotelData from "../../views/Data/hotelData.js";
import TempBookingData, { saveBookingData } from "../../views/Data/TempBooking.js";
import SearchFormHotel from "components/FrontPage/SearchFormHotel.js";
import Navbar from "components/FrontPage/Navbar.js";
import Footer from "components/FrontPage/Footer.js";
import {
  FaBed, FaRulerCombined, FaCheckCircle, FaCircle, FaShuttleVan, FaConciergeBell,
  FaParking, FaWheelchair, FaSpa, FaDumbbell, FaHiking, FaSwimmingPool, FaDog,
  FaUsers, FaMoneyBillWave, FaHandsWash, FaPeopleArrows, FaVirusSlash, FaUserShield,
  FaFireExtinguisher, FaBroom, FaUtensils, FaGlassMartiniAlt, FaBacon, FaWineGlass,
  FaUserTie, FaTshirt, FaFileInvoiceDollar, FaLuggageCart, FaClipboardList, FaDesktop,
  FaLock, FaStoreAlt, FaStore, FaChild, FaBabyCarriage, FaPlaneArrival, FaCarSide,
  FaTaxi, FaSmoking, FaPrint, FaPhone, FaPlug, FaToilet, FaWindowMaximize, FaCheck,
  FaMapMarkerAlt, FaBriefcase, FaListAlt, FaShieldAlt, FaTimes, FaUser,
} from "react-icons/fa";
import {
  FaWifi, FaElevator, FaFireBurner, FaTemperatureHigh, FaBottleWater, FaShieldHalved,
  FaNewspaper, FaSprayCanSparkles, FaPeopleRoof, FaBanSmoking, FaScissors, FaShirt,
  FaMugSaucer,
} from "react-icons/fa6";

// Memoized IncludedItem Component
const IncludedItem = React.memo(({ icon, text }) => (
  <div className="flex items-center mb-2 sm:mb-3 transition-all duration-200 hover:pl-2">
    <span className="text-blue-600 mr-2 sm:mr-3 text-base sm:text-xl">{icon}</span>
    <span className="text-gray-700 text-xs sm:text-sm md:text-base">{text}</span>
  </div>
));

// Memoized GalleryImage Component
const GalleryImage = React.memo(({ image, alt }) => (
  <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-40 sm:h-48 md:h-60 lg:h-72 w-full">
    <img
      src={image}
      alt={alt}
      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
    />
  </div>
));

function DetailHotel() {
  const [searchParams] = useSearchParams();
  const [hotel, setHotel] = useState(null);
  const navigate = useNavigate();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [mainImageIndexes, setMainImageIndexes] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = useMemo(() => ["overview", "rooms", "amenities", "rules", "policies"], []);

  const [overviewRef, overviewInView] = useInView({ threshold: 0.5, rootMargin: "-150px 0px" });
  const [roomsRef, roomsInView] = useInView({ threshold: 0.5, rootMargin: "-150px 0px" });
  const [amenitiesRef, amenitiesInView] = useInView({ threshold: 0.5, rootMargin: "-150px 0px" });
  const [rulesRef, rulesInView] = useInView({ threshold: 0.5, rootMargin: "-150px 0px" });
  const [policiesRef, policiesInView] = useInView({ threshold: 0.5, rootMargin: "-150px 0px" });

  const sectionRefs = useRef([]);
  const navbarRef = useRef(null);
  const searchFormRef = useRef(null);
  const headerRef = useRef(null);

  const getIconForFeature = useMemo(() => (feature) => {
    const iconMap = {
      pool: <FaSwimmingPool />, spa: <FaSpa />, gym: <FaDumbbell />, fitness: <FaDumbbell />,
      restaurant: <FaUtensils />, wifi: <FaWifi />, parking: <FaParking />, location: <FaMapMarkerAlt />,
      service: <FaConciergeBell />, "city view": <FaConciergeBell />, "airport shuttle": <FaShuttleVan />,
    };
    const key = Object.keys(iconMap).find((k) => feature.toLowerCase().includes(k));
    return key ? iconMap[key] : <FaCheck />;
  }, []);

  const getIconForAmenity = useMemo(() => (amenityName) => {
    const iconMap = {
      "wi-fi": <FaWifi />, pool: <FaSwimmingPool />, gym: <FaDumbbell />, fitness: <FaDumbbell />,
      wifi: <FaWifi />, parking: <FaParking />, shuttle: <FaShuttleVan />, concierge: <FaConciergeBell />,
      housekeeping: <FaBroom />, wheelchair: <FaWheelchair />, "24/7 room service": <FaConciergeBell />,
      "airport shuttle": <FaShuttleVan />, "concierge service": <FaConciergeBell />, "daily housekeeping": <FaBroom />,
      "on-site parking": <FaParking />, "wheelchair accessible": <FaWheelchair />, spa: <FaSpa />,
      "fitness center": <FaDumbbell />, "gym/fitness": <FaDumbbell />, "swimming pool": <FaSwimmingPool />,
      tours: <FaHiking />, "body thermometer": <FaTemperatureHigh />, "cashless payment service": <FaMoneyBillWave />,
      "daily disinfection in all rooms": <FaSprayCanSparkles />, "daily disinfection in common areas": <FaSprayCanSparkles />,
      "hand sanitizer": <FaHandsWash />, "physical distancing of at least 1 meter": <FaPeopleArrows />,
      "rooms sanitized between stays": <FaVirusSlash />, "staff trained in safety protocol": <FaUserShield />,
      "a la carte in restaurant": <FaUtensils />, restaurant: <FaUtensils />, restaurants: <FaUtensils />,
      "coffee shop": <FaMugSaucer />, bar: <FaGlassMartiniAlt />, "bottle of water": <FaBottleWater />,
      "breakfast [buffet]": <FaBacon />, "halal breakfast": <FaUtensils />, "restaurant [halal]": <FaUtensils />,
      "business facilities": <FaBriefcase />, "convenience store": <FaStore />, doorman: <FaUserTie />,
      "dry cleaning": <FaTshirt />, elevator: <FaElevator />, "invoice provided": <FaFileInvoiceDollar />,
      "laundry service": <FaShirt />, "luggage storage": <FaLuggageCart />, meetings: <FaUsers />,
      "meeting stationery": <FaClipboardList />, "projector/led display": <FaDesktop />, "safety deposit boxes": <FaLock />,
      salon: <FaScissors />, shops: <FaStoreAlt />, "smoke-free property": <FaBanSmoking />, "smoking area": <FaSmoking />,
      "xerox/fax in business center": <FaPrint />, "family/child friendly": <FaChild />, "family room": <FaPeopleRoof />,
      "swimming pool [kids]": <FaBabyCarriage />, "fire extinguisher": <FaFireExtinguisher />, "pets allowed": <FaDog />,
      "safety/security feature": <FaShieldHalved />, "smoke alarms": <FaFireBurner />, "airport transfer": <FaPlaneArrival />,
      "car park [charges apply]": <FaCarSide />, "car park [nearby]": <FaCarSide />, "car park [on-site]": <FaCarSide />,
      "taxi service": <FaTaxi />, "valet parking": <FaCarSide />, "bathroom phone": <FaPhone />, "mini bar": <FaWineGlass />,
      "daily newspaper": <FaNewspaper />, "socket near the bed": <FaPlug />, telephone: <FaPhone />, toiletries: <FaToilet />,
      window: <FaWindowMaximize />,
    };
    const key = Object.keys(iconMap).find((k) => amenityName.toLowerCase().includes(k));
    return key ? iconMap[key] : <FaCheck />;
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [expandedRules, setExpandedRules] = useState({});
  const [expandedPolicies, setExpandedPolicies] = useState({});

  const openModal = (category) => { setSelectedCategory(category); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setSelectedCategory(null); };
  const openRoomModal = (room) => { setSelectedRoom(room); setIsRoomModalOpen(true); };
  const closeRoomModal = () => { setIsRoomModalOpen(false); setSelectedRoom(null); };
  const toggleRule = (index) => { setExpandedRules((prev) => ({ ...prev, [index]: !prev[index] })); };
  const togglePolicy = (index) => { setExpandedPolicies((prev) => ({ ...prev, [index]: !prev[index] })); };

  useEffect(() => {
    const id = searchParams.get("id")?.toLowerCase();
    if (!id) return navigate("/");
    const foundHotel = hotelData.find((h) => h.id.toLowerCase() === id);
    if (foundHotel) {
      setHotel(foundHotel);
      setMainImageIndexes(foundHotel.rooms.map(() => 0));
    } else {
      navigate("/");
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    const inViewMap = {
      overview: overviewInView, rooms: roomsInView, amenities: amenitiesInView,
      rules: rulesInView, policies: policiesInView,
    };
    const active = tabs.find((tab) => inViewMap[tab]);
    if (active) setActiveTab(active);
  }, [overviewInView, roomsInView, amenitiesInView, rulesInView, policiesInView, tabs]);

  const handleThumbnailClick = (roomIndex, thumbIndex) => {
    setMainImageIndexes((prev) => {
      const updated = [...prev];
      updated[roomIndex] = thumbIndex;
      return updated;
    });
  };

  const openLightbox = (roomIndex, imageIndex) => {
    if (roomIndex === null) {
      setLightboxImages(hotel.images.map((src) => ({ src })));
      setLightboxImageIndex(imageIndex);
    } else {
      setLightboxImages(hotel.rooms[roomIndex].images.map((src) => ({ src })));
      setLightboxImageIndex(imageIndex);
    }
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxImages([]);
  };

  const generateUniqueId = () => {
    const randomPart = Math.random().toString(36).substring(2, 18);
    const lastBooking = TempBookingData[TempBookingData.length - 1];
    const lastSequence = lastBooking?.id ? parseInt(lastBooking.id.slice(-10), 10) || 0 : 0;
    const newSequence = ("0000000000" + (lastSequence + 1)).slice(-10);
    return randomPart + newSequence;
  };

  const handleHotelBookingClick = (room, bookingType) => {
    const id = generateUniqueId();
    const adults = parseInt(searchParams.get("adults")) || 0;
    const children = parseInt(searchParams.get("children")) || 0;
    const roomsCount = parseInt(searchParams.get("rooms")) || 1;
    const childrenAges = searchParams.get("childrenAges")?.split(",").map(Number) || [];
    const rooms = Array.from({ length: roomsCount }, (_, i) => ({
      name: `Room ${i + 1}`,
      passengers: { adults, children, childrenAges },
    }));
    const bookingDetails = {
      id, type: bookingType, hotelId: hotel.id, hotelName: hotel.hotelName,
      hotelLocation: hotel.location.area, hotelFacilities: hotel.features,
      name: room.name, price: room.price, beds: room.beds, size: room.size,
      features: room.features, mainImage: room.images[0], startDate: searchParams.get("startDate"),
      endDate: searchParams.get("endDate"), combinedRoomData: rooms,
    };
    saveBookingData(bookingDetails);
    navigate(`/booking?id=${id}`);
  };

  // Find the lowest-priced room
  const lowestPriceRoom = useMemo(() => {
    if (!hotel || !hotel.rooms) return null;
    return hotel.rooms.reduce((min, room) => {
      const minPrice = parseFloat(min.price.replace(/[^\d.]/g, ""));
      const roomPrice = parseFloat(room.price.replace(/[^\d.]/g, ""));
      return roomPrice < minPrice ? room : min;
    }, hotel.rooms[0]);
  }, [hotel]);

  if (!hotel || !hotel.rooms) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-8 text-center min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4">Hotel Not Found</h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">Please check the hotel ID and try again.</p>
        <button
          className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
          onClick={() => navigate("/")}
        >
          Go to Home Page
        </button>
      </div>
    );
  }

  if (sectionRefs.current.length !== tabs.length) {
    sectionRefs.current = Array(tabs.length).fill().map(() => React.createRef());
  }

  const handleTabClick = (tab, index) => {
    setActiveTab(tab);
    const navbarHeight = navbarRef.current ? navbarRef.current.offsetHeight : 0;
    const searchFormHeight = searchFormRef.current ? searchFormRef.current.offsetHeight : 0;
    const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
    const section = sectionRefs.current[index].current;
    if (section) {
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: sectionTop - navbarHeight - searchFormHeight - headerHeight - 10, behavior: "smooth" });
    }
  };

  return (
    <>
      <div ref={navbarRef}><Navbar transparent /></div>
      <main className="bg-gray-50 min-h-screen">
        <div ref={searchFormRef}><SearchFormHotel /></div>
        <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
          <div ref={headerRef} className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-sm mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight px-2 sm:px-0">{hotel.hotelName}</h1>
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 sm:mt-3 px-2 sm:px-0">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">{hotel.location.area}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {(hotel.images || []).slice(0, 4).map((image, index) => (
              <div key={index} className="relative">
                <GalleryImage image={image} alt={`${hotel.hotelName} - Gallery ${index + 1}`} />
                {index === 0 && (
                  <button
                    className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white/90 text-gray-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-white transition-all duration-200 whitespace-nowrap"
                    onClick={() => openLightbox(null, 0)}
                  >
                    View Gallery
                  </button>
                )}
              </div>
            ))}
            {(hotel.facilities || []).slice(0, 2).map((facility, index) => (
              <div key={index} className="relative">
                <GalleryImage image={facility.image} alt={`${hotel.hotelName} - Facility ${facility.name}`} />
                <button
                  className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white/90 text-gray-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-white transition-all duration-200 whitespace-nowrap"
                  onClick={() => openLightbox(null, index + 4)}
                >
                  {facility.name}
                </button>
              </div>
            ))}
          </div>

          <div className="sticky top-[8rem] z-40 bg-white rounded-lg shadow-lg border border-gray-200 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row justify-around items-center px-2 sm:p-2 gap-2 sm:gap-0">
              {tabs.map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab, index)}
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
            <div className="lg:w-2/3">
              {/* Overview */}
              <section
                ref={(el) => { sectionRefs.current[0].current = el; overviewRef(el); }}
                id="overview"
                className="bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6 border border-gray-200 mb-4 sm:mb-6"
              >
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 flex items-center">
                  <FaListAlt className="text-blue-600 mr-2 sm:mr-3 text-base sm:text-lg md:text-xl" /> Overview
                </h2>
                <div className="p-3 sm:p-4 md:p-6 bg-gray-50 rounded-lg shadow-sm">
                  <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base mb-4">{hotel.overview.description}</p>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 sm:mb-3 md:mb-4">Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    {hotel.overview.keyFeatures.map((feature, index) => (
                      <IncludedItem key={index} icon={getIconForFeature(feature)} text={feature} />
                    ))}
                  </div>
                </div>
              </section>

              {/* Rooms */}
              <section
                ref={(el) => { sectionRefs.current[1].current = el; roomsRef(el); }}
                id="rooms"
                className="bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6 border border-gray-200 mb-4 sm:mb-6"
              >
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 flex items-center">
                  <FaBed className="text-blue-600 mr-2 sm:mr-3 text-base sm:text-lg md:text-xl" /> Rooms
                  {lowestPriceRoom && (
                    <span className="ml-2 sm:ml-4 text-xs sm:text-sm md:text-base text-blue-700 font-semibold">
                      (Lowest Price: {lowestPriceRoom.price})
                    </span>
                  )}
                </h2>
                <div className="p-3 sm:p-4 md:p-6 bg-gray-50 rounded-lg shadow-sm space-y-4 sm:space-y-6">
                  {hotel.rooms.map((room, index) => {
                    const isLowestPrice = room.price === lowestPriceRoom.price;
                    return (
                      <div
                        key={index}
                        className={`flex flex-col sm:flex-row gap-4 sm:gap-6 p-2 sm:p-3 md:p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ${isLowestPrice ? "border-2 border-blue-600" : ""
                          }`}
                      >
                        <div className="w-full sm:w-1/3 relative">
                          <img
                            src={room.images[mainImageIndexes[index]] || "/placeholder.jpg"}
                            alt={room.name}
                            className="w-full h-40 sm:h-48 md:h-60 object-cover rounded-lg"
                            onClick={() => openRoomModal(room)}
                          />
                          {isLowestPrice && (
                            <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full shadow-md">
                              Best Value
                            </span>
                          )}
                          <div className="flex gap-2 sm:gap-3 mt-2 overflow-x-auto">
                            {room.images.slice(0, 4).map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                alt={`Thumbnail ${i + 1}`}
                                className="w-12 sm:w-14 h-12 sm:h-14 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity duration-200"
                                onClick={() => handleThumbnailClick(index, i)}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">{room.name}</h3>
                            <div className="flex flex-wrap gap-2 sm:gap-4 text-gray-600 text-xs sm:text-sm md:text-base mb-2 sm:mb-3">
                              <span className="flex items-center"><FaBed className="mr-2 text-blue-600" /> {room.beds}</span>
                              <span className="flex items-center"><FaRulerCombined className="mr-2 text-blue-600" /> {room.size}</span>
                              <span className="flex items-center"><FaUser className="mr-2 text-blue-600" /> {room.capacity?.adults || 2} Adults</span>
                              <span className="flex items-center"><FaChild className="mr-2 text-blue-600" /> {room.capacity?.children || 0} Children</span>
                            </div>
                            <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-2 sm:mb-3 leading-relaxed">
                              {room.description || "A comfortable room designed for a relaxing stay with modern amenities."}
                            </p>
                            <ul className="space-y-1 sm:space-y-2">
                              {room.features.slice(0, 3).map((feature, i) => (
                                <IncludedItem key={i} icon={<FaCheck />} text={feature} />
                              ))}
                            </ul>
                          </div>
                          <div className="flex justify-between items-center mt-2 sm:mt-4">
                            <span className={`text-lg sm:text-xl md:text-2xl font-extrabold ${isLowestPrice ? "text-blue-700" : "text-gray-800"}`}>
                              {room.price} <span className="text-xs sm:text-sm font-normal text-gray-600">/night</span>
                            </span>
                            <div className="flex gap-2 sm:gap-3">
                              <button
                                className="bg-blue-600 text-white py-1 sm:py-2 px-2 sm:px-4 rounded-lg font-medium text-xs sm:text-sm hover:bg-blue-700 transition-all duration-300 shadow-md"
                                onClick={() => openRoomModal(room)}
                              >
                                View Details
                              </button>
                              <button
                                className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-1 sm:py-2 px-2 sm:px-4 rounded-lg font-bold text-xs sm:text-sm hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg transform hover:scale-105"
                                onClick={() => handleHotelBookingClick(room, "hotel")}
                              >
                                Reserve Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {isRoomModalOpen && selectedRoom && (
                  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 sm:p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-3 sm:p-4 md:p-6 max-w-full sm:max-w-3xl w-full max-h-[85vh] overflow-y-auto border border-gray-200">
                      <div className="flex justify-between items-center mb-3 sm:mb-4 md:mb-6">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">{selectedRoom.name}</h3>
                        <button
                          onClick={closeRoomModal}
                          className="text-gray-600 hover:text-blue-600 text-lg sm:text-xl md:text-2xl"
                        >
                          <FaTimes />
                        </button>
                      </div>
                      <img
                        src={selectedRoom.images[mainImageIndexes[hotel.rooms.indexOf(selectedRoom)]] || "/placeholder.jpg"}
                        alt={selectedRoom.name}
                        className="w-full h-40 sm:h-48 md:h-60 object-cover rounded-lg mb-2 sm:mb-4"
                      />
                      <div className="flex gap-2 sm:gap-3 overflow-x-auto mb-2 sm:mb-4">
                        {selectedRoom.images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`Thumbnail ${i + 1}`}
                            className="w-12 sm:w-14 h-12 sm:h-14 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity duration-200"
                            onClick={() => handleThumbnailClick(hotel.rooms.indexOf(selectedRoom), i)}
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm md:text-base text-gray-600 mb-2 sm:mb-4">
                        <span className="flex items-center"><FaBed className="mr-2 text-blue-600" /> {selectedRoom.beds}</span>
                        <span className="flex items-center"><FaRulerCombined className="mr-2 text-blue-600" /> {selectedRoom.size}</span>
                        <span className="flex items-center"><FaUser className="mr-2 text-blue-600" /> {selectedRoom.capacity?.adults || 2} Adults</span>
                        <span className="flex items-center"><FaChild className="mr-2 text-blue-600" /> {selectedRoom.capacity?.children || 0} Children</span>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-2 sm:mb-4 leading-relaxed">
                        {selectedRoom.description || "A comfortable room designed for a relaxing stay with modern amenities."}
                      </p>
                      <ul className="space-y-2 sm:space-y-3">
                        {selectedRoom.features.map((feature, i) => (
                          <IncludedItem key={i} icon={<FaCheck />} text={feature} />
                        ))}
                      </ul>
                      <div className="flex justify-between items-center mt-2 sm:mt-4">
                        <span className="text-lg sm:text-xl md:text-2xl font-extrabold text-blue-700">{selectedRoom.price} <span className="text-xs sm:text-sm font-normal text-gray-600">/night</span></span>
                        <button
                          className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-bold text-xs sm:text-sm md:text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg transform hover:scale-105"
                          onClick={() => handleHotelBookingClick(selectedRoom, "hotel")}
                        >
                          Reserve Now
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* Amenities */}
              <section
                ref={(el) => { sectionRefs.current[2].current = el; amenitiesRef(el); }}
                id="amenities"
                className="bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6 border border-gray-200 mb-4 sm:mb-6"
              >
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 flex items-center">
                  <FaCheckCircle className="text-blue-600 mr-2 sm:mr-3 text-base sm:text-lg md:text-xl" /> Amenities
                </h2>
                <div className="p-3 sm:p-4 md:p-6 bg-gray-50 rounded-lg shadow-sm">
                  {hotel.amenities.map((category, index) => (
                    <div key={index} className="mb-4 sm:mb-6">
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">{category.name}</h3>
                      <ul className="space-y-2 sm:space-y-3">
                        {category.items.slice(0, 5).map((item, i) => (
                          <IncludedItem key={i} icon={getIconForAmenity(item)} text={item} />
                        ))}
                      </ul>
                      {category.items.length > 5 && (
                        <button
                          onClick={() => openModal(category)}
                          className="text-blue-600 text-xs sm:text-sm md:text-base font-medium hover:underline mt-2 sm:mt-3"
                        >
                          View All
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {isModalOpen && selectedCategory && (
                  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 sm:p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-3 sm:p-4 md:p-6 max-w-full sm:max-w-lg w-full max-h-[80vh] overflow-y-auto border border-gray-200">
                      <div className="flex justify-between items-center mb-3 sm:mb-4 md:mb-6">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">{selectedCategory.name}</h3>
                        <button
                          onClick={closeModal}
                          className="text-gray-600 hover:text-blue-600 text-lg sm:text-xl md:text-2xl"
                        >
                          <FaTimes />
                        </button>
                      </div>
                      <ul className="space-y-2 sm:space-y-3">
                        {selectedCategory.items.map((item, i) => (
                          <IncludedItem key={i} icon={getIconForAmenity(item)} text={item} />
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </section>

              {/* Rules */}
              <section
                ref={(el) => { sectionRefs.current[3].current = el; rulesRef(el); }}
                id="rules"
                className="bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6 border border-gray-200 mb-4 sm:mb-6"
              >
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 flex items-center">
                  <FaShieldAlt className="text-blue-600 mr-2 sm:mr-3 text-base sm:text-lg md:text-xl" /> House Rules
                </h2>
                <div className="p-3 sm:p-4 md:p-6 bg-gray-50 rounded-lg shadow-sm space-y-3 sm:space-y-4">
                  {hotel.rules.map((rule, index) => (
                    <div key={index} className="transition-all duration-200 hover:bg-blue-50 rounded-md p-2 sm:p-3">
                      <button
                        onClick={() => toggleRule(index)}
                        className="w-full flex justify-between items-center text-left"
                      >
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">{rule.name}</h3>
                        <span className="text-blue-600">
                          {expandedRules[index] ? <FaTimes /> : <FaCheck />}
                        </span>
                      </button>
                      {expandedRules[index] && (
                        <ul className="mt-2 sm:mt-3 space-y-2 sm:space-y-3 text-gray-600 text-xs sm:text-sm md:text-base">
                          {rule.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 sm:gap-3">
                              <FaCircle className="w-2 h-2 mt-1 sm:mt-1.5 text-blue-600" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Policies */}
              <section
                ref={(el) => { sectionRefs.current[4].current = el; policiesRef(el); }}
                id="policies"
                className="bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6 border border-gray-200 mb-4 sm:mb-6"
              >
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 flex items-center">
                  <FaShieldAlt className="text-blue-600 mr-2 sm:mr-3 text-base sm:text-lg md:text-xl" /> Policies
                </h2>
                <div className="p-3 sm:p-4 md:p-6 bg-gray-50 rounded-lg shadow-sm space-y-3 sm:space-y-4">
                  {hotel.policies.map((policy, index) => (
                    <div key={index} className="transition-all duration-200 hover:bg-blue-50 rounded-md p-2 sm:p-3">
                      <button
                        onClick={() => togglePolicy(index)}
                        className="w-full flex justify-between items-center text-left"
                      >
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">{policy.name}</h3>
                        <span className="text-blue-600">
                          {expandedPolicies[index] ? <FaTimes /> : <FaCheck />}
                        </span>
                      </button>
                      {expandedPolicies[index] && (
                        <ul className="mt-2 sm:mt-3 space-y-2 sm:space-y-3 text-gray-600 text-xs sm:text-sm md:text-base">
                          {policy.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 sm:gap-3">
                              <FaCircle className="w-2 h-2 mt-1 sm:mt-1.5 text-blue-600" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-xl p-3 sm:p-4 md:p-6 border border-blue-100">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 flex items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white p-2 sm:p-3 rounded-lg shadow-md">
                  <FaMapMarkerAlt className="mr-2 sm:mr-3 text-base sm:text-lg md:text-xl" /> Location
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  <iframe
                    src={hotel.location.mapImage}
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Hotel Location Map"
                    className="w-full rounded-lg shadow-md"
                  />
                  <div className="space-y-2 sm:space-y-3">
                    {hotel.location.description.map((para, index) => (
                      <p key={index} className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base font-medium bg-white p-2 sm:p-3 rounded-md shadow-sm">{para}</p>
                    ))}
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 bg-gradient-to-r from-blue-500 to-blue-700 text-white p-2 sm:p-3 rounded-lg shadow-md">Nearby Landmarks</h3>
                    {hotel.location.nearestLandmarks.map((landmark, index) => (
                      <div key={index} className="bg-white p-2 sm:p-3 rounded-md shadow-md hover:shadow-lg transition-all duration-200">
                        <IncludedItem icon={<FaMapMarkerAlt />} text={`${landmark.name} - ${landmark.distance}`} />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 bg-gradient-to-r from-blue-500 to-blue-700 text-white p-2 sm:p-3 rounded-lg shadow-md">Transportation</h3>
                    {hotel.location.transportation.map((transport, index) => (
                      <div key={index} className="bg-white p-2 sm:p-3 rounded-md shadow-md hover:shadow-lg transition-all duration-200">
                        <IncludedItem icon={<FaCarSide />} text={`${transport.name} - ${transport.distance}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {isLightboxOpen && (
        <Lightbox
          open={isLightboxOpen}
          close={() => closeLightbox()}
          slides={lightboxImages}
          index={lightboxImageIndex}
          on={{ index: ({ index }) => setLightboxImageIndex(index) }}
          styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.9)" } }}
        />
      )}
    </>
  );
}

export default DetailHotel;