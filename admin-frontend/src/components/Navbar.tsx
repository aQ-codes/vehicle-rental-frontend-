import { UserIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <div className="bg-white p-4 flex justify-between items-center">
  <div className="flex items-end space-x-4">
    {/* Other content can go here if needed */}
  </div>
  
  <UserIcon className="h-6 w-6 ml-auto" /> 
</div>

  );
}
