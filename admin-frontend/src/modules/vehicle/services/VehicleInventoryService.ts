import { useMutation, useQuery } from "@apollo/client";
import { DELETE_VEHICLE_INVENTORY_MUTATION} from "@/graphql/mutations/vehicle-inventory"
import {GET_VEHICLE_INVENTORIES_BY_MODELID_QUERY} from "@/graphql/queries/vehicle-inventory"

// Delete a vehicle inventory service
export const useDeleteVehicleEntry = () => {
  const [deleteVehicleInventory, { loading, error, data }] = useMutation(DELETE_VEHICLE_INVENTORY_MUTATION);
  
  const deleteVehicleEntry = async (id: number, modelId: number) => {
    await deleteVehicleInventory({ variables: { id, modelId } });
};

  return { deleteVehicleEntry, loading, error, success: data?.deleteVehicleInventory || false };
};


//get all vehicleinventores of a particular model
export const useGetVehicleInventoriesByModelId = (modelId: number) => {
    const { loading, error, data } = useQuery(GET_VEHICLE_INVENTORIES_BY_MODELID_QUERY, {
        variables: { modelId },
    });

    return { loading, error, vehicleInventories: data?.getVehicleInventoriesByModelId || [] };
};

