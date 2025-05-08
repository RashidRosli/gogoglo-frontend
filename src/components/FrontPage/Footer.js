import React, { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { debounce } from "lodash";
import { toast } from "react-toastify";

// Logo Component
const Logo = () => (
  <Link to="/" className="flex items-center justify-center md:justify-start">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-gray-900 dark:text-gray-200"
      viewBox="0 0 10240 10240"
      aria-labelledby="logoTitle"
    >
      <title id="logoTitle">GoGoGlo Logo</title>
      <path
        d="M8284 9162 c-2 -207 -55 -427 -161 -667 -147 -333 -404 -644 -733 -886 -81 -59 -247 -169 -256 -169 -3 0 -18 -9 -34 -20 -26 -19 -344 -180 -354 -180 -3 0 -29 -11 -58 -24 -227 -101 -642 -225 -973 -290 -125 -25 -397 -70 -480 -80 -22 -3 -76 -9 -120 -15 -100 -13 -142 -17 -357 -36 -29 -2 -98 -7 -153 -10 -267 -15 -436 -28 -525 -40 -14 -2 -45 -7 -70 -10 -59 -8 -99 -14 -130 -20 -14 -3 -41 -7 -60 -11 -19 -3 -39 -7 -45 -8 -5 -2 -28 -6 -50 -10 -234 -45 -617 -165 -822 -257 -23 -10 -45 -19 -48 -19 -7 0 -284 -138 -340 -170 -631 -355 -1107 -842 -1402 -1432 -159 -320 -251 -633 -308 -1056 -26 -190 -27 -635 -1 -832 3 -19 7 -59 10 -89 4 -30 11 -84 17 -120 6 -36 12 -77 14 -91 7 -43 33 -174 39 -190 3 -8 7 -28 9 -45 6 -35 52 -221 72 -285 7 -25 23 -79 35 -120 29 -99 118 -283 189 -389 67 -103 203 -244 286 -298 75 -49 178 -103 196 -103 16 0 27 16 77 110 124 231 304 529 485 800 82 124 153 227 157 230 3 3 28 36 54 74 116 167 384 497 546 671 148 160 448 450 560 542 14 12 54 45 90 75 88 73 219 172 313 238 42 29 77 57 77 62 0 5 -13 34 -29 66 -69 137 -149 405 -181 602 -7 41 -14 82 -15 90 -1 8 -6 46 -10 83 -3 37 -8 77 -10 88 -2 11 -7 65 -11 122 -3 56 -8 104 -9 107 -2 3 0 12 5 19 6 10 10 8 15 -10 10 -34 167 -346 228 -454 118 -210 319 -515 340 -515 4 0 40 18 80 40 230 128 521 255 787 343 118 40 336 102 395 113 28 5 53 11 105 23 25 5 59 12 75 15 17 3 41 8 55 11 34 7 274 43 335 50 152 18 372 29 565 29 194 0 481 -11 489 -19 2 -3 -3 -6 -12 -6 -9 -1 -20 -2 -24 -3 -33 -8 -73 -16 -98 -21 -61 -10 -264 -56 -390 -90 -649 -170 -1243 -437 -1770 -794 -60 -41 -121 -82 -134 -93 l-24 -18 124 -59 c109 -52 282 -116 404 -149 92 -26 192 -51 220 -55 17 -3 64 -12 105 -21 71 -14 151 -28 230 -41 19 -3 46 -7 60 -10 14 -2 45 -7 70 -10 25 -4 56 -8 70 -10 14 -2 53 -7 88 -10 35 -4 71 -8 81 -10 10 -2 51 -6 92 -9 101 -9 141 -14 147 -21 3 -3 -15 -5 -39 -6 -24 0 -52 -2 -62 -4 -21 -4 -139 -12 -307 -22 -242 -14 -700 -7 -880 13 -41 4 -187 27 -250 39 -125 23 -274 68 -373 111 -43 19 -81 34 -86 34 -4 0 -16 -8 -27 -17 -10 -10 -37 -33 -59 -52 -166 -141 -422 -395 -592 -586 -228 -257 -536 -672 -688 -925 -21 -36 -43 -66 -47 -68 -4 -2 -8 -7 -8 -11 0 -5 -24 -48 -54 -97 -156 -261 -493 -915 -480 -935 2 -3 47 -21 101 -38 54 -18 107 -36 118 -41 58 -25 458 -138 640 -181 118 -27 126 -29 155 -35 14 -2 45 -9 70 -14 66 -15 137 -28 300 -55 37 -7 248 -33 305 -39 28 -3 84 -9 125 -13 163 -16 792 -8 913 12 12 2 58 9 102 15 248 35 423 76 665 157 58 19 134 46 170 60 86 33 344 156 348 166 2 4 8 7 13 7 14 0 205 116 303 184 180 126 287 216 466 396 282 281 511 593 775 1055 43 75 178 347 225 455 100 227 236 602 286 790 59 220 95 364 120 485 6 28 45 245 50 275 2 14 7 41 10 60 3 19 8 49 10 65 2 17 6 46 9 65 15 100 35 262 40 335 3 39 8 89 10 112 22 225 33 803 21 1043 -3 41 -7 129 -11 195 -3 66 -8 136 -10 155 -2 19 -6 76 -10 125 -3 50 -8 101 -10 115 -2 14 -6 57 -10 95 -7 72 -12 113 -20 175 -2 19 -7 55 -10 80 -6 46 -43 295 -51 340 -2 14 -9 54 -15 90 -5 36 -16 97 -24 135 -8 39 -17 84 -20 100 -12 68 -18 97 -50 248 -19 87 -47 204 -61 260 -14 56 -27 109 -29 117 -30 147 -232 810 -253 832 -4 4 -7 -23 -8 -60z"
      />
    </svg>
    <span className="ml-2 text-xl font-bold text-gray-900 dark:text-gray-200">GoGoGlo</span>
    <span className="sr-only">GoGoGlo - Adventure Travel Agency</span>
  </Link>
);

// Footer Skeleton (exported)
export const FooterSkeleton = () => (
  <div className="w-full py-14 bg-gray-100 animate-pulse">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-b border-gray-200 pb-14 flex flex-col md:flex-row gap-8">
        <div className="space-y-4">
          <div className="h-8 w-64 bg-gray-300 rounded"></div>
          <div className="h-4 w-48 bg-gray-300 rounded"></div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="h-12 w-64 bg-gray-300 rounded-md"></div>
          <div className="h-12 w-32 bg-gray-300 rounded-md"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-14 pb-10">
        <div className="space-y-4">
          <div className="h-8 w-32 bg-gray-300 rounded"></div>
          <div className="h-4 w-48 bg-gray-300 rounded"></div>
          <div className="h-8 w-24 bg-gray-300 rounded"></div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-6 w-24 bg-gray-300 rounded"></div>
              {[...Array(4)].map((_, j) => (
                <div key={j} className="h-4 w-32 bg-gray-300 rounded"></div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="py-7 border-t border-gray-200 flex justify-between">
        <div className="h-4 w-48 bg-gray-300 rounded"></div>
        <div className="flex gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-8 w-8 bg-gray-300 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

function Footer() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navSections = [
    {
      title: "Company",
      items: [
        { label: "Home", link: "/" },
        { label: "About", link: "/about-us" }, // Updated to match route
        { label: "Pricing", link: "/pricing" },
        { label: "Features", link: "/features" },
      ],
    },
    {
      title: "Products",
      items: [
        { label: "Tours", link: "/tours" },
        { label: "Hotels", link: "/hotels" },
        { label: "Flights", link: "/flights" },
        { label: "Packages", link: "/packages" },
      ],
    },
    {
      title: "Resources",
      items: [
        { label: "FAQs", link: "/faqs" },
        { label: "Blog", link: "/blog" },
        { label: "Guides", link: "/guides" },
        { label: "Support", link: "/support" },
      ],
    },
    {
      title: "Legal",
      items: [
        { label: "Terms", link: "/terms" },
        { label: "Privacy", link: "/privacy" },
        { label: "Cookies", link: "/cookies" },
        { label: "License", link: "/license" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://facebook.com/gogoglo",
      icon: (
        <svg className="w-4 h-4 text-white" viewBox="0 0 8 14" fill="currentColor">
          <path d="M7.04111 7.81204L7.41156 5.46043H5.1296V3.93188C5.1296 3.28886 5.44818 2.66054 6.46692 2.66054H7.51899V0.657999C6.90631 0.560385 6.28723 0.507577 5.66675 0.5C3.78857 0.5 2.56239 1.62804 2.56239 3.66733V5.46043H0.480469V7.81204H2.56239V13.5H5.1296V7.81204H7.04111Z" />
        </svg>
      ),
      bg: "bg-gray-900 hover:bg-gray-800",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/gogoglo",
      icon: (
        <svg className="w-5 h-4 text-white" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8s.01 2.445.048 3.299c.037.852.169 1.433.416 1.942a3.9 3.9 0 0 0 .923 1.417 3.9 3.9 0 0 0 1.417.923c.51.198 1.09.333 1.942.415C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.037 1.433-.168 1.942-.416a3.9 3.9 0 0 0 1.417-.923 3.9 3.9 0 0 0 .923-1.417c.198-.51.333-1.09.415-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.037-.851-.169-1.433-.416-1.942a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.416C10.444.01 10.172 0 8 0zm0 1.44c2.143 0 2.406.009 3.25.047.784.036 1.215.165 1.497.276a2.46 2.46 0 0 1 .917.6 2.46 2.46 0 0 1 .6.917c.111.282.24.713.276 1.497.038.844.047 1.107.047 3.25s-.009 2.406-.047 3.25c-.036.784-.165 1.215-.276 1.497a2.46 2.46 0 0 1-.6.917 2.46 2.46 0 0 1-.917.6c-.282.111-.713.24-1.497.276-.844.038-1.107.047-3.25.047s-2.406-.009-3.25-.047c-.784-.036-1.215-.165-1.497-.276a2.46 2.46 0 0 1-.917-.6 2.46 2.46 0 0 1-.6-.917c-.111-.282-.24-.713-.276-1.497-.038-.844-.047-1.107-.047-3.25s.009-2.406.047-3.25c.036-.784.165-1.215.276-1.497a2.46 2.46 0 0 1 .6-.917 2.46 2.46 0 0 1 .917-.6c.282-.111.713-.24 1.497-.276C5.593 1.449 5.856 1.44 8 1.44zm0 2.66a3.9 3.9 0 1 0 0 7.8 3.9 3.9 0 0 0 0-7.8zm0 6.24a2.34 2.34 0 1 1 0-4.68 2.34 2.34 0 0 1 0 4.68zm4.98-6.5a.585.585 0 1 0 0-1.17.585.585 0 0 0 0 1.17z" />
        </svg>
      ),
      bg: "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 hover:opacity-90",
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@gogoglo",
      icon: (
        <svg className="w-5 h-4 text-white" viewBox="0 0 16 12" fill="currentColor">
          <path d="M13.92 1.107c.638.172 1.14.676 1.31 1.314.31 1.158.31 3.576.31 3.576s0 2.418-.31 3.576c-.17.638-.672 1.142-1.31 1.314-1.156.31-5.79.31-5.79.31s-4.632 0-5.79-.31c-.638-.172-1.14-.676-1.31-1.314-.31-1.158-.31-3.576-.31-3.576s0-2.418.31-3.576c.17-.638.672-1.142 1.31-1.314C3.496.797 8.13.797 8.13.797s4.632 0 5.79.31zM6.65 8.226V3.768l3.85 2.23-3.85 2.228z" />
        </svg>
      ),
      bg: "bg-red-500 hover:bg-red-600",
    },
  ];

  const handleSubscribe = useCallback(async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    const subscriptionKey = `subscribed_${email}`;
    if (localStorage.getItem(subscriptionKey)) {
      toast.info("You’re already subscribed!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Analytics tracking
      window.gtag && window.gtag('event', 'newsletter_subscribe', { email, timestamp: new Date().toISOString() });

      // Simulate API call (replace with actual endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Subscribed:", email);
      localStorage.setItem(subscriptionKey, "true");
      toast.success("Subscribed successfully!", { icon: "🎉" });
      setEmail("");
    } catch (error) {
      toast.error("Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [email]);

  const debouncedSubscribe = debounce(handleSubscribe, 500, { leading: true, trailing: false });

  return (
    <footer className="w-full py-12 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        {location.pathname !== "/booking" && (
          <div className="pb-10 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Join Our Newsletter
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Stay updated with the latest travel deals and news.
              </p>
            </div>
            <form onSubmit={debouncedSubscribe} className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-3 px-4 h-12 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white w-full sm:w-64 disabled:opacity-50"
                placeholder="Enter your email..."
                aria-label="Email for newsletter"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                className="h-12 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          </div>
        )}

        {/* Navigation Grid */}
        {location.pathname !== "/booking" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-10">
            <div className="text-center md:text-left">
              <Logo />
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Serving adventurers in over 100 countries with 5M+ happy customers.
              </p>
              <Link
                to="/contact-us" // Updated to match route
                className="mt-4 inline-block px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
            {navSections.map((section) => (
              <div key={section.title}>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.link}
                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Copyright & Social Links */}
        <div className="py-6 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            © <Link to="/" className="font-semibold hover:text-blue-600 dark:hover:text-blue-400">GoGoGlo</Link> {new Date().getFullYear()}. All rights reserved.
          </span>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-8 h-8 flex items-center justify-center ${social.bg} rounded-full transition-colors duration-200`}
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;