"use client"

import React, { useState } from "react";

const AvailabilityToggle = () => {
  const [availableNow, setAvailableNow] = useState(false);

  const handleToggle = () => {
    setAvailableNow(!availableNow);
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="text-lg font-semibold">Available Now</span>
      <div
        onClick={handleToggle}
        className={`w-12 h-6 rounded-full cursor-pointer ${
          availableNow ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`h-6 w-6 bg-white rounded-full shadow-md transform transition-transform ${
            availableNow ? "translate-x-6" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default AvailabilityToggle;
