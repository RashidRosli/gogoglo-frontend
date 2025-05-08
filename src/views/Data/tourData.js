const tourData = [
    {
        "id": "T0001",
        "country": "Thailand",
        "title": "Couples Unwind in Thailand",
        "duration": "3N/6D",
        "locations": ["2N Pattaya", "3N Bangkok"],
        "features": [
            "Round Trip Flights",
            "4 Star Hotels",
            "Airport Transfers",
            "10 Activities",
            "Selected Meals"
        ],
        "provide": [
            "City Tour",
            "Alcazar Show",
            "Coral Island & Underwater World"
        ],
        "price": "RM 5,645/Person Total Price RM 16,935",
        "discount": "RM 639",
        "imageUrl": "https://images.pexels.com/photos/358229/pexels-photo-358229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "galleryImages": [
            "https://images.pexels.com/photos/358229/pexels-photo-358229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/28381601/pexels-photo-28381601/free-photo-of-traditional-thai-floating-market-in-bangkok.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/26491552/pexels-photo-26491552/free-photo-of-anek-kusala-sala-museum-in-pattaya-city-in-thailand.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/951006/pexels-photo-951006.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/26575363/pexels-photo-26575363/free-photo-of-buddha-statue-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        ],
        "activitiesSightseeingImages": [
            "https://images.pexels.com/photos/11122211/pexels-photo-11122211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/20994445/pexels-photo-20994445/free-photo-of-sanctuary-of-truth-in-bangkok-in-thailand.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/20994437/pexels-photo-20994437/free-photo-of-golden-temples-in-nongnooch-tropical-garden-in-pattaya-in-thailand.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/20994448/pexels-photo-20994448/free-photo-of-sanctuary-of-truth-in-pattaya-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        ],
        "propertyImages": [
            "https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/2291624/pexels-photo-2291624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        ],
        "rating": "4 stars",
        "types": ["honeymoon", "fresh arrivals"],
        "itinerary": [
            {
                "day": 1,
                "title": "Arrival in Bangkok - Transfer to Pattaya",
                "included": ["Airport Transfer", "4-star hotel in Pattaya"],
                "details": [
                    "Arrive at Suvarnabhumi Airport in Bangkok. Meet your tour guide and transfer to Pattaya (approximately 2 hours).",
                    "Check in to your 4-star hotel and enjoy the rest of the day at leisure."
                ]
            },
            {
                "day": 2,
                "title": "Coral Island Excursion",
                "included": ["Boat trip to Coral Island", "Snorkeling equipment", "Underwater World Pattaya entrance", "Lunch"],
                "details": [
                    "Embark on a full-day excursion to Coral Island, where you can swim, sunbathe, and snorkel in the crystal-clear waters.",
                    "In the afternoon, explore the Underwater World Pattaya and marvel at the diverse marine life."
                ]
            },
            {
                "day": 3,
                "title": "Pattaya City Tour & Alcazar Show",
                "included": ["City tour with guide", "Entrance fees to Sanctuary of Truth and Nong Nooch Tropical Garden", "Alcazar Show ticket", "Dinner"],
                "details": [
                    "Enjoy a city tour of Pattaya, including visits to popular attractions like the Sanctuary of Truth and Nong Nooch Tropical Garden.",
                    "In the evening, be captivated by the dazzling Alcazar Show, a cabaret performance featuring talented transgender artists."
                ]
            },
            {
                "day": 4,
                "title": "Transfer to Bangkok - City Exploration",
                "included": ["Transfer to Bangkok", "4-star hotel in Bangkok"],
                "details": [
                    "Transfer from Pattaya to Bangkok (approximately 2 hours).",
                    "Check in to your 4-star hotel and spend the afternoon exploring the vibrant city at your own pace."
                ]
            },
            {
                "day": 5,
                "title": "Floating Markets & Temple Visits",
                "included": ["Guided tour of floating markets", "Longtail boat ride", "Entrance fees to temples"],
                "details": [
                    "Experience the iconic floating markets of Bangkok, where you can find unique souvenirs and delicious local delicacies.",
                    "Visit historical temples and immerse yourself in the rich cultural heritage of Thailand."
                ]
            },
            {
                "day": 6,
                "title": "Departure from Bangkok",
                "included": ["Airport Transfer"],
                "details": [
                    "Enjoy a leisurely morning before transferring to Suvarnabhumi Airport for your departure flight.",
                    "Bid farewell to Thailand and cherish the unforgettable memories created during your Couples Unwind tour."
                ]
            }
        ],
        "policies": [
            "**Booking Confirmation:** Your booking will be confirmed via email with a unique booking ID.",
            "**Payment Methods:** We accept major credit cards (Visa, Mastercard, American Express) and bank transfers. A 3% processing fee applies to credit card payments.",
            "**Cancellation Policy:** Cancellations made 30 days or more before the tour start date will receive a full refund. Cancellations made 15-29 days before the start date will be subject to a 50% cancellation fee. No refunds will be issued for cancellations made within 14 days of the start date.",
            "**Changes to Bookings:** Changes to booking dates or passenger details can be made up to 15 days before the tour start date, subject to availability and a RM 100 processing fee per change.",
            "**Passport and Visa:**  Ensure your passport is valid for at least 6 months beyond your intended stay in Thailand. Visa requirements vary depending on your nationality. Please check with the Royal Thai Embassy or Consulate in your country for specific requirements.",
            "**Travel Insurance:** Travel insurance is highly recommended. It should cover medical expenses, trip cancellation, lost baggage, and personal liability.",
            "**Health and Vaccination:** Consult your doctor regarding recommended vaccinations and health precautions for Thailand. Ensure you have any necessary medications and a basic first-aid kit.",
            "**Currency Exchange:** The local currency is the Thai Baht (THB). Currency exchange services are available at the airport and banks. ATMs are widely available in cities and tourist areas.",
            "**Hotel Check-in/Check-out:** Hotel check-in time is typically 2:00 PM, and check-out time is 12:00 PM. Early check-in or late check-out may be available upon request and subject to availability.",
            "**Meal Inclusions:**  Breakfast is included daily. Lunch and dinner are included as specified in the itinerary. Please inform us of any dietary restrictions or allergies at the time of booking.",
            "**Room Amenities:**  Hotel rooms typically include Wi-Fi, air conditioning, a private bathroom, and a television. Specific amenities may vary depending on the hotel.",
            "**Activity Confirmation:** You will receive vouchers or confirmation details for activities and excursions via email. Please present these vouchers at the designated meeting points.",
            "**Activity Inclusions:** Activity inclusions are specified in the itinerary. This may include entrance fees, equipment rental, and guide services.",
            "**Activity Restrictions:** Some activities may have age, health, or other restrictions. Please review the details of each activity before booking.",
            "**Optional Activities:**  A variety of optional activities are available. You can book these through your tour guide or at the hotel.",
            "**Liability Disclaimer:** We are not liable for any accidents, injuries, or losses incurred during the tour. We recommend taking necessary precautions and following safety guidelines.",
            "**Safety Guidelines:** Be mindful of your personal belongings and surroundings. Respect local laws and customs. In case of an emergency, contact your tour guide or the local authorities.",
            "**Emergency Contact:** In case of an emergency, contact your tour guide or the following numbers: [Local Emergency Number], [Tour Operator Emergency Contact].",
            "**Travel Advisories:** For the latest travel advisories and safety information, please refer to your government's travel website.",
            "**Code of Conduct:** We expect all travelers to behave responsibly and respectfully towards local communities and the environment.",
            "**Environmental Responsibility:** We encourage sustainable tourism practices. Please conserve water and energy, dispose of waste properly, and respect wildlife."
        ],
        "summary": [
            {
                "label": "Flights",
                "items": [
                    "Fly with Thai Airways (or similar) from your chosen departure point to Bangkok and back.",
                    "Your flight details will be provided in your booking confirmation."
                ]
            },
            {
                "label": "Accommodation",
                "items": [
                    "Stay at the Avani Pattaya Resort (or similar) for 2 nights in Pattaya.",
                    "Enjoy 3 nights at the Amara Bangkok Hotel (or similar) in Bangkok."
                ]
            },
            {
                "label": "Activities",
                "items": [
                    "Full-day excursion to Coral Island, including a speedboat trip, snorkeling, and a visit to the Underwater World Pattaya.",
                    "Guided city tour of Pattaya, including visits to the Sanctuary of Truth and Nong Nooch Tropical Garden.",
                    "Tickets to the Alcazar Show, a famous transgender cabaret performance.",
                    "Guided tour of Bangkok's Damnoen Saduak Floating Market with a longtail boat ride."
                ]
            },
            {
                "label": "Meals",
                "items": [
                    "Daily breakfast at your hotels.",
                    "Lunch on Day 2 at a local restaurant on Coral Island.",
                    "Dinner on Day 3 after the Alcazar Show."
                ]
            },
            {
                "label": "Transfers",
                "items": [
                    "Private airport transfers upon arrival and departure in Bangkok.",
                    "All transportation between destinations and activities is included."
                ]
            }
        ],
        "offers": [
            {
                "type": "discount",
                "title": "Early Bird Discount",
                "description": "Book your tour 6 months in advance and enjoy 15% off the total price."
            },
            {
                "type": "value-added",
                "title": "Free Room Upgrade",
                "description": "Enjoy a complimentary upgrade to the next room category at your hotel in Pattaya."
            },
            {
                "type": "referral",
                "title": "Refer a Friend",
                "description": "Refer a friend to book this tour and both of you will receive RM 100 off your next booking."
            }
        ]
    },
    {
        id: "T0002",
        country: "Thailand",
        title: "Couples Choice - Thailand",
        duration: "6N/7D",
        locations: ["2N Krabi", "1N Phi Phi Island", "3N Phuket"],
        features: [
            "Round Trip Flights",
            "4 Star Hotels",
            "Airport Transfers",
            "6 Activities",
            "Selected Meals",
        ],
        provide: [
            "City Tour",
            "James Bond Island Tour",
            "Hot Spring & Emerald Lagoon Tour",
        ],
        price: "RM 6,284/Person Total Price RM 18,852",
        discount: "RM 710",
        imageUrl:
            "https://images.pexels.com/photos/176398/pexels-photo-176398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: "5 stars",
        types: ["honeymoon", "premium holidays"],
    },
    {
        id: "T0003",
        country: "Thailand",
        title: "Bangkok & Pattaya Delight",
        duration: "4N/5D",
        locations: ["2N Bangkok", "2N Pattaya"],
        features: [
            "4 Star Hotels",
            "Daily Breakfast",
            "City Tours",
            "Coral Island Tour",
            "Safari World with Marine Park",
        ],
        provide: ["Welcome Drink", "Free Wi-Fi"],
        price: "RM 2,100/Person Total Price RM 8,400",
        discount: null,
        imageUrl:
            "https://images.pexels.com/photos/3732494/pexels-photo-3732494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: "4 stars",
        types: ["family vacation", "group tours"],
    },
    {
        id: "T0004",
        country: "Thailand",
        title: "Phuket & Krabi Explorer",
        duration: "5N/6D",
        locations: ["3N Phuket", "2N Krabi"],
        features: [
            "4 Star Hotels",
            "Airport Transfers",
            "Phi Phi Island Tour",
            "James Bond Island Tour",
            "Speedboat Transfers",
        ],
        provide: ["Snorkeling Gear", "Kayaking"],
        price: "RM 3,850/Person Total Price RM 15,400",
        discount: null,
        imageUrl:
            "https://images.pexels.com/photos/2867732/pexels-photo-2867732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: "5 stars",
        types: ["family vacation", "premium holidays"],
    },
    {
        id: "T0005",
        country: "Thailand",
        title: "Historical Charm of Chiang Mai",
        duration: "4N/5D",
        locations: ["4N Chiang Mai"],
        features: [
            "3 Star Hotels",
            "Daily Breakfast",
            "Doi Suthep Temple Visit",
            "Elephant Sanctuary Experience",
            "Cooking Class",
        ],
        provide: ["Local Market Tour", "Traditional Dance Show"],
        price: "RM 1,800/Person Total Price RM 7,200",
        discount: null,
        imageUrl:
            "https://images.pexels.com/photos/248082/pexels-photo-248082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: "3 stars",
        types: ["long stays", "fresh arrivals"],
    },
    {
        id: "T0006",
        country: "Thailand",
        title: "Island Hopping in Koh Phi Phi",
        duration: "3N/4D",
        locations: ["3N Koh Phi Phi"],
        features: [
            "Speedboat Transfers",
            "Snorkeling & Diving",
            "Maya Bay Visit",
            "Bamboo Island Trip",
            "Beachside Accommodation",
        ],
        provide: ["Fire Show", "Beach BBQ"],
        price: "RM 2,500/Person Total Price RM 10,000",
        discount: null,
        imageUrl:
            "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: "4 stars",
        types: ["group tours", "fresh arrivals"],
    },
    {
        id: "T0007",
        country: "Thailand",
        title: "Luxury Escape in Koh Samui",
        duration: "5N/6D",
        locations: ["5N Koh Samui"],
        features: [
            "5 Star Hotels",
            "Private Pool Villas",
            "Spa Treatments",
            "Fine Dining Experiences",
            "Airport Transfers",
        ],
        provide: ["Yoga Classes", "Island Tours"],
        price: "RM 8,500/Person Total Price RM 34,000",
        discount: "RM 1,000",
        imageUrl:
            "https://images.pexels.com/photos/5601756/pexels-photo-5601756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: "5 stars",
        types: ["honeymoon", "premium holidays"],
    },
    {
        id: "T0008",
        country: "Thailand",
        title: "Adventure in Khao Sok National Park",
        duration: "3N/4D",
        locations: ["3N Khao Sok"],
        features: [
            "Jungle Trekking",
            "Wildlife Spotting",
            "Lake Tours",
            "Cave Exploration",
            "Eco-friendly Lodges",
        ],
        provide: ["Night Safari", "Bird Watching"],
        price: "RM 1,500/Person Total Price RM 6,000",
        discount: null,
        imageUrl:
            "https://images.pexels.com/photos/797868/pexels-photo-797868.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: "3 stars",
        types: ["group tours", "long stays"],
    },
    {
        id: "T0009",
        country: "Thailand",
        title: "Cultural Immersion in Ayutthaya",
        duration: "2N/3D",
        locations: ["2N Ayutthaya"],
        features: [
            "Historical Temple Tours",
            "River Cruises",
            "Local Market Visits",
            "Traditional Thai Massage",
            "Authentic Accommodation",
        ],
        provide: ["Cycling Tours", "Museum Visits"],
        price: "RM 1,200/Person Total Price RM 4,800",
        discount: null,
        imageUrl:
            "https://images.pexels.com/photos/2108229/pexels-photo-2108229.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: "3 stars",
        types: ["long stays", "fresh arrivals"],
    },
    {
        id: "T0010",
        country: "Thailand",
        title: "Family Fun in Hua Hin",
        duration: "4N/5D",
        locations: ["4N Hua Hin"],
        features: [
            "Family-Friendly Resorts",
            "Water Park Access",
            "Beach Activities",
            "Kids' Clubs",
            "Optional Day Trips",
        ],
        provide: ["Children's Meals", "Babysitting Services"],
        price: "RM 4,200/Person Total Price RM 16,800",
        discount: null,
        imageUrl:
            "https://images.pexels.com/photos/579601/pexels-photo-579601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: "4 stars",
        types: ["family vacation"],
    },
    {
        id: "T0011",
        country: "Thailand",
        title: "Serene Escape to Koh Lanta",
        duration: "5N/6D",
        locations: ["5N Koh Lanta"],
        features: [
            "Relaxing Beachfront Bungalows",
            "Snorkeling & Diving Opportunities",
            "Island Hopping Tours",
            "Thai Cooking Classes",
            "Yoga & Meditation Retreats",
        ],
        provide: ["Free Wi-Fi", "Airport Transfers"],
        price: "RM 3,200/Person Total Price RM 12,800",
        discount: null,
        imageUrl:
            "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: "4 stars",
        types: ["honeymoon", "premium holidays"],
    },
    {
        id: "T0012",
        country: "Thailand",
        title: "Wildlife Adventure in Khao Yai National Park",
        duration: "4N/5D",
        locations: ["4N Khao Yai"],
        features: [
            "Jungle Trekking & Hiking",
            "Wildlife Spotting (Elephants, Gibbons)",
            "Waterfall Visits",
            "Night Safaris",
            "Comfortable Lodges",
        ],
        provide: ["Experienced Guides", "Park Entrance Fees"],
        price: "RM 2,800/Person Total Price RM 11,200",
        discount: null,
        imageUrl:
            "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: "3 stars",
        types: ["group tours", "long stays"],
    },
    {
        id: "T0013",
        country: "Thailand",
        title: "Historic Journey Through Sukhothai",
        duration: "3N/4D",
        locations: ["3N Sukhothai"],
        features: [
            "Ancient Temple Explorations",
            "Historical Park Tours",
            "Bicycle Rentals",
            "Traditional Thai Performances",
            "Charming Guesthouses",
        ],
        provide: ["Local Guides", "Museum Entry"],
        price: "RM 1,600/Person Total Price RM 6,400",
        discount: null,
        imageUrl:
            "https://images.pexels.com/photos/26841784/pexels-photo-26841784/free-photo-of-guan-yin-statue-at-wat-huay-pla-kang-buddhist-temple-in-chiang-rai-thailand.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: "3 stars",
        types: ["long stays", "fresh arrivals"],
    },
    {
        id: "T0014",
        country: "Thailand",
        title: "Floating Market Fun in Damnoen Saduak",
        duration: "2N/3D",
        locations: ["2N Damnoen Saduak"],
        features: [
            "Longtail Boat Rides",
            "Floating Market Shopping",
            "Local Village Visits",
            "Coconut Farm Tours",
            "Riverside Accommodation",
        ],
        provide: ["Market Entrance Fees", "Fruit Tasting"],
        price: "RM 1,000/Person Total Price RM 4,000",
        discount: null,
        imageUrl:
            "https://images.pexels.com/photos/1671479/pexels-photo-1671479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: "2 stars",
        types: ["family vacation", "group tours"],
    },
    {
        id: "T0015",
        country: "Thailand",
        title: "Luxury Getaway in Koh Lipe",
        duration: "6N/7D",
        locations: ["6N Koh Lipe"],
        features: [
            "5-Star Resorts & Villas",
            "Private Beach Access",
            "Infinity Pools",
            "Spa Treatments",
            "Fine Dining",
        ],
        provide: ["Sunset Cruises", "Snorkeling Gear"],
        price: "RM 9,800/Person Total Price RM 39,200",
        discount: "RM 1,200",
        imageUrl:
            "https://images.pexels.com/photos/28544981/pexels-photo-28544981/free-photo-of-golden-buddha-statue-at-wat-phra-yai-thailand.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: "5 stars",
        types: ["honeymoon", "premium holidays"],
    },
    {
        id: "T0016",
        country: "Thailand",
        title: "Island Hopping Adventure in the Similan Islands",
        duration: "3N/4D",
        locations: ["3N Similan Islands"],
        features: [
            "Speedboat Transfers",
            "Snorkeling & Diving at Coral Reefs",
            "Island Exploration",
            "Beach Camping",
            "Wildlife Encounters",
        ],
        provide: ["Meals & Snacks", "Camping Equipment"],
        price: "RM 2,400/Person Total Price RM 9,600",
        discount: null,
        imageUrl:
            "https://images.pexels.com/photos/3601426/pexels-photo-3601426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: "4 stars",
        types: ["group tours", "fresh arrivals"],
    },
    {
        id: "T0017",
        country: "Thailand",
        title: "Trekking & Temples in Northern Thailand",
        duration: "7N/8D",
        locations: ["3N Chiang Mai", "2N Pai", "2N Chiang Rai"],
        features: [
            "Hill Tribe Village Visits",
            "Jungle Trekking",
            "Temple Tours",
            "Cooking Classes",
            "Scenic Drives",
        ],
        provide: ["Local Guides", "Transportation"],
        price: "RM 4,500/Person Total Price RM 18,000",
        discount: "RM 500",
        imageUrl:
            "https://images.pexels.com/photos/2797526/pexels-photo-2797526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: "4 stars",
        types: ["group tours", "long stays"],
    },
    {
        id: "T0018",
        country: "Thailand",
        title: "Romantic Retreat in Pai",
        duration: "4N/5D",
        locations: ["4N Pai"],
        features: [
            "Scenic Mountain Views",
            "Relaxing Hot Springs",
            "Waterfall Hikes",
            "Couple's Massages",
            "Charming Boutique Hotels",
        ],
        provide: ["Scooter Rental", "Breakfast in Bed"],
        price: "RM 2,100/Person Total Price RM 8,400",
        discount: null,
        imageUrl:
            "https://images.pexels.com/photos/325879/pexels-photo-325879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: "3 stars",
        types: ["honeymoon", "fresh arrivals"],
    },
    {
        id: "T0019",
        country: "Thailand",
        "title": "Beach Bliss in Koh Samet",
        "duration": "3N/4D",
        "locations": ["3N Koh Samet"],
        "features": [
            "White Sand Beaches",
            "Crystal Clear Waters",
            "Water Sports",
            "Beachfront Bars & Restaurants",
            "Relaxing Atmosphere"
        ],
        "provide": [
            "Ferry Transfers",
            "Beach Chairs"
        ],
        "price": "RM 1,800/Person Total Price RM 7,200",
        "discount": null,
        "imageUrl": "https://images.pexels.com/photos/1528607/pexels-photo-1528607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "rating": "3 stars",
        types: ["family vacation", "fresh arrivals"],
    },
    {
        id: "T0020",
        country: "Thailand",
        title: "Cultural Exploration in Kanchanaburi",
        duration: "4N/5D",
        locations: ["4N Kanchanaburi"],
        features: [
            "Bridge over the River Kwai",
            "War Cemeteries & Museums",
            "Erawan National Park",
            "Elephant Encounters",
            "River Kwai Cruises",
        ],
        provide: ["Historical Guides", "Entrance Fees"],
        price: "RM 2,500/Person Total Price RM 10,000",
        discount: "RM 300",
        imageUrl:
            "https://images.pexels.com/photos/1321777/pexels-photo-1321777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: "4 stars",
        types: ["long stays", "premium holidays"],
    },
];

export default tourData;