import React, { useState } from "react";

interface VerifyPhoneProps {
  onClose: () => void; // Callback to close the verification modal
  phone: string; // Phone number to which the OTP was sent
}

const VerifyPhone: React.FC<VerifyPhoneProps> = ({ onClose, phone }) => {
  const [verificationCode, setVerificationCode] = useState(""); // State to hold the entered OTP
  const [otpSent, setOtpSent] = useState(false); // State to check if OTP has been sent
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error messages

  const handleSendOtp = () => {
    setLoading(true);
    // Simulate sending OTP to the phone number
    console.log(`Sending OTP to ${phone}`);
    // Here you would typically call your API to send the OTP
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
    }, 2000); // Simulating network delay
  };
  

  const handleVerification = () => {
    setLoading(true);
    // Simulate verifying the OTP
    console.log("Verifying code:", verificationCode);
    // Here you would typically call your API to verify the OTP
    setTimeout(() => {
      if (verificationCode === "123456") { // Simulated OTP check
        console.log("OTP verified successfully!");
        onClose(); // Close on successful verification
      } else {
        setErrorMessage("Invalid OTP. Please try again.");
      }
      setLoading(false);
    }, 2000); // Simulating network delay
  };

  return (
    <div className="p-8 bg-white rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Verify Phone Number</h2>
      <p>We have sent an OTP to {phone}. Please enter it below.</p>

      <input
        type="text"
        placeholder="Enter OTP"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        className="mt-4 p-2 border rounded-md w-full"
        disabled={loading}
      />

      {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}

      <button
        onClick={handleSendOtp}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        disabled={loading || otpSent}
      >
        {loading ? "Sending..." : (otpSent ? "Resend OTP" : "Send OTP")}
      </button>

      <button
        onClick={handleVerification}
        className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
        disabled={loading || !otpSent}
      >
        {loading ? "Verifying..." : "Verify"}
      </button>

      <button onClick={onClose} className="mt-4 text-red-600 underline">
        Cancel
      </button>
    </div>
  );
};

export default VerifyPhone;
