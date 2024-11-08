import { SelectedFilters } from '@/models';
import VehicleFilter from '@/modules/vehicles/components/vehicle-filter';
import React from 'react';


interface FilterSidebarProps {
  onFiltersChange: (filters: SelectedFilters) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFiltersChange }) => {
  return (
    <VehicleFilter onFiltersChange={onFiltersChange} />
  );
};

export default FilterSidebar;
