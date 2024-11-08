import React from "react";
import { useGetVehicleModels, useDeleteVehicleModel } from "../services/VehicleModelService"; // Update the path accordingly
import Link from "next/link";
import { VehicleModelResponse } from "@/models/index";
import ClipLoader from "react-spinners/ClipLoader"; 
import Image from "next/image";
import { BriefcaseIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const VehicleModelsTable = () => {
    const { loading, error, vehicleModels } = useGetVehicleModels();
    const { deleteVehicleModel } = useDeleteVehicleModel();

    if (loading) return (
        <div className="flex justify-center items-center h-48">
            <ClipLoader size={50} color="#0c83de" loading={true} />
        </div>
    );
    
    if (error) return <p>Error fetching vehicle models: {error.message}</p>;

    const handleDelete = async (id: unknown) => {
        const confirmed = confirm("Are you sure you want to delete this vehicle model?");
        if (confirmed) {
            await deleteVehicleModel(id);
        }
    };

    const constructImageUrl = (imagePath: string) => {
        // Prepend 'http://' if the URL doesn't already include it
        const endpoint = process.env.NEXT_PUBLIC_MINIO_ENDPOINT;
        const port = process.env.NEXT_PUBLIC_MINIO_PORT;
      
        if (!imagePath.startsWith('http://') && !imagePath.startsWith('https://')) {
          return `http://${endpoint}:${port}${imagePath}`;
        }
      
        return imagePath;
    };

    return (
<div className="overflow-x-auto rounded-lg shadow-md">
  <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
    <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <tr>
        <th className="border-b p-4 text-left">ID</th>
        <th className="border-b p-4 text-left">Primary Image</th>
        <th className="border-b p-4 text-left">Name</th>
        <th className="border-b p-4 text-left">Make</th>
        <th className="border-b p-4 text-left">Model</th>
        <th className="border-b p-4 text-left">Type</th>
        <th className="border-b p-4 text-left">Quantity</th>
        <th className="border-b p-4 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {vehicleModels.map((vehicle: VehicleModelResponse) => (
        <tr key={vehicle.id} className="bg-white transition hover:bg-gray-50">
          <td className="border-b p-4 text-gray-800">{vehicle.id}</td>
          <td className="border-b p-4">
            <Image
              src={constructImageUrl(vehicle.primaryImage)}
              alt={vehicle.name}
              height={30}
              width={30}
              className="h-16 w-16 object-cover rounded-full border border-gray-300"
            />
          </td>
          <td className="border-b p-4 text-gray-800">{vehicle.name}</td>
          <td className="border-b p-4 text-gray-800">{vehicle.make}</td>
          <td className="border-b p-4 text-gray-800">{vehicle.model}</td>
          <td className="border-b p-4 text-gray-800">{vehicle.type}</td>
          <td className="border-b p-4 text-gray-800">{vehicle.quantity}</td>
          <td className="border-b p-4 flex space-x-2">
            <Link href={`/vehicle-models/${vehicle.id}/vehicles`}>
              <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-400 transition duration-200 shadow-md">
                <BriefcaseIcon className="h-5 w-5" />
              </button>
            </Link>
            <Link href={`/edit-vehicle/${vehicle.id}`}>
              <button className="flex items-center border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white px-2 py-1 rounded-full transition duration-200 shadow-md">
                <PencilSquareIcon className="h-5 w-5" />
              </button>
            </Link>
            <button
              onClick={() => handleDelete(vehicle.id)}
              className="flex items-center border border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white px-2 py-1 rounded-full transition duration-200 shadow-md"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    );
};

export default VehicleModelsTable;
