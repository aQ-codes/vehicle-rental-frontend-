// AuthBox.tsx
import React, { useState } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import VerifyPhone from "./VerifyPhoneForm";


const AuthBox: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showVerifyPhone, setShowVerifyPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegistrationSuccess = (phone: string) => {
    setPhoneNumber(phone);
    setShowVerifyPhone(true);
  };

  const handleSkipVerification = () => {
    setShowVerifyPhone(false);
    setIsLogin(true); // Show login form after skipping
  };

  return (
    <AuthLayout onClose={onClose}>
      <div>
        {showVerifyPhone ? (
          <></>
          // <VerifyPhone phone={phoneNumber} onSkip={handleSkipVerification} />
        ) : isLogin ? (
          <>
            <LoginForm onClose={onClose} />
            <p className="mt-6 text-center text-gray-600">
              Dont have an account?{" "}
              <button className="text-blue-600 hover:underline" onClick={() => setIsLogin(false)}>
                Sign Up
              </button>
            </p>
          </>
        ) : (
          <>
            <RegisterForm onClose={onClose} onSuccess={handleRegistrationSuccess} />
            <p className="mt-4 text-center text-gray-600">
              Already a member?{" "}
              <button className="text-blue-600 hover:underline" onClick={() => setIsLogin(true)}>
                Sign In
              </button>
            </p>
          </>
        )}
      </div>
    </AuthLayout>
  );
};

export default AuthBox;
