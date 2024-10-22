import { useMutation } from "@apollo/client";
import { ADD_VEHICLE_MODEL_MUTATION, DELETE_VEHICLE_MODEL_MUTATION } from "@/graphql/mutations/vehicle-model";
import { VehicleModel } from "@/models/index"; 
import { useQuery } from "@apollo/client";
import { GET_VEHICLE_MODELS_QUERY } from "@/graphql/queries/vehicle-model";

//add vehicle model service
export const useAddVehicleModel = () => {
    const [addVehicle, { loading, error }] = useMutation(ADD_VEHICLE_MODEL_MUTATION);

    const addVehicleModel = async (input: VehicleModel) => {
        const result = await addVehicle({ variables: { input } });
        return result;
    };

    return { addVehicleModel, loading, error };
};

// get all vehicle model service 
export const useGetVehicleModels = () => {
    const { loading, error, data } = useQuery(GET_VEHICLE_MODELS_QUERY);

    return { loading, error, vehicleModels: data?.getVehicleModels || [] };
};

// delete a vehicle model 
export const useDeleteVehicleModel = () => {
    const [deleteVehicle] = useMutation(DELETE_VEHICLE_MODEL_MUTATION);

    const deleteVehicleModel = async (id: unknown) => {
        await deleteVehicle({ variables: { id } });
    };

    return { deleteVehicleModel };
};
