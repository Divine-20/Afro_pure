"use client";

import React from "react";
import { AuthProvider } from "./components/auth/authContext";
import MainLayout from "./components/MainLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <AuthProvider>
        <html lang="en">
          <body>
            <MainLayout>{children}</MainLayout>
          </body>
        </html>
      </AuthProvider>
    </React.Fragment>
  );
}
