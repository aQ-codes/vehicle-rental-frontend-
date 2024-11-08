import React from "react";

interface ColorFilterProps {
  options: string[];
  onChange: (updateFn: (prev: string[]) => string[]) => void;
}

const ColorFilter: React.FC<ColorFilterProps> = ({ options, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    onChange((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Color</h3>
      <div className="flex flex-wrap space-x-4">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              value={option}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="w-4 h-4" style={{ backgroundColor: option.toLowerCase() }}></span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;
