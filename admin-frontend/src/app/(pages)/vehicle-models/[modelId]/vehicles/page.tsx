"use client"

import { useParams } from 'next/navigation';

import VehicleInventoryTable from "@/modules/vehicle/components/VehicleInventoryTable";

const VehicleInventoryPage = () => {
    const params = useParams<{ modelId: string }>();
    const modelId = Number(params?.modelId);


    if (!modelId) return <p>Loading...</p>;

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Inventory for Vehicle Model {modelId}</h1>
            <VehicleInventoryTable modelId={modelId} /> 
        </div>
    );
};

export default VehicleInventoryPage;
