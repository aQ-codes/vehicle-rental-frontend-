import { gql } from '@apollo/client';

export const ADD_VEHICLE_MODEL_MUTATION = gql`
mutation AddVehicleModel($input :AddVehicleModelInput!){
  addVehicleModel(input: $input)
}`;

export const EDIT_VEHICLE_MODEL_MUTATION = gql`
    mutation EditVehicleModel($id: Int!) {
        EditVehicleModel(id: $id)
    }
`;


export const DELETE_VEHICLE_MODEL_MUTATION = gql`
    mutation DeleteVehicleModel($id: Int!) {
        deleteVehicleModel(id: $id)
    }
`;
