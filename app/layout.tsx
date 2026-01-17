import "@/styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Vendor Management System",
  description: "Procurement Vendor Master Database"
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

