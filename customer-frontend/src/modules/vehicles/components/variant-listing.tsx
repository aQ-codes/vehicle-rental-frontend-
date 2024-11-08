import { SelectedFilters, Variant } from '@/models';
import React, { useEffect } from 'react';
import { useGetFilteredVariants } from '../services/vehicle-service';
import { TruckIcon } from '@heroicons/react/24/outline';

interface CarDetailsProps {
  vehicleId: number | null;
  selectedFilters: SelectedFilters;
  onImagesFetch: (images: string[]) => void;
}

const VehicleVariants: React.FC<CarDetailsProps> = ({ selectedFilters, vehicleId, onImagesFetch }) => {
  const { variants, loading, error, refetch } = useGetFilteredVariants(selectedFilters, vehicleId);

  useEffect(() => {
    if (variants.length > 0) {  // Check if variants exist
      const additionalImages = variants.flatMap((variant: Variant) => variant.additionalImages || []);
      onImagesFetch(additionalImages);
    }
  }, [variants, onImagesFetch]); // Call `onImagesFetch` when `variants` changes
  
  useEffect(()=>{refetch()}, [refetch, vehicleId])

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching variants: {error.message}</div>;

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Vehicle Variants</h2>
      {/* Displaying variant cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {variants.map((variant: Variant) => (
          <div
            key={variant.id}
            className="p-4 border border-gray-300 rounded-md shadow-sm bg-white flex flex-col items-center transform hover:scale-105 transition duration-300"
          >
            <h3 className="text-lg font-semibold mb-2">{variant.variant}</h3>
            <div className="flex items-center mb-2">
              <TruckIcon  className={`h-6 w-6 text-${variant.color.toLowerCase()}-600`} />
              <span className="ml-2 text-gray-700">{variant.transmission}</span>
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-2">₹{variant.pricePerDay} <span className="text-sm">/day</span>
            </p>
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default VehicleVariants;
