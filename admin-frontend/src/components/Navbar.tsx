import { FaUser } from 'react-icons/fa';

export default function Navbar() {
  return (
    <div className="bg-white p-4 flex justify-between items-center">
  <div className="flex items-end space-x-4">
    {/* Other content can go here if needed */}
  </div>
  
  <FaUser className="h-6 w-6 ml-auto" /> 
</div>

  );
}
