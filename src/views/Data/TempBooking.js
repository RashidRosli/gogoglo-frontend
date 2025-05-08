// TempBooking.js
const TempBookingData = [
    { id: "t0001", start: "Thailand", end: "Thailand", dateStart: "2025-01-10", room: 2, adult: 2, children: 2 },
    { id: "t0002", start: "Malaysia", end: "Singapore", dateStart: "2025-02-15", room: 1, adult: 1, children: 0 },
    { id: "t0003", start: "Vietnam", end: "Cambodia", dateStart: "2025-03-20", room: 3, adult: 3, children: 1 },
  ];
  
  export default TempBookingData;
  
  export const saveBookingData = (bookingDetails) => {
    TempBookingData.push(bookingDetails);
    console.log("Booking saved:", bookingDetails);
  };