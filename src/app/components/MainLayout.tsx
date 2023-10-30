import React from "react";
import useAuth from "./auth/authContext";
import WelcomePage from "../welcomePage";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { initialLoading } = useAuth();
  return <div>{initialLoading ? <WelcomePage /> : children}</div>;
}
