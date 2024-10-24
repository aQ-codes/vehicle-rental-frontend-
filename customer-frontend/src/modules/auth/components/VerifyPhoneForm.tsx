import OTPInput from "@/components/ui/OtpInput";
import React, { useState } from "react";


interface VerifyPhoneProps {
  onClose: () => void;
  phone: string;
}

const VerifyPhone: React.FC<VerifyPhoneProps> = ({ onClose, phone }) => {
  const [otp, setOtp] = useState(Array(6).fill("")); // State to hold the OTP
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
    const otpString = otp.join(""); // Combine OTP digits
    console.log("Verifying code:", otpString);
    setTimeout(() => {
      if (otpString === "123456") { // Simulated OTP check
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
      <p className="text-sm text-center">Enter the OTP send to {phone}</p>

      {/* OTP Input Component */}
      <OTPInput otp={otp} setOtp={setOtp} isDisabled={loading} />

      {errorMessage && <p className="text-red-500 text-xs mt-2">{errorMessage}</p>}
    <div className="text-center">
          <button
            onClick={handleSendOtp}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            disabled={loading || otpSent}
          >
            {loading ? "Sending..." : otpSent ? "Resend OTP" : "Send OTP"}
          </button>

          <button
            onClick={handleVerification}
            className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
            disabled={loading || !otpSent}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
    </div>


    </div>
  );
};

export default VerifyPhone;
