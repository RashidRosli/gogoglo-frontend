import React, { useState, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

// Centralized packages data with unique IDs
const packagesData = {
  Rome: [
    {
      id: "r1",
      destination: "Rome",
      hotel: "Hotel de Russie",
      rating: "5 stars",
      airport: "KUL-FCO",
      discount: "RM 1,200 off",
      price: "RM 4,800",
      originalPrice: "RM 6,000",
      travelDate: "Tue, 10 Dec - Mon, 16 Dec",
      nights: 6,
      imageUrl: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "r2",
      destination: "Rome",
      hotel: "The St. Regis Rome",
      rating: "5 stars",
      airport: "KUL-FCO",
      discount: "RM 850 off",
      price: "RM 4,150",
      originalPrice: "RM 5,000",
      travelDate: "Fri, 3 Jan - Thu, 9 Jan",
      nights: 6,
      imageUrl: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "r3",
      destination: "Rome",
      hotel: "J.K. Place Roma",
      rating: "5 stars",
      airport: "KUL-FCO",
      discount: "RM 700 off",
      price: "RM 3,800",
      originalPrice: "RM 4,500",
      travelDate: "Sun, 12 Jan - Sat, 18 Jan",
      nights: 6,
      imageUrl: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "r4",
      destination: "Rome",
      hotel: "Hotel Artemide",
      rating: "4 stars",
      airport: "KUL-FCO",
      discount: "RM 350 off",
      price: "RM 2,150",
      originalPrice: "RM 2,500",
      travelDate: "Wed, 22 Jan - Tue, 28 Jan",
      nights: 6,
      imageUrl: "https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "r5",
      destination: "Rome",
      hotel: "Hotel Indigo Rome - St. George",
      rating: "4 stars",
      airport: "KUL-FCO",
      discount: "RM 200 off",
      price: "RM 1,300",
      originalPrice: "RM 1,500",
      travelDate: "Sat, 1 Feb - Fri, 7 Feb",
      nights: 6,
      imageUrl: "https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ],
  Bangkok: [
    {
      id: "b1",
      destination: "Bangkok",
      hotel: "The Okura Prestige Bangkok",
      rating: "5 stars",
      airport: "KUL-BKK",
      discount: "RM 950 off",
      price: "RM 3,800",
      originalPrice: "RM 4,750",
      travelDate: "Mon, 9 Dec - Sun, 15 Dec",
      nights: 6,
      imageUrl: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "b2",
      destination: "Bangkok",
      hotel: "Mandarin Oriental Bangkok",
      rating: "5 stars",
      airport: "KUL-BKK",
      discount: "RM 1,100 off",
      price: "RM 4,400",
      originalPrice: "RM 5,500",
      travelDate: "Thu, 2 Jan - Wed, 8 Jan",
      nights: 6,
      imageUrl: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "b3",
      destination: "Bangkok",
      hotel: "Siam Kempinski Hotel Bangkok",
      rating: "5 stars",
      airport: "KUL-BKK",
      discount: "RM 800 off",
      price: "RM 3,200",
      originalPrice: "RM 4,000",
      travelDate: "Sat, 11 Jan - Fri, 17 Jan",
      nights: 6,
      imageUrl: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "b4",
      destination: "Bangkok",
      hotel: "Amara Bangkok Hotel",
      rating: "4 stars",
      airport: "KUL-BKK",
      discount: "RM 400 off",
      price: "RM 1,600",
      originalPrice: "RM 2,000",
      travelDate: "Tue, 21 Jan - Mon, 27 Jan",
      nights: 6,
      imageUrl: "https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "b5",
      destination: "Bangkok",
      hotel: "Novotel Bangkok Sukhumvit 20",
      rating: "4 stars",
      airport: "KUL-BKK",
      discount: "RM 250 off",
      price: "RM 1,000",
      originalPrice: "RM 1,250",
      travelDate: "Fri, 31 Jan - Thu, 6 Feb",
      nights: 6,
      imageUrl: "https://images.pexels.com/photos/2507007/pexels-photo-2507007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ],
  Langkawi: [
    {
      id: "l1",
      destination: "Langkawi",
      hotel: "The Datai Langkawi",
      rating: "5 stars",
      airport: "KUL-LGK",
      discount: "RM 1,500 off",
      price: "RM 6,000",
      originalPrice: "RM 7,500",
      travelDate: "Tue, 17 Dec - Mon, 23 Dec",
      nights: 6,
      imageUrl: "https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "l2",
      destination: "Langkawi",
      hotel: "The Ritz-Carlton, Langkawi",
      rating: "5 stars",
      airport: "KUL-LGK",
      discount: "RM 1,300 off",
      price: "RM 5,200",
      originalPrice: "RM 6,500",
      travelDate: "Fri, 27 Dec - Thu, 2 Jan",
      nights: 6,
      imageUrl: "https://images.pexels.com/photos/2598638/pexels-photo-2598638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "l3",
      destination: "Langkawi",
      hotel: "Four Seasons Resort Langkawi",
      rating: "5 stars",
      airport: "KUL-LGK",
      discount: "RM 1,000 off",
      price: "RM 4,000",
      originalPrice: "RM 5,000",
      travelDate: "Sun, 5 Jan - Sat, 11 Jan",
      nights: 6,
      imageUrl: "https://images.pexels.com/photos/2290753/pexels-photo-2290753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "l4",
      destination: "Langkawi",
      hotel: "Pelangi Beach Resort & Spa, Langkawi",
      rating: "4 stars",
      airport: "KUL-LGK",
      discount: "RM 500 off",
      price: "RM 2,000",
      originalPrice: "RM 2,500",
      travelDate: "Wed, 15 Jan - Tue, 21 Jan",
      nights: 6,
      imageUrl: "https://images.pexels.com/photos/751268/pexels-photo-751268.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "l5",
      destination: "Langkawi",
      hotel: "Casa del Mar, Langkawi",
      rating: "4 stars",
      airport: "KUL-LGK",
      discount: "RM 350 off",
      price: "RM 1,400",
      originalPrice: "RM 1,750",
      travelDate: "Sat, 25 Jan - Fri, 31 Jan",
      nights: 6,
      imageUrl: "https://images.pexels.com/photos/2291636/pexels-photo-2291636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ],
  Tokyo: [
    {
      id: "t1",
      destination: "Tokyo",
      hotel: "Imperial Hotel",
      rating: "5 stars",
      airport: "KUL-NRT",
      discount: "RM 1,800 off",
      price: "RM 7,200",
      originalPrice: "RM 9,000",
      travelDate: "Wed, 18 Dec - Tue, 24 Dec",
      nights: 6,
      imageUrl: "https://images.pexels.com/photos/1082326/pexels-photo-1082326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "t2",
      destination: "Tokyo",
      hotel: "Park Hyatt Tokyo",
      rating: "5 stars",
      airport: "KUL-HND",
      discount: "RM 1,600 off",
      price: "RM 6,400",
      originalPrice: "RM 8,000",
      travelDate: "Sat, 28 Dec - Fri, 3 Jan",
      nights: 6,
      imageUrl: "https://images.pexels.com/photos/600622/pexels-photo-600622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "t3",
      destination: "Tokyo",
      hotel: "Mandarin Oriental Tokyo",
      rating: "5 stars",
      airport: "KUL-NRT",
      discount: "RM 1,400 off",
      price: "RM 5,600",
      originalPrice: "RM 7,000",
      travelDate: "Mon, 6 Jan - Sun, 12 Jan",
      nights: 6,
      imageUrl: "https://images.pexels.com/photos/28865192/pexels-photo-28865192/free-photo-of-modern-hotel-lounge-with-scenic-city-view.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "t4",
      destination: "Tokyo",
      hotel: "Keio Plaza Hotel Tokyo",
      rating: "4 stars",
      airport: "KUL-HND",
      discount: "RM 700 off",
      price: "RM 2,800",
      originalPrice: "RM 3,500",
      travelDate: "Thu, 16 Jan - Wed, 22 Jan",
      nights: 6,
      imageUrl: "https://images.pexels.com/photos/29476042/pexels-photo-29476042/free-photo-of-illuminated-bellagio-hotel-at-night-in-las-vegas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: "t5",
      destination: "Tokyo",
      hotel: "Hotel Gracery Shinjuku",
      rating: "4 stars",
      airport: "KUL-NRT",
      discount: "RM 500 off",
      price: "RM 2,000",
      originalPrice: "RM 2,500",
      travelDate: "Sun, 26 Jan - Sat, 1 Feb",
      nights: 6,
      imageUrl: "https://images.pexels.com/photos/261411/pexels-photo-261411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ],
};

function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 right-6 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Next Package"
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
      aria-label="Previous Package"
    >
      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

// Skeleton Loader
const PackageSkeleton = () => (
  <div className="px-3">
    <div className="bg-gray-100 rounded-2xl shadow-md h-[30rem] animate-pulse overflow-hidden">
      <div className="h-48 w-full bg-gray-200 rounded-t-2xl"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 w-1/4 bg-gray-300 rounded-full"></div>
        <div className="h-6 w-3/4 bg-gray-300 rounded-full"></div>
        <div className="h-4 w-1/2 bg-gray-300 rounded-full"></div>
        <div className="h-4 w-1/3 bg-gray-300 rounded-full"></div>
        <div className="h-4 w-2/3 bg-gray-300 rounded-full"></div>
        <div className="h-6 w-1/2 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  </div>
);

const PackagesCarousel = () => {
  const [activeTab, setActiveTab] = useState("Rome");
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

  const tabs = Object.keys(packagesData);

  return (
    <div className="relative w-full overflow-hidden py-8 bg-gray-50 dark:bg-gray-900 rounded-xl">
      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-3 px-6">
        {tabs.map((city) => (
          <button
            key={city}
            onClick={() => setActiveTab(city)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === city
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-label={`Show packages for ${city}`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Carousel */}
      {tabs.map((city) => (
        <div key={city} className={activeTab === city ? "block" : "hidden"}>
          <Slider {...settings} className="px-6">
            {isLoading
              ? Array(4).fill().map((_, i) => <PackageSkeleton key={i} />)
              : packagesData[city].map((pkg) => (
                  <div key={pkg.id} className="px-3">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md h-[30rem] overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
                      <div className="relative">
                        <img
                          src={pkg.imageUrl}
                          alt={`${pkg.hotel} in ${pkg.destination}`}
                          className="w-full h-48 object-cover rounded-t-2xl"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent rounded-t-2xl"></div>
                        <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
                          VIP Access
                        </div>
                      </div>
                      <div className="p-4 flex flex-col h-[calc(100%-12rem)]">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">
                          {pkg.hotel} + Flight
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{pkg.destination}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">{pkg.rating}</p>
                        <div className="flex items-center mb-2">
                          <svg className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                          </svg>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{pkg.airport}</span>
                        </div>
                        <p className="text-red-500 dark:text-red-400 font-semibold text-sm mb-2">{pkg.discount}</p>
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-lg font-bold text-gray-800 dark:text-white">{pkg.price}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">{pkg.originalPrice}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">per traveller ({pkg.nights} nights)</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">{pkg.travelDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
          </Slider>
        </div>
      ))}

      {/* See All Link */}
      <div className="text-center mt-6">
        <Link
          to="/packages"
          className="text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-colors duration-300"
          aria-label="See all holiday packages"
        >
          See all packages
        </Link>
      </div>
    </div>
  );
};

export default PackagesCarousel;