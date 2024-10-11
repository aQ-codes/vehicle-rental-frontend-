import { FaHome, FaCar, FaBookOpen } from 'react-icons/fa';

export const MENU_ITEMS = [
  { icon: <FaHome className="h-6 w-6" />, label: "Dashboard", path: "/dashboard" },
  { icon: <FaCar className="h-6 w-6" />, label: "Vehicles", path: "/vehicles" },
  { icon: <FaBookOpen className="h-6 w-6" />, label: "Bookings", path: "/bookings" },
];