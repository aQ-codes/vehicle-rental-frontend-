import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  customerId: number | null;
  login: (customerId: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (customerId: number) => {
    setCustomerId(customerId);
    setToken(token);

    // Store customer data as a JSON object in session storage
    const customer = { customerId, token };
    sessionStorage.setItem("customer", JSON.stringify(customer));
  };

  const logout = () => {
    setCustomerId(null);
    setToken(null);
    sessionStorage.removeItem("customerData");
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
