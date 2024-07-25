import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { AuthProvider } from "./Provider/AuthProvider.jsx";
import { RouterProvider } from "react-router-dom";
import { Routing } from "./Routing/Routing.jsx";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={Routing} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
