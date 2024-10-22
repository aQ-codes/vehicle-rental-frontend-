import { gql } from "@apollo/client";

export const GET_VEHICLE_INVENTORIES_BY_MODELID_QUERY = gql`
  query GetVehicleInventoriesByModelId($modelId: Int!) {
    getVehicleInventoriesByModelId(modelId: $modelId) {
      id
      modelId
      vin
      variant
      year
      color
      transmission
      fuelType
      engineCapacity
      mileage
      pricePerDay
      status
    }
  }
`;

