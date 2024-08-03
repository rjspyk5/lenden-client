import { Outlet } from "react-router-dom";
import { Navbarr } from "../Shared/Navbarr";

export const UserRoot = () => {
  return (
    <div>
      <Navbarr />
      <Outlet />
    </div>
  );
};
