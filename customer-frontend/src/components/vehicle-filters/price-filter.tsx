import React, { useState, useEffect } from "react";
import { Range } from "react-range";

interface PriceRangeSliderProps {
  minPrice: number;
  maxPrice: number;
  onChange: (values: number[]) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  minPrice = 0,
  maxPrice = 10000,
  onChange,
}) => {
  const [price, setPrice] = useState<number[]>([minPrice, maxPrice]);

  useEffect(() => {
    setPrice([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleChange = (values: number[]) => {
    setPrice(values);
    onChange(values);
  };

  return (
    <div className="space-y-2 p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold text-gray-700">Price Range</h3>
      <Range
        step={100}
        min={minPrice}
        max={maxPrice}
        values={price}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{ ...props.style, backgroundColor: "#E5E7EB", borderRadius: "0.5rem" }}
            className="h-2 flex items-center"
          >
            <div
              className="h-2 bg-blue-300 rounded-full"
              style={{
                left: `${props.style.left}%`,
                right: `${100 - Number(props.style.right ?? 100)}%`,
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{ ...props.style, backgroundColor: "#1D4ED8" }}
            className="h-5 w-5 rounded-full shadow-lg cursor-pointer flex items-center justify-center"
          >
            <div className="h-2 w-2 bg-white rounded-full" />
          </div>
        )}
      />
      <div className="flex justify-between text-sm text-gray-600">
        <span>{price[0]}</span>
        <span>{price[1]}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
