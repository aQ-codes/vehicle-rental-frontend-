"use client";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/config/apolloClient"; // adjust the path as necessary
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PreferenceProvider } from "@/context/preference-context";
import { AuthProvider } from "@/context/auth-context";

interface CustomerLayoutProps {
  children: ReactNode;
}

const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children }) => {

  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
      <PreferenceProvider>
      <header className="header">
        <Navbar/>
      </header>
      <main className="main">
        {children}
      </main>
      <footer>
        <Footer/>
      </footer>
      </PreferenceProvider>
      </AuthProvider>

    </ApolloProvider>
  );
};

export default CustomerLayout;
