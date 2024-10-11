import Image from 'next/image';
import { FaSignOutAlt } from 'react-icons/fa';
import {MENU_ITEMS} from '@/constants/menu-items'
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  // Define the menu items with their corresponding paths

  return (
    <div className="flex flex-col h-screen bg-white w-64">
      <div className="flex items-center justify-center mt-8">
        <Image src="/assets/images/logo_dreamwheels.png" alt="Logo" width={48} height={48} />
        <h1 className="text-xl font-bold ml-4">DreamWheels</h1>
      </div>
        <nav className="flex-1 mt-10">
        <ul>
    {MENU_ITEMS.map(({ icon, label, path }) => (
      <li key={label} className={`hover:bg-slate-50 m-2 ${pathname === path ? 'bg-slate-50' : ''}`}>
        <a href={path} className="flex items-center p-4 space-x-3"> {/* Added space-x-3 for spacing between icon and text */}
          {icon}
          <span>{label}</span>
        </a>
      </li>
    ))}
  </ul>

      </nav>
      <div className="mt-auto hover:bg-slate-50">
        <a href="#" className="flex items-center p-4">
          <FaSignOutAlt className="h-6 w-6" />
          <span className="ml-3 text-sm">Logout</span>
        </a>
      </div>
    </div>
  );

}
