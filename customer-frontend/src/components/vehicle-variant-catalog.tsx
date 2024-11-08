import VehicleVariants from '@/modules/vehicles/components/variant-listing';
import React, { useState, useCallback } from 'react';
import Carousel from './ui/carousel';
import { SelectedFilters } from '@/models';
import { constructImageUrl } from '@/helper/ConstructImage';

interface VehicleVariantCatalogProps {
  vehicleId: number | null;
  selectedFilters: SelectedFilters;
}

const VehicleVariantCatalog: React.FC<VehicleVariantCatalogProps> = ({ vehicleId, selectedFilters }) => {

  const [images, setImages] = useState<{ src: string; title: string }[]>([]);

  const handleImagesFetch = useCallback((fetchedImages: string[]) => {
    const formattedImages = fetchedImages.map((src, index) => ({
      src: constructImageUrl(src),
      title: `Image ${index + 1}`,
    }));

    setImages(formattedImages);
  }, [vehicleId]);


  return (
    <div>
      {images.length > 0 && <Carousel images={images} />}
      <VehicleVariants 
        vehicleId={vehicleId} 
        selectedFilters={selectedFilters} 
        onImagesFetch={handleImagesFetch} 
      />
    </div>
  );
};

export default VehicleVariantCatalog;
