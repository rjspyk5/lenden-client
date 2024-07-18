import { Avatar } from "@material-tailwind/react";
import React from "react";
import { AvatarDropdown } from "../Components/AvatarDropdown/AvatarDropdown";

export const Navbarr = () => {
  return (
    <div className="flex justify-between border items-center">
      <h1>Navbar</h1>
      <h1>Balance</h1>
      <AvatarDropdown />
    </div>
  );
};
