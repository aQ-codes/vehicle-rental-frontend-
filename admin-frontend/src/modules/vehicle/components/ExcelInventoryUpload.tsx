import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import * as XLSX from 'xlsx';  // Import the XLSX library
import { ADD_VEHICLE_INVENTORIES_MUTATION } from '@/graphql/mutations/vehicle-inventory';
import { AiOutlineUpload, AiOutlineCheck } from "react-icons/ai";  // Import upload and check icons
import { VehicleEntry } from '@/models';


interface FailedEntry extends VehicleEntry {
  error: string;
}

const ExcelVehicleInventoryUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [addVehicleInventories] = useMutation(ADD_VEHICLE_INVENTORIES_MUTATION);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      if (!event.target || !event.target.result) return;

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
        }

        // Process success/failure message
        if (failedEntries.length) {
          createErrorExcel(failedEntries); // Create Excel file with failed entries
          alert('Some vehicles failed to upload. Error file generated.');
        } else {
          alert('All vehicles uploaded successfully!');
        }

      } catch (error) {
        console.error('Error uploading vehicles:', error);
        alert('Failed to add vehicles.');
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const createErrorExcel = (failedEntries: FailedEntry[]) => {
    const worksheet = XLSX.utils.json_to_sheet(failedEntries); // Convert failed entries to worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'FailedEntries');

    // Generate Excel file for download
    XLSX.writeFile(workbook, 'failed_entries.xlsx');
  };

  return (
    <div className='flex justify-between items-center mb-4'>
      <label className="border border-gray-400 rounded px-2 py-1 cursor-pointer inline-block flex items-center">
        <AiOutlineUpload className="mr-2" />  {/* Upload icon */}
        Upload Sheet
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="hidden"  // Hide the default input appearance
        />
      </label>

      <button
        onClick={handleUpload}
        className="flex items-center border border-green-500 text-green-500 px-2 py-1 rounded ml-2 hover:bg-gray-100 transition"
      >
        <AiOutlineCheck className="mr-1" />
        Save Changes
      </button>
    </div>
  );
};

export default ExcelVehicleInventoryUpload;
