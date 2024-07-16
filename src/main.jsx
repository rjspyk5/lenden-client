import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { AuthProvider } from "./Provider/AuthProvider.jsx";
import { RouterProvider } from "react-router-dom";
import { Routing } from "./Routing/Routing.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={Routing}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
