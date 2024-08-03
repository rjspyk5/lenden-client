import { Navbar } from "@material-tailwind/react";

import { Outlet } from "react-router-dom";

export const UserRoot = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
