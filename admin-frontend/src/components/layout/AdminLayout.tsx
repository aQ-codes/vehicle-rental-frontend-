"use client";
import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/config/apolloClient"; // Adjust the path as necessary
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

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
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <Navbar />
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-white shadow-md rounded-md m-4">
            {children}
          </main>
        </div>
      </div>
    </ApolloProvider>
  );
};

export default AdminLayout;
