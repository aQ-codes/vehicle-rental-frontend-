"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';
import AuthButton from '@/modules/auth/components/AuthButton';
import ProfileMenu from '@/modules/auth/components/ProfileMenu';

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <div className="w-full flex flex-wrap justify-between relative z-20 ">
        {/* Branding */}
        <div>
          <Link href="/" className="flex items-center mt-4">
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
          <ul className="flex space-x-4 items-center">
            <li>
              {isAuthenticated ? (
                <ProfileMenu /> 
              ) : (
                <AuthButton />
              )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
