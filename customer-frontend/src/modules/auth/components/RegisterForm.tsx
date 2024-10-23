"use client";

import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

interface CustomerRegisterFormProps {
  onClose: () => void;
  onSuccess: (phone: string) => void; // New prop for handling successful registration
}

const RegisterForm: React.FC<CustomerRegisterFormProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    password: "",
    confirmPassword: "",
    countryCode: "+91", // Default country code to +91 (India)
    isVerified: false
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({ ...prevData, countryCode: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    setErrorMessage(null); // Clear previous errors

    // Store form data in sessionStorage
    sessionStorage.setItem("customerData", JSON.stringify(formData));

    // Trigger the success handler with phone number
    onSuccess(`${formData.countryCode} ${formData.phone}`);
  };

  return (
    <div className=" rounded-lg">
      <h1 className="text-xl font-bold mb-4 text-center  ">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={formData.countryCode}
            onChange={handleCountryCodeChange}
            className="p-2 border rounded-md bg-white"
          >
            <option value="+91">+91 (India)</option>
            {/* Add more country codes as needed */}
          </select>
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <ClipLoader color="#fff" loading={loading} size={20} />
              <span className="ml-2">Registering...</span>
            </div>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
