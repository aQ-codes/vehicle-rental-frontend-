"use client";

import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useRegisterCustomer } from "../services/register-service";
import { Customer } from "@/models";

interface CustomerRegisterFormProps {
  onClose: () => void;
  onSuccess: (phone: string) => void; // New prop for handling successful registration
}

const RegisterForm: React.FC<CustomerRegisterFormProps> = ({ onSuccess }) => {
  const { registerCustomer, data, loading, error } = useRegisterCustomer();
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
    isVerified: false,
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [customerInput, setCustomerInput] = useState<Customer>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setErrorMessage(null);

    // Prepare input data for the mutation
    const input = {
      name: formData.name,
      email: formData.email,
      phone: `+91${formData.phone}`,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      pincode: formData.pincode,
      password: formData.password,
      isVerified: false,
    };

    setCustomerInput(input); // Set customerInput in state

    try {
      await registerCustomer(input);
    } catch (err) {
      setErrorMessage(`An error occurred during registration:${err}`);
    }
  };

  useEffect(() => {
    if (!loading && customerInput) {
      if (data) {
        if (data.addCustomer.success) {
          onSuccess(`+91${formData.phone}`);
          sessionStorage.setItem("customerInput", JSON.stringify(customerInput));
        } else if (data.addCustomer.errors) {
          setErrorMessage(data.addCustomer.errors.join(", "));
        }
      }
      if (error) {
        setErrorMessage(error.message);
      }
    }
  }, [data, error, formData.phone, loading, onSuccess, customerInput]);
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-500 text-sm mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center ">
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm mb-1" htmlFor="phone">Phone</label>
            <div className="flex items-center space-x-4">
              <select className="p-2 border border-gray-300 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="+91">+91 (India)</option>
              </select>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm mb-1" htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm mb-1" htmlFor="state">State</label>
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm mb-1" htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-500 text-sm mb-1" htmlFor="pincode">Pincode</label>
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
  <div className="flex flex-col">
    <label className="text-gray-500 text-sm mb-1" htmlFor="password">Password</label>
    <input
      type="password"
      name="password"
      placeholder="Enter Password"
      value={formData.password}
      onChange={handleChange}
      required
      className="w-full p-2 border border-gray-300 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <div className="flex flex-col">
    <label className="text-gray-500 text-sm mb-1" htmlFor="confirmPassword">Confirm Password</label>
    <input
      type="password"
      name="confirmPassword"
      placeholder="Confirm Password"
      value={formData.confirmPassword}
      onChange={handleChange}
      required
      className="w-full p-2 border border-gray-300 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  </div>
        {errorMessage && <p className="text-red-500 text-xs mt-2">{errorMessage}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition duration-300 flex items-center justify-center "
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center">
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
