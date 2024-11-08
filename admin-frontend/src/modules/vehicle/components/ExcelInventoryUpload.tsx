import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import * as XLSX from 'xlsx'; // Import the XLSX library
import { CheckIcon } from "@heroicons/react/24/outline";
import { ADD_VEHICLE_INVENTORIES_MUTATION } from '@/graphql/mutations/vehicle-inventory';
import ClipLoader from 'react-spinners/ClipLoader'; // Import ClipLoader
import { VehicleEntry } from '@/models';

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

      try {
        const response = await addVehicleInventories({ variables: { input: vehicleData } });
        const result = response.data.addVehicleInventories;
        if (result.success) {
          // All entries uploaded successfully
          setSuccessMessage('All vehicles uploaded successfully!');
        } else if (result.partialSuccess) {
          // Partial success, show success and error messages
          setSuccessMessage(`${result.successCount} vehicle(s) uploaded successfully.`);
          setErrorMessages([
            `${result.failedCount} vehicle(s) failed to upload.`,
            `${result.alreadyExistingCount} vehicle(s) already existed.`
          ]);
        } else {
          // Complete failure, show error message
          setErrorMessages([
            `${result.failedCount} vehicle(s) failed to upload.`,
            `${result.alreadyExistingCount} vehicle(s) already existed.`
          ]);
        }
      } catch (error) {
        setErrorMessages([`Failed to add vehicles. ${error}`]);
      } finally {
        setLoading(false); // Stop loading after the process
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg space-y-4">
      <div className='flex justify-between items-center mb-4'>
        <label className="border border-gray-400 rounded px-3 py-2 cursor-pointer flex items-center bg-gray-50 hover:bg-gray-100 transition">
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="hidden"
          />
          <span className="text-gray-700">Select File</span>
        </label>
        {file && <span className="ml-4 text-gray-600">{file.name}</span>}
        <button
          onClick={handleUpload}
          className="flex items-center border border-green-500 text-green-500 px-3 py-2 rounded shadow hover:bg-green-500 hover:text-white transition"
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
      {successMessage && <p className="text-green-500 font-semibold">{successMessage}</p>}
      {errorMessages.length > 0 && (
        <div className="text-red-500 space-y-1">
          {errorMessages.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExcelVehicleInventoryUpload;
