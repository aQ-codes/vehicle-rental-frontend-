import React, { ReactNode } from "react";
import styles from "./Modal.module.css"; // Import the CSS module
import Button from "@components/ui/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: string[] | ''; // Variant can be an array of strings or an empty string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, variant = [] }) => {
  if (!isOpen) return null; // Return nothing if the modal is not open

  // Dynamically generate the className string
  const modalContainerClassNames = `${styles.ModalContainer} ${variant && Array.isArray(variant) ? variant.map(cls => styles[cls]).join(' ') : ''}`;

  return (
    <div className={modalContainerClassNames }>
      <div className={styles.ModalBox}>
        <div className={styles.ModalClose}>
          <Button
            type="button"
            title="Close"
            icon="/assets/icons/close.svg"
            variant={['btn', 'close', 'modal']}
            onClick={onClose}  
          />
        </div>
        <div className={styles.ModalBody}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
