"use client";

import React, { useState } from "react";
import { useRegisterCustomer } from '@/modules/auth/services/register-service'; 
import { ClipLoader } from 'react-spinners'; // Import the spinner

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
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { registerCustomer, loading, error, data } = useRegisterCustomer();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Basic validation: Check if passwords match
      if (formData.password !== formData.confirmPassword) {
          setErrorMessage("Passwords do not match");
          return;
      }

      setErrorMessage(null);  // Clear any previous error message

      // Call the mutation using registerCustomer
      await registerCustomer({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          pincode: formData.pincode,
          password: formData.password,
      });

      // If error
      if (error) {
          setErrorMessage(error.message);
      }

      // If success
      if (data) {
          console.log("Customer created successfully:", data.addCustomer);
          onClose();
      }
  };

  return (
      <div className="p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
              <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
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
          <p className="mt-4 text-center text-sm">
              Already a member?{" "}
              <button
                  type="button"
                  onClick={() => {/* Implement switch to login form logic */}}
                  className="text-blue-600 underline"
              >
                  Sign In
              </button>
          </p>
          <button
              type="button"
              onClick={onClose}
              className="mt-4 text-gray-600 underline"
          >
              Close
          </button>
      </div>
  );
};



export default RegisterForm;
