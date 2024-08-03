import { Outlet } from "react-router-dom";
import { Navbarr } from "../Shared/Navbarr";

export const MainRoot = () => {
  return (
    <div>
      <Navbarr />
      <Outlet />
    </div>
  );
};
