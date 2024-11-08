import React, { useState, useEffect } from "react";
import PriceRangeSlider from "../../../components/vehicle-filters/price-filter";
import BodyTypeFilter from "../../../components/vehicle-filters/body-type-filter";
import TransmissionFilter from "../../../components/vehicle-filters/transmission-filter";
import ColorFilter from "../../../components/vehicle-filters/color-filter";
import AvailabilityToggle from "../../../components/vehicle-filters/availability-filter";
import FuelTypeFilter from "../../../components/vehicle-filters/fuel-type-filter";
import BrandFilter from "../../../components/vehicle-filters/brand-filter";
import MileageFilter from "../../../components/vehicle-filters/mileage-filter";
import { SelectedFilters } from "@/models";

import {
  useGetUniqueMakes,
  useGetUniqueTypes,
  useGetUniqueColors,
  useGetMinMaxPrices,
  useGetMinMaxMileage,
  useGetUniqueTransmission,
  useGetUniqueFuelTypes,
} from '../services/vehicle-service';

// Define the props type for VehicleFilter component
interface VehicleFilterProps {
  onFiltersChange: (filters: SelectedFilters) => void;
}

const VehicleFilter: React.FC<VehicleFilterProps> = ({ onFiltersChange }) => {
  // Fetch data for filter options from services
  const { loading: loadingMakes, uniqueMakes } = useGetUniqueMakes();
  const { loading: loadingTypes, uniqueTypes } = useGetUniqueTypes();
  const { loading: loadingColors, uniqueColors } = useGetUniqueColors();
  const { loading: loadingPrices, minMaxPrices } = useGetMinMaxPrices();
  const { loading: loadingMileage, minMaxMileage } = useGetMinMaxMileage();
  const { loading: loadingTransmission, uniqueTransmission } = useGetUniqueTransmission();
  const { loading: loadingFuelTypes, uniqueFuelTypes } = useGetUniqueFuelTypes();

  // Set the filtered data entered by the customer
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    status: undefined,
    make: undefined,
    type: undefined,
    model: undefined,
    year: undefined,
    color: undefined,
    transmission: undefined,
    fuelType: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    minMileage: undefined,
    maxMileage: undefined,
  });

  // Notify parent of filter changes
  useEffect(() => {
    onFiltersChange(selectedFilters);
  }, [selectedFilters, onFiltersChange]);

  // Update filter values on change
  const handleFilterChange = (filterName: keyof SelectedFilters, value: unknown) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleResetFilters = () => {
    setSelectedFilters({
      status: undefined,
      make: undefined,
      type: undefined,
      model: undefined,
      year: undefined,
      color: undefined,
      transmission: undefined,
      fuelType: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      minMileage: undefined,
      maxMileage: undefined,
    });
  };

  if (
    loadingMakes || loadingTypes || loadingColors || loadingPrices ||
    loadingMileage || loadingTransmission || loadingFuelTypes
  ) {
    return <div>Loading filters...</div>;
  }

  // Ensure min and max values are valid
  const minPrice = minMaxPrices.minPrice >= 0 ? minMaxPrices.minPrice : 0;
  const maxPrice = minMaxPrices.maxPrice > minPrice ? minMaxPrices.maxPrice : minPrice + 10000;

  const minMileage = minMaxMileage.minMileage >= 0 ? minMaxMileage.minMileage : 0;
  const maxMileage = minMaxMileage.maxMileage > minMileage ? minMaxMileage.maxMileage : minMileage + 100000;

  return (
      <div className="w-full md:w-80 p-6 bg-gray-100 shadow-xl rounded-lg space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
          <button
            onClick={handleResetFilters}
            className="bg-red-600 text-white py-1 px-2 rounded-md text-sm transition hover:bg-red-700"
          >
            Reset
          </button>
        </div>
        <PriceRangeSlider
          minPrice={minPrice}
          maxPrice={maxPrice}
          onChange={(values) => {
            handleFilterChange("minPrice", values[0]);
            handleFilterChange("maxPrice", values[1]);
          }}
        />
        <BodyTypeFilter
          options={uniqueTypes}
          onChange={(updateFn) => handleFilterChange("type", updateFn([]))}
        />
        <TransmissionFilter
          options={uniqueTransmission}
          onChange={(updateFn) => handleFilterChange("transmission", updateFn([]))}
        />
        <ColorFilter
          options={uniqueColors}
          onChange={(updateFn) => handleFilterChange("color", updateFn([]))}
        />
        <AvailabilityToggle
          onChange={(available) => handleFilterChange("status", available ? "available" : "not available")}
        />
        <FuelTypeFilter
          options={uniqueFuelTypes}
          onChange={(updateFn) => handleFilterChange("fuelType", updateFn([]))}
        />
        <BrandFilter
          options={uniqueMakes}
          onChange={(updateFn) => handleFilterChange("make", updateFn([]))}
        />
        <MileageFilter
          minMileage={minMileage}
          maxMileage={maxMileage}
          onChange={(mileage) => {
            handleFilterChange("minMileage", mileage[0]);
            handleFilterChange("maxMileage", mileage[1]);
          }}
        />
      </div>
    );
};

export default VehicleFilter;
