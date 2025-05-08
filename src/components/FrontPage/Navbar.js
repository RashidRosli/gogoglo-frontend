import React, { useState, useEffect, useRef, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../AuthContext"; // Import useAuth

const Logo = () => (
  <Link to="/" className="flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-white"
      viewBox="0 0 10240 10240"
      aria-labelledby="logoTitle"
    >
      <title id="logoTitle">GoGoGlo Logo</title>
      <path
        d="M8284 9162 c-2 -207 -55 -427 -161 -667 -147 -333 -404 -644 -733 -886 -81 -59 -247 -169 -256 -169 -3 0 -18 -9 -34 -20 -26 -19 -344 -180 -354 -180 -3 0 -29 -11 -58 -24 -227 -101 -642 -225 -973 -290 -125 -25 -397 -70 -480 -80 -22 -3 -76 -9 -120 -15 -100 -13 -142 -17 -357 -36 -29 -2 -98 -7 -153 -10 -267 -15 -436 -28 -525 -40 -14 -2 -45 -7 -70 -10 -59 -8 -99 -14 -130 -20 -14 -3 -41 -7 -60 -11 -19 -3 -39 -7 -45 -8 -5 -2 -28 -6 -50 -10 -234 -45 -617 -165 -822 -257 -23 -10 -45 -19 -48 -19 -7 0 -284 -138 -340 -170 -631 -355 -1107 -842 -1402 -1432 -159 -320 -251 -633 -308 -1056 -26 -190 -27 -635 -1 -832 3 -19 7 -59 10 -89 4 -30 11 -84 17 -120 6 -36 12 -77 14 -91 7 -43 33 -174 39 -190 3 -8 7 -28 9 -45 6 -35 52 -221 72 -285 7 -25 23 -79 35 -120 29 -99 118 -283 189 -389 67 -103 203 -244 286 -298 75 -49 178 -103 196 -103 16 0 27 16 77 110 124 231 304 529 485 800 82 124 153 227 157 230 3 3 28 36 54 74 116 167 384 497 546 671 148 160 448 450 560 542 14 12 54 45 90 75 88 73 219 172 313 238 42 29 77 57 77 62 0 5 -13 34 -29 66 -69 137 -149 405 -181 602 -7 41 -14 82 -15 90 -1 8 -6 46 -10 83 -3 37 -8 77 -10 88 -2 11 -7 65 -11 122 -3 56 -8 104 -9 107 -2 3 0 12 5 19 6 10 10 8 15 -10 10 -34 167 -346 228 -454 118 -210 319 -515 340 -515 4 0 40 18 80 40 230 128 521 255 787 343 118 40 336 102 395 113 28 5 53 11 105 23 25 5 59 12 75 15 17 3 41 8 55 11 34 7 274 43 335 50 152 18 372 29 565 29 194 0 481 -11 489 -19 2 -3 -3 -6 -12 -6 -9 -1 -20 -2 -24 -3 -33 -8 -73 -16 -98 -21 -61 -10 -264 -56 -390 -90 -649 -170 -1243 -437 -1770 -794 -60 -41 -121 -82 -134 -93 l-24 -18 124 -59 c109 -52 282 -116 404 -149 92 -26 192 -51 220 -55 17 -3 64 -12 105 -21 71 -14 151 -28 230 -41 19 -3 46 -7 60 -10 14 -2 45 -7 70 -10 25 -4 56 -8 70 -10 14 -2 53 -7 88 -10 35 -4 71 -8 81 -10 10 -2 51 -6 92 -9 101 -9 141 -14 147 -21 3 -3 -15 -5 -39 -6 -24 0 -52 -2 -62 -4 -21 -4 -139 -12 -307 -22 -242 -14 -700 -7 -880 13 -41 4 -187 27 -250 39 -125 23 -274 68 -373 111 -43 19 -81 34 -86 34 -4 0 -16 -8 -27 -17 -10 -10 -37 -33 -59 -52 -166 -141 -422 -395 -592 -586 -228 -257 -536 -672 -688 -925 -21 -36 -43 -66 -47 -68 -4 -2 -8 -7 -8 -11 0 -5 -24 -48 -54 -97 -156 -261 -493 -915 -480 -935 2 -3 47 -21 101 -38 54 -18 107 -36 118 -41 58 -25 458 -138 640 -181 118 -27 126 -29 155 -35 14 -2 45 -9 70 -14 66 -15 137 -28 300 -55 37 -7 248 -33 305 -39 28 -3 84 -9 125 -13 163 -16 792 -8 913 12 12 2 58 9 102 15 248 35 423 76 665 157 58 19 134 46 170 60 86 33 344 156 348 166 2 4 8 7 13 7 14 0 205 116 303 184 180 126 287 216 466 396 282 281 511 593 775 1055 43 75 178 347 225 455 100 227 236 602 286 790 59 220 95 364 120 485 6 28 45 245 50 275 2 14 7 41 10 60 3 19 8 49 10 65 2 17 6 46 9 65 15 100 35 262 40 335 3 39 8 89 10 112 22 225 33 803 21 1043 -3 41 -7 129 -11 195 -3 66 -8 136 -10 155 -2 19 -6 76 -10 125 -3 50 -8 101 -10 115 -2 14 -6 57 -10 95 -7 72 -12 113 -20 175 -2 19 -7 55 -10 80 -6 46 -43 295 -51 340 -2 14 -9 54 -15 90 -5 36 -16 97 -24 135 -8 39 -17 84 -20 100 -12 68 -18 97 -50 248 -19 87 -47 204 -61 260 -14 56 -27 109 -29 117 -30 147 -232 810 -253 832 -4 4 -7 -23 -8 -60z"
      />
    </svg>
    <span className="ml-3 text-2xl font-bold text-white">GoGoGlo</span>
    <span className="sr-only">GoGoGlo - Adventure Travel Agency</span>
  </Link>
);

const Button = ({ children, variant = "primary", href, size = "sm", icon, onClick }) => {
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-transparent border border-white hover:bg-white/10 text-white",
  };
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
  };
  const icons = {
    "sign-in": (
      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7 3a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1zm0 5a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1zm-7 4a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    "user-plus": (
      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zm0 2a6 6 0 016 6v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-1a6 6 0 016-6zm8-4a1 1 0 011 1v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2h-2a1 1 0 110-2h2V8a1 1 0 011-1z" />
      </svg>
    ),
  };

  return href ? (
    <Link
      to={href}
      className={`${variants[variant]} ${sizes[size]} rounded-full flex items-center justify-center transition-colors duration-200`}
    >
      {icon && icons[icon]} {children}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={`${variants[variant]} ${sizes[size]} rounded-full flex items-center justify-center transition-colors duration-200`}
    >
      {icon && icons[icon]} {children}
    </button>
  );
};

