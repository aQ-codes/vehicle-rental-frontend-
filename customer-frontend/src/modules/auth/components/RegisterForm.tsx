"use client";

import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
// import VerifyPhone from "./VerifyPhoneForm"; 

interface CustomerRegisterFormProps {
  onClose: () => void;
}

const RegisterForm: React.FC<CustomerRegisterFormProps> = ({ onClose }) => {
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
  });

  // const [showVerifyPhone, setShowVerifyPhone] = useState(false); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle country code selection
  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({ ...prevData, countryCode: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setErrorMessage(null); // Clear any previous error

    // Save form data to sessionStorage
    sessionStorage.setItem("customerData", JSON.stringify(formData));

    // Toggle the phone verification component
    // setShowVerifyPhone(true);
    onClose()
  };

  // if (showVerifyPhone) {
  //   // Pass both phone and onClose to VerifyPhone
  //   return <VerifyPhone phone={`${formData.countryCode} ${formData.phone}`} onClose={onClose} />;
  // }

  return (
    <div className="p-8 bg-red-300 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-11">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md mb-3"
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
        {/* Country Code and Phone Number */}
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
