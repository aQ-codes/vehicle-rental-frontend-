import React, { useState } from "react";
import { useDeleteVehicleEntry, useGetVehicleInventoriesByModelId } from "../services/VehicleInventoryService";
import ClipLoader from "react-spinners/ClipLoader";
import { VehicleEntry } from "@/models/index";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import ConfirmationModal from "@/components/ui/Modal/ConfirmationModal";
import VehicleInventoryModal from "./VehicleInventoryModal"; 


const VehicleInventoryTable = ({ modelId }: { modelId: number }) => {
    const { loading, error, vehicleInventories} = useGetVehicleInventoriesByModelId(modelId);
    const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null); 
    const [selectedModelId, setSelectedModelId] = useState<number | null>(null); 
    const [editingInventory, setEditingInventory] = useState<VehicleEntry | null>(null); // State for the inventory being edited

    const { loading: deleting, error: deleteError, success, deleteVehicleEntry } = useDeleteVehicleEntry(); 

    //vehicle inventory delete
    const handleDelete = async () => {
        if (selectedId && selectedModelId) {
            try {
                await deleteVehicleEntry(selectedId, selectedModelId); 
                if (success){
                  setIsConfirmModalOpen(false); // Close modal after deletion
                    console.log("Vehicle entry deleted successfully");
                }
            } catch (err) {
                console.error("Failed to delete vehicle entry:", err);
            }
        }
    };

    //confirmation modal on delete. 
    const openModal = (id: number, modelId: number) => {
        setSelectedId(id);
        setSelectedModelId(modelId);
        setIsConfirmModalOpen(true);
    };

    
    const handleEditClick = (inventoryId: number) => {
        const inventoryToEdit = vehicleInventories.find((inventory: VehicleEntry)   => inventory.id === inventoryId);
        if (inventoryToEdit) {
            setEditingInventory(inventoryToEdit); // Set the inventory to edit
            setIsInventoryModalOpen(true); // Open the VehicleInventoryForm modal
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-48">
            <ClipLoader size={50} color="#0c83de" loading={true} />
        </div>
    );
    if (error) return <p>Error fetching vehicle inventories: {error.message}</p>;

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border-b p-2 text-left">ID</th>
                            <th className="border-b p-2 text-left">VIN</th>
                            <th className="border-b p-2 text-left">Variant</th>
                            <th className="border-b p-2 text-left">Year</th>
                            <th className="border-b p-2 text-left">Color</th>
                            <th className="border-b p-2 text-left">Transmission</th>
                            <th className="border-b p-2 text-left">Fuel Type</th>
                            <th className="border-b p-2 text-left">Engine Capacity</th>
                            <th className="border-b p-2 text-left">Mileage</th>
                            <th className="border-b p-2 text-left">Price/Day</th>
                            <th className="border-b p-2 text-left">Status</th>
                            <th className="border-b p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicleInventories.map((inventory: VehicleEntry) => (
                            <tr key={inventory.id}>
                                <td className="border-b p-2">{inventory.id}</td>
                                <td className="border-b p-2">{inventory.vin}</td>
                                <td className="border-b p-2">{inventory.variant}</td>
                                <td className="border-b p-2">{inventory.year}</td>
                                <td className="border-b p-2">{inventory.color}</td>
                                <td className="border-b p-2">{inventory.transmission}</td>
                                <td className="border-b p-2">{inventory.fuelType}</td>
                                <td className="border-b p-2">{inventory.engineCapacity}</td>
                                <td className="border-b p-2">{inventory.mileage}</td>
                                <td className="border-b p-2">{inventory.pricePerDay}</td>
                                <td className="border-b p-2">{inventory.status}</td>
                                <td className="border-b p-2">
                                    <button
                                        onClick={() => handleEditClick(inventory.id)} // Handle edit click
                                        className="border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white p-2 rounded ml-2">
                                        <PencilSquareIcon className="h-5 w-5" />
                                    </button>

                                    <button 
                                        onClick={() => openModal(inventory.id, inventory.modelId)}
                                        className="border border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white p-2 rounded ml-2">
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ConfirmationModal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} onConfirm={handleDelete}>
                <h2 className="text-lg font-bold">Confirm Deletion</h2>
                <p className="mb-5">Are you sure you want to delete this vehicle inventory entry?</p>
                {deleting && <ClipLoader size={20} color="#0c83de" loading={true} />}
                {deleteError && <p className="text-red-500">{deleteError.message}</p>}
            </ConfirmationModal>

            {editingInventory && (
              <VehicleInventoryModal 
              vehicleEntry={editingInventory} // Pass the inventory being edited
              onClose={() => setEditingInventory(null)} // Close the modal when done
              isOpen={isInventoryModalOpen} // Control the modal visibility
            />
            )}
        </>
    );
};

export default VehicleInventoryTable;
