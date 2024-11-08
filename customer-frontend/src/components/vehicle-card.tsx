import { CalendarIcon, SparklesIcon, TruckIcon, UsersIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';

interface CarCardProps {
  status: string;          // Status badge text, e.g., "6 variants available"
  imageUrl: string;        // URL of the car image
  manufacturer: string;    // Car manufacturer name, e.g., "Toyota"
  modelName: string;       // Model name, e.g., "Camry"
  price: number;           // Price per hour or day
  bodyType: string;        // Body type of the car, e.g., "SUV", "Sedan"
  doors: number;           // Number of doors, e.g., 4
  seats: number;           // Number of seats, e.g., 5
  mileage: number;         // Mileage of the car, e.g., 25 (mpg or km/l)
}

const CarCard: React.FC<CarCardProps> = ({ 
  status, 
  imageUrl, 
  manufacturer, 
  modelName, 
  price, 
  bodyType, 
  doors, 
  seats, 
  mileage 
}) => { 
  return (
    <div className="relative w-full max-w-md bg-white border rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 cursor-pointer overflow-hidden">
      {/* Status Badge */}
      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-md shadow">
        {status}
      </div>
      {/* Car Image */}
      <Image 
        src={imageUrl} 
        alt={`${manufacturer} ${modelName}`} 
        width={400} // Adjust width as necessary
        height={240} // Adjust height as necessary
        className="w-full h-48 object-cover"
      />
      {/* Car Info */}
      <div className="p-4">
        {/* Manufacturer & Model Name */}
        <div className="text-xs text-gray-400 uppercase tracking-wider">{manufacturer}</div>
        <div className="flex justify-between items-center mt-1">
          <div className="text-xl font-bold text-gray-800">{modelName}</div>
          <div className="text-gray-700 font-semibold">
            ${price} <span className="text-gray-400 text-sm">/ hour</span>
          </div>
        </div>
        {/* Divider */}
        <hr className="my-3 border-gray-200" />
        {/* Specifications */}
        <div className="grid grid-cols-4 gap-4 text-center text-sm text-gray-700">
          {/* Body Type */}
          <div className="flex flex-col items-center">
            <CalendarIcon className="text-gray-500 w-5 h-5 mb-1" />
            <span>{bodyType}</span>
          </div>
          {/* Doors */}
          <div className="flex flex-col items-center">
            <TruckIcon className="text-gray-500 w-5 h-5 mb-1" />
            <span>{doors} doors</span>
          </div>
          {/* Seats */}
          <div className="flex flex-col items-center">
            <UsersIcon className="text-gray-500 w-5 h-5 mb-1" />
            <span>{seats} seats</span>
          </div>
          {/* Mileage */}
          <div className="flex flex-col items-center">
            <SparklesIcon className="text-gray-500 w-5 h-5 mb-1" />
            <span>{mileage} mpg</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
