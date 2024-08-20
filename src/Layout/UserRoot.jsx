import { Outlet } from "react-router-dom";
import { Navbarr } from "../Shared/Navbarr";

export const UserRoot = () => {
  return (
    <div className="max-w-[1100px] mx-auto">
      <Navbarr />
      <Outlet />
    </div>
  );
};
