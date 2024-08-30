import { NavLink, Outlet } from "react-router-dom";
import { AvatarDropdown } from "../Components/AvatarDropdown/AvatarDropdown";
import CustomTable from "../Components/Table/CustomTable";

export const DashboardLayout = () => {
  return (
    <>
      <div className="flex">
        <div className="w-[20%] fixed min-h-screen bg-purple-500">
          <h1 className="text-center">Agent Dashboard</h1>
          <ul className="p-3">
            <li className="p-2  hover:bg-purple-600  rounded-lg">
              <NavLink to="/agent" className="text-white  ">
                Home
              </NavLink>
            </li>
            <li className="p-2 hover:bg-purple-600 rounded-lg">
              <NavLink to="/agent/cashinreq" className="text-white">
                Cash In Request
              </NavLink>
            </li>
            <li className="p-2 hover:bg-purple-600 rounded-lg">
              <NavLink to="/agent/cashoutreq" className="text-white">
                Cash Out Request
              </NavLink>
            </li>
            <li className="p-2 hover:bg-purple-600 rounded-lg">
              <NavLink to="/agent/addmoney" className="text-white">
                Add Money
              </NavLink>
            </li>
            <li className="p-2 hover:bg-purple-600 rounded-lg">
              <NavLink to="/agent/withdrawmoney" className="text-white">
                Withdraw Money
              </NavLink>
            </li>
            <li className="p-2 hover:bg-purple-600 rounded-lg">
              <NavLink to="/agent/history" className="text-white">
                Transiction History
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="ml-[20%] flex-grow ">
          <div className="sticky top-0 bg-purple-500">
            <div className="flex justify-end">
              <AvatarDropdown />
            </div>
          </div>

          <Outlet />
        </div>
      </div>
    </>
  );
};
