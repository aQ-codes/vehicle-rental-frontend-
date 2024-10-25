"use client";

import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useRegisterCustomer } from "../services/register-service";

interface CustomerRegisterFormProps {
  onClose: () => void;
  onSuccess: (phone: string) => void; // New prop for handling successful registration
}

const RegisterForm: React.FC<CustomerRegisterFormProps> = ({ onSuccess }) => {
  const { registerCustomer,data, loading, error } = useRegisterCustomer();
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
    const customerInput = {
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

    try {
      // Register customer using the mutation
      await registerCustomer(customerInput);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setErrorMessage("An error occurred during registration");
    }

  };

  // UseEffect to react to changes in data and error after mutation is complete
  useEffect(() => {
    if (!loading) {
      if (data) {
        if (data.addCustomer.success) {
          onSuccess(`+91${formData.phone}`);
          sessionStorage.setItem('bookingInfo', JSON.stringify(bookingDetails));
        } else if (data.addCustomer.errors) {
          setErrorMessage(data.addCustomer.errors.join(", "));
        }
      }
      if (error) {
        setErrorMessage(error.message);
      }
    }
  }, [data, error, formData.phone, loading, onSuccess]); 

  return (
    <div className="rounded-lg">
      <h1 className="text-xl font-bold mb-4 text-center">Register</h1>
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
          <select className="p-2 border rounded-md bg-white">
            <option value="+91">+91 (India)</option>
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
