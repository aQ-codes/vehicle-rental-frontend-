import React from 'react';
import { useGetFilteredVehicleModels } from '../services/vehicle-service';
import CarCard from '@/components/vehicle-card';
import { SelectedFilters } from '@/models/index';
import { constructImageUrl } from '@/helper/ConstructImage';

interface VehicleListingProps {
  selectedFilters: SelectedFilters;
  onSelectVehicle: (vehicleId: number) => void;
}

const VehicleListing: React.FC<VehicleListingProps> = ({ selectedFilters, onSelectVehicle }) => {

  const { vehicleModels, loading, error } = useGetFilteredVehicleModels(selectedFilters);

  if (loading) return <div>Loading vehicles...</div>;
  if (error) return <div>Error loading vehicles: {error.message}</div>;
  if (vehicleModels.length === 0) return <div>No vehicles found matching the filters.</div>;

  return (
    <div className="flex flex-col space-y-6">
      {vehicleModels.map(vehicle => (
        <div key={vehicle.id} onClick={() => onSelectVehicle(vehicle.id)}>
          <CarCard
            status={`${vehicle.availableCount} variants available`}
            imageUrl={constructImageUrl(vehicle.primaryImage)}
            manufacturer={vehicle.make}
            modelName={vehicle.name}
            price={vehicle.minPrice || 0}
            bodyType={vehicle.type}
            doors={vehicle.doors}
            seats={vehicle.seats}
            mileage={vehicle.maxMileage || 0}
          />
        </div>
      ))}
    </div>
  );
};

export default VehicleListing;
