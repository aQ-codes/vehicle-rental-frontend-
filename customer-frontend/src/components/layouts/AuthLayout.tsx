"use client";
import React, { ReactNode, useState, useEffect } from "react";
import Image from "next/image";
import Modal from "@/components/ui/Modal";

interface AuthLayoutProps {
  children: ReactNode;
  onClose: () => void; // Prop to handle closing the modal
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, onClose }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    setIsImageLoaded(false);
  }, []);

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out">
        {/* Left Column: Header and Image */}
        <div className="flex flex-col items-center p-6 bg-gradient-to-b from-blue-500 to-blue-700 text-white md:w-1/2 ">
          <header className="text-center mb-6">
            <Image
              className={`mx-auto transition-opacity duration-500 ease-in-out ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              src="/assets/images/logo_dw.webp"
              alt="company_logo"
              width={80}
              height={15}
              onLoadingComplete={() => setIsImageLoaded(true)}
            /> 
            <h2 className="mt-2 font-semibold text-lg">Your Road to Freedom</h2>
          </header>

          <Image
            src="/assets/images/authbg.webp"
            alt="auth_background"
            width={320}
            height={400}
            className={`object-cover mb-4 rounded-lg shadow-md transition-opacity duration-500 ease-in-out ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoadingComplete={() => setIsImageLoaded(true)}
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
        <div className="flex-1 p-6 md:p-10 transition-opacity duration-500 ease-in-out">
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default AuthLayout;
