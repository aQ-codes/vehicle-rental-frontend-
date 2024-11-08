import React, { ReactNode } from "react";
import Modal from "./Modal"; // Import the base Modal component
import Button from "@/components/ui/Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; // Function to call when confirming
  children: ReactNode;
  variant?: string[] | ''; // Variant can be an array of strings or an empty string
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, children, variant = [] }) => {
  // Function to render the content of the modal
  const renderModalContent = () => (
    <>
      <div className=" text-gray-800 text-center">
        {children}
      </div>
      <div className="flex justify-center mt-4">
        <Button
          type="button"
          title="OK"
          label="OK"
          variant={['btn confirm bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition mr-3']}
          onClick={onConfirm}
        />
        <Button
          type="button"
          title="Cancel"
          label="Cancel"
          variant={['btn cancel bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition']}
          onClick={onClose}
        />
      </div>
    </>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant={variant}>
      {renderModalContent()}
    </Modal>
  );
};

export default ConfirmationModal;
