import React, { useState, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Destinations data with unique IDs
const destinationsData = [
  {
    id: "1",
    city: "Manila",
    accommodations: 13223,
    imageUrl: "https://images.pexels.com/photos/1364557/pexels-photo-1364557.jpeg",
  },
  {
    id: "2",
    city: "Jakarta",
    accommodations: 14249,
    imageUrl: "https://images.pexels.com/photos/2121639/pexels-photo-2121639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "3",
    city: "Bangkok",
    accommodations: 12048,
    imageUrl: "https://images.pexels.com/photos/1004366/pexels-photo-1004366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "4",
    city: "Las Vegas (NV)",
    accommodations: 1113,
    imageUrl: "https://images.pexels.com/photos/18041018/pexels-photo-18041018/free-photo-of-las-vegas-illuminated-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "5",
    city: "Cebu",
    accommodations: 5254,
    imageUrl: "https://images.pexels.com/photos/2524366/pexels-photo-2524366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

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

// Modern Skeleton Loader
const DestinationSkeleton = () => (
  <div className="px-3">
    <div className="bg-gray-100 rounded-2xl shadow-md h-[24rem] animate-pulse overflow-hidden">
      <div className="h-72 w-full bg-gray-200 rounded-t-2xl"></div>
      <div className="p-4 space-y-4">
        <div className="h-6 w-2/3 bg-gray-300 rounded-full mx-auto"></div>
        <div className="h-10 w-32 bg-gray-300 rounded-full mx-auto"></div>
      </div>
    </div>
  </div>
);

const DestinationCarousel = () => {
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
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  }), []);

  return (
    <div className="relative w-full overflow-hidden py-6">
      <Slider {...settings} className="destination-carousel">
        {isLoading
          ? Array(5).fill().map((_, i) => <DestinationSkeleton key={i} />)
          : destinationsData.map((destination) => (
              <div key={destination.id} className="px-3">
                <div className="relative bg-white rounded-2xl shadow-md h-[24rem] overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
                  <div className="relative">
                    <img
                      src={destination.imageUrl}
                      alt={`${destination.city} destination`}
                      className="w-full h-72 object-cover rounded-t-2xl"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent rounded-t-2xl"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-xl font-bold drop-shadow-md">{destination.city}</h3>
                      <p className="text-sm font-medium drop-shadow-sm">
                        {destination.accommodations.toLocaleString()} accommodations
                      </p>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <a
                      href={`/destination?city=${encodeURIComponent(destination.city)}`}
                      className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 px-6 rounded-full shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95"
                      aria-label={`Explore ${destination.city}`}
                    >
                      Explore
                    </a>
                  </div>
                </div>
              </div>
            ))}
      </Slider>
    </div>
  );
};

export default DestinationCarousel;