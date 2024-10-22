import React from 'react';
import Modal from '@/components/ui/Modal/Modal';
import VehicleModelForm from './VehicleModelForm'; 

interface EditModelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditVehicleModel: React.FC<EditModelModalProps> = ({ isOpen, onClose }) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant={['carform']}>
      <VehicleModelForm />
    </Modal>
  );
};

export default EditVehicleModel;
