import React, { ChangeEvent, useState } from 'react';
import { locations } from '@/constants';

interface LocationPickerProps {
  label: string;
  onSelect: (location: string) => void;
}

export default function LocationPicker({ label, onSelect }: LocationPickerProps) {
  const [inputValue, setInputValue] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(locations);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      setFilteredLocations(locations.filter(loc => loc.name.toLowerCase().includes(value.toLowerCase())));
    } else {
      setFilteredLocations([]);
    }
  };

  return (
    <div>
      <label className='text-sm font-semibold text-gray-700 '>{label}</label>
      <div className="relative sm:w-1/2 lg:w-4/5">
      <i className="fas fa-map-marker-alt absolute top-2 right-2 text-gray-500"></i>
        <input
          type="text" 
          className="w-full p-2 border rounded-md "
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search location..."
        />
        {inputValue && filteredLocations.length > 0 && (
          <ul className="absolute left-0 w-full bg-white border rounded-md mt-1 max-h-48 overflow-y-auto z-10">
            {filteredLocations.map(loc => (
              <li
                key={loc.id}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  onSelect(loc.name);
                  setInputValue(loc.name);
                  setFilteredLocations([]); // Hide dropdown after selection
                }}
              >
                {loc.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
