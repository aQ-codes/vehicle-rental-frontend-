import { HomeModernIcon, TruckIcon, BookOpenIcon } from "@heroicons/react/24/outline";

export const MENU_ITEMS = [
  { icon: <HomeModernIcon className="h-6 w-6" />, label: "Dashboard", path: "/dashboard" },
  { icon:<TruckIcon className="h-6 w-6" />, label: "Vehicles", path: "/vehicle-models" }, 
  { icon: <BookOpenIcon className="h-6 w-6" />, label: "Bookings", path: "/bookings" },
];

