// src/views/Data/flightData.js
const flightData = [
    {
        id: "FL00001",
        airlines: ["Malaysia Airlines", "Qatar Airways"],
        departure: "Kuala Lumpur (KUL)",
        arrival: "London Heathrow (LHR)",
        departureTime: "10:00 PM",
        arrivalTime: "06:30 AM",
        duration: 810, // Adjusted to 13h 30m (realistic with time zones)
        stops: 1,
        legs: [
            {
                airline: "Malaysia Airlines",
                departureAirport: "Kuala Lumpur (KUL)",
                arrivalAirport: "Doha (DOH)",
                airplane: "Airbus A350-900",
                departureTime: new Date("2025-03-08T22:00:00"), // March 1, 2025, 10:00 PM MYT
                arrivalTime: new Date("2025-03-09T01:00:00"),   // March 2, 2025, 1:00 AM AST
            },
            {
                airline: "Qatar Airways",
                departureAirport: "Doha (DOH)",
                arrivalAirport: "London Heathrow (LHR)",
                airplane: "Airbus A380-800",
                departureTime: new Date("2025-03-09T02:30:00"), // March 2, 2025, 2:30 AM AST
                arrivalTime: new Date("2025-03-09T06:30:00"),   // March 2, 2025, 6:30 AM GMT
            },
        ],
        fareTypes: [
            { name: "Economy Lite", travelClass: "Economy", price: "RM 1800", seat: "Standard Seat", bags: "1 Checked Bag (23kg)", flexibility: "Non-refundable", loungeAccess: false },
            { name: "Economy Flex", travelClass: "Economy", price: "RM 2200", seat: "Extra Legroom", bags: "2 Checked Bags (23kg)", flexibility: "Changeable", loungeAccess: false },
            { name: "Premium Economy", travelClass: "Premium Economy", price: "RM 3500", seat: "Premium Seat", bags: "2 Checked Bags (25kg)", flexibility: "Changeable", loungeAccess: false },
            { name: "Business Standard", travelClass: "Business", price: "RM 6000", seat: "Lie-flat Bed", bags: "2 Checked Bags (30kg)", flexibility: "Changeable", loungeAccess: true },
            { name: "First Class", travelClass: "First", price: "RM 12000", seat: "Private Suite", bags: "3 Checked Bags (32kg)", flexibility: "Fully Refundable", loungeAccess: true },
        ],
        layoverAirports: ["Doha (DOH)"],
    },
    {
        id: "FL00002",
        airlines: ["British Airways"],
        departure: "Kuala Lumpur (KUL)",
        arrival: "London Heathrow (LHR)",
        departureTime: "10:30 PM",
        arrivalTime: "04:30 AM",
        duration: 720, // 12h (non-stop, adjusted for realism)
        stops: 0,
        legs: [
            {
                airline: "British Airways",
                departureAirport: "Kuala Lumpur (KUL)",
                arrivalAirport: "London Heathrow (LHR)",
                airplane: "Boeing 787-9",
                departureTime: new Date("2025-03-08T22:30:00"), // March 1, 2025, 10:30 PM MYT
                arrivalTime: new Date("2025-03-09T04:30:00"),   // March 2, 2025, 4:30 AM GMT
            },
        ],
        fareTypes: [
            { name: "Economy Basic", travelClass: "Economy", price: "RM 2500", seat: "Standard Seat", bags: "1 Checked Bag (23kg)", flexibility: "Non-refundable", loungeAccess: false },
            { name: "Economy Plus", travelClass: "Economy", price: "RM 2900", seat: "Extra Legroom", bags: "2 Checked Bags (23kg)", flexibility: "Changeable", loungeAccess: false },
            { name: "Premium Economy", travelClass: "Premium Economy", price: "RM 4500", seat: "Premium Seat", bags: "2 Checked Bags (25kg)", flexibility: "Changeable", loungeAccess: false },
            { name: "Business Class", travelClass: "Business", price: "RM 8000", seat: "Lie-flat Bed", bags: "2 Checked Bags (30kg)", flexibility: "Fully Refundable", loungeAccess: true },
            { name: "First Class", travelClass: "First", price: "RM 14000", seat: "Private Suite", bags: "3 Checked Bags (32kg)", flexibility: "Fully Refundable", loungeAccess: true },
        ],
        layoverAirports: [],
    },
    {
        id: "FL00003",
        airlines: ["Emirates"],
        departure: "Kuala Lumpur (KUL)",
        arrival: "London Heathrow (LHR)",
        departureTime: "08:55 PM",
        arrivalTime: "05:25 AM",
        duration: 870, // 14h 30m
        stops: 1,
        legs: [
            {
                airline: "Emirates",
                departureAirport: "Kuala Lumpur (KUL)",
                arrivalAirport: "Dubai (DXB)",
                airplane: "Airbus A380-800",
                departureTime: new Date("2025-03-08T20:55:00"), // March 1, 2025, 8:55 PM MYT
                arrivalTime: new Date("2025-03-08T23:55:00"),   // March 1, 2025, 11:55 PM GST
            },
            {
                airline: "Emirates",
                departureAirport: "Dubai (DXB)",
                arrivalAirport: "London Heathrow (LHR)",
                airplane: "Boeing 777-300ER",
                departureTime: new Date("2025-03-09T01:25:00"), // March 2, 2025, 1:25 AM GST
                arrivalTime: new Date("2025-03-09T05:25:00"),   // March 2, 2025, 5:25 AM GMT
            },
        ],
        fareTypes: [
            { name: "Economy Saver", travelClass: "Economy", price: "RM 2000", seat: "Standard Seat", bags: "1 Checked Bag (23kg)", flexibility: "Non-refundable", loungeAccess: false },
            { name: "Economy Flex", travelClass: "Economy", price: "RM 2400", seat: "Extra Legroom", bags: "2 Checked Bags (23kg)", flexibility: "Changeable", loungeAccess: false },
            { name: "Premium Economy", travelClass: "Premium Economy", price: "RM 4200", seat: "Premium Seat", bags: "2 Checked Bags (25kg)", flexibility: "Changeable", loungeAccess: false },
            { name: "Business Class", travelClass: "Business", price: "RM 6500", seat: "Lie-flat Bed", bags: "2 Checked Bags (30kg)", flexibility: "Fully Refundable", loungeAccess: true },
            { name: "First Class", travelClass: "First", price: "RM 13000", seat: "Private Suite", bags: "3 Checked Bags (32kg)", flexibility: "Fully Refundable", loungeAccess: true },
        ],
        layoverAirports: ["Dubai (DXB)"],
    },
    {
        id: "FL00004",
        airlines: ["Singapore Airlines"],
        departure: "Kuala Lumpur (KUL)",
        arrival: "London Heathrow (LHR)",
        departureTime: "11:00 PM",
        arrivalTime: "10:30 AM",
        duration: 900, // 15h
        stops: 1,
        legs: [
            {
                airline: "Singapore Airlines",
                departureAirport: "Kuala Lumpur (KUL)",
                arrivalAirport: "Singapore (SIN)",
                airplane: "Airbus A350-900",
                departureTime: new Date("2025-03-08T23:00:00"), // March 1, 2025, 11:00 PM MYT
                arrivalTime: new Date("2025-03-09T00:00:00"),   // March 2, 2025, 12:00 AM SGT
            },
            {
                airline: "Singapore Airlines",
                departureAirport: "Singapore (SIN)",
                arrivalAirport: "London Heathrow (LHR)",
                airplane: "Airbus A380-800",
                departureTime: new Date("2025-03-09T02:30:00"), // March 2, 2025, 2:30 AM SGT
                arrivalTime: new Date("2025-03-09T10:30:00"),   // March 2, 2025, 10:30 AM GMT
            },
        ],
        fareTypes: [
            { name: "Economy Lite", travelClass: "Economy", price: "RM 1900", seat: "Standard Seat", bags: "1 Checked Bag (23kg)", flexibility: "Non-refundable", loungeAccess: false },
            { name: "Economy Plus", travelClass: "Economy", price: "RM 2300", seat: "Extra Legroom", bags: "2 Checked Bags (23kg)", flexibility: "Changeable", loungeAccess: false },
            { name: "Premium Economy", travelClass: "Premium Economy", price: "RM 4000", seat: "Premium Seat", bags: "2 Checked Bags (25kg)", flexibility: "Changeable", loungeAccess: false },
            { name: "Business Class", travelClass: "Business", price: "RM 7000", seat: "Lie-flat Bed", bags: "2 Checked Bags (30kg)", flexibility: "Fully Refundable", loungeAccess: true },
            { name: "First Class", travelClass: "First", price: "RM 13500", seat: "Private Suite", bags: "3 Checked Bags (32kg)", flexibility: "Fully Refundable", loungeAccess: true },
        ],
        layoverAirports: ["Singapore (SIN)"],
    },
    {
        id: "FL00005",
        airlines: ["Turkish Airlines"],
        departure: "Kuala Lumpur (KUL)",
        arrival: "London Heathrow (LHR)",
        departureTime: "11:00 PM",
        arrivalTime: "08:30 AM",
        duration: 930, // 15h 30m
        stops: 1,
        legs: [
            {
                airline: "Turkish Airlines",
                departureAirport: "Kuala Lumpur (KUL)",
                arrivalAirport: "Istanbul (IST)",
                airplane: "Boeing 777-300ER",
                departureTime: new Date("2025-03-08T23:00:00"), // March 1, 2025, 11:00 PM MYT
                arrivalTime: new Date("2025-03-09T05:00:00"),   // March 2, 2025, 5:00 AM TRT
            },
            {
                airline: "Turkish Airlines",
                departureAirport: "Istanbul (IST)",
                arrivalAirport: "London Heathrow (LHR)",
                airplane: "Airbus A321",
                departureTime: new Date("2025-03-09T07:00:00"), // March 2, 2025, 7:00 AM TRT
                arrivalTime: new Date("2025-03-09T08:30:00"),   // March 2, 2025, 8:30 AM GMT
            },
        ],
        fareTypes: [
            { name: "Economy Basic", travelClass: "Economy", price: "RM 1700", seat: "Standard Seat", bags: "1 Checked Bag (23kg)", flexibility: "Non-refundable", loungeAccess: false },
            { name: "Economy Flex", travelClass: "Economy", price: "RM 2100", seat: "Extra Legroom", bags: "2 Checked Bags (23kg)", flexibility: "Changeable", loungeAccess: false },
            { name: "Premium Economy", travelClass: "Premium Economy", price: "RM 3800", seat: "Premium Seat", bags: "2 Checked Bags (25kg)", flexibility: "Changeable", loungeAccess: false },
            { name: "Business Class", travelClass: "Business", price: "RM 6200", seat: "Lie-flat Bed", bags: "2 Checked Bags (30kg)", flexibility: "Fully Refundable", loungeAccess: true },
            { name: "First Class", travelClass: "First", price: "RM 12500", seat: "Private Suite", bags: "3 Checked Bags (32kg)", flexibility: "Fully Refundable", loungeAccess: true },
        ],
        layoverAirports: ["Istanbul (IST)"],
    },
    {
        id: "FL00006",
        airlines: ["KLM", "Air France"],
        departure: "Kuala Lumpur (KUL)",
        arrival: "London Heathrow (LHR)",
        departureTime: "10:30 PM",
        arrivalTime: "08:00 AM",
        duration: 900, // 15h
        stops: 1,
        legs: [
            {
                airline: "KLM",
                departureAirport: "Kuala Lumpur (KUL)",
                arrivalAirport: "Amsterdam (AMS)",
                airplane: "Boeing 777-300ER",
                departureTime: new Date("2025-03-08T22:30:00"), // March 1, 2025, 10:30 PM MYT
                arrivalTime: new Date("2025-03-09T05:30:00"),   // March 2, 2025, 5:30 AM CET
            },
            {
                airline: "Air France",
                departureAirport: "Amsterdam (AMS)",
                arrivalAirport: "London Heathrow (LHR)",
                airplane: "Airbus A320",
                departureTime: new Date("2025-03-09T07:00:00"), // March 2, 2025, 7:00 AM CET
                arrivalTime: new Date("2025-03-09T08:00:00"),   // March 2, 2025, 8:00 AM GMT
            },
        ],
        fareTypes: [
            { name: "Economy Lite", travelClass: "Economy", price: "RM 1750", seat: "Standard Seat", bags: "1 Checked Bag (23kg)", flexibility: "Non-refundable", loungeAccess: false },
            { name: "Economy Flex", travelClass: "Economy", price: "RM 2150", seat: "Extra Legroom", bags: "2 Checked Bags (23kg)", flexibility: "Changeable", loungeAccess: false },
            { name: "Premium Economy", travelClass: "Premium Economy", price: "RM 3900", seat: "Premium Seat", bags: "2 Checked Bags (25kg)", flexibility: "Changeable", loungeAccess: false },
            { name: "Business Class", travelClass: "Business", price: "RM 6300", seat: "Lie-flat Bed", bags: "2 Checked Bags (30kg)", flexibility: "Fully Refundable", loungeAccess: true },
            { name: "First Class", travelClass: "First", price: "RM 12800", seat: "Private Suite", bags: "3 Checked Bags (32kg)", flexibility: "Fully Refundable", loungeAccess: true },
        ],
        layoverAirports: ["Amsterdam (AMS)"],
    },
    {
        id: "FL00007",
        airlines: ["Japan Airlines"],
        departure: "Kuala Lumpur (KUL)",
        arrival: "London Heathrow (LHR)",
        departureTime: "11:30 PM",
        arrivalTime: "11:00 AM",
        duration: 960, // 16h
        stops: 1,
        legs: [
            {
                airline: "Japan Airlines",
                departureAirport: "Kuala Lumpur (KUL)",
                arrivalAirport: "Tokyo (NRT)",
                airplane: "Boeing 787-9",
                departureTime: new Date("2025-03-08T23:30:00"), // March 1, 2025, 11:30 PM MYT
                arrivalTime: new Date("2025-03-09T07:30:00"),   // March 2, 2025, 7:30 AM JST
            },
            {
                airline: "Japan Airlines",
                departureAirport: "Tokyo (NRT)",
                arrivalAirport: "London Heathrow (LHR)",
                airplane: "Boeing 777-300ER",
                departureTime: new Date("2025-03-09T09:00:00"), // March 2, 2025, 9:00 AM JST
                arrivalTime: new Date("2025-03-09T11:00:00"),   // March 2, 2025, 11:00 AM GMT
            },
        ],
        fareTypes: [
            { name: "Economy Basic", travelClass: "Economy", price: "RM 2100", seat: "Standard Seat", bags: "1 Checked Bag (23kg)", flexibility: "Non-refundable", loungeAccess: false },
            { name: "Economy Flex", travelClass: "Economy", price: "RM 2500", seat: "Extra Legroom", bags: "2 Checked Bags (23kg)", flexibility: "Changeable", loungeAccess: false },
            { name: "Premium Economy", travelClass: "Premium Economy", price: "RM 4300", seat: "Premium Seat", bags: "2 Checked Bags (25kg)", flexibility: "Changeable", loungeAccess: false },
            { name: "Business Class", travelClass: "Business", price: "RM 6700", seat: "Lie-flat Bed", bags: "2 Checked Bags (30kg)", flexibility: "Fully Refundable", loungeAccess: true },
            { name: "First Class", travelClass: "First", price: "RM 13200", seat: "Private Suite", bags: "3 Checked Bags (32kg)", flexibility: "Fully Refundable", loungeAccess: true },
        ],
        layoverAirports: ["Tokyo (NRT)"],
    },
    {
        id: "FL00008",
        airlines: ["Etihad Airways"],
        departure: "Kuala Lumpur (KUL)",
        arrival: "London Heathrow (LHR)",
        departureTime: "10:45 PM",
        arrivalTime: "07:45 AM",
        duration: 840, // 14h
        stops: 1,
        legs: [
            {
                airline: "Etihad Airways",
                departureAirport: "Kuala Lumpur (KUL)",
                arrivalAirport: "Abu Dhabi (AUH)",
                airplane: "Boeing 787-9",
                departureTime: new Date("2025-03-08T22:45:00"), // March 1, 2025, 10:45 PM MYT
                arrivalTime: new Date("2025-03-09T01:45:00"),   // March 2, 2025, 1:45 AM GST
            },
            {
                airline: "Etihad Airways",
                departureAirport: "Abu Dhabi (AUH)",
                arrivalAirport: "London Heathrow (LHR)",
                airplane: "Airbus A380-800",
                departureTime: new Date("2025-03-09T03:15:00"), // March 2, 2025, 3:15 AM GST
                arrivalTime: new Date("2025-03-09T07:45:00"),   // March 2, 2025, 7:45 AM GMT
            },
        ],
        fareTypes: [
            { name: "Economy Saver", travelClass: "Economy", price: "RM 1850", seat: "Standard Seat", bags: "1 Checked Bag (23kg)", flexibility: "Non-refundable", loungeAccess: false },
            { name: "Economy Flex", travelClass: "Economy", price: "RM 2250", seat: "Extra Legroom", bags: "2 Checked Bags (23kg)", flexibility: "Changeable", loungeAccess: false },
            { name: "Premium Economy", travelClass: "Premium Economy", price: "RM 4100", seat: "Premium Seat", bags: "2 Checked Bags (25kg)", flexibility: "Changeable", loungeAccess: false },
            { name: "Business Class", travelClass: "Business", price: "RM 6400", seat: "Lie-flat Bed", bags: "2 Checked Bags (30kg)", flexibility: "Fully Refundable", loungeAccess: true },
            { name: "First Class", travelClass: "First", price: "RM 13000", seat: "Private Suite", bags: "3 Checked Bags (32kg)", flexibility: "Fully Refundable", loungeAccess: true },
        ],
        layoverAirports: ["Abu Dhabi (AUH)"],
    },
    {
        id: "FL00009",
        airlines: ["Lufthansa"],
        departure: "Kuala Lumpur (KUL)",
        arrival: "London Heathrow (LHR)",
        departureTime: "11:15 PM",
        arrivalTime: "07:45 AM",
        duration: 870, // 14h 30m
        stops: 1,
        legs: [
            {
                airline: "Lufthansa",
                departureAirport: "Kuala Lumpur (KUL)",
                arrivalAirport: "Frankfurt (FRA)",
                airplane: "Airbus A340-600",
                departureTime: new Date("2025-03-08T23:15:00"), // March 1, 2025, 11:15 PM MYT
                arrivalTime: new Date("2025-03-09T05:45:00"),   // March 2, 2025, 5:45 AM CET
            },
            {
                airline: "Lufthansa",
                departureAirport: "Frankfurt (FRA)",
                arrivalAirport: "London Heathrow (LHR)",
                airplane: "Airbus A320",
                departureTime: new Date("2025-03-09T07:15:00"), // March 2, 2025, 7:15 AM CET
                arrivalTime: new Date("2025-03-09T07:45:00"),   // March 2, 2025, 7:45 AM GMT
            },
        ],
        fareTypes: [
            { name: "Economy Lite", travelClass: "Economy", price: "RM 1800", seat: "Standard Seat", bags: "1 Checked Bag (23kg)", flexibility: "Non-refundable", loungeAccess: false },
            { name: "Economy Flex", travelClass: "Economy", price: "RM 2200", seat: "Extra Legroom", bags: "2 Checked Bags (23kg)", flexibility: "Changeable", loungeAccess: false },
            { name: "Premium Economy", travelClass: "Premium Economy", price: "RM 4000", seat: "Premium Seat", bags: "2 Checked Bags (25kg)", flexibility: "Changeable", loungeAccess: false },
            { name: "Business Class", travelClass: "Business", price: "RM 6500", seat: "Lie-flat Bed", bags: "2 Checked Bags (30kg)", flexibility: "Fully Refundable", loungeAccess: true },
            { name: "First Class", travelClass: "First", price: "RM 12800", seat: "Private Suite", bags: "3 Checked Bags (32kg)", flexibility: "Fully Refundable", loungeAccess: true },
        ],
        layoverAirports: ["Frankfurt (FRA)"],
    },
    {
        id: "FL00010",
        airlines: ["Qatar Airways"],
        departure: "Kuala Lumpur (KUL)",
        arrival: "London Heathrow (LHR)",
        departureTime: "02:00 AM",
        arrivalTime: "01:00 PM",
        duration: 1020, // 17h (longer layover)
        stops: 2,
        legs: [
            {
                airline: "Qatar Airways",
                departureAirport: "Kuala Lumpur (KUL)",
                arrivalAirport: "Doha (DOH)",
                airplane: "Airbus A350-1000",
                departureTime: new Date("2025-03-09T02:00:00"), // March 2, 2025, 2:00 AM MYT
                arrivalTime: new Date("2025-03-09T05:00:00"),   // March 2, 2025, 5:00 AM AST
            },
            {
                airline: "Qatar Airways",
                departureAirport: "Doha (DOH)",
                arrivalAirport: "Paris (CDG)",
                airplane: "Boeing 777-300ER",
                departureTime: new Date("2025-03-09T08:00:00"), // March 2, 2025, 8:00 AM AST
                arrivalTime: new Date("2025-03-09T12:00:00"),   // March 2, 2025, 12:00 PM CET
            },
            {
                airline: "Qatar Airways",
                departureAirport: "Paris (CDG)",
                arrivalAirport: "London Heathrow (LHR)",
                airplane: "Airbus A320",
                departureTime: new Date("2025-03-09T13:00:00"), // March 2, 2025, 1:00 PM CET
                arrivalTime: new Date("2025-03-09T13:00:00"),   // March 2, 2025, 1:00 PM GMT
            },
        ],
        fareTypes: [
            { name: "Economy Cheap", travelClass: "Economy", price: "RM 1500", seat: "Standard Seat", bags: "1 Checked Bag (23kg)", flexibility: "Non-refundable", loungeAccess: false },
            { name: "Economy Flex", travelClass: "Economy", price: "RM 1900", seat: "Extra Legroom", bags: "2 Checked Bags (23kg)", flexibility: "Changeable", loungeAccess: false },
            { name: "Premium Economy", travelClass: "Premium Economy", price: "RM 3600", seat: "Premium Seat", bags: "2 Checked Bags (25kg)", flexibility: "Changeable", loungeAccess: false },
            { name: "Business Class", travelClass: "Business", price: "RM 5900", seat: "Lie-flat Bed", bags: "2 Checked Bags (30kg)", flexibility: "Fully Refundable", loungeAccess: true },
            { name: "First Class", travelClass: "First", price: "RM 11500", seat: "Private Suite", bags: "3 Checked Bags (32kg)", flexibility: "Fully Refundable", loungeAccess: true },
        ],
        layoverAirports: ["Doha (DOH)", "Paris (CDG)"],
    },
];

export default flightData;