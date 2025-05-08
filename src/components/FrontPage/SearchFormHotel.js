import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { ChevronDownIcon, UserIcon, CalendarIcon, PlusIcon, MinusIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { useSearchParams, useNavigate } from 'react-router-dom';

const countries = [
  "United States", "Canada", "United Kingdom", "Germany", "France",
  "Japan", "Australia", "Brazil", "India", "China", "South Africa",
  "Mexico", "Russia", "Italy", "Spain", "South Korea", "Indonesia",
  "Turkey", "Argentina", "Saudi Arabia", "Thailand", "Egypt", "Nigeria",
];

const RoomAndGuestMenu = forwardRef(({
  rooms: initialRooms = 1,
  guests: initialGuests = [{ adults: 2, children: 0, childrenAges: [] }],
}, ref) => {
  const [rooms, setRooms] = useState(initialRooms);
  const [guests, setGuests] = useState(initialGuests);

  useImperativeHandle(ref, () => ({
    get rooms() { return rooms; },
    get guests() { return guests; },
    setRooms: (newRooms) => setRooms(newRooms),
    setGuests: (newGuests) => setGuests(newGuests),
  }));

  const handleRoomsChange = (change) => {
    const newRooms = Math.max(1, rooms + change);
    setRooms(newRooms);
    if (newRooms > rooms) {
      setGuests([...guests, { adults: 2, children: 0, childrenAges: [] }]);
    } else {
      setGuests(guests.slice(0, newRooms));
    }
  };

  const handleGuestsChange = (roomIndex, type, change) => {
    setGuests((prevGuests) => {
      const newGuests = [...prevGuests];
      let newCount = Math.max(0, newGuests[roomIndex][type] + change);
      if (type === 'adults' && newCount < 1) {
        newCount = 1;
      }
      newGuests[roomIndex] = { ...newGuests[roomIndex], [type]: newCount };
      if (type === 'children') {
        newGuests[roomIndex].childrenAges = newGuests[roomIndex].childrenAges.slice(0, newCount);
        if (newCount > newGuests[roomIndex].childrenAges.length) {
          newGuests[roomIndex].childrenAges = [...newGuests[roomIndex].childrenAges, ...Array(newCount - newGuests[roomIndex].childrenAges.length).fill(0)];
        }
      }
      return newGuests;
    });
  };

  const handleChildAgeChange = (roomIndex, childIndex, age) => {
    setGuests((prevGuests) => {
      const newGuests = [...prevGuests];
      const newChildrenAges = [...newGuests[roomIndex].childrenAges];
      newChildrenAges[childIndex] = age;
      newGuests[roomIndex] = { ...newGuests[roomIndex], childrenAges: newChildrenAges };
      return newGuests;
    });
  };

  return (
    <div className="w-full">
      <label htmlFor="roomGuestSelect" className="block text-xs font-bold text-white mb-1 truncate">
        ROOMS & GUESTS
      </label>
      <Menu as="div" className="relative w-full">
        <MenuButton className="flex w-full items-center justify-between rounded-md bg-white border border-gray-300 px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500">
          <span className="flex items-center">
            <UserIcon className="h-4 w-4 mr-2" aria-hidden="true" />
            {rooms} Room(s), {guests.reduce((total, room) => total + room.adults + room.children, 0)} Guest(s)
          </span>
          <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </MenuButton>
        <MenuItems className="absolute left-0 right-0 z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-2 space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="rooms" className="text-xs font-medium text-gray-700">
                Rooms
              </label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleRoomsChange(-1)}
                  className="p-1 border rounded text-gray-900 hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
                  disabled={rooms <= 1}
                >
                  <MinusIcon className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="text-xs text-gray-700 w-6 text-center">{rooms}</span>
                <button
                  type="button"
                  onClick={() => handleRoomsChange(1)}
                  className="p-1 border rounded text-gray-900 hover:bg-gray-200"
                >
                  <PlusIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            {guests.map((room, roomIndex) => (
              <div key={roomIndex} className="space-y-2">
                <h3 className="text-sm font-bold bg-gray-800 p-1">Room {roomIndex + 1}</h3>
                <div className="flex items-center justify-between">
                  <label htmlFor={`adults-${roomIndex}`} className="text-xs font-medium text-gray-700">
                    Adults
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleGuestsChange(roomIndex, 'adults', -1)}
                      className="p-1 border rounded text-gray-900 hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
                      disabled={room.adults <= 1}
                    >
                      <MinusIcon className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="text-xs text-gray-700 w-6 text-center">{room.adults}</span>
                    <button
                      type="button"
                      onClick={() => handleGuestsChange(roomIndex, 'adults', 1)}
                      className="p-1 border rounded text-gray-900 hover:bg-gray-200"
                    >
                      <PlusIcon className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor={`children-${roomIndex}`} className="text-xs font-medium text-gray-700">
                    Children
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handleGuestsChange(roomIndex, 'children', -1)}
                      className="p-1 border rounded text-gray-900 hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
                      disabled={room.children <= 0}
                    >
                      <MinusIcon className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="text-xs text-gray-700 w-6 text-center">{room.children}</span>
                    <button
                      type="button"
                      onClick={() => handleGuestsChange(roomIndex, 'children', 1)}
                      className="p-1 border rounded text-gray-900 hover:bg-gray-200"
                    >
                      <PlusIcon className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                {room.children > 0 && (
                  <div className="space-y-1">
                    {Array.from({ length: room.children }).map((_, childIndex) => (
                      <div key={childIndex} className="flex items-center justify-between">
                        <label htmlFor={`childAge-${roomIndex}-${childIndex}`} className="text-xs font-medium text-gray-700">
                          Child {childIndex + 1} Age
                        </label>
                        <input
                          type="number"
                          id={`childAge-${roomIndex}-${childIndex}`}
                          value={room.childrenAges[childIndex] || ''}
                          onChange={(e) => handleChildAgeChange(roomIndex, childIndex, parseInt(e.target.value) || 0)}
                          className="border rounded-md p-1 w-16 text-gray-700 text-xs"
                          min="0"
                          max="17"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
});

function SearchFormHotel() {
  const [searchParams] = useSearchParams();
  const [destination, setDestination] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
  const [isOpen, setIsOpen] = useState(false);
  const roomGuestMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const destinationParam = searchParams.get('destination');
    const dateStartParam = searchParams.get('startDate');
    const dateEndParam = searchParams.get('endDate');
    const roomParam = parseInt(searchParams.get('rooms'), 10);
    const roomDataParam = searchParams.get('roomData');

    if (destinationParam) {
      setDestination({ value: destinationParam, label: destinationParam });
    }
    if (dateStartParam) {
      setStartDate(new Date(dateStartParam));
    }
    if (dateEndParam) {
      setEndDate(new Date(dateEndParam));
    }
    if (!isNaN(roomParam) && roomDataParam) {
      try {
        const guests = JSON.parse(decodeURIComponent(roomDataParam));
        roomGuestMenuRef.current.setRooms(roomParam);
        roomGuestMenuRef.current.setGuests(guests);
      } catch (error) {
        console.error("Failed to parse roomData:", error);
      }
    }
  }, [searchParams]);

  const handleSearch = () => {
    const rooms = roomGuestMenuRef.current.rooms;
    const guests = roomGuestMenuRef.current.guests;
    const roomData = encodeURIComponent(JSON.stringify(guests));

    const queryParams = new URLSearchParams({
      destination: destination?.value || '',
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      rooms,
      roomData,
    });
    navigate(`/hotels?${queryParams.toString()}`, { replace: true });
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      {/* Mobile Trigger Button */}
      <div className="md:hidden fixed top-2 right-2 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-75 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Slide-In Form */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full bg-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white hover:text-gray-200 focus:outline-none"
        >
          <ChevronDownIcon className="h-6 w-6 rotate-90" aria-hidden="true" />
        </button>
        <div className="flex flex-col gap-4 mt-12">
          <div>
            <label htmlFor="destination" className="block text-xs font-bold text-white mb-1 truncate">
              DESTINATION
            </label>
            <Select
              id="destination"
              value={destination}
              onChange={setDestination}
              options={countries.map(country => ({ value: country, label: country }))}
              className="text-black"
              placeholder="Select destination"
              styles={{
                control: (base) => ({
                  ...base,
                  height: '36px',
                  minHeight: '36px',
                  fontSize: '14px',
                  borderRadius: '0.375rem',
                  borderColor: 'gray',
                  boxShadow: 'none',
                  '&:hover': { borderColor: 'gray-600' },
                }),
                singleValue: (base) => ({ ...base, color: 'black' }),
                menu: (base) => ({ ...base, zIndex: 9999 }),
                option: (base, { isSelected }) => ({
                  ...base,
                  backgroundColor: isSelected ? 'gray-800' : 'white',
                  color: isSelected ? 'white' : 'black',
                  fontSize: '14px',
                  '&:hover': { backgroundColor: 'gray-800', color: 'white' },
                }),
              }}
            />
          </div>
          <div>
            <label htmlFor="startDate" className="block text-xs font-bold text-white mb-1 truncate">
              CHECK-IN
            </label>
            <div className="relative">
              <DatePicker
                id="startDate"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="d MMM yyyy"
                minDate={new Date()}
                className="w-full h-9 px-3 py-2 text-sm text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div>
            <label htmlFor="endDate" className="block text-xs font-bold text-white mb-1 truncate">
              CHECK-OUT
            </label>
            <div className="relative">
              <DatePicker
                id="endDate"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="d MMM yyyy"
                minDate={startDate}
                className="w-full h-9 px-3 py-2 text-sm text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <RoomAndGuestMenu ref={roomGuestMenuRef} />
          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-9"
          >
            SEARCH
          </button>
        </div>
      </div>

      {/* Desktop Form (Single Row with Labels) */}
      <div className={`hidden md:block w-full ${window.location.pathname === '/hotels' ? 'sticky top-0' : 'relative'} bg-gray-800 text-white p-3 shadow-md z-30`}>
        <div className="container mx-auto max-w-7xl px-4 flex items-end gap-4">
          <div className="flex-[2] min-w-0">
            <label htmlFor="destination" className="block text-xs font-bold text-white mb-1 truncate">
              DESTINATION
            </label>
            <Select
              id="destination"
              value={destination}
              onChange={setDestination}
              options={countries.map(country => ({ value: country, label: country }))}
              className="text-black"
              placeholder="Select destination"
              styles={{
                control: (base) => ({
                  ...base,
                  height: '36px',
                  minHeight: '36px',
                  fontSize: '14px',
                  borderRadius: '0.375rem',
                  borderColor: 'gray',
                  boxShadow: 'none',
                  '&:hover': { borderColor: 'gray-600' },
                }),
                singleValue: (base) => ({ ...base, color: 'black' }),
                menu: (base) => ({ ...base, zIndex: 9999 }),
                option: (base, { isSelected }) => ({
                  ...base,
                  backgroundColor: isSelected ? 'gray-800' : 'white',
                  color: isSelected ? 'white' : 'black',
                  fontSize: '14px',
                  '&:hover': { backgroundColor: 'gray-800', color: 'white' },
                }),
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <label htmlFor="startDate" className="block text-xs font-bold text-white mb-1 truncate">
              CHECK-IN
            </label>
            <div className="relative">
              <DatePicker
                id="startDate"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="d MMM yyyy"
                minDate={new Date()}
                className="w-full h-9 px-3 py-2 text-sm text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <label htmlFor="endDate" className="block text-xs font-bold text-white mb-1 truncate">
              CHECK-OUT
            </label>
            <div className="relative">
              <DatePicker
                id="endDate"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="d MMM yyyy"
                minDate={startDate}
                className="w-full h-9 px-3 py-2 text-sm text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <RoomAndGuestMenu ref={roomGuestMenuRef} />
          </div>
          <div className="flex-shrink-0">
            <label className="block text-xs font-bold text-white mb-1 invisible">SEARCH</label>
            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-9"
            >
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFormHotel;