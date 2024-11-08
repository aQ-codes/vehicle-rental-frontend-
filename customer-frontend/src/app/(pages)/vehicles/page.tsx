"use client";
import FilterSidebar from '@/components/filter-sidebar';
import VehicleCatalog from '@/components/vehicle-catalog';
import VehicleVariantCatalog from '@/components/vehicle-variant-catalog';
import { SelectedFilters } from '@/models';
import RentalInfo from '@/modules/vehicles/components/rental-info';
import React, { useState } from 'react';

const VehiclesPage: React.FC = () => {

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

  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);

  const handleFiltersChange = (newFilters: SelectedFilters) => {
    setSelectedFilters(newFilters);
  };

  const handleVehicleSelect = (vehicleId: number) => {
    alert(vehicleId)
    setSelectedVehicleId(vehicleId);
  };

  // console.log(selectedFilters)

  // Filter selected filters to match VariantFilterInput structure
  const variantFilters: SelectedFilters = {
    status: selectedFilters.status,
    year: selectedFilters.year,
    color: selectedFilters.color,
    transmission: selectedFilters.transmission,
    fuelType: selectedFilters.fuelType,
    minPrice: selectedFilters.minPrice,
    maxPrice: selectedFilters.maxPrice,
    minMileage: selectedFilters.minMileage,
    maxMileage: selectedFilters.maxMileage,
  };

  return (
    <div className="flex space-x-4">
      <div className="w-3/12">
        <FilterSidebar onFiltersChange={handleFiltersChange} />
      </div>

      <div className="w-4/12">
        <VehicleCatalog selectedFilters={selectedFilters} onSelectVehicle={handleVehicleSelect} />
      </div>

      {selectedVehicleId && (
        <div className="w-5/12">
          <VehicleVariantCatalog vehicleId={selectedVehicleId} selectedFilters={variantFilters} />
        </div>
      )}

      <RentalInfo/>


    </div>
  );
};

export default VehiclesPage;
