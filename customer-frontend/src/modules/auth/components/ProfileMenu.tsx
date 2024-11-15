import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/auth-context';

const ProfileMenu = () => {
  const { logout } = useAuth(); // Assuming there's a logout function in the auth context
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative mt-5">
      <button onClick={toggleMenu} className="text-blue-500 hover:text-blue-600 focus:outline-none">
        <i className="fas fa-user-circle fa-2x"></i>
      </button>
      {isMenuOpen && (
        <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1">
          <li>
            <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Profile
            </Link>
          </li>
          <li>
            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileMenu;
