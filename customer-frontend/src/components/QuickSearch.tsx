'use client'

import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import LocationPicker from './vehicle-filters/location-filter';
import DatePicker from 'react-datepicker';
import { usePreferenceContext } from '@/context/preference-context';
import { useRouter } from 'next/navigation';

export default function QuickSearch() {
  const router = useRouter();

  const {
    pickupDateTime,
    dropoffDateTime,
    setPickupDate,
    setDropoffDate,
    setPickupLocation,
    setDropoffLocation,
  } = usePreferenceContext();

  const handleSearch = () => {
    router.push('/vehicles');

  };


  return (
    <div className="w-full mx-auto p-6 border rounded-2xl shadow-lg mt-10">
      <div className="flex flex-wrap gap-2 items-center justify-between">

        <div className="w-full sm:w-1/2 lg:w-1/5 ">
          <LocationPicker
            label="Pick-up Location"
            onSelect={setPickupLocation}
          />
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/5">
          <LocationPicker
            label="Drop-off Location"
            onSelect={setDropoffLocation}
          />
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/5">
          <label htmlFor="pickup" className="block text-sm font-semibold text-gray-700 mb-1">Pick-up Date & Time</label>
          <div className="relative">
            <DatePicker
              selected={pickupDateTime}
              onChange={setPickupDate}
              showTimeSelect
              dateFormat="Pp"
              id="pickup"
              className="w-full p-2 border rounded-md"
            />
            <i className="fas fa-calendar-alt absolute top-2 right-2 text-gray-500"></i>
          </div>
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/5">
          <label htmlFor="dropoff" className="block text-sm font-semibold text-gray-700 mb-1">Drop-off Date & Time</label>
          <div className="relative">
            <DatePicker
              selected={dropoffDateTime}
              onChange={setDropoffDate}
              showTimeSelect
              dateFormat="Pp"
              id="dropoff"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="justify-items-center">
          <button className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md flex items-center justify-center"
          onClick={handleSearch}>
            <i className="fas fa-search mr-2"></i>
          </button>
        </div>

      </div>
    </div>
  );
}
