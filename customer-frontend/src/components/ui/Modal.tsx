import React, { ReactNode } from "react";
import Button from "@/components/ui/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: string[] | ''; // Variant can be an array of strings or an empty string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, variant = [] }) => {
  if (!isOpen) return null; // Return nothing if the modal is not open

  // Dynamically generate the className string
  const modalClassName = `${variant && Array.isArray(variant) ? variant.map(cls => cls).join(' ') : ''}`;

  return (
    <div className="fixed inset-0 w-screen min-h-screen bg-black bg-opacity-70 flex items-center justify-center z-[1000]">
    <div className={`ModalBox ${modalClassName} relative z-[1001] max-h-[80vh] overflow-y-auto p-4 rounded-xl bg-white`}>
      <div className="flex justify-end">
        <Button
          type="button"
          title="Close"
          icon="/assets/icons/close.svg"
          variant={['btn', 'close']}
          onClick={onClose}
        />
      </div>
      <div className="ModalBody">
        {children}
      </div>
    </div>
  </div>
  
  );
};

export default Modal;


