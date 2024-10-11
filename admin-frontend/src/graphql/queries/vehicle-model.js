import { gql } from "@apollo/client";

export const GET_VEHICLE_MODELS_QUERY = gql`
    query GetVehicleModels {
        getVehicleModels {
            id
            name
            make
            model
            type
            doors
            seats
            description
            primaryImage
            additionalImages
            quantity
        }
    }
`;
