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
    <Modal isOpen={true} onClose={onClose}> {/* Use the passed onClose prop */}
      <div className="flex flex-col items-center justify-center rounded-2xl">
        <header className="text-center py-2 px-12 font-semibold text-base bg-transparent" >
          <Image 
            src="/assets/images/logo_dreamwheels.png"
            alt="company_logo"
            width={96}
            height={20}
          />
        </header>
        <h2 className="mt-2 font-semibold text-sm text-gray-500">Your Road to Freedom</h2>
        <main className="p-10 rounded-lg shadow-md w-full max-w-[480px]">         {children}

        </main>
      </div>

    </Modal>
  );
};

export default AuthLayout;




