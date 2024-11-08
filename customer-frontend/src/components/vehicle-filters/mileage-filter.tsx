import React from "react";
import { Range } from "react-range";

interface MileageFilterProps {
  minMileage: number;
  maxMileage: number;
  onChange: (values: number[]) => void;
}

const MileageFilter: React.FC<MileageFilterProps> = ({
  minMileage = 0,
  maxMileage = 100000,
  onChange,
}) => {
  const [values, setValues] = React.useState([minMileage, maxMileage]);

  const handleRangeChange = (newValues: number[]) => {
    setValues(newValues);
    onChange(newValues); // Update the parent component with new range values
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Mileage Range</h3>
      <Range
        step={1}
        min={minMileage}
        max={maxMileage}
        values={values}
        onChange={handleRangeChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="w-full h-2 bg-gray-300 rounded flex items-center"
            style={{ ...props.style }}
          >
            <div
              className="h-2 bg-blue-500 rounded"
              style={{
                left: `${props.style.left}%`,
                right: `${100 - (Number(props.style.right ?? 100))}%`,
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="w-4 h-4 bg-blue-500 rounded-full shadow-md"
            style={{ ...props.style }}
          />
        )}
      />
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>{values[0]} miles</span>
        <span>{values[1]} miles</span>
      </div>
    </div>
  );
};

export default MileageFilter;
