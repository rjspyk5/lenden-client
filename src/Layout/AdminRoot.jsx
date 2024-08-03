import { Navbarr } from "../Shared/Navbarr";
import { Outlet } from "react-router-dom";

export const AdminRoot = () => {
  return (
    <div>
      <Navbarr />
      <Outlet />
    </div>
  );
};
