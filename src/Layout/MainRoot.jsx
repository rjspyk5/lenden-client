import { useUser } from "../Hooks/useUser";
import { Navbarr } from "../Shared/Navbarr";
import { Outlet } from "react-router-dom";

export const MainRoot = () => {
  const { userRole } = useUser();

  return (
    <div className="max-w-[1100px] mx-auto">
      <Navbarr />
      <Outlet />
    </div>
  );
};
