import { gql } from '@apollo/client';

export const ADD_VEHICLE_INVENTORIES_MUTATION = gql`
  mutation AddVehicleInventories($input: [AddVehicleInventoryInput!]!) {
    addVehicleInventories(input: $input) {
      success
      errorEntries {
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
        error
      }
    }
  }
`;
