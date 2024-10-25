import React, { useState } from "react";
import { Range } from "react-range";

const PriceRangeSlider = ({ minPrice, maxPrice }) => {
  const [price, setPrice] = useState([minPrice, maxPrice]);

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Price Range</h3>
      <Range
        step={100}
        min={minPrice}
        max={maxPrice}
        values={price}
        onChange={(values) => setPrice(values)}
        renderTrack={({ props, children }) => (
          <div {...props} className="h-2 bg-gray-300 rounded-full">
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="h-5 w-5 bg-blue-500 rounded-full shadow-lg cursor-pointer"
          />
        )}
      />
      <div className="flex justify-between text-sm">
        <span>{price[0]}</span>
        <span>{price[1]}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
