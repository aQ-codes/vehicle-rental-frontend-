import React, { useState } from "react";

interface AvailabilityToggleProps {
  onChange: (available: boolean) => void;
}

const AvailabilityToggle: React.FC<AvailabilityToggleProps> = ({ onChange }) => {
  const [availableNow, setAvailableNow] = useState(false);

  const handleToggle = () => {
    const newAvailability = !availableNow;
    setAvailableNow(newAvailability);
    onChange(newAvailability); // Call onChange with new value
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-white shadow rounded-lg">
      <span className="text-lg font-semibold text-gray-700">Available Now</span>
      <div
        onClick={handleToggle}
        className={`w-12 h-6 rounded-full cursor-pointer ${availableNow ? "bg-blue-600" : "bg-gray-300"} transition-colors duration-300`}
      >
        <div
          className={`h-6 w-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${availableNow ? "translate-x-6" : "translate-x-0"}`}
        />
      </div>
    </div>
  );
};

export default AvailabilityToggle;
