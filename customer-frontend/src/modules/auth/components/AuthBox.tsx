"use client";

import React, { useState } from "react";
import AuthLayout from "@/components/layouts/AuthLayout"; // Import your AuthLayout
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import VerifyPhoneForm from "./VerifyPhoneForm"; // Import VerifyPhone component

const AuthBox: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true); // State to determine which form to show
  const [showVerifyPhone, setShowVerifyPhone] = useState(false); // To show OTP verification
  const [phoneNumber, setPhoneNumber] = useState(""); // Store phone number for OTP verification

  // Switch to the verify phone step after registration
  const handleRegistrationSuccess = (phone: string) => {
    setPhoneNumber(phone);
    setShowVerifyPhone(false);
  };

  return (
    <AuthLayout onClose={onClose}>
      {showVerifyPhone ? (
        <VerifyPhoneForm phone={phoneNumber} onClose={onClose} />
      ) : isLogin ? (
        <>
          <LoginForm onClose={onClose} />
          <p className="mt-4 text-center">
            Dont have an account?{" "}
            <button className="text-blue-600" onClick={() => setIsLogin(false)}>
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <RegisterForm onClose={onClose} onSuccess={handleRegistrationSuccess} />
          <p className="mt-4 mb-5 text-center">
            Already a member?{" "}
            <button className="text-blue-600 underline" onClick={() => setIsLogin(true)}>
              Sign In
            </button>
          </p>
        </>
      )}
    </AuthLayout>
  );
};

export default AuthBox;
