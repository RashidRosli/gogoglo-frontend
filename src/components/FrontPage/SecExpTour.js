import React, { useState, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './css/SecExpTour.css'; // Ensure this file exists or remove if not needed

// Centralized destinations data with unique IDs (unchanged)
const destinationsData = {
  beach: [
    {
      id: "b1",
      city: "Miami",
      region: "Florida",
      country: "USA",
      imageUrl: "https://images.pexels.com/photos/105950/pexels-photo-105950.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "b2",
      city: "Honolulu",
      region: "Oahu (Island)",
      country: "USA",
      imageUrl: "https://images.pexels.com/photos/4321095/pexels-photo-4321095.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "b3",
      city: "El Nido",
      region: "Palawan",
      country: "Philippines",
      imageUrl: "https://images.pexels.com/photos/1052198/pexels-photo-1052198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "b4",
      city: "Tulum",
      region: "Quintana Roo",
      country: "Mexico",
      imageUrl: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ],
  culture: [
    {
      id: "c1",
      city: "Opuwo",
      region: "Kunene Region",
      country: "Namibia",
      imageUrl: "https://images.pexels.com/photos/2600339/pexels-photo-2600339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "c2",
      city: "Auckland",
      region: "North Island and South Island",
      country: "New Zealand",
      imageUrl: "https://images.pexels.com/photos/5541433/pexels-photo-5541433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "c3",
      city: "Karasjok",
      region: "Sápmi",
      country: "Norway",
      imageUrl: "https://images.pexels.com/photos/3019893/pexels-photo-3019893.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "c4",
      city: "Tahoua",
      region: "Sahel",
      country: "Niger",
      imageUrl: "https://images.pexels.com/photos/11217229/pexels-photo-11217229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ],
  ski: [
    {
      id: "s1",
      city: "Whistler",
      region: "British Columbia",
      country: "Canada",
      imageUrl: "https://images.pexels.com/photos/11568270/pexels-photo-11568270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "s2",
      city: "Zermatt",
      region: "Valais",
      country: "Switzerland",
      imageUrl: "https://images.pexels.com/photos/8430872/pexels-photo-8430872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "s3",
      city: "Aspen",
      region: "Colorado",
      country: "USA",
      imageUrl: "https://images.pexels.com/photos/13599838/pexels-photo-13599838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "s4",
      city: "Niseko",
      region: "Hokkaido",
      country: "Japan",
      imageUrl: "https://images.pexels.com/photos/20895481/pexels-photo-20895481/free-photo-of-view-of-mountains-in-winter.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ],
  family: [
    {
      id: "f1",
      city: "Breckenridge",
      region: "Colorado",
      country: "USA",
      imageUrl: "https://images.pexels.com/photos/19841481/pexels-photo-19841481/free-photo-of-person-with-snowboard-on-back-standing-on-mountain-in-colorado-usa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "f2",
      city: "Park City",
      region: "Utah",
      country: "USA",
      imageUrl: "https://images.pexels.com/photos/248214/pexels-photo-248214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "f3",
      city: "Les Gets",
      region: "Auvergne-Rhône-Alpes",
      country: "France",
      imageUrl: "https://images.pexels.com/photos/1953542/pexels-photo-1953542.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "f4",
      city: "Saalbach-Hinterglemm",
      region: "Salzburg",
      country: "Austria",
      imageUrl: "https://images.pexels.com/photos/2026383/pexels-photo-2026383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ],
  wellness: [
    {
      id: "w1",
      city: "Narendra Nagar",
      region: "Uttarakhand",
      country: "India",
      imageUrl: "https://images.pexels.com/photos/20035462/pexels-photo-20035462/free-photo-of-elderly-woman-meditating-in-front-of-a-statue-of-parvati-on-the-ganges.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "w2",
      city: "San Marcos",
      region: "California",
      country: "USA",
      imageUrl: "https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "w3",
      city: "Sedona",
      region: "Arizona",
      country: "USA",
      imageUrl: "https://images.pexels.com/photos/3279885/pexels-photo-3279885.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "w4",
      city: "Alicante",
      region: "Valencia",
      country: "Spain",
      imageUrl: "https://images.pexels.com/photos/204546/pexels-photo-204546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ],
};

function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 right-6 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Next Destination"
    >
      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

function PrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-6 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Previous Destination"
    >
      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

// Skeleton Loader
const TourSkeleton = () => (
  <div className="px-3">
    <div className="bg-gray-100 rounded-2xl shadow-md h-[20rem] animate-pulse overflow-hidden">
      <div className="h-full w-full bg-gray-200 rounded-2xl"></div>
    </div>
  </div>
);

const ExploreTour = () => {
  const [activeTab, setActiveTab] = useState("beach");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const settings = useMemo(() => ({
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  }), []);

  const tabs = Object.keys(destinationsData);

  return (
    <div className="relative w-full overflow-hidden py-8 bg-gray-100 dark:bg-gray-800 rounded-xl">
      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-3 px-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === tab
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-label={`Show ${tab} destinations`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Carousel */}
      {tabs.map((tab) => (
        <div key={tab} className={activeTab === tab ? "block" : "hidden"}>
          <Slider {...settings} className="px-6">
            {isLoading
              ? Array(4).fill().map((_, i) => <TourSkeleton key={i} />)
              : destinationsData[tab].map((destination) => (
                  <div key={destination.id} className="px-3">
                    <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-md h-[20rem] overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
                      <img
                        src={destination.imageUrl}
                        alt={`${destination.city}, ${destination.region}, ${destination.country}`}
                        className="w-full h-full object-cover rounded-2xl"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent rounded-2xl"></div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-lg font-bold drop-shadow-md">{destination.city}</h3>
                        <p className="text-sm font-medium drop-shadow-sm">
                          {destination.region}, {destination.country}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
          </Slider>
        </div>
      ))}
    </div>
  );
};

export default ExploreTour;