import React from 'react';
import Modal from '@/components/ui/Modal/Modal';
import VehicleModelForm from './VehicleModelForm'; 

interface AddModelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddVehicleModel: React.FC<AddModelModalProps> = ({ isOpen, onClose }) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant={['carform']}>
      <VehicleModelForm />
    </Modal>
  );
};

export default AddVehicleModel;
