"use client";

// import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { useRouter } from 'next/navigation'; 
import AuthButton from '@/app/modules/auth/components/AuthButton';

const Navbar = () => {
    // const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // State to control the Auth modal display
    // const [isClient, setIsClient] = useState(false); // State to detect client-side rendering
    // const router = useRouter();

    // Set isClient to true when the component mounts (runs only on the client-side)
    // useEffect(() => {
    //     // setIsClient(true);

    //     // Check the query params on component mount
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const loginParam = urlParams.get('login');

    //     if (loginParam === 'true') {
    //         // setIsAuthModalOpen(true);  // Keep the modal open after successful Google sign-in
    //     }
    // }, []);

    // const handleAuthButtonClick = () => {
        // setIsAuthModalOpen(true); // Open the Auth modal when the button is clicked
    // };

    // const handleCloseModal = () => {
    //     setIsAuthModalOpen(false); // Close the modal
    // };

    // const handleProfileClick = () => {
    //     router.push('/profile'); // Redirect to the profile page on click
    // };

    return (
      <>
      <div className="w-full flex flex-wrap justify-between">
        {/* Branding */}
        <div>
          {/* Company logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/images/logo_dreamwheels.png"
              alt="company_logo"
              width={100}
              height={40}
            />
          </Link>
        </div>
    
        {/* Navigation menu */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <AuthButton/>

            </li>
          </ul>
        </nav>
      </div>
    
      {/* Render the UserLoginBox component when the auth button is clicked */}
      {/* {isAuthModalOpen && <UserLoginBox onClose={handleCloseModal} />}  */}
    </>
    
    );
};

export default Navbar;
