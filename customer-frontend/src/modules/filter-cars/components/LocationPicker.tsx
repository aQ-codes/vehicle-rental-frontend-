'use client'

import React, { useState } from "react";
import { ChevronDownIcon, MapPinIcon } from "@heroicons/react/20/solid";

interface LocationPickerProps {
  locations: string[];
  selectedLocation: string;
  onSelectLocation: (location: string) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectLocation = (location: string) => {
    onSelectLocation(location);
    setIsOpen(false); // Close the dropdown after selecting
  };

  return (
    <div className="relative inline-block w-full">
      <button
        onClick={toggleDropdown}
        className="w-full inline-flex justify-between items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        <div className="flex items-center">
          <MapPinIcon className="h-5 w-5 mr-2 text-gray-500" />
          {selectedLocation || "Select location"}
        </div>
        <ChevronDownIcon className="h-5 w-5 text-gray-500" />
      </button>

      {isOpen && (
        <ul className="absolute mt-2 w-full bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          {locations.map((location, index) => (
            <li
              key={index}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectLocation(location)}
            >
              {location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationPicker;
