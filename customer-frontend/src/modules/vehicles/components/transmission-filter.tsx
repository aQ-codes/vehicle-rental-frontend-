"use client"

import React, { useState } from "react";

const TransmissionFilter = ({ options }) => {
  const [selected, setSelected] = useState("All");

  const handleSelect = (value) => {
    setSelected(value);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Transmission</h3>
      <div className="flex space-x-2">
        {options.map((option) => (
          <div
            key={option}
            className={`cursor-pointer p-2 rounded-md text-center ${
              selected === option ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransmissionFilter;
