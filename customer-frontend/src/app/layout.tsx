import type { Metadata } from "next";
import "./globals.css";
import CustomerLayout from "@/components/layouts/CustomerLayout";


export const metadata: Metadata = {
  title: "DreamWheels",
  description: "Your Road to Freedom ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"></link>
      </head>
      
      <body>
        <CustomerLayout>
        {children}
        </CustomerLayout>

      </body>
    </html>
  );
}
