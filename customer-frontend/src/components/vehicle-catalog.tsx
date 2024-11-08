import { SelectedFilters } from '@/models';
import VehicleListing from '@/modules/vehicles/components/vehicle-listing';
import React from 'react';

interface VehicleCatalogProps {
  selectedFilters: SelectedFilters;
  onSelectVehicle: (vehicleId: number) => void;
}

const VehicleCatalog: React.FC<VehicleCatalogProps> = ({ selectedFilters, onSelectVehicle }) => {
  return (
    <VehicleListing selectedFilters={selectedFilters} onSelectVehicle={onSelectVehicle} />
  );
};

export default VehicleCatalog;
