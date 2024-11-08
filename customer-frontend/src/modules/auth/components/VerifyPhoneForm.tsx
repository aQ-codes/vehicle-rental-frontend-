// VerifyPhone.tsx
import React, { useState } from "react";
import OTPInput from "@/components/ui/OtpInput";

interface VerifyPhoneProps {
  onClose: () => void;
  phone: string;
  onSkip: () => void; // Add onSkip prop
}

const VerifyPhone: React.FC<VerifyPhoneProps> = ({ onClose, phone, onSkip }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSendOtp = () => {
    setLoading(true);
    console.log(`Sending OTP to ${phone}`);
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
    }, 2000);
  };

  const handleVerification = () => {
    setLoading(true);
    const otpString = otp.join("");
    console.log("Verifying code:", otpString);
    setTimeout(() => {
      if (otpString === "123456") {
        console.log("OTP verified successfully!");
        onClose();
      } else {
        setErrorMessage("Invalid OTP. Please try again.");
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="p-8 bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Verify Phone Number</h2>
      <p className="text-center text-gray-600 mb-4">Enter the OTP sent to {phone}</p>

      <OTPInput value={otp} onChange={setOtp} />

      {errorMessage && <p className="text-red-500 text-xs mt-2">{errorMessage}</p>}

      <button
        type="button"
        onClick={handleVerification}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-4"
      >
        {loading ? "Verifying..." : "Verify"}
      </button>

      <button
        type="button"
        onClick={onSkip}
        className="mt-4 text-center text-gray-500 hover:underline text-sm"
      >
        Do this later
      </button>
    </div>
  );
};

export default VerifyPhone;
