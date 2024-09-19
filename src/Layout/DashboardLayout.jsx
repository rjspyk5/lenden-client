import { NavLink, Outlet } from "react-router-dom";
import { AvatarDropdown } from "../Components/AvatarDropdown/AvatarDropdown";
import { useAuth } from "../Hooks/useAuth";

export const DashboardLayout = () => {
  const { user } = useAuth();
  const adminMenu = (
    <>
      <ul className="p-3">
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
      {" "}
      <ul className="p-3">
        <li className="p-2  hover:bg-[#0051ff73]  rounded-lg">
          <NavLink to="/agent" className="text-white  ">
            Home
          </NavLink>
        </li>
        <li className="p-2 hover:bg-[#0051ff73] rounded-lg">
          <NavLink to="/agent/cashinreq" className="text-white">
            Cash In Request
          </NavLink>
        </li>

        <li className="p-2 hover:bg-[#0051ff73] rounded-lg">
          <NavLink to="/agent/addmoney" className="text-white">
            Deposit Money
          </NavLink>
        </li>
        <li className="p-2 hover:bg-[#0051ff73] rounded-lg">
          <NavLink to="/agent/withdrawmoney" className="text-white">
            Withdraw Money
          </NavLink>
        </li>
        <li className="p-2 hover:bg-[#0051ff73] rounded-lg">
          <NavLink to="/agent/history" className="text-white">
            Transiction History
          </NavLink>
        </li>
      </ul>
    </>
  );
  return (
    <>
      <div className="flex  min-h-screen">
        <div className="w-[20%] fixed min-h-screen bg-gradient-to-br from-[#090b2ee7] to-[#1c24bd]  shadow-xl shadow-[#6368c5]">
          <h1 className="text-center font-bold text-white md:text-2xl mb-5 py-2">
            {user?.role === "agent" ? "Agent" : "Admin"} Dashboard
          </h1>
          {user?.role === "agent" ? agentMenu : adminMenu}
        </div>
        <div className="ml-[20%] flex-grow ">
          <div className="sticky top-0 py-2  bg-gradient-to-br from-[#090b2ee7] to-[#1c24bd]  shadow shadow-[#3b2346]">
            <div className="flex justify-end me-5">
              <AvatarDropdown />
            </div>
          </div>

          <Outlet />
        </div>
      </div>
    </>
  );
};
