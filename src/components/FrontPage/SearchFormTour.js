import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef, useReducer } from 'react';
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

const guestsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GUESTS':
      return { ...state, ...action.payload };
    case 'UPDATE_GUEST':
      return {
        ...state,
        [action.guestType]: Math.max(action.guestType === 'adults' ? 1 : 0, action.value),
      };
    default:
      return state;
  }
};

const RoomAndGuestMenu = forwardRef(({ guests: initialGuests = { adults: 2, children: 0 } }, ref) => {
  const [guests, dispatch] = useReducer(guestsReducer, initialGuests);

  useImperativeHandle(ref, () => ({
    get guests() { return guests; },
    setGuests: (newGuests) => dispatch({ type: 'SET_GUESTS', payload: newGuests }),
  }));

  const handleGuestsChange = (type, change) => {
    dispatch({
      type: 'UPDATE_GUEST',
      guestType: type,
      value: guests[type] + change,
    });
  };

  return (
    <div className="w-full">
      <label htmlFor="guestSelect" className="block text-xs font-bold text-white mb-1 truncate">
        GROUP SIZE
      </label>
      <Menu as="div" className="relative w-full">
        <MenuButton className="flex w-full items-center justify-between rounded-md bg-white border border-gray-300 px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500">
          <span className="flex items-center">
            <UserIcon className="h-4 w-4 mr-2" aria-hidden="true" />
            {guests.adults + guests.children}
          </span>
          <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </MenuButton>
        <MenuItems className="absolute left-0 right-0 z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-2 space-y-2">
            {['adults', 'children'].map((type) => (
              <div key={type} className="flex items-center justify-between">
                <label className="text-xs font-medium text-gray-700 capitalize">
                  {type}
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handleGuestsChange(type, -1)}
                    disabled={type === 'adults' ? guests[type] <= 1 : guests[type] <= 0}
                    className="p-1 border rounded text-gray-900 hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    <MinusIcon className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span className="text-xs text-gray-700 w-6 text-center">{guests[type]}</span>
                  <button
                    type="button"
                    onClick={() => handleGuestsChange(type, 1)}
                    className="p-1 border rounded text-gray-900 hover:bg-gray-200"
                  >
                    <PlusIcon className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
});

function SearchFormTour() {
  const [searchParams] = useSearchParams();
  const [destination, setDestination] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [guests, dispatchGuests] = useReducer(guestsReducer, { adults: 2, children: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const roomGuestMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const params = {
      destination: searchParams.get('destination'),
      startDate: searchParams.get('startDate'),
      adults: parseInt(searchParams.get('adults'), 10),
      children: parseInt(searchParams.get('children'), 10),
    };

    if (params.destination) setDestination({ value: params.destination, label: params.destination });
    if (params.startDate) setStartDate(new Date(params.startDate));
    if (!isNaN(params.adults) || !isNaN(params.children)) {
      dispatchGuests({
        type: 'SET_GUESTS',
        payload: {
          adults: !isNaN(params.adults) ? params.adults : 2,
          children: !isNaN(params.children) ? params.children : 0,
        },
      });
    }
  }, [searchParams]);

  useEffect(() => {
    if (roomGuestMenuRef.current) {
      roomGuestMenuRef.current.setGuests(guests);
    }
  }, [guests]);

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      destination: destination?.value || '',
      startDate: startDate.toISOString().split('T')[0],
      adults: guests.adults,
      children: guests.children,
    });
    navigate(`/tours?${queryParams.toString()}`, { replace: true });
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
              START DATE
            </label>
            <div className="relative">
              <DatePicker
                id="startDate"
                selected={startDate}
                onChange={setStartDate}
                dateFormat="d MMM yyyy"
                minDate={new Date()}
                className="w-full h-9 px-3 py-2 text-sm text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <RoomAndGuestMenu ref={roomGuestMenuRef} guests={guests} />
          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-9"
          >
            SEARCH
          </button>
        </div>
      </div>

      {/* Desktop Form (Single Row with Labels) */}
      <div className={`hidden md:block w-full ${window.location.pathname === '/tours' ? 'sticky top-0' : 'relative'} bg-gray-800 text-white p-3 shadow-md z-30`}>
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
              START DATE
            </label>
            <div className="relative">
              <DatePicker
                id="startDate"
                selected={startDate}
                onChange={setStartDate}
                dateFormat="d MMM yyyy"
                minDate={new Date()}
                className="w-full h-9 px-3 py-2 text-sm text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <RoomAndGuestMenu ref={roomGuestMenuRef} guests={guests} />
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

export default SearchFormTour;