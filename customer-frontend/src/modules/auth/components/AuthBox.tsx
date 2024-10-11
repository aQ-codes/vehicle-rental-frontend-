// AuthBox.tsx
"use client";

import React, { useState } from "react";
import AuthLayout from "@/components/layouts/AuthLayout"; // Import your AuthLayout
import LoginForm from "./LoginForm"; // Create a LoginForm component
import RegisterForm from "./RegisterForm"; // Use your existing RegisterForm component

const AuthBox: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true); // State to determine which form to show

  return (
    <AuthLayout onClose={onClose}>
      {isLogin ? (
        <>
          <LoginForm onClose={onClose} />
          <p className="mt-4 text-center">
            Already a member?{" "}
            <button
              className="text-blue-600 underline"
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <RegisterForm onClose={onClose} />
          <p className="mt-4 text-center">
            Dont have an account?{" "}
            <button
              className="text-blue-600 underline"
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
          </p>
        </>
      )}
    </AuthLayout>
  );
};

export default AuthBox;
