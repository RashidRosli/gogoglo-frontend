// src/data/hotels.js

const hotelData = [
    {
        id: "H0001",
        hotelName: "The Majestic Hotel Kuala Lumpur",
        features: [
            "Luxurious rooms with city views",
            "Infinity swimming pool",
            "Spa and wellness center",
            "Fine dining restaurants",
            "Fitness center",
        ],
        price: "RM500",
        discount: "RM 50",
        images: [ // Now an array of image URLs
            "https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/2291624/pexels-photo-2291624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/97083/pexels-photo-97083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ],
        starRating: 5,
        guestRating: 7.5,
        comments: 720,
        nearestLandmark: "4 minutes walk to KLCC Park",
        offers: ["Book with RM 0 Payment", "Breakfast Included"],
        exclusiveOffer: "Exclusive Offer - Maybank Card Users. Get RM 100 Off.",
        earlyBirdDeal: true,
        overview: {
            "title": "Experience Timeless Elegance", // You can add a title if you want
            "description": "Experience the epitome of luxury and timeless elegance at The Majestic Hotel Kuala Lumpur, a 5-star haven nestled in the heart of Malaysia's vibrant capital. Steeped in history and renowned for its impeccable service, this iconic landmark offers a truly unforgettable experience for discerning travelers. \n\nIndulge in the grandeur of our luxurious rooms and suites, each meticulously designed with your comfort in mind. Unwind in our opulent spa and wellness center, take a dip in the breathtaking infinity pool overlooking the city skyline, or savor exquisite culinary creations at our fine dining restaurants. \n\nStay active at our state-of-the-art fitness center, or explore the city's iconic landmarks, including the Petronas Twin Towers and KLCC Park, just a short stroll away. Immerse yourself in the rich cultural tapestry of Kuala Lumpur, with its bustling markets, historical sites, and vibrant nightlife. \n\nAt The Majestic Hotel Kuala Lumpur, we are committed to providing an unparalleled experience that exceeds your expectations. Our dedicated team is at your service to ensure your stay is nothing short of magnificent.",
            "keyFeatures": [
                "Luxurious rooms and suites with city views",
                "Infinity swimming pool",
                "Spa and wellness center",
                "Fine dining restaurants",
                "Fitness center",
                "Prime location near KLCC Park and other attractions",
                "Impeccable service and a commitment to excellence"
            ]
        },
        facilities: [
            {
                "name": "Infinity Pool",
                "description": "Take a refreshing dip in our stunning infinity pool, overlooking the breathtaking city skyline. Relax on comfortable loungers, soak up the sun, and enjoy poolside refreshments.",
                "image": "https://images.pexels.com/photos/122244/pexels-photo-122244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            },
            {
                "name": "Fitness Center",
                "description": "Stay active during your stay at our fully equipped fitness center, featuring state-of-the-art cardio machines, strength training equipment, and a dedicated space for yoga and stretching.",
                "image": "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            },
            {
                "name": "Spa & Wellness Center",
                "description": "Rejuvenate your body and soul at our tranquil spa, offering a wide range of pampering treatments, including massages, facials, and body wraps. Unwind in our serene relaxation areas and experience ultimate bliss.",
                "image": "https://images.pexels.com/photos/6560273/pexels-photo-6560273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            },
            {
                "name": "Fine Dining Restaurants",
                "description": "Embark on a culinary journey at our exquisite fine dining restaurants, where our talented chefs create masterpieces using the freshest local ingredients. Indulge in a symphony of flavors and impeccable service.",
                "image": "https://images.pexels.com/photos/2291599/pexels-photo-2291599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            },
            {
                "name": "Luxurious Rooms with City Views",
                "description": "Retreat to our elegantly appointed rooms and suites, offering breathtaking views of the city skyline. Immerse yourself in comfort and luxury with plush furnishings, modern amenities, and personalized service.",
                "image": "https://images.pexels.com/photos/30047554/pexels-photo-30047554/free-photo-of-stunning-night-view-of-dubai-marina-from-hotel-room.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            },
            {
                "name": "Concierge Service",
                "description": "Our dedicated concierge team is at your service to assist with anything you may need during your stay, from arranging transportation and booking excursions to recommending local attractions and hidden gems.",
                "image": "https://images.pexels.com/photos/7820326/pexels-photo-7820326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            },
            {
                "name": "Business Center",
                "description": "Stay connected and productive at our fully equipped business center, offering high-speed internet access, printing services, and comfortable workspaces.",
                "image": "https://images.pexels.com/photos/10549886/pexels-photo-10549886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            },
            {
                "name": "Kids Club",
                "description": "Let your little ones have a blast at our vibrant Kids Club, featuring a range of fun activities, games, and entertainment to keep them engaged and happy throughout your stay.",
                "image": "https://images.pexels.com/photos/9207305/pexels-photo-9207305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
        ],
        "amenities": [
            {
                "name": "Languages Spoken",
                "items": [
                    "English",
                    "Chinese [Cantonese]",
                    "Chinese [Mandarin]",
                    "Malay",
                    "Tamil"
                ]
            },
            {
                "name": "Accessibility",
                "items": [
                    "Wheelchair accessible"
                ]
            },
            {
                "name": "Breakfast Options",
                "items": [
                    "Halal"
                ]
            },
            {
                "name": "Internet Access",
                "items": [
                    "Free Wi-Fi in all rooms!",
                    "Internet services",
                    "Wi-Fi in public areas"
                ]
            },
            {
                "name": "Things to Do",
                "items": [
                    "Body scrub",
                    "Fitness center",
                    "Gym/fitness",
                    "Massage",
                    "Pool with view",
                    "Sauna",
                    "Spa",
                    "Spa/sauna",
                    "Steamroom",
                    "Swimming pool",
                    "Swimming pool [outdoor]",
                    "Ticket services",
                    "Tours"
                ]
            },
            {
                "name": "Cleanliness and Safety",
                "items": [
                    "Body thermometer",
                    "Cashless payment service",
                    "Daily disinfection in all rooms",
                    "Daily disinfection in common areas",
                    "Hand sanitizer",
                    "Hot water linen and laundry washing",
                    "Physical distancing of at least 1 meter",
                    "Rooms sanitized between stays",
                    "Staff trained in safety protocol"
                ]
            },
            {
                "name": "Dining",
                "items": [
                    "A la carte in restaurant",
                    "Bar",
                    "Bottle of water",
                    "Breakfast [buffet]",
                    "Buffet in restaurant",
                    "Coffee shop",
                    "Halal breakfast",
                    "Poolside bar",
                    "Restaurant [halal]",
                    "Restaurants",
                    "Room service [24-hour]"
                ]
            },
            {
                "name": "Services and Conveniences",
                "items": [
                    "Air conditioning in public area",
                    "Audio-visual equipment for special events",
                    "Business facilities",
                    "Concierge",
                    "Convenience store",
                    "Daily housekeeping",
                    "Doorman",
                    "Dry cleaning",
                    "Elevator",
                    "Facilities for disabled guests",
                    "Grooming service",
                    "Indoor venue for special events",
                    "Invoice provided",
                    "Ironing service",
                    "Laundry service",
                    "Luggage storage",
                    "Meeting/banquet facilities",
                    "Meetings",
                    "Meeting stationery",
                    "Projector/LED display",
                    "Safety deposit boxes",
                    "Salon",
                    "Shops",
                    "Smoke-free property",
                    "Smoking area",
                    "Xerox/fax in business center"
                ]
            },
            {
                "name": "Available in All Rooms",
                "items": [
                    "Air conditioning",
                    "Bathroom phone",
                    "Blackout curtains",
                    "Carpeting",
                    "Closet",
                    "Coffee/tea maker",
                    "Complimentary tea",
                    "Daily housekeeping",
                    "Daily newspaper",
                    "Desk",
                    "Electric kettle",
                    "Free bottled water",
                    "Free instant coffee",
                    "Hair dryer",
                    "In-room safe box",
                    "Ironing facilities",
                    "LAN Internet in room [free]",
                    "Laptop safe box",
                    "Linens",
                    "Mini bar",
                    "Mirror",
                    "Non-smoking",
                    "Private bathroom",
                    "Refrigerator",
                    "Satellite/cable channels",
                    "Seating area",
                    "Sewing kit",
                    "Shower",
                    "Slippers",
                    "Socket near the bed",
                    "Sofa",
                    "Telephone",
                    "Toiletries",
                    "Towels",
                    "Trash cans",
                    "Wake-up service",
                    "Wi-Fi [free]",
                    "Window"
                ]
            },
            {
                "name": "Access",
                "items": [
                    "CCTV in common areas",
                    "Check-in [24-hour]",
                    "Fire extinguisher",
                    "Front desk [24-hour]",
                    "Non-smoking rooms",
                    "Pets allowed",
                    "Safety/security feature",
                    "Security [24-hour]",
                    "Smoke alarms"
                ]
            },
            {
                "name": "Getting Around",
                "items": [
                    "Airport transfer",
                    "Car park [charges apply]",
                    "Car park [nearby]",
                    "Car park [on-site]",
                    "Rental car",
                    "Taxi service",
                    "Valet parking"
                ]
            },
            {
                "name": "For the Kids",
                "items": [
                    "Family/child friendly",
                    "Family room",
                    "Swimming pool [kids]"
                ]
            },
        ],
        "rooms": [
            {
                "name": "Deluxe King Room",
                "size": "32 sqm",
                "beds": "1 King bed",
                "occupancy": 2,
                "features": [
                    "City view",
                    "Air conditioning",
                    "Flat-screen TV",
                    "Wi-Fi",
                    "Mini bar",
                    "Coffee/tea maker"
                ],
                "images": [
                    "https://images.pexels.com/photos/271621/pexels-photo-271621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "https://images.pexels.com/photos/8230642/pexels-photo-8230642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                ],
                "price": "RM 450"
            },
            {
                "name": "Deluxe Twin Room",
                "size": "30 sqm",
                "beds": "2 Twin beds",
                "occupancy": 2,
                "features": [
                    "Garden view",
                    "Air conditioning",
                    "Flat-screen TV",
                    "Wi-Fi",
                    "Work desk"
                ],
                "images": [
                    "https://images.pexels.com/photos/279719/pexels-photo-279719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                ],
                "price": "RM 400"
            },
            {
                "name": "Executive King Room",
                "size": "38 sqm",
                "beds": "1 King bed",
                "occupancy": 2,
                "features": [
                    "City view",
                    "Air conditioning",
                    "Flat-screen TV",
                    "Wi-Fi",
                    "Mini bar",
                    "Coffee/tea maker",
                    "Bathrobes"
                ],
                "images": [
                    "https://images.pexels.com/photos/1072090/pexels-photo-1072090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                ],
                "price": "RM 550"
            },
            {
                "name": "Club Room",
                "size": "40 sqm",
                "beds": "1 King bed or 2 Twin beds",
                "occupancy": 2,
                "features": [
                    "Club lounge access",
                    "City view",
                    "Air conditioning",
                    "Flat-screen TV",
                    "Wi-Fi",
                    "Mini bar",
                    "Coffee/tea maker"
                ],
                "images": [
                    "https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "https://images.pexels.com/photos/2279543/pexels-photo-2279543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                ],
                "price": "RM 600"
            },
            {
                "name": "Junior Suite",
                "size": "50 sqm",
                "beds": "1 King bed",
                "occupancy": 2,
                "features": [
                    "Separate sitting area",
                    "City view",
                    "Air conditioning",
                    "Flat-screen TV",
                    "Wi-Fi",
                    "Mini bar",
                    "Coffee/tea maker"
                ],
                "images": [
                    "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "https://images.pexels.com/photos/1753211/pexels-photo-1753211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                ],
                "price": "RM 750"
            },
            {
                "name": "Luxury Room",
                "size": "35 sqm",
                "beds": "1 King bed or 2 Twin beds",
                "occupancy": 2,
                "features": [
                    "Premium amenities",
                    "City view",
                    "Air conditioning",
                    "Flat-screen TV",
                    "Wi-Fi",
                    "Mini bar",
                    "Coffee/tea maker"
                ],
                "images": [
                    "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "https://images.pexels.com/photos/279719/pexels-photo-279719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                ],
                "price": "RM 500"
            },
            {
                "name": "Premier Suite",
                "size": "64 sqm",
                "beds": "King bed and Sofa bed",
                "occupancy": 3,
                "features": [
                    "Panoramic city view",
                    "Separate living area",
                    "Jacuzzi"
                    // ... other features
                ],
                "images": [
                    "https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "https://images.pexels.com/photos/271640/pexels-photo-271640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                ],
                "price": "RM 800"
            },
            {
                "name": "Deluxe Triple Room",
                "size": "40 sqm",
                "beds": "1 King bed and 1 Single bed",
                "occupancy": 3,
                "features": [
                    "City view",
                    "Air conditioning",
                    "Flat-screen TV",
                    "Wi-Fi",
                    "Mini bar",
                    "Coffee/tea maker"
                ],
                "images": [
                    "https://images.pexels.com/photos/271622/pexels-photo-271622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                ],
                "price": "RM 600"
            },
            {
                "name": "Executive Triple Room",
                "size": "45 sqm",
                "beds": "3 Single beds",
                "occupancy": 3,
                "features": [
                    "City view",
                    "Air conditioning",
                    "Flat-screen TV",
                    "Wi-Fi",
                    "Mini bar",
                    "Coffee/tea maker",
                    "Bathrobes"
                ],
                "images": [
                    "https://images.pexels.com/photos/271643/pexels-photo-271643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "https://images.pexels.com/photos/323772/pexels-photo-323772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                ],
                "price": "RM 700"
            },
            {
                "name": "Studio Suite",
                "size": "55 sqm",
                "beds": "1 King bed and 1 Sofa bed",
                "occupancy": 3,
                "features": [
                    "Kitchenette",
                    "City view",
                    "Air conditioning",
                    "Flat-screen TV",
                    "Wi-Fi",
                    "Mini bar"
                ],
                "images": [
                    "https://images.pexels.com/photos/271644/pexels-photo-271644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                ],
                "price": "RM 900"
            },
            {
                "name": "Family Suite",
                "size": "80 sqm",
                "beds": "1 King bed and 2 Twin beds",
                "occupancy": 4,
                "features": [
                    "Separate living area",
                    "City view",
                    "Air conditioning",
                    "Flat-screen TV",
                    "Wi-Fi",
                    "Mini bar",
                    "Coffee/tea maker"
                ],
                "images": [
                    "https://images.pexels.com/photos/271645/pexels-photo-271645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                ],
                "price": "RM 1200"
            },
            {
                "name": "Quadruple Room",
                "size": "50 sqm",
                "beds": "2 Queen beds",
                "occupancy": 4,
                "features": [
                    "City view",
                    "Air conditioning",
                    "Flat-screen TV",
                    "Wi-Fi"
                ],
                "images": [
                    "https://images.pexels.com/photos/271646/pexels-photo-271646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                ],
                "price": "RM 850"
            },
            {
                "name": "Superior Quadruple Room",
                "size": "55 sqm",
                "beds": "1 King bed and 2 Single beds",
                "occupancy": 4,
                "features": [
                    "Balcony",
                    "City view",
                    "Air conditioning",
                    "Flat-screen TV",
                    "Wi-Fi",
                    "Mini bar"
                ],
                "images": [
                    "https://images.pexels.com/photos/3912439/pexels-photo-3912439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    "https://images.pexels.com/photos/271648/pexels-photo-271648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                ],
                "price": "RM 950"
            }
        ],
        "rules": [
            {
                "name": "Check-in and Check-out",
                "items": [
                    "Check-in time is 3:00 PM and check-out time is 12:00 PM.",
                    "Late check-in is subject to availability.",
                    "Minimum check-in age is 18.",
                    "Early check-in is available for a fee (subject to availability).",
                    "Late check-out is available for a fee (subject to availability)."
                ]
            },
            {
                "name": "Identification",
                "items": [
                    "Aadhar, Driving License, and Passport are accepted as ID proof(s).",
                    "Local IDs are not allowed."
                ]
            },
            {
                "name": "Pets",
                "items": [
                    "Pets are not allowed in the hotel."
                ]
            },
            {
                "name": "Food",
                "items": [
                    "Outside food is not allowed.",
                    "Non-veg food is allowed.",
                    "Food delivery service is not available at the property."
                ]
            },
            {
                "name": "Smoking and Alcohol",
                "items": [
                    "Smoking within the premises is allowed.",
                    "There are no restrictions on alcohol consumption."
                ]
            },
            {
                "name": "Accessibility",
                "items": [
                    "This property is accessible to guests who use a wheelchair. Guests are requested to carry their own wheelchair."
                ]
            },
            {
                "name": "Parties and Events",
                "items": [
                    "Allows private parties or events."
                ]
            },
            {
                "name": "Extra Beds",
                "items": [
                    "Rollaway bed fee: RM150 per day",
                    "An extra bed for children will be provided for a charge of RM100 per child (To be paid at the property)",
                    "An extra bed for additional guests will be provided for a charge (amount to be confirmed)."
                ]
            },
            {
                "name": "Payments",
                "items": [
                    "This property accepts credit cards, debit cards, mobile payments, and cash.",
                    "Mobile payment options include: Google Pay, Apple Pay, Paytm, and PhonePe."
                ]
            },
            {
                "name": "Other",
                "items": [
                    "Extra-person charges may apply and vary depending on property policy.",
                    "Government-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental charges.",
                    "Special requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteed."
                ]
            }
        ],
        "policies": [
            {
                "name": "Important Information",
                "items": [
                    "Extra-person charges may apply and vary depending on property policy.",
                    "Government-issued photo identification and a credit card may be required at check-in for incidental charges.",
                    "Special requests are subject to availability and may incur additional charges.",
                    "The name on the credit card used at check-in must match the reservation."
                ]
            },
            {
                "name": "Guest Satisfaction",
                "items": [
                    "We are committed to providing a welcoming and comfortable environment for all our guests.",
                    "We strive to ensure your stay is enjoyable and memorable."
                ]
            },
            {
                "name": "Service Excellence",
                "items": [
                    "We aim to deliver exceptional service and cater to your needs with utmost care and attention.",
                    "Our dedicated team is always available to assist you."
                ]
            },
            {
                "name": "Sustainability",
                "items": [
                    "We are dedicated to sustainable practices and minimizing our environmental impact.",
                    "We encourage our guests to join us in our efforts by conserving resources and supporting eco-friendly initiatives."
                ]
            },
            {
                "name": "Accessibility",
                "items": [
                    "We strive to provide an inclusive environment for all guests.",
                    "Our facilities are designed to be accessible to individuals with disabilities.",
                    "We offer assistance to ensure a comfortable and convenient stay."
                ]
            },
            {
                "name": "Privacy",
                "items": [
                    "We respect your privacy and are committed to protecting your personal information.",
                    "Our data handling practices comply with industry standards and regulations."
                ]
            },
            {
                "name": "Feedback",
                "items": [
                    "We value your feedback and encourage you to share your experiences and suggestions with us.",
                    "Your input helps us improve our services and create a better experience for all our guests."
                ]
            },
            {
                "name": "Safety Features",
                "items": [
                    "This property has a fire extinguisher and a security system."
                ]
            },
            {
                "name": "Cleaning and Disinfection",
                "items": [
                    "This property follows the CleanStay (Hilton) practices."
                ]
            },
            {
                "name": "Cultural Norms",
                "items": [
                    "Guest policies may differ by country and property."
                ]
            },
            {
                "name": "Pool Access",
                "items": [
                    "The pool is accessible 24 hours a day."
                ]
            }
        ],
        "location": {
            "area": "Kuala Lumpur",
            "description": [
                "The Majestic Hotel Kuala Lumpur is strategically located in the heart of the city, offering easy access to major attractions, business districts, and transportation hubs."
            ],
            "address": "5 Jalan Sultan Hishamuddin, 50000 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia",
            "coordinates": {
                "latitude": 3.141760,
                "longitude": 101.694370
            },
            "mapImage": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d837.4975876110149!2d101.69268402189711!3d3.138934858384615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc49c5acb02757%3A0xf0aca4eb92b06ca8!2sThe%20Majestic%20Hotel%20Kuala%20Lumpur%2C%20Autograph%20Collection!5e0!3m2!1sen!2smy!4v1736940406989!5m2!1sen!2smy",
            "nearestLandmarks": [
                {
                    "name": "KLCC Park",
                    "distance": "4-minute walk"
                },
                {
                    "name": "Petronas Twin Towers",
                    "distance": "5-minute walk"
                },
                {
                    "name": "Suria KLCC Shopping Mall",
                    "distance": "5-minute walk"
                },
                {
                    "name": "Kuala Lumpur Tower",
                    "distance": "10-minute drive"
                },
                {
                    "name": "Merdeka Square",
                    "distance": "15-minute drive"
                }
            ],
            "transportation": [
                {
                    "name": "Kuala Lumpur International Airport (KLIA)",
                    "distance": "A 45-minute drive"
                },
                {
                    "name": "KL Sentral Railway Station",
                    "distance": "A 10-minute drive"
                },
                {
                    "name": "LRT and Monorail stations",
                    "distance": "Within walking distance"
                },
                {
                    "name": "Bus stops",
                    "distance": "Within walking distance"
                },
            ],
        }
    },
    {
        id: "H0002",
        hotelName: "The Datai Langkawi",
        "location": {
            "area": "Langkawi",
        },
        features: [
            "Rainforest setting with private beach",
            "Villas with plunge pools",
            "Award-winning spa",
            "Championship golf course",
            "Water sports activities",
        ],
        price: "RM1,200",
        discount: "RM 100",
        images: [
            "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1602391835494-e1b484710c10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2360&q=80",
            "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
        ],
        starRating: 5,
        guestRating: 8.7,
        comments: 1200,
        nearestLandmark: "10 minutes drive to Langkawi Cable Car",
        offers: ["Free airport shuttle", "Welcome drink on arrival"],
        exclusiveOffer: "10% off for senior citizens",
        earlyBirdDeal: false,
    },
    {
        id: "H0003",
        hotelName: "Pangkor Laut Resort",
        "location": {
            "area": "Pangkor Laut Island",
        },
        features: [
            "Private island with luxury villas",
            "Infinity pools overlooking the sea",
            "World-class spa",
            "Gourmet dining options",
            "Jungle trekking and water activities",
        ],
        price: "RM2,500",
        discount: null,
        images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1445217096470-a11042704719?",
            "https://images.unsplash.com/photo-1470165354288-c3451d77aa7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1502741224143-90386d7dd664?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",

        ],
        starRating: 5,
        guestRating: 9.9,
        comments: 850,
        nearestLandmark: "Accessible by private boat from Marina Island Pangkor",
        offers: ["Complimentary yoga classes", "Sunset cruise"],
        exclusiveOffer: null,
        earlyBirdDeal: false,
    },
    {
        id: "H0004",
        hotelName: "Eastern & Oriental Hotel",
        "location": {
            "area": "Penang",
        },
        features: [
            "Heritage hotel with colonial charm",
            "Sea-facing rooms and suites",
            "Fine dining and afternoon tea",
            "Historical tours and cultural experiences",
            "Spa and wellness facilities",
        ],
        price: "RM800",
        discount: "RM 80",
        images: [
            "https://images.unsplash.com/photo-1536409321463-e6d188dcd767?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1521336575822-6da63fb45455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80",
            "https://images.unsplash.com/photo-1473186578172-c141e679f812?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",

        ],
        starRating: 4,
        guestRating: 7.2,
        comments: 1100,
        nearestLandmark: "Walking distance to Fort Cornwallis and Cheong Fatt Tze Mansion",
        offers: ["Afternoon tea included", "Heritage tour"],
        exclusiveOffer: null,
        earlyBirdDeal: true,
    },
    {
        id: "H0005",
        hotelName: "The Ritz-Carlton, Kuala Lumpur",
        "location": {
            "area": "Kuala Lumpur",
        },
        features: [
            "Elegant rooms and suites",
            "Skybar with panoramic views",
            "Spa and fitness center",
            "Multiple dining options",
            "Shopping mall access",
        ],
        price: "RM1,000",
        discount: null,
        images: [
            "https://images.unsplash.com/photo-1584734898652-19b8610a1891?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1517833969433-f2582f249f94?&ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1463336506353-0896800d7989?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",

        ],
        starRating: 5,
        guestRating: 9.6,
        comments: 980,
        nearestLandmark: "Next to Pavilion Kuala Lumpur shopping mall",
        offers: ["Club lounge access", "Free Wi-Fi"],
        exclusiveOffer: null,
        earlyBirdDeal: false,
    },
    {
        id: "H0006",
        hotelName: "Shangri-La Rasa Sayang, Penang",
        "location": {
            "area": "Penang",
        },
        features: [
            "Beachfront location",
            "Family-friendly facilities",
            "Multiple pools and restaurants",
            "Spa and kids club",
            "Nearby attractions",
        ],
        price: "RM700",
        discount: "RM 70",
        images: [
            "https://images.unsplash.com/photo-1561501900-3701fa613280?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",


        ],
        starRating: 4,
        guestRating: 8.3,
        comments: 1500,
        nearestLandmark: "Close to Batu Ferringhi Night Market",
        offers: ["Kids stay free", "Early check-in"],
        exclusiveOffer: null,
        earlyBirdDeal: true,
    },
    {
        id: "H0007",
        hotelName: "Four Seasons Hotel Kuala Lumpur",
        "location": {
            "area": "Kuala Lumpur",
        },
        features: [
            "Modern and stylish rooms",
            "Infinity pool with KLCC view",
            "Spa and fitness center",
            "High-end dining",
            "Excellent service",
        ],
        price: "RM1,100",
        discount: null,
        images: [
            "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1569858293057-6a720c1380f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",

        ],
        starRating: 5,
        guestRating: 8.8,
        comments: 1050,
        nearestLandmark: "Connected to KLCC Park and Suria KLCC",
        offers: ["Free Wi-Fi", "24-hour concierge"],
        exclusiveOffer: "Complimentary airport transfer",
        earlyBirdDeal: false,
    },
    {
        id: "H0008",
        hotelName: "The Danna Langkawi",
        "location": {
            "area": "Langkawi",
        },
        features: [
            "Luxury beachfront resort",
            "Spacious rooms and suites",
            "Infinity pool and private beach",
            "Spa and fitness center",
            "Variety of dining options",
        ],
        price: "RM900",
        discount: "RM 90",
        images: [
            "https://images.unsplash.com/photo-1542281286-9e0a16bb134f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1506929562872-bb421503ef21?&ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
        ],
        starRating: 5,
        guestRating: 9.5,
        comments: 1300,
        nearestLandmark: "Close to Pantai Kok and Telaga Harbour",
        offers: ["Free breakfast", "Welcome amenities"],
        exclusiveOffer: null,
        earlyBirdDeal: true,
    },
    {
        id: "H0009",
        hotelName: "The Banjaran Hotsprings Retreat",
        "location": {
            "area": "Ipoh",
        },
        features: [
            "Luxurious villas with private pools",
            "Natural hot springs and geothermal facilities",
            "Spa treatments and wellness programs",
            "Unique dining experiences",
            "Tranquil rainforest setting",
        ],
        price: "RM1,500",
        discount: null,
        images: [
            "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1504567961541-e24999899999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
        ],
        starRating: 5,
        guestRating: 7.6,
        comments: 620,
        nearestLandmark: "Close to Lost World of Tambun theme park",
        offers: ["Spa credit", "Guided nature walks"],
        exclusiveOffer: null,
        earlyBirdDeal: false,
    },
    {
        id: "H0010",
        hotelName: "The St. Regis Kuala Lumpur",
        "location": {
            "area": "Kuala Lumpur",
        },
        features: [
            "Butler service",
            "Michelin-starred restaurant",
            "Skybar with city views",
            "Spa and fitness center",
            "Luxury shopping mall access",
        ],
        price: "RM1,800",
        discount: null,
        images: [
            "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",

            "https://images.unsplash.com/photo-1580587771525-78b18f1d5a28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",

        ],
        starRating: 5,
        guestRating: 9.9,
        comments: 550,
        nearestLandmark: "Located in KL Sentral, transportation hub",
        offers: ["Afternoon tea", "Late check-out"],
        exclusiveOffer: "Free limousine transfer from airport",
        earlyBirdDeal: false,
    },
    {
        id: "H0011",
        hotelName: "The Edison George Town",
        "location": {
            "area": "Penang",
        },
        features: [
            "Boutique hotel in a heritage building",
            "Rooftop bar with city views",
            "Unique and stylish rooms",
            "Close to local attractions",
            "Personalized service",
        ],
        price: "RM400",
        discount: "RM 40",
        images: [
            "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1570214486496-0e0a7f3962f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
        ],
        starRating: 4,
        guestRating: 7.3,
        comments: 380,
        nearestLandmark: "Walking distance to Khoo Kongsi and Armenian Street",
        offers: ["Free bicycle rental", "Local snacks"],
        exclusiveOffer: null,
        earlyBirdDeal: true,
    },
    {
        id: "H0012",
        hotelName: "The Chateau Spa & Organic Wellness Resort",
        "location": {
            "area": "Bukit Tinggir",
        },
        features: [
            "French-inspired architecture",
            "Scenic mountain views",
            "Spa and wellness treatments",
            "Organic farm and gardens",
            "Relaxing and peaceful atmosphere",
        ],
        price: "RM600",
        discount: null,
        images: [
            "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80",

            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",

        ],
        starRating: 4,
        guestRating: 7.1,
        comments: 450,
        nearestLandmark: "Near Colmar Tropicale and Japanese Village",
        offers: ["Wellness activities", "Organic meals"],
        exclusiveOffer: null,
        earlyBirdDeal: false,
    },
    {
        id: "H0013",
        hotelName: "Tanjong Jara Resort",
        "location": {
            "area": "Terengganu",
        },
        features: [
            "Traditional Malay architecture",
            "Beachfront location",
            "Spa and wellness center",
            "Water sports activities",
            "Cultural experiences",
        ],
        price: "RM1,300",
        discount: "RM 130",
        images: [
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",

            "https://images.unsplash.com/photo-1563138968-62e8bf873390?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",

        ],
        starRating: 5,
        guestRating: 8.7,
        comments: 780,
        nearestLandmark: "Close to Turtle Sanctuary Beach",
        offers: ["Cooking classes", "Traditional dance performances"],
        exclusiveOffer: null,
        earlyBirdDeal: true,
    },
    {
        id: "H0014",
        hotelName: "The Cameron Highlands Resort",
        "location": {
            "area": "Cameron Highlands",
        },
        features: [
            "Colonial-style building",
            "Scenic tea plantation views",
            "Spa and wellness center",
            "Afternoon tea and fine dining",
            "Jungle walks and nature trails",
        ],
        price: "RM750",
        discount: null,
        images: [
            "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1532994456911-da8fa8427420?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1523770999498-a91ef4884f97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
        ],
        starRating: 4,
        guestRating: 8.3,
        comments: 920,
        nearestLandmark: "Near Boh Tea Plantation and Strawberry Farms",
        offers: ["Tea plantation tours", "Strawberry picking"],
        exclusiveOffer: null,
        earlyBirdDeal: false,
    },
    {
        id: "H0015",
        hotelName: "The Majestic Malacca",
        "location": {
            "area": "Malacca",
        },
        features: [
            "Historic hotel with Peranakan influence",
            "Infinity pool and spa",
            "Fine dining and Baba Nyonya cuisine",
            "Walking distance to Jonker Street",
            "Cultural heritage tours",
        ],
        price: "RM650",
        discount: "RM 65",
        images: [
            "https://images.unsplash.com/photo-1571091718767-18b5b1e2dd77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2372&q=80",
            "https://images.unsplash.com/photo-1566610236394-7087f7f28303?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",

        ],
        starRating: 4,
        guestRating: 8.5,
        comments: 1080,
        nearestLandmark: "Close to A Famosa and St. Paul's Church",
        offers: ["Free city tour", "Peranakan cooking class"],
        exclusiveOffer: null,
        earlyBirdDeal: true,
    },
    {
        id: "H0016",
        hotelName: "The Leela Palace Kuala Lumpur",
        "location": {
            "area": "Kuala Lumpur",
        },
        features: [
            "Luxurious rooms and suites",
            "Rooftop infinity pool",
            "Award-winning spa",
            "Fine dining restaurants",
            "Exclusive club lounge",
        ],
        price: "RM1,200",
        discount: null,
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",

            "https://images.unsplash.com/photo-1458442905348-d1c94f384880?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",

        ],
        starRating: 5,
        guestRating: 8.7,
        comments: 880,
        nearestLandmark: "Near Petronas Twin Towers and KL Tower",
        offers: ["Free Wi-Fi", "Airport transfer"],
        exclusiveOffer: "20% off on spa treatments",
        earlyBirdDeal: false,
    },
    {
        id: "H0017",
        hotelName: "The Datai Kota Kinabalu",
        "location": {
            "area": "Kota Kinabalu",
        },
        features: [
            "Beachfront location with rainforest views",
            "Private villas and suites",
            "Infinity pool and spa",
            "Water sports activities",
            "Nature trails and wildlife encounters",
        ],
        price: "RM1,400",
        discount: "RM 140",
        images: [
            "https://images.unsplash.com/photo-1569738303318-31d739c1733a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",


        ],
        starRating: 5,
        guestRating: 9.8,
        comments: 950,
        nearestLandmark: "Close to Tunku Abdul Rahman National Park",
        offers: ["Nature walks", "Sunset cruises"],
        exclusiveOffer: null,
        earlyBirdDeal: true,
    },
    {
        id: "H0018",
        hotelName: "The Westin Langkawi Resort & Spa",
        "location": {
            "area": "Langkawi",
        },
        features: [
            "Family-friendly resort",
            "Multiple pools and restaurants",
            "Kids club and playground",
            "Spa and fitness center",
            "Beachfront location",
        ],
        price: "RM850",
        discount: null,
        images: [
            "https://images.unsplash.com/photo-1439065290459-64810899999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",


        ],
        starRating: 4,
        guestRating: 7.4,
        comments: 1400,
        nearestLandmark: "Near Langkawi Wildlife Park",
        offers: ["Kids eat free", "Water sports activities"],
        exclusiveOffer: null,
        earlyBirdDeal: false,
    },
    {
        id: "H0019",
        hotelName: "The Andaman, a Luxury Collection Resort, Langkawi",
        "location": {
            "area": "Langkawi",
        },
        features: [
            "Luxury rainforest resort",
            "Private beach and coral reef",
            "Villas with plunge pools",
            "Award-winning spa",
            "Fine dining and rainforest experiences",
        ],
        price: "RM1,600",
        discount: null,
        images: [
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",

            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",

        ],
        starRating: 5,
        guestRating: 8.7,
        comments: 700,
        nearestLandmark: "Near Datai Bay and Langkawi Cable Car",
        offers: ["Jungle trekking", "Coral reef snorkeling"],
        exclusiveOffer: "Free night stay for honeymooners",
        earlyBirdDeal: false,
    },
    {
        id: "H0020",
        hotelName: "The RuMa Hotel and Residences",
        "location": {
            "area": "Kuala Lumpur",
        },
        features: [
            "Stylish and modern design",
            "Infinity pool with city views",
            "Spa and fitness center",
            "Rooftop bar and restaurant",
            "Close to shopping and entertainment",
        ],
        price: "RM950",
        discount: null,
        images: [
            "https://images.unsplash.com/photo-1560200353-ce0a76b1d89e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1530133170714-a81e58c57b74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",

        ],
        starRating: 5,
        guestRating: 8.6,
        comments: 820,
        nearestLandmark: "Walking distance to Bukit Bintang",
        offers: ["Free Wi-Fi", "Welcome amenities"],
        exclusiveOffer: null,
        earlyBirdDeal: false,
    },
    {
        id: "H0021",
        hotelName: "The Villas at Sunway Resort Hotel & Spa",
        "location": {
            "area": "Petaling Jaya",
        },
        features: [
            "Luxury villas with private pools",
            "Theme park access",
            "Spa and wellness facilities",
            "Multiple dining options",
            "Family-friendly activities",
        ],
        price: "RM1,300",
        discount: "RM 130",
        images: [
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",

            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",

        ],
        starRating: 5,
        guestRating: 8.5,
        comments: 1150,
        nearestLandmark: "Within Sunway Lagoon theme park",
        offers: ["Theme park tickets", "Spa discounts"],
        exclusiveOffer: null,
        earlyBirdDeal: true,
    },
    {
        id: "H0022",
        hotelName: "The Taaras Beach & Spa Resort",
        "location": {
            "area": "Redang Island",
        },
        features: [
            "Secluded beachfront location",
            "Luxury villas and suites",
            "Private beach and coral reef",
            "Spa and water sports center",
            "Fine dining and romantic getaways",
        ],
        price: "RM1,700",
        discount: null,
        images: [
            "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",

            "https://images.unsplash.com/photo-1483508005827-69a8a831b930?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",

        ],
        starRating: 5,
        guestRating: 8.8,
        comments: 680,
        nearestLandmark: "Accessible by boat from Merang Jetty",
        offers: ["Snorkeling trips", "Romantic dinners"],
        exclusiveOffer: "Honeymoon package with spa treatments",
        earlyBirdDeal: false,
    },
    {
        id: "H0023",
        hotelName: "The Haven All Suite Resort, Ipoh",
         "location": {
            "area": "Ipoh",
        },
        features: [
            "All-suite resort with lake views",
            "Infinity pool and water sports",
            "Spa and fitness center",
            "Multiple dining options",
            "Family-friendly activities",
        ],
        price: "RM650",
        discount: "RM 65",
        images: [
            "https://images.unsplash.com/photo-1560625610-8c96c73a452c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
        ],
        starRating: 4,
        guestRating: 7.3,
        comments: 1250,
        nearestLandmark: "Near Ipoh Railway Station and Kek Lok Tong Cave Temple",
        offers: ["Free breakfast", "Kids club"],
        exclusiveOffer: null,
        earlyBirdDeal: true,
    },
    {
        id: "H0024",
        hotelName: "The Chateau Bukit Tinggi",
        "location": {
            "area": "Bukit Tinggi",
        },
        features: [
            "Medieval-themed resort",
            "Scenic mountain views",
            "Horse riding and archery",
            "Spa and wellness center",
            "Unique dining experiences",
        ],
        price: "RM800",
        discount: null,
        images: [
            "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1501436513145-30f24e4a790e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",

        ],
        starRating: 4,
        guestRating: 7.2,
        comments: 580,
        nearestLandmark: "Close to Colmar Tropicale and Japanese Village",
        offers: ["Horse riding lessons", "Archery sessions"],
        exclusiveOffer: null,
        earlyBirdDeal: false,
    },
    {
        id: "H0025",
        hotelName: "The Lexis Hibiscus Port Dickson",
        "location": {
            "area": "Port Dickson",
        },
        features: [
            "Overwater villas with private pools",
            "Beachfront location",
            "Spa and wellness facilities",
            "Water sports activities",
            "Kids club and playground",
        ],
        price: "RM1,100",
        discount: "RM 110",
        images: [
            "https://images.unsplash.com/photo-1566438480900-06090e749e1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",


        ],
        starRating: 5,
        guestRating: 8.6,
        comments: 1020,
        nearestLandmark: "Near Ostrich Farm and Cape Rachado Lighthouse",
        offers: ["Free Wi-Fi", "Welcome drinks"],
        exclusiveOffer: null,
        earlyBirdDeal: true,
    },
];

export default hotelData;