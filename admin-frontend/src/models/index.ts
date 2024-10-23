// Define the input interface
export interface VehicleModel {
  name: string;
  model: string;
  make: string;
  type: string;
  seats: number;
  doors: number;
  description: string;
  primaryImage: File | null;
  additionalImages: File[];
}

// Extend VehicleModelInput and override fields
export interface VehicleModelResponse extends Omit<VehicleModel, 'primaryImage' | 'additionalImages'> {
id: number; 
primaryImage: string; 
additionalImages: string[]; 
quantity: number; 
}

export interface VehicleEntry {
  id: number;
  modelId: number;
  vin: string;
  variant: string;
  year: number;
  color: string;
  transmission: string; 
  fuelType: string;
  engineCapacity: number;
  mileage: number;
  pricePerDay: number;
  status: string;
}

