"use client"

import React, { useState } from 'react';
import AddVehicleModel from '@/modules/vehicle/components/AddVehicleModel'; 
import Button from '@/components/ui/Button'; 
import AddVehicleInventory from '@/modules/vehicle/components/AddVehicleInventory';
import VehicleModelsTable from '@/modules/vehicle/components/VehicleModelsTable';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);

  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openInventoryModal = () => {
    setIsInventoryModalOpen(true);
  };

  const closeInventoryModal = () => {
    setIsInventoryModalOpen(false);
  };

  return (
    <div className="flex flex-col p-4">

          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Vehicle Models</h1>
            {/* Right Side Buttons */}
            <div className="flex">
              <Button
                type="button"
                title="Add Vehicle Model"
                label="Add Vehicle Model"
                icon="/assets/icons/add.png"
                variant={['btn add']}
                onClick={openModal}
              />
              <button 
                onClick={openInventoryModal} 
                className="flex items-center border border-green-500 text-green-500 px-2 py-1 rounded ml-2 hover:bg-gray-100  transition"
              >
                <DocumentArrowDownIcon className="h-6 w-6 mr-1" /> 
                Upload Vehicles
              </button>
            </div>
          </div>


      {/* Modal components */}
      <AddVehicleModel isOpen={isModalOpen} onClose={closeModal} />
      <AddVehicleInventory isOpen={isInventoryModalOpen} onClose={closeInventoryModal} />

      <VehicleModelsTable />
    </div>
  );
};

export default Page;
