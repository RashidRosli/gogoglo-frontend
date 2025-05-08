import React from "react";
import { Disclosure } from "@headlessui/react";
import { FaChevronUp } from "react-icons/fa6";
import Slider from "react-slider";
import Select from "react-select";

const FlightFilter = ({ filters, setFilters, originalFlights }) => {

  return (
    <div className="md:col-span-1 bg-gray-100 p-4 rounded-md">
      <div className="space-y-4">
        <h2 className="font-bold">Filter by :</h2>

        {/* Price Filter */}
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-md font-bold text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                <span>Price</span>
                <FaChevronUp className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <Slider
                  min={1000}
                  max={10000}
                  step={100}
                  value={filters.price}
                  onChange={(values) => setFilters(prev => ({ ...prev, price: values }))}
                  pearling
                  minDistance={100}
                  className="my-slider"
                  thumbClassName="my-thumb"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm">RM {Math.round(filters.price[0])}</span>
                  <span className="text-sm">RM {Math.round(filters.price[1])}</span>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Stops Filter */}
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-md font-bold text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                <span>Stops</span>
                <FaChevronUp className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <div className="space-y-2">
                  {["Non-stop", "1 stop", "2+ stops"].map((stopOption) => (
                    <div key={stopOption} className="flex items-center">
                      <input
                        id={`stops-${stopOption}`}
                        type="checkbox"
                        value={stopOption}
                        checked={filters.stops.includes(stopOption)}
                        onChange={(e) => {
                          setFilters((prevFilters) => {
                            const newStops = e.target.checked
                              ? [...prevFilters.stops, stopOption]
                              : prevFilters.stops.filter((s) => s !== stopOption);
                            return { ...prevFilters, stops: newStops };
                          });
                        }}
                        className="h-4 w-4 border-gray-300 rounded"
                      />
                      <label htmlFor={`stops-${stopOption}`} className="ml-2 block text-sm text-gray-900">
                        {stopOption}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Departure Time Filter */}
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-md font-bold text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                <span>Departure Time</span>
                <FaChevronUp className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <div className="space-y-2">
                  {["Morning", "Afternoon", "Evening"].map((timeOption) => (
                    <div key={timeOption} className="flex items-center">
                      <input
                        id={`departure-time-${timeOption}`}
                        type="checkbox"
                        value={timeOption}
                        checked={filters.departureTime.includes(timeOption)}
                        onChange={(e) => {
                          setFilters((prevFilters) => {
                            const newDepartureTimes = e.target.checked
                              ? [...prevFilters.departureTime, timeOption]
                              : prevFilters.departureTime.filter((t) => t !== timeOption);
                            return { ...prevFilters, departureTime: newDepartureTimes };
                          });
                        }}
                        className="h-4 w-4 border-gray-300 rounded"
                      />
                      <label htmlFor={`departure-time-${timeOption}`} className="ml-2 block text-sm text-gray-900">
                        {timeOption}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Arrival Time Filter */}
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-md font-bold text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                <span>Arrival Time</span>
                <FaChevronUp className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <div className="space-y-2">
                  {["Morning", "Afternoon", "Evening"].map((timeOption) => (
                    <div key={timeOption} className="flex items-center">
                      <input
                        id={`arrival-time-${timeOption}`}
                        type="checkbox"
                        value={timeOption}
                        checked={filters.arrivalTime.includes(timeOption)}
                        onChange={(e) => {
                          setFilters((prevFilters) => {
                            const newArrivalTimes = e.target.checked
                              ? [...prevFilters.arrivalTime, timeOption]
                              : prevFilters.arrivalTime.filter((t) => t !== timeOption);
                            return { ...prevFilters, arrivalTime: newArrivalTimes };
                          });
                        }}
                        className="h-4 w-4 border-gray-300 rounded"
                      />
                      <label htmlFor={`arrival-time-${timeOption}`} className="ml-2 block text-sm text-gray-900">
                        {timeOption}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Airlines Filter */}
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-md font-bold text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                <span>Airlines</span>
                <FaChevronUp className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <div className="space-y-2">
                  {Array.from(new Set(originalFlights.flatMap(flight => flight.airlines))).map((airline) => (
                    <div key={airline} className="flex items-center">
                      <input
                        id={`airlines-${airline}`}
                        type="checkbox"
                        value={airline}
                        checked={filters.airlines.includes(airline)}
                        onChange={(e) => {
                          setFilters((prevFilters) => {
                            const newAirlines = e.target.checked
                              ? [...prevFilters.airlines, airline]
                              : prevFilters.airlines.filter((a) => a !== airline);
                            return { ...prevFilters, airlines: newAirlines };
                          });
                        }}
                        className="h-4 w-4 border-gray-300 rounded"
                      />
                      <label htmlFor={`airlines-${airline}`} className="ml-2 block text-sm text-gray-900">
                        {airline}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Duration Filter */}
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-md font-bold text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                <span>Duration</span>
                <FaChevronUp className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <div className="space-y-2">
                  {["Short", "Medium", "Long"].map((durationOption) => (
                    <div key={durationOption} className="flex items-center">
                      <input
                        id={`duration-${durationOption}`}
                        type="checkbox"
                        value={durationOption}
                        checked={filters.duration.includes(durationOption)}
                        onChange={(e) => {
                          setFilters((prevFilters) => {
                            const newDurations = e.target.checked
                              ? [...prevFilters.duration, durationOption]
                              : prevFilters.duration.filter((d) => d !== durationOption);
                            return { ...prevFilters, duration: newDurations };
                          });
                        }}
                        className="h-4 w-4 border-gray-300 rounded"
                      />
                      <label htmlFor={`duration-${durationOption}`} className="ml-2 block text-sm text-gray-900">
                        {durationOption}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Aircraft Type Filter */}
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-md font-bold text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                <span>Aircraft Type</span>
                <FaChevronUp className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <Select
                  isMulti
                  value={filters.aircraftTypes.map(aircraftType => ({ label: aircraftType, value: aircraftType }))}
                  onChange={(selectedOptions) => {
                    const aircraftTypes = selectedOptions.map(option => option.value);
                    setFilters(prev => ({ ...prev, aircraftTypes: aircraftTypes }));
                  }}
                  options={Array.from(
                    new Set(originalFlights.flatMap(flight => flight.legs.map(leg => leg.airplane)))
                  ).map(airplane => ({ label: airplane, value: airplane }))}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Fare Options Filter */}
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-md font-bold text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                <span>Fare Options</span>
                <FaChevronUp className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="fare-options-baggage"
                      type="checkbox"
                      checked={filters.fareOptions.baggage}
                      onChange={(e) =>
                        setFilters(prev => ({
                          ...prev,
                          fareOptions: { ...prev.fareOptions, baggage: e.target.checked }
                        }))
                      }
                      className="h-4 w-4 border-gray-300 rounded"
                    />
                    <label htmlFor="fare-options-baggage" className="ml-2 block text-sm text-gray-900">
                      Include baggage
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="fare-options-seat-selection"
                      type="checkbox"
                      checked={filters.fareOptions.seatSelection}
                      onChange={(e) =>
                        setFilters(prev => ({
                          ...prev,
                          fareOptions: { ...prev.fareOptions, seatSelection: e.target.checked }
                        }))
                      }
                      className="h-4 w-4 border-gray-300 rounded"
                    />
                    <label htmlFor="fare-options-seat-selection" className="ml-2 block text-sm text-gray-900">
                      Seat selection included
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="fare-options-refundable"
                      type="checkbox"
                      checked={filters.fareOptions.refundable}
                      onChange={(e) =>
                        setFilters(prev => ({
                          ...prev,
                          fareOptions: { ...prev.fareOptions, refundable: e.target.checked }
                        }))
                      }
                      className="h-4 w-4 border-gray-300 rounded"
                    />
                    <label htmlFor="fare-options-refundable" className="ml-2 block text-sm text-gray-900">
                      Refundable fares
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="fare-options-changeable"
                      type="checkbox"
                      checked={filters.fareOptions.changeable}
                      onChange={(e) =>
                        setFilters(prev => ({
                          ...prev,
                          fareOptions: { ...prev.fareOptions, changeable: e.target.checked }
                        }))
                      }
                      className="h-4 w-4 border-gray-300 rounded"
                    />
                    <label htmlFor="fare-options-changeable" className="ml-2 block text-sm text-gray-900">
                      Changeable fares
                    </label>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Layover Airports Filter */}
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-md font-bold text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                <span>Layover Airports</span>
                <FaChevronUp
                  className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <Select
                  isMulti
                  value={filters.layoverAirports.map(airport => ({ label: airport, value: airport }))}
                  onChange={(selectedOptions) => {
                    const airports = selectedOptions.map(option => option.value);
                    setFilters(prev => ({ ...prev, layoverAirports: airports }));
                  }}
                  options={Array.from(
                    new Set(originalFlights.flatMap(flight => flight.layoverAirports)) // Access layoverAirports directly
                  ).map(airport => ({ label: airport, value: airport }))}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Connecting Flight Duration Filter */}
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-md font-bold text-left text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                <span>Connecting Flight Duration</span>
                <FaChevronUp
                  className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <Slider
                  min={0}
                  max={1440}
                  step={30}
                  defaultValue={filters.connectingFlightDuration}  // Set initial value
                  onChange={(values) => setFilters(prev => ({ ...prev, connectingFlightDuration: values }))}
                  pearling
                  minDistance={30} // Optional: Set minimum distance between thumbs
                  className="my-slider"
                  thumbClassName="my-thumb"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm">{filters.connectingFlightDuration[0]} mins</span>
                  <span className="text-sm">{filters.connectingFlightDuration[1]} mins</span>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default FlightFilter;
