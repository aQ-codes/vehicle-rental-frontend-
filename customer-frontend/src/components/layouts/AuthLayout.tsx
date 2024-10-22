"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import Modal from "@/components/ui/Modal";

interface AuthLayoutProps {
  children: ReactNode;
  onClose: () => void; // Prop to handle closing the modal
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      
      <div className="flex">
  
        {/* Left Column: Header and Image */}
        <div className="flex flex-col items-center">
          <header className="text-center flex-col font-semibold0">
            <Image 
            className="mx-auto"
              src="/assets/images/logo_dw.png"
              alt="company_logo"
              width={80}
              height={15}
            />
            <h2 className="mt-2 font-semibold text-sm text-gray-500">Your Road to Freedom</h2>
          </header>
          
          {/* Image below the header */}
          <div>
            <Image
              src="/assets/images/authbg.png"  
              alt="auth_background"
              width={320}   
              height={400}  
              className="object-cover"
            />
          </div>
          
        </div>

        {/* Right Column: Main Content */}
        <div>
          {children}
        </div>

      </div>

    </Modal>

    
  );
};

export default AuthLayout;




