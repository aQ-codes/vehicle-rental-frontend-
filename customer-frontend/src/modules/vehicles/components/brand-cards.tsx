"use client"

import React from 'react';
import { useGetUniqueMakes } from '../services/vehicle-service';
import { vehicleMakes } from '@/constants';
import Image from 'next/image';

export const Brands = () => {
  const { loading, error, uniqueMakes } = useGetUniqueMakes(); 
console.log(uniqueMakes)



  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching makes: {error.message}</div>;

  return (
    <div className="flex flex-wrap mt-5">
  {uniqueMakes.map((make) => {
    const manufacturer = vehicleMakes.find((m) => m.name === make);
    return (
      <div
        key={make}
        className="m-4 p-4 border rounded shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg
        hover:bg-blue-400 active:bg-blue-400"
      >
        <Image
          src={manufacturer?.logo as string}
          alt={`${manufacturer?.name}`}
          className="w-16 h-16 mx-auto"
          width={30}
          height={30}
        />
      </div>
    );
  })}
</div>

  
  );
};
