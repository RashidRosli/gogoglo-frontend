import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle } from "react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const PassengerMenu = forwardRef((
  {
    passengers: initialPassengers = { adults: 0, children: 0, infants: 0 },
    onPassengerChange = () => { },
    childrenAges: initialChildrenAges = [],
    infantAges: initialInfantAges = [],
    onChildrenAgesChange = () => { },
    onInfantAgesChange = () => { }
  },
  ref
) => {
  const passengersRef = useRef(initialPassengers);
  const childrenAgesRef = useRef(initialChildrenAges);
  const infantAgesRef = useRef(initialInfantAges);

  const [passengers, setPassengers] = useState(initialPassengers);
  const [childrenAges, setChildrenAges] = useState(initialChildrenAges);
  const [infantAges, setInfantAges] = useState(initialInfantAges);

  useImperativeHandle(ref, () => ({
    get passengers() { return passengersRef.current; },
    get childrenAges() { return childrenAgesRef.current; },
    get infantAges() { return infantAgesRef.current; }
  }));

  useEffect(() => {
    passengersRef.current = passengers;
    childrenAgesRef.current = childrenAges;
    infantAgesRef.current = infantAges;
  }, [passengers, childrenAges, infantAges]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const travellers = searchParams.get("travellers");
    if (travellers) {
      const parsedTravellers = JSON.parse(travellers);
      setPassengers({
        adults: parsedTravellers.adults || 1,
        children: parsedTravellers.children || 0,
        infants: parsedTravellers.infants || 0,
      });
      setChildrenAges(parsedTravellers.childrenAges || []);
      setInfantAges(parsedTravellers.infantAges || []);
    } else {
      const adults = parseInt(searchParams.get("adults")) || 1;
      const children = parseInt(searchParams.get("children")) || 0;
      const infants = parseInt(searchParams.get("infants")) || 0;
      setPassengers({ adults, children, infants });

      const initialChildrenAges = [];
      for (let i = 1; i <= children; i++) {
        const age = parseInt(searchParams.get(`childAge${i}`));
        if (!isNaN(age)) initialChildrenAges.push(age);
      }
      setChildrenAges(initialChildrenAges);

      const initialInfantAges = [];
      for (let i = 1; i <= infants; i++) {
        const age = parseInt(searchParams.get(`infantAge${i}`));
        if (!isNaN(age)) initialInfantAges.push(age);
      }
      setInfantAges(initialInfantAges);
    }
  }, []);

  const handlePassengerChange = (type, change) => {
    setPassengers((prevPassengers) => {
      let newCount = Math.max(0, prevPassengers[type] + change);
      if (type === 'adults' && newCount < 1) {
        newCount = 1;
      }

      const totalCount =
        newCount +
        prevPassengers.adults +
        prevPassengers.children +
        prevPassengers.infants - prevPassengers[type];

      if (type === 'adults') {
        const maxInfants = newCount;
        if (prevPassengers.infants > maxInfants) {
          const infantChange = maxInfants - prevPassengers.infants;
          setInfantAges((prevAges) => prevAges.slice(0, infantChange));
        }
      }

      if (type === 'children') {
        if (change > 0) {
          setChildrenAges([...childrenAges, 2]);
        } else if (change < 0) {
          setChildrenAges(childrenAges.slice(0, -1));
        }
      }

      if (type === 'infants') {
        const maxInfants = prevPassengers.adults;
        if (change > 0 && prevPassengers.infants < maxInfants && totalCount + change <= 10) {
          setInfantAges([...infantAges, 0]);
        } else if (change < 0) {
          setInfantAges(infantAges.slice(0, -1));
        }
      }

      if (
        type === 'infants' &&
        prevPassengers.infants + change > prevPassengers.adults
      ) {
        return prevPassengers;
      }

      return {
        ...prevPassengers,
        [type]: totalCount <= 10 ? newCount : prevPassengers[type],
      };
    });
  };

  const handleChildAgeChange = (index, age) => {
    setChildrenAges((prevAges) => {
      const newAges = [...prevAges];
      newAges[index] = age;
      return newAges;
    });
  };

  const handleInfantAgeChange = (index, age) => {
    setInfantAges((prevAges) => {
      const newAges = [...prevAges];
      newAges[index] = age;
      return newAges;
    });
  };

  return (
    <div className="relative inline-block text-left w-full md:w-auto">
      <label htmlFor="passengerSelect" className="block text-sm font-medium text-white-700">
        Passengers:
      </label>
      <Menu as="div" className="relative inline-block mt-1">
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-blue-700 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900">
          {passengers.adults + passengers.children + passengers.infants}{' '}
          Traveller(s)
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>

        <MenuItems className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md text-gray-900 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 px-4">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <label htmlFor="adults" className="text-sm font-medium text-gray-700">
                Adults<br />
                <span className="text-xs font-light text-gray-500">12 and older</span>
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handlePassengerChange('adults', -1)}
                  className="border rounded-md p-1 hover:bg-gray-100"
                  disabled={passengers.adults <= 1}
                >
                  -
                </button>
                <span className="mx-2 text-sm text-gray-600">{passengers.adults}</span>
                <button
                  type="button"
                  onClick={() => handlePassengerChange('adults', 1)}
                  className="border rounded-md p-1 hover:bg-gray-100"
                  disabled={passengers.adults + passengers.children + passengers.infants >= 10}
                >
                  +
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between mt-2">
              <label htmlFor="children" className="text-sm font-medium text-gray-700">
                Children<br />
                <span className="text-xs font-light text-gray-500">Age 2 through 12</span>
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handlePassengerChange('children', -1)}
                  className="border rounded-md p-1 hover:bg-gray-100"
                  disabled={passengers.children === 0}
                >
                  -
                </button>
                <span className="mx-2 text-sm text-gray-600">{passengers.children}</span>
                <button
                  type="button"
                  onClick={() => handlePassengerChange('children', 1)}
                  className="border rounded-md p-1 hover:bg-gray-100"
                  disabled={passengers.adults + passengers.children + passengers.infants >= 10}
                >
                  +
                </button>
              </div>
            </div>

            {/* Children Age Dropdowns */}
            {childrenAges.map((age, index) => (
              <div key={index} className="flex items-center justify-between mt-2">
                <label htmlFor={`child-age-${index}`} className="text-sm font-medium text-gray-700">
                  Child {index + 1} Age:
                </label>
                <select
                  id={`child-age-${index}`}
                  value={age}
                  onChange={(e) => handleChildAgeChange(index, parseInt(e.target.value, 10))}
                  className="border rounded-md px-2 py-1 ml-2"
                >
                  {Array.from({ length: 11 }, (_, i) => i + 2).map((childAge) => (
                    <option key={childAge} value={childAge}>
                      {childAge}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {/* Infants */}
            <div className="flex items-center justify-between mt-2">
              <label htmlFor="infants" className="text-sm font-medium text-gray-700">
                Infants<br />
                <span className="text-xs font-light text-gray-500">Younger than 2</span>
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => handlePassengerChange('infants', -1)}
                  className="border rounded-md p-1 hover:bg-gray-100"
                  disabled={passengers.infants === 0}
                >
                  -
                </button>
                <span className="mx-2 text-sm text-gray-600">{passengers.infants}</span>
                <button
                  type="button"
                  onClick={() => handlePassengerChange('infants', 1)}
                  className="border rounded-md p-1 hover:bg-gray-100"
                  disabled={passengers.adults + passengers.children + passengers.infants >= 10}
                >
                  +
                </button>
              </div>
            </div>
            {infantAges.map((age, index) => (
              <div key={index} className="flex items-center justify-between mt-2">
                <label htmlFor={`infant-age-${index}`} className="text-sm font-medium text-gray-700">
                  Infant {index + 1} Age:
                </label>
                <select
                  id={`infant-age-${index}`}
                  value={age}
                  onChange={(e) => handleInfantAgeChange(index, parseInt(e.target.value, 10))}
                  className="border rounded-md px-2 py-1 ml-2"
                >
                  {[0, 1].map((infantAge) => (
                    <option key={infantAge} value={infantAge}>
                      {infantAge}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
});

export default PassengerMenu;