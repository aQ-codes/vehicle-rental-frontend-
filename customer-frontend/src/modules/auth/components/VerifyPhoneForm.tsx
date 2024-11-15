import React, { useEffect, useState } from "react";
import OTPInput from "@/components/ui/OtpInput";
import { useOtpService } from "../services/otp-service";

interface VerifyPhoneProps {
  phone: string;
  onSkip: () => void;
}

const VerifyPhone: React.FC<VerifyPhoneProps> = ({ phone, onSkip }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpSent, setOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false); // State for Resend OTP button loading

  const {
    requestOtp,
    sendOtpLoading,
    sendOtpError,
    verifyOtp,
    validateOtpLoading,
    validateOtpError,
    validateOtpData,
  } = useOtpService();

  // Send OTP when the component mounts
  useEffect(() => {
    handleSendOtp();
  }, []);

  const handleSendOtp = async () => {
    try {
      setResendLoading(true); // Start loading for Resend OTP
      await requestOtp(phone);
      setOtpSent(true);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(`Failed to send OTP. Please try again.${error}`);
    } finally {
      setResendLoading(false); // Stop loading after Resend OTP is complete
    }
  };

  const handleVerification = async () => {
    const otpString = otp.join("");
    try {
      await verifyOtp(phone, otpString);
      if (validateOtpData?.validateOtp === "success") {
        onSkip();
      } else {
        setErrorMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setErrorMessage(`Failed to verify OTP. Please try again.${error}`);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Verify Phone Number</h2>
      
      {otpSent ? <p className="text-center text-gray-600 mb-4">Enter OTP send to {phone}</p>  : <p className="text-center text-gray-600 mb-4">Sending OTP to {phone}</p>}

      <OTPInput otp={otp} setOtp={setOtp} isDisabled={sendOtpLoading || validateOtpLoading} />

      {errorMessage && <p className="text-red-500 text-xs mt-2">{errorMessage}</p>}
      {sendOtpError && <p className="text-red-500 text-xs mt-2">Error sending OTP: {sendOtpError.message}</p>}
      {validateOtpError && <p className="text-red-500 text-xs mt-2">Error verifying OTP: {validateOtpError.message}</p>}

      <button
        type="button"
        onClick={handleVerification}
        disabled={validateOtpLoading || otp.some((digit) => digit === "")}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-4"
      >
        {validateOtpLoading ? "Verifying..." : "Verify"}
      </button>

    <div className="flex mt-4 justify-between">

      <button
        type="button"
        onClick={onSkip}
        className="text-center text-gray-500 hover:underline text-sm"
      >
        Do this later
      </button>

      <button
        type="button"
        onClick={handleSendOtp}
        disabled={resendLoading || sendOtpLoading}
        className="text-center text-gray-500 hover:underline text-sm"
      >
        {resendLoading ? "Resending OTP..." : "Resend OTP"}
      </button>

    </div>


    </div>
  );
};

export default VerifyPhone;
