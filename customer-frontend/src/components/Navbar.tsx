"use client";

// import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { useRouter } from 'next/navigation'; 
import AuthButton from '@/modules/auth/components/AuthButton';

const Navbar = () => {

    return (
      <>
      <div className="w-full flex flex-wrap justify-between relative z-20">
        {/* Branding */}
        <div>
          {/* Company logo */}
          <Link href="/" className="flex items-center mt-4 p-1">
              <Image
              src="/assets/images/logo_dw2.png"
              alt="company_logo"
              width={184}
              height={80}
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
