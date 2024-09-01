import { Navbarr } from "../Shared/Navbarr";
import { Outlet } from "react-router-dom";

export const MainRoot = () => {
  return (
    <div className="bg-[#211128] min-h-screen">
      <Navbarr />
      <div className="lg:max-w-[1100px] lg:mx-auto mx-10">
        <Outlet />
      </div>
    </div>
  );
};
