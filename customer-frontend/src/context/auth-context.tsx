import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  customerId: number | null;
  login: (customerId: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customerId, setCustomerId] = useState<number | null>(null);

  console.log("customer id from session storage is ",customerId)
  // Load customer ID from session storage when the component mounts
  useEffect(() => {
    const storedCustomer = sessionStorage.getItem("customer");
    if (storedCustomer) {
      const { customerId } = JSON.parse(storedCustomer);
      setCustomerId(customerId);
    }
  }, []);

  const login = (customerId: number) => {
    setCustomerId(customerId);
    sessionStorage.setItem("customer", JSON.stringify({ customerId }));
  };

  const logout = () => {
    setCustomerId(null);
    sessionStorage.removeItem("customer");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!customerId, customerId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
