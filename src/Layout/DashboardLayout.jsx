import { NavLink, Outlet } from "react-router-dom";
import { AvatarDropdown } from "../Components/AvatarDropdown/AvatarDropdown";
import { useAuth } from "../Hooks/useAuth";

export const DashboardLayout = () => {
  const { user } = useAuth();
  const adminMenu = (
    <>
      <ul className="p-3 ">
        <li className="p-2  hover:bg-[#0051ff73]  rounded-lg">
          <NavLink to="/admin" className="text-white  ">
            Home
          </NavLink>
        </li>
        <li className="p-2 hover:bg-[#0051ff73] rounded-lg">
          <NavLink to="/admin/depositreq" className="text-white">
            Deposit Money Reqeust
          </NavLink>
        </li>

        <li className="p-2 hover:bg-[#0051ff73] rounded-lg">
          <NavLink to="/admin/withdrawreq" className="text-white">
            Withdraw Reqesut
          </NavLink>
        </li>
        <li className="p-2 hover:bg-[#0051ff73] rounded-lg">
          <NavLink to="/admin/users" className="text-white">
            All User
          </NavLink>
        </li>
        <li className="p-2 hover:bg-[#0051ff73] rounded-lg">
          <NavLink to="/admin/history" className="text-white">
            All Transiction
          </NavLink>
        </li>
      </ul>
    </>
  );
  const agentMenu = (
    <>
      <ul className="py-3 *:border-b *:border-gray-700">
        <li className="p-2  hover:bg-[#0051ff73]  ">
          <NavLink to="/agent" className="text-white  ">
            Home
          </NavLink>
        </li>
        <li className="p-2 hover:bg-[#0051ff73] ">
          <NavLink to="/agent/cashinreq" className="text-white">
            Cash In Request
          </NavLink>
        </li>

        <li className="p-2 hover:bg-[#0051ff73] ">
          <NavLink to="/agent/addmoney" className="text-white">
            Deposit Money
          </NavLink>
        </li>
        <li className="p-2 hover:bg-[#0051ff73] ">
          <NavLink to="/agent/withdrawmoney" className="text-white">
            Withdraw Money
          </NavLink>
        </li>
        <li className="p-2 hover:bg-[#0051ff73] ">
          <NavLink to="/agent/history" className="text-white">
            Transiction History
          </NavLink>
        </li>
      </ul>
    </>
  );
  return (
    <>
      <div className="sticky top-0 py-2  bg-gradient-to-br  bg-[#090f7f]  ">
        <div className="flex justify-between items-center mx-5">
          <h1 className="text-center font-bold text-white md:text-2xl  ">
            {user?.role === "agent" ? "Agent" : "Admin"} Dashboard
          </h1>
          <AvatarDropdown />
        </div>
      </div>
      <div className="flex  ">
        <div className="w-[18%] fixed min-h-screen bg-gradient-to-br  bg-[#0a1078]  ">
          {user?.role === "agent" ? agentMenu : adminMenu}
        </div>
        <div className="ml-[18%] flex-grow ">
          <Outlet />
        </div>
      </div>
    </>
  );
};
