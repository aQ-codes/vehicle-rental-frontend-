'use client'

import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function RentalInfo() {
  const [pickupDate, setPickupDate] = useState(new Date('2023-07-29T14:00'))
  const [dropoffDate, setDropoffDate] = useState(new Date('2023-07-29T17:00'))

  return (
    <div className="w-full max-w-sm">
      <div className="p-4 border rounded-md shadow-md">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">FORD FOCUS</h1>
          <p className="text-xl font-semibold">1.5 EcoBlue ST-Line Style 115CV</p>
          <p className="text-xl font-bold">
            $28.00 <span className="text-sm font-normal">/ hour</span>
          </p>
        </div>

        <div className="relative w-full h-48 mb-4">
          <div className="absolute bottom-2 left-2 bg-white p-2 rounded-md shadow-md">
            <div className="flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.6" />
                <path d="M22 4 12 14.01l-3-3" />
              </svg>
              <span>Noe Valley, Noe Str., 1337</span>
            </div>
            <div className="flex items-center text-sm mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span>360m (6 min)</span>
            </div>
          </div>
        </div>

        <div className="tabs">
          <div className="grid w-full grid-cols-2 mb-4">
            <button className="p-2 border rounded-t-md">Rent details</button>
            <button className="p-2 border rounded-t-md">Specifications</button>
          </div>
          <div className="p-4 border-t">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <label htmlFor="pickup">PICK-UP DATE & TIME</label>
                  <DatePicker
                    selected={pickupDate}
                    onChange={(date) => setPickupDate(date)}
                    showTimeSelect
                    dateFormat="Pp"
                    id="pickup"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">Total price</p>
                  <p className="text-lg font-bold">$149.60</p>
                </div>
              </div>
              <div>
                <label htmlFor="dropoff">DROP-OFF DATE & TIME</label>
                <DatePicker
                  selected={dropoffDate}
                  onChange={(date) => setDropoffDate(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  id="dropoff"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label>INSURANCE</label>
                <div className="flex items-center justify-between text-sm">
                  <span>Vehicle protection</span>
                  <span>$52.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">BOOK VEHICLE</button>
        </div>
      </div>
    </div>
  )
}
