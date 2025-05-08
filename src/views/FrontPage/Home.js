import React, { Suspense, lazy } from "react";
import background1 from "assets/img/banner-home.png";

// Lazy load components
const Navbar = lazy(() => import("components/FrontPage/Navbar.js"));
const Footer = lazy(() => import("components/FrontPage/Footer.js"));
const SearchBar = lazy(() => import("components/FrontPage/SearchForm.js"));
const FavDestination = lazy(() => import("components/FrontPage/SecFavDestination.js"));
const ExpTour = lazy(() => import("components/FrontPage/SecExpTour.js"));
const Offers = lazy(() => import("components/FrontPage/SecOffers.js"));
const TourPackage = lazy(() => import("components/FrontPage/SecTourPkg.js"));

// Custom Loading Component
const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-100/80 backdrop-blur-sm z-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-lg font-semibold text-gray-700 animate-pulse">Loading Your Adventure...</p>
    </div>
  </div>
);

// Skeleton Component for Sections
const SectionSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
      ))}
    </div>
  </div>
);

// Section Header Component
const SectionHeader = ({ title, subtitle, isWhite = false }) => (
  <div className="w-full lg:w-6/12 px-4">
    <h2 className={`text-3xl md:text-4xl font-bold ${isWhite ? 'text-white' : 'text-gray-900'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`mt-2 text-sm ${isWhite ? 'text-gray-200' : 'text-gray-600'}`}>
        {subtitle}
      </p>
    )}
  </div>
);

export default function Landing() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Navbar transparent />
      <main className="antialiased">
        {/* Hero Section */}
        <div
          className="relative flex items-center justify-center min-h-[60vh] bg-gray-900 z-10"
          style={{ backgroundImage: `url(${background1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-black/70 z-0" />
          <div className="container relative z-10 mx-auto px-4 py-16">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-6 transition-all duration-300">
                GoGoGlo: <span className="block">Explore. Discover. Book.</span>
              </h1>
              <Suspense fallback={<div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>}>
                <SearchBar />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Offers Section */}
        <section className="py-16 bg-white relative z-[5]">
          <div className="container mx-auto px-4">
            <SectionHeader title="Offers & Promotions" />
            <div className="mt-12">
              <Suspense fallback={<SectionSkeleton />}>
                <Offers />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <SectionHeader title="Popular Destinations" />
            <div className="mt-12 mb-10">
              <Suspense fallback={<SectionSkeleton />}>
                <FavDestination />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Tour Packages */}
        <section className="py-16 bg-gray-900 relative">
          <div className="absolute inset-x-0 top-0 h-24 -mt-24">
            <svg
              className="absolute bottom-0 w-full h-full text-gray-900"
              preserveAspectRatio="none"
              viewBox="0 0 2560 100"
            >
              <polygon points="2560 0 2560 100 0 100" fill="currentColor" />
            </svg>
          </div>
          <div className="container mx-auto px-4 pt-12">
            <SectionHeader
              title="Explore Holiday Packages"
              subtitle="Prices found in the past 48 hours, based on two adults travelling. Click for updated prices."
              isWhite
            />
            <div className="mt-12">
              <Suspense fallback={<SectionSkeleton />}>
                <TourPackage />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Explore Tours */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <SectionHeader title="Explore Tours in Popular Destinations" />
            <div className="mt-12">
              <Suspense fallback={<SectionSkeleton />}>
                <ExpTour />
              </Suspense>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Suspense>
  );
}