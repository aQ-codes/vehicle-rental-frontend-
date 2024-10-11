import React from 'react';
import Modal from '@/components/ui/Modal/Modal';
import ExcelVehicleInventoryUpload from './ExcelInventoryUpload';

interface AddVehicleInventoryProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddVehicleInventory: React.FC<AddVehicleInventoryProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant={['carform']}>
      <ExcelVehicleInventoryUpload />
    </Modal>
  );
};

export default AddVehicleInventory;
