import { Outlet } from "react-router-dom";
import { Navbarr } from "../Shared/Navbarr";

export const Root = () => {
  return (
    <div>
      <Navbarr />
      <Outlet />
    </div>
  );
};
