import React, { useRef } from "react";

interface OTPInputProps {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  isDisabled: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({ otp, setOtp, isDisabled }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value; // Update OTP at the given index
    setOtp(newOtp);

    // Automatically move to the next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Backspace logic to move to previous input
    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2 mt-4">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            if (el) {
              inputRefs.current[index] = el;
            }
          }} // Assign ref without returning the element
          type="text"
          maxLength={1} // Only allow 1 digit per input
          value={digit}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="border border-gray-300 rounded-md p-2 text-center w-10 focus:outline-none focus:border-blue-500"
          disabled={isDisabled}
        />
      ))}
    </div>
  );
};

export default OTPInput;
