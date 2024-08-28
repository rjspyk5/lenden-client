import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const AgentDashboard = () => {
  return (
    <>
      <div className="flex">
        <div className="w-[20%] fixed min-h-screen bg-purple-500">
          <h1 className="text-center">Agent Dashboard</h1>
          <ul className="p-3">
            <li className="p-2  hover:bg-purple-600  rounded-lg">
              <NavLink className="text-white  ">Home</NavLink>
            </li>
            <li className="p-2 hover:bg-purple-600 rounded-lg">
              <NavLink className="text-white">Cash In Request</NavLink>
            </li>
            <li className="p-2 hover:bg-purple-600 rounded-lg">
              <NavLink className="text-white">Cash Out Request</NavLink>
            </li>
            <li className="p-2 hover:bg-purple-600 rounded-lg">
              <NavLink className="text-white">Add Money</NavLink>
            </li>
            <li className="p-2 hover:bg-purple-600 rounded-lg">
              <NavLink className="text-white">Withdraw Money</NavLink>
            </li>
          </ul>
        </div>
        <div className="ml-[20%] flex-grow ">
          <div className="sticky top-0 bg-purple-500">Dashboard</div>
          <Outlet />
        </div>
      </div>
    </>
  );
};
