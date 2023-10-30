"use client";

import React from "react";
import { AuthProvider } from "./components/auth/authContext";
import MainLayout from "./components/MainLayout";
import FarmersPageProvider from "./components/context/FarmersPageProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <FarmersPageProvider>
      <AuthProvider>
        
        <html lang="en">
          <body>
            <MainLayout>{children}</MainLayout>
          </body>
        </html>
      </AuthProvider>
      </FarmersPageProvider>
    </React.Fragment>
  );
}
