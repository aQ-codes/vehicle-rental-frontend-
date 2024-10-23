"use client";

import React, { useState } from "react";

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"loading" | "idle">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    // Add your login logic here

    // Simulate a loading state
    setTimeout(() => {
      setStatus("idle");
      onClose(); 
    }, 2000);
  };

  if (status === "loading") {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="">
      <h1 className="text-center font-bold text-xl">Hello, Again!</h1>
      <h2 className="text-center mb-5">We are happy to have you back</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md "
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
