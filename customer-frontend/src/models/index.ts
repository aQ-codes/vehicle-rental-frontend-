export interface Customer {
  id?:  string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  password: string;
  isVerified:boolean;
}

export interface LoginCustomerVars {
  email: string;
  password: string;
}

export interface VehicleModel {
  id: number;
  name: string;
  make: string;
  type: string;
  doors: number;
  seats: number;
  description: string;
  primaryImage: string;
  minPrice: number;
  maxMileage: number;
  availableCount: number;
}

export interface Variant {
  id: string;
  name: string;
  color: string;
  variant: string;
  year: number;
  transmission: string;
  fuelType: string;
  engineCapacity: number;
  mileage: number;
  pricePerDay: number;
  status: string;
  additionalImages: string[];
  description: string;
  availableCount: number;
}

//type for the selectedFilters object
export interface SelectedFilters {
  status?: string;
  make?: [string];
  type?: [string];
  model?: [string];
  year?: [number];
  color?: [string];
  transmission?: [string];
  fuelType?: [string];
  minPrice?: number;
  maxPrice?: number;
  minMileage?: number;
  maxMileage?: number;    
}

