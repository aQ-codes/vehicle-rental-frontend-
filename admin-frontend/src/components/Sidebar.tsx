import Image from 'next/image';
import { MENU_ITEMS } from '@/constants/menu-items';
import { usePathname } from 'next/navigation';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 w-64 shadow-xl">
      <div className="flex items-center justify-center mt-7 space-x-3">
        <Image src="/assets/images/logo_dw.png" alt="Logo" width={48} height={48} />
        <Image src="/assets/images/logo_dw2.png" alt="Logo" width={144} height={88} />
      </div>
      <nav className="flex-1 mt-10">
        <ul className="space-y-2">
          {MENU_ITEMS.map(({ icon, label, path }) => (
            <li
              key={label}
              className={`transition duration-300 ease-in-out m-2 ${
                pathname === path ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'
              } rounded-md`}
            >
              <a href={path} className="flex items-center p-4 space-x-3">
                {icon}
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto mb-4">
        <a href="#" className="flex items-center p-4 space-x-3 bg-gray-700 text-white rounded-md transition duration-300 hover:bg-gray-600">
          <ArrowRightOnRectangleIcon className="h-6 w-6" />
          <span className="text-sm">Logout</span>
        </a>
      </div>
    </div>
  );
}
