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
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden ">
        {/* Left Column: Header and Image */}
        <div className="flex flex-col items-center p-6 bg-gradient-to-b from-blue-500 to-blue-700 text-white md:w-1/2 ">
          <header className="text-center mb-6">
            <Image
              className="mx-auto"
              src="/assets/images/logo_dw.png"
              alt="company_logo"
              width={80}
              height={15}
            />
            <h2 className="mt-2 font-semibold text-lg">Your Road to Freedom</h2>
          </header>
          <Image
            src="/assets/images/authbg.png"
            alt="auth_background"
            width={320}
            height={400}
            className="object-cover mb-4 rounded-lg shadow-md"
          />
          <div className="store-btns flex justify-center space-x-4 mt-3 mb-2">
            <a href="#">
              <Image
                src="/assets/images/dwnld_appstore.svg"
                alt="Download on the App Store"
                width={120}
                height={40}
                className="rounded-lg shadow-md hover:opacity-90 transition"
              />
            </a>
            <a href="#">
              <Image
                src="/assets/images/dwnld_googleplay.svg"
                alt="Get it on Google Play"
                width={120}
                height={40}
                className="rounded-lg shadow-md hover:opacity-90 transition"
              />
            </a>
          </div>
        </div>
        {/* Right Column: Main Content */}
        <div className="flex-1 p-6 md:p-10">
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default AuthLayout;
