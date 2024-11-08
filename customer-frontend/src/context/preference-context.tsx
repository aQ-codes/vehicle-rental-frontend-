// PreferenceContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface PreferenceContextType {
  pickupDateTime: Date | null;
  dropoffDateTime: Date | null;
  pickupLocation: string;
  dropoffLocation: string;
  setPickupDate: (date: Date | null) => void;
  setDropoffDate: (date: Date | null) => void;
  setPickupLocation: (location: string) => void;
  setDropoffLocation: (location: string) => void;
}

const PreferenceContext = createContext<PreferenceContextType | undefined>(undefined);

export const PreferenceProvider = ({ children }: { children: ReactNode }) => {
  const [pickupDateTime, setPickupDate] = useState<Date | null>(new Date());
  const [dropoffDateTime, setDropoffDate] = useState<Date | null>(new Date());
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [dropoffLocation, setDropoffLocation] = useState<string>('');

  return (
    <PreferenceContext.Provider
      value={{
        pickupDateTime,
        dropoffDateTime,
        pickupLocation,
        dropoffLocation,
        setPickupDate,
        setDropoffDate,
        setPickupLocation,
        setDropoffLocation,

      }}
    >
      {children}
    </PreferenceContext.Provider>
  );
};

export const usePreferenceContext = () => {
  const context = useContext(PreferenceContext);
  if (!context) {
    throw new Error('usePreferenceContext must be used within a PreferenceProvider');
  }
  return context;
};
