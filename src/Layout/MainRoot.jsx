import { Navbarr } from "../Shared/Navbarr";
import { Outlet } from "react-router-dom";

export const MainRoot = () => {
  return (
    <div className="max-w-[1100px] mx-auto">
      <Navbarr />
      <Outlet />
    </div>
  );
};