function Navbar({ transparent = false }) {
  const { isLoggedIn, token, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef();
  const userMenuRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(location.pathname === "/" && window.scrollY > 50);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [location]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log("Logout initiated");
    logout(); // Uses logoutWithRedirect from useAuth
    console.log("useAuth logout called");
    setIsUserMenuOpen(false);
    console.log("User menu closed");
  };

  const userRole = token ? jwtDecode(token).role : null;

  const userMenuItems = userRole === "superadmin"
    ? [
      { label: "Dashboard", link: "/admin-dashboard" },
      { label: "Profile", link: "/profile" },
      { label: "Sign Out", onClick: handleLogout },
    ]
    : [
      { label: "Profile", link: "/profile" },
      { label: "Sign Out", onClick: handleLogout },
    ];

  const isHomeRoute = location.pathname === "/";
  const positionClass = isHomeRoute ? "fixed top-0" : "relative";
  const bgClass = isHomeRoute && transparent && !isSticky ? "bg-transparent" : "bg-blue-600 shadow-lg";

  return (
    <nav className={`w-full z-50 transition-all duration-300 ${positionClass} ${bgClass}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        {location.pathname !== "/booking" && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-blue-200 focus:outline-none"
            aria-label="Toggle Mobile Menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        )}
        {location.pathname !== "/booking" && (
          <div className="hidden lg:flex items-center space-x-6">
            {isLoggedIn ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center text-white hover:text-blue-200 focus:outline-none"
                >
                  <span className="mr-2">User</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.link}
                        onClick={item.onClick || (() => setIsUserMenuOpen(false))}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button variant="secondary" href="/login" icon="sign-in">Sign In</Button>
                <Button variant="primary" href="/register" icon="user-plus">Create Account</Button>
              </>
            )}
          </div>
        )}
      </div>
      {isMobileMenuOpen && location.pathname !== "/booking" && (
        <Transition
          show={isMobileMenuOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <div ref={mobileMenuRef} className="lg:hidden bg-blue-600 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {isLoggedIn ? (
                userMenuItems.map((item) => (
                  <Button
                    key={item.label}
                    variant="secondary"
                    href={item.link}
                    onClick={item.onClick || (() => setIsMobileMenuOpen(false))}
                  >
                    {item.label}
                  </Button>
                ))
              ) : (
                <>
                  <Button variant="secondary" href="/login" icon="sign-in">Sign In</Button>
                  <Button variant="primary" href="/register" icon="user-plus">Create Account</Button>
                </>
              )}
            </div>
          </div>
        </Transition>
      )}
    </nav>
  );
}

export default Navbar;