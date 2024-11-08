import { UserIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-4">
      </div>
      <UserIcon className="h-6 w-6 text-white cursor-pointer hover:text-gray-200 transition ml-auto" />
    </div>
  );
}
