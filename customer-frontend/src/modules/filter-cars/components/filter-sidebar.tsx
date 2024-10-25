import React from "react";
import PriceRangeSlider from "./PriceRangeSlider";
import BodyTypeFilter from "./BodyTypeFilter";
import TransmissionFilter from "./TransmissionFilter";
import ColorFilter from "./ColorFilter";
import AvailabilityToggle from "./AvailabilityToggle";
import FuelTypeFilter from "./FuelTypeFilter";
import BrandFilter from "./BrandFilter";
import MileageFilter from "./MileageFilter";

const FilterSidebar = ({ filters }) => {
  return (
    <div className="w-80 p-4 bg-white shadow-lg space-y-6">
      <h2 className="text-xl font-bold">Filters</h2>
      <PriceRangeSlider minPrice={filters.minPrice} maxPrice={filters.maxPrice} />
      <BodyTypeFilter options={filters.bodyTypes} />
      <TransmissionFilter options={filters.transmissions} />
      <ColorFilter options={filters.colors} />
      <AvailabilityToggle />
      <FuelTypeFilter options={filters.fuelTypes} />
      <BrandFilter options={filters.brands} />
      <MileageFilter options={filters.mileage} />
    </div>
  );
};

export default FilterSidebar;
