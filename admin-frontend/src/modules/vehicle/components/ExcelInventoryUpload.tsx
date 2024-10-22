import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import * as XLSX from 'xlsx'; // Import the XLSX library
import { CheckIcon } from "@heroicons/react/24/outline";
import { ADD_VEHICLE_INVENTORIES_MUTATION } from '@/graphql/mutations/vehicle-inventory';
import ClipLoader from 'react-spinners/ClipLoader'; // Import ClipLoader
import { VehicleEntry } from '@/models';

interface FailedEntry extends VehicleEntry {
  error: string;
}

const ExcelVehicleInventoryUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [addVehicleInventories] = useMutation(ADD_VEHICLE_INVENTORIES_MUTATION);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setErrorMessages([]); // Clear error messages when a new file is selected
      setSuccessMessage(null); // Clear success message
    } else {
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    setLoading(true);
    
    reader.onload = async (event) => {
      if (!event.target || !event.target.result) {
        setLoading(false);
        return;
      }

      const data = new Uint8Array(event.target.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const vehicleData: VehicleEntry[] = XLSX.utils.sheet_to_json(worksheet);
      const failedEntries: FailedEntry[] = []; // Track failed entries

      try {
        // Upload vehicle data in a single mutation call
        const response = await addVehicleInventories({ variables: { input: vehicleData } });
    
        if (!response.data.addVehicleInventories.success) {
            // If there are failed entries, track them
            failedEntries.push(...response.data.addVehicleInventories.errorEntries);
            const failedCount = failedEntries.length; 
            // Set error messages indicating how many entries failed
            setErrorMessages([`Failed to upload ${failedCount} vehicle(s).`]);
        } else {
            setSuccessMessage('All vehicles uploaded successfully!');
        }
    } catch (error) {
        console.error('Error uploading vehicles:', error);
        setErrorMessages(['Failed to add vehicles.']);
    } finally {
        setLoading(false); // Stop loading after the process
    }
    
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <label className="border border-gray-400 rounded px-2 py-1 cursor-pointer inline-block flex items-center">
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
          />
        </label>

        <button
          onClick={handleUpload}
          className="flex items-center border border-green-500 text-green-500 px-2 py-1 rounded ml-2 hover:bg-gray-100 transition"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader size={20} color={"#36D7B7"} loading={loading} />
          ) : (


<CheckIcon className="h-5 w-5 mr-1" />

          )}
          Save Changes
        </button>
      </div>

      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessages.length > 0 && (
        <div className="text-red-500">
          {errorMessages.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExcelVehicleInventoryUpload;
