import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <div>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
        </QueryClientProvider>
      </AuthContextProvider>
    </div>
  );
}
