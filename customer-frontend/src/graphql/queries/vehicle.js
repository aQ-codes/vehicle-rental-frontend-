import { gql } from "@apollo/client";

// Query to get unique vehicle makes
export const GET_UNIQUE_MAKES_QUERY = gql`
  query GetUniqueMakes {
    getUniqueMakes
  }
`;

export const GET_UNIQUE_TYPES_QUERY = gql`
  query GetUniqueTypes {
    getUniqueTypes
  }
`;

export const GET_UNIQUE_COLORS_QUERY = gql`
  query GetUniqueColors {
    getUniqueColors
  }
`;

export const GET_MIN_MAX_PRICES_QUERY = gql`
  query GetMinMaxPrices {
    getMinMaxPrices {
      minPrice
      maxPrice
    }
  }
`;

export const GET_MIN_MAX_MILEAGE_QUERY = gql`
  query GetMinMaxMileage {
    getMinMaxMileage {
      minMileage
      maxMileage
    }
  }
`;

export const GET_UNIQUE_TRANSMISSION_QUERY = gql`
  query GetUniqueTransmission {
    getUniqueTransmission
  }
`;

export const GET_UNIQUE_FUEL_TYPES_QUERY = gql`
  query GetUniqueFuelTypes {
    getUniqueFuelTypes
  }
`;

//query to fetch vehicles based on the filter object

export const GET_VEHICLE_MODELS = gql`
  query GetVehicleModels($filter: VehicleFilterInput) {
    getVehicles(filter: $filter) {
      id
      name
      make
      type
      doors
      seats   
      description
      primaryImage
      minPrice
      maxMileage
      availableCount
    }
  }
`;

//query to get vehicle variants based on the modified vehicle model filter input as  variant filter input and vehicle model id

export const GET_VARIANTS = gql`
  query GetVariants($vehicleModelId: ID!, $filter: VariantFilterInput) {
    getVariants(vehicleModelId: $vehicleModelId, filter: $filter) {
      id
      name
      color
      variant
      year
      transmission
      fuelType
      engineCapacity
      mileage
      pricePerDay
      status
      additionalImages
      description 
      availableCount
    }
  }
`;

