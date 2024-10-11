"use client";

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/config/apolloClient"; // adjust the path as necessary
import Sidebar from "@/components/Sidebar"; 
import Navbar from "@/components/Navbar"; 
import { usePathname } from "next/navigation"; // Import usePathname

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname(); // Get the current pathname
  const isLoginPage = pathname === '/login'; // Adjust this path as necessary

  // Only render the layout if it's not the login page
  if (isLoginPage) {
    return <>{children}</>; // Just return the children for the login page
  }

  return (
    <ApolloProvider client={apolloClient}>
      <div className="flex h-screen"> 
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 bg-gray-50">
          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <main className="p-6">{children}</main>
        </div>
      </div>
    </ApolloProvider>
  );
};

export default AdminLayout;
