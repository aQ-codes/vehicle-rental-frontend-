import AvailabilityToggle from "@/modules/filter-cars/components/availability-filter";
import BodyTypeFilter from "@/modules/filter-cars/components/body-type-filter";
import BrandFilter from "@/modules/filter-cars/components/brand-filter";
import ColorFilter from "@/modules/filter-cars/components/color-filter";
import FuelTypeFilter from "@/modules/filter-cars/components/fuel-type-filter";
import MileageFilter from "@/modules/filter-cars/components/mileage-filter";
import PriceRangeSlider from "@/modules/filter-cars/components/price-filter";
import TransmissionFilter from "@/modules/filter-cars/components/transmission-filter";


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
