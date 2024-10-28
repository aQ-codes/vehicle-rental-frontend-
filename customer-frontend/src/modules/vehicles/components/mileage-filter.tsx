import React from "react";

const MileageFilter = ({ options }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Mileage</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MileageFilter;
