"use client";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/config/apolloClient"; // adjust the path as necessary
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface CustomerLayoutProps {
  children: ReactNode;
}

const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children }) => {

  return (
    <ApolloProvider client={apolloClient}>
      <header className="header">
          <Navbar/>
      </header>
      <main className="main">
        {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </ApolloProvider>
  );
};

export default CustomerLayout;
