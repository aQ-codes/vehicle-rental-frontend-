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
      <div>
        {children}
      </div>
      <div className="flex justify-center">
        <Button
          type="button"
          title="OK"
          label="OK"
          variant={['btn confirm mr-3']}
          onClick={onConfirm}
        />
        <Button
          type="button"
          title="Cancel"
          label="Cancel"
          variant={['btn cancel']}
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
