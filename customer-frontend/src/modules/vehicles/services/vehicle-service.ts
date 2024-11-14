import { useQuery } from "@apollo/client";
import {GET_MIN_MAX_MILEAGE_QUERY, GET_MIN_MAX_PRICES_QUERY, GET_UNIQUE_COLORS_QUERY, GET_UNIQUE_FUEL_TYPES_QUERY, GET_UNIQUE_MAKES_QUERY, GET_UNIQUE_TRANSMISSION_QUERY, GET_UNIQUE_TYPES_QUERY, GET_VARIANTS, GET_VEHICLE_MODELS} from "@/graphql/queries/vehicle"
import { SelectedFilters, VehicleModel } from "@/models/index";

// Service to fetch unique data from the vehicles

export const useGetUniqueMakes = () => {
  const { loading, error, data } = useQuery<{ getUniqueMakes: string[] }>(GET_UNIQUE_MAKES_QUERY);

  const uniqueMakes = data?.getUniqueMakes.map(item => item) || [];

  return { loading, error, uniqueMakes };
};

export const useGetUniqueTypes = () => {
  const { loading, error, data } = useQuery<{ getUniqueTypes: string[] }>(GET_UNIQUE_TYPES_QUERY);

  const uniqueTypes = data?.getUniqueTypes || [];

  return { loading, error, uniqueTypes };
};

export const useGetUniqueColors = () => {
  const { loading, error, data } = useQuery<{ getUniqueColors: string[] }>(GET_UNIQUE_COLORS_QUERY);

  const uniqueColors = data?.getUniqueColors || [];

  return { loading, error, uniqueColors };
};

export const useGetMinMaxPrices = () => {
  const { loading, error, data } = useQuery<{ getMinMaxPrices: { minPrice: number; maxPrice: number } }>(GET_MIN_MAX_PRICES_QUERY);

  const minMaxPrices = data?.getMinMaxPrices || { minPrice: 0, maxPrice: 0 };

  return { loading, error, minMaxPrices };
};

export const useGetMinMaxMileage = () => {
  const { loading, error, data } = useQuery<{ getMinMaxMileage: { minMileage: number; maxMileage: number } }>(GET_MIN_MAX_MILEAGE_QUERY);

  const minMaxMileage = data?.getMinMaxMileage || { minMileage: 0, maxMileage: 0 };

  return { loading, error, minMaxMileage };
};

export const useGetUniqueTransmission = () => {
  const { loading, error, data } = useQuery<{ getUniqueTransmission: string[] }>(GET_UNIQUE_TRANSMISSION_QUERY);

  const uniqueTransmission = data?.getUniqueTransmission || [];

  return { loading, error, uniqueTransmission };
};

export const useGetUniqueFuelTypes = () => {
  const { loading, error, data } = useQuery<{ getUniqueFuelTypes: string[] }>(GET_UNIQUE_FUEL_TYPES_QUERY);

  const uniqueFuelTypes = data?.getUniqueFuelTypes || [];
  
  return { loading, error, uniqueFuelTypes };
};

//service to fetch the filtered vehicle data

export const useGetFilteredVehicleModels = (filter: SelectedFilters) => {
  const { data, loading, error } = useQuery<{ getVehicles: VehicleModel[] }>(GET_VEHICLE_MODELS, {
    variables: { filter },
    skip: !filter,
  });

  return {
    vehicleModels: data?.getVehicles || [],
    loading,
    error,
  };
};

//service to fetch the filtered vehicle inventory data

export const useGetFilteredVariants = (filter: SelectedFilters, vehicleId: number | null ) => {
  const { data, loading, error, refetch } = useQuery(GET_VARIANTS, {
    variables: { vehicleId, filter },
    skip: !vehicleId || !filter,
  });

  return {
    variants: data?.getVariants || [],
    loading,
    error,
    refetch
  };
};
