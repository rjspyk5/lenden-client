import { Navbarr } from "../Shared/Navbarr";
import { Outlet } from "react-router-dom";

export const AgentRoot = () => {
  return (
    <div>
      <Navbarr />
      <Outlet />
    </div>
  );
};
