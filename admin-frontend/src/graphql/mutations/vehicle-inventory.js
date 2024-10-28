import { gql } from '@apollo/client';

export const ADD_VEHICLE_INVENTORIES_MUTATION = gql`
    mutation AddVehicleInventories($input: [AddVehicleInventoryInput!]!) {
        addVehicleInventories(input: $input) {
            success
            partialSuccess
            successCount
            failedCount
            alreadyExistingCount
            errorEntries {
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


export const UPDATE_VEHICLE_INVENTORY_MUTATION = gql`
  mutation UpdateVehicleInventory($id: Int!, $input: AddVehicleInventoryInput!) {
    updateVehicleInventory(id: $id, input: $input)
  }
`;

export const DELETE_VEHICLE_INVENTORY_MUTATION = gql`
  mutation DeleteVehicleInventory($id: Int!, $modelId: Int!) {
    deleteVehicleInventory(id: $id, modelId: $modelId)
  }
`;

