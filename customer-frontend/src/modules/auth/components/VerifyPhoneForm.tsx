import React, { useState } from "react";

const VerifyPhone: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerification = () => {
    // Here you would call your phone verification API
    console.log("Verifying code:", verificationCode);
    onClose(); 
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Verify Phone Number</h2>
      <input
        type="text"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        placeholder="Enter verification code"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleVerification}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 mt-4"
      >
        Verify
      </button>
    </div>
  );
};

export default VerifyPhone;
