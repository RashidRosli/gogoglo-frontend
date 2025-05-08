import React, { useState, useRef, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Centralized offers data with unique IDs
const offersData = {
    bankOffers: [
        {
            id: "1",
            category: "Bank Offers",
            title: "MMTBLACK SPECIAL: FLAT ₹150 OFF*",
            description: "on Bus Tickets.",
            code: "MMTBLACK",
            imageUrl: "https://images.pexels.com/photos/7957750/pexels-photo-7957750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            link: "#",
        },
        {
            id: "2",
            category: "Domestic Flights",
            title: "IndiGo's Business Class Seats: Stretch & Stretch+",
            description: "with FLAT ₹1000 OFF* on flights b/w Delhi & Mumbai",
            code: null,
            imageUrl: "https://images.pexels.com/photos/5625046/pexels-photo-5625046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            link: "#",
        },
    ],
    flights: [
        {
            id: "3",
            category: "Bus Offers",
            title: "MMTBLACK SPECIAL: FLAT ₹150 OFF*",
            description: "on Bus Tickets.",
            code: "MMTBLACK",
            imageUrl: "https://images.pexels.com/photos/7957753/pexels-photo-7957753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            link: "#",
        },
        {
            id: "4",
            category: "Domestic Flights",
            title: "IndiGo's Business Class Seats: Stretch & Stretch+",
            description: "with FLAT ₹1000 OFF* on flights b/w Delhi & Mumbai",
            code: null,
            imageUrl: "https://images.pexels.com/photos/7957748/pexels-photo-7957748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            link: "#",
        },
    ],
    holidays: [
        {
            id: "5",
            category: "Bus Offers",
            title: "MMTBLACK SPECIAL: FLAT ₹150 OFF*",
            description: "on Bus Tickets.",
            code: "MMTBLACK",
            imageUrl: "https://images.pexels.com/photos/7957754/pexels-photo-7957754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            link: "#",
        },
        {
            id: "6",
            category: "Domestic Flights",
            title: "IndiGo's Business Class Seats: Stretch & Stretch+",
            description: "with FLAT ₹1000 OFF* on flights b/w Delhi & Mumbai",
            code: null,
            imageUrl: "https://images.pexels.com/photos/7957752/pexels-photo-7957752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            link: "#",
        },
    ],
};

// Combine all offers for the 'all' tab
const allOffers = Object.values(offersData).flat();

function NextArrow({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Next Slide"
        >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
        </button>
    );
}

function PrevArrow({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Previous Slide"
        >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
        </button>
    );
}

// Skeleton Loader for individual slide
const OfferSkeleton = () => (
    <div className="px-2 pb-2">
        <div className="bg-gray-100 rounded-lg shadow-lg h-[28rem] animate-pulse flex flex-col">
            <div className="p-4 space-y-4">
                <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
                <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
            </div>
            <div className="mt-auto mx-4 mb-4 h-10 w-32 bg-gray-300 rounded"></div>
            <div className="h-48 w-full bg-gray-300"></div>
        </div>
    </div>
);

const OffersCarousel = () => {
    const [activeTab, setActiveTab] = useState("all");
    const sliderRefs = useRef({});
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading (remove if using real data fetching)
    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const settings = useMemo(() => ({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    }), []);

    const getOffers = (tab) => (tab === "all" ? allOffers : offersData[tab]);

    const tabs = ["all", ...Object.keys(offersData)];

    return (
        <div className="relative w-full overflow-hidden py-2">
            {/* Tabs */}
            <div className="mb-6 flex flex-wrap gap-2">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        aria-label={`Show ${tab} offers`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, " $1").trim()}
                    </button>
                ))}
            </div>

            {/* Carousel */}
            {tabs.map((tab) => (
                <div key={tab} className={activeTab === tab ? "block" : "hidden"}>
                    <Slider {...settings} ref={(slider) => (sliderRefs.current[tab] = slider)}>
                        {isLoading
                            ? Array(3).fill().map((_, i) => <OfferSkeleton key={i} />)
                            : getOffers(tab).map((offer) => (
                                <div key={offer.id} className="px-2 pb-2">
                                    <div className="bg-white rounded-lg shadow-lg h-[28rem] flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                        <div className="p-4 flex-grow flex flex-col">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-gray-600">{offer.category}</span>
                                                {offer.code && (
                                                    <span className="text-xs font-medium text-blue-500">T&Cs Apply</span>
                                                )}
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{offer.title}</h3>
                                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{offer.description}</p>
                                            {offer.code && (
                                                <p className="text-sm font-medium text-gray-700">Code: <span className="text-blue-600">{offer.code}</span></p>
                                            )}
                                        </div>
                                        <a
                                            href={offer.link}
                                            className="mx-4 mb-4 bg-blue-600 text-white text-center font-semibold py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            aria-label={`Book ${offer.title}`}
                                        >
                                            Book Now
                                        </a>
                                        <div className="relative">
                                            <img
                                                src={offer.imageUrl}
                                                alt={offer.title}
                                                className="w-full h-48 object-cover"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
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

export default OffersCarousel;