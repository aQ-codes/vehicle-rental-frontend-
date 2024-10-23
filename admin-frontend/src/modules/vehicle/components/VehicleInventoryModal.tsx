import React, { useEffect, useState } from "react";
import { VehicleEntry } from "@/models";
import { useUpdateVehicleInventory } from "../services/VehicleInventoryService";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "@/components/ui/Modal/Modal";


interface VehicleInventoryModalProps {
    vehicleEntry: VehicleEntry ; 
    onClose: () => void; // Function to close the modal
    isOpen: boolean; // To control the modal visibility
}

const VehicleInventoryModal: React.FC<VehicleInventoryModalProps> = ({ vehicleEntry, onClose, isOpen }) => {
    const [formData, setFormData] = useState<Omit<VehicleEntry, 'id'>>({
        vin: vehicleEntry?.vin || "",
        variant: vehicleEntry?.variant || "",
        year: vehicleEntry?.year || 0,
        color: vehicleEntry?.color || "",
        transmission: vehicleEntry?.transmission || "",
        fuelType: vehicleEntry?.fuelType || "",
        engineCapacity: vehicleEntry?.engineCapacity || 0,
        mileage: vehicleEntry?.mileage || 0,
        pricePerDay: vehicleEntry?.pricePerDay || 0,
        status: vehicleEntry?.status || "available",
        modelId: vehicleEntry?.modelId || 0, 
    });

    const { loading: updating, error: updateError, updateVehicleEntry } = useUpdateVehicleInventory();

    useEffect(() => {
        if (vehicleEntry) {
            setFormData(vehicleEntry); // Populate the form with existing data when editing
        }
    }, [vehicleEntry]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const parsedValue = name === 'pricePerDay' || name === 'year' || name === 'mileage'
        ? parseInt(value) || 0  // Use parseInt for number fields, with a fallback to 0 if invalid
        : value;

        setFormData((prevData) => ({ ...prevData, [name]: parsedValue }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, __typename, ...cleanedFormData } = formData;
        try {
            await updateVehicleEntry(vehicleEntry.id, cleanedFormData); 
            onClose(); // Close the modal on success
        } catch (error) {
            console.error("Failed to update vehicle entry:", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-lg font-bold">Edit Vehicle Inventory</h2>
            <form onSubmit={handleSubmit} className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="vin">VIN</label>
                    <input
                        type="text"
                        name="vin"
                        value={formData.vin}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="variant">Variant</label>
                    <input
                        type="text"
                        name="variant"
                        value={formData.variant}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="year">Year</label>
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="color">Color</label>
                    <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="transmission">Transmission</label>
                    <input
                        type="text"
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="fuelType">Fuel Type</label>
                    <input
                        type="text"
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="engineCapacity">Engine Capacity</label>
                    <input
                        type="text"
                        name="engineCapacity"
                        value={formData.engineCapacity}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="mileage">Mileage</label>
                    <input
                        type="number"
                        name="mileage"
                        value={formData.mileage}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="pricePerDay">Price/Day</label>
                    <input
                        type="number"
                        name="pricePerDay"
                        value={formData.pricePerDay}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="status">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full"
                    >
                        <option value="available">Available</option>
                        <option value="rented">Rented</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="nops">NOPS</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-center mt-4">
                <button
                    type="submit"
                    className="border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white p-2 rounded"
                    disabled={updating}
                >
                    {updating ? <ClipLoader size={20} color="#0c83de" loading={true} /> : "Update"}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="border border-gray-500 text-gray-500 bg-transparent hover:bg-gray-500 hover:text-white p-2 rounded ml-2"
                >
                    Cancel
                </button>
            </div>

            {updateError && (
                <p className="text-red-500 mt-2">{updateError?.message}</p>
            )}
            </form>
        </Modal>
    );
};

export default VehicleInventoryModal;