// components/Spinner.tsx
import Image from "next/image";

const Spinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
    <Image
      src="/assets/images/car-wheel.svg" 
      alt="Loading..."
      width={64} 
      height={64} 
      className="animate-spin" 
    />
  </div>
);

export default Spinner;
