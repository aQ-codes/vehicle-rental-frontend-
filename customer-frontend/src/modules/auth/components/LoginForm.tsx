"use client";
import { EyeIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners"; // Import ClipLoader
import { useLoginCustomer } from "../services/login-service";
import { useAuth } from "@/context/auth-context";

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { performLogin, data, loading, error } = useLoginCustomer();
  
  const { login } = useAuth();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null); // Reset any previous error message

    try {
      await performLogin( email, password );

      if (!loading && !error) {
        console.log(data)
        if (data.loginCustomer.success) {
          login(data.loginCustomer.id);// Update AuthContext with customer ID
          onClose();
        } else {
          console.log(data)
          setErrorMessage(data.loginCustomer.errors?.join(", ") || "Login failed");
        }
      }

    } catch (err) {
      setErrorMessage(`An error occurred during login. Please try again.${err}`);
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-2xl text-gray-700 mb-2">Hello, Again!</h1>
      <h2 className="text-center text-gray-600 mb-6">We are happy to have you back</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <EyeIcon className="h-5 w-5" />
          </button>
        </div>

        {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}

        {loading ? (
          <div className="flex justify-center">
            <ClipLoader color="#3B82F6" loading={loading} size={35} />
          </div>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-2xl shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Sign In
          </button>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
