import { NavLink, Outlet } from "react-router-dom";
import { AvatarDropdown } from "../Components/AvatarDropdown/AvatarDropdown";
import { useAuth } from "../Hooks/useAuth";
import bg from "../../public/img/bg-03.jpeg";
import { BiSolidUserCircle } from "react-icons/bi";
import { LiaEdit } from "react-icons/lia";
import { IoLogOut } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import {
  PiHandDeposit,
  PiHandDepositLight,
  PiHandWithdraw,
  PiUsersThree,
} from "react-icons/pi";
import { RiFileHistoryLine } from "react-icons/ri";

export const DashboardLayout = () => {
  const { user } = useAuth();

  const menuItemClass =
    "hover:bg-[#1C24BD] hover:shadow-2xl hover:shadow-blue-500 *:text-white *:py-2 *:px-1 *:md:py-3 *:md::px-4 *:block *:rounded-r-3xl hover:rounded-r-3xl ";
  const activeClass =
    "bg-[#1C24BD] border-l-2 border-[green] shadow-2xl shadow-blue-500 ";

  const adminMenu = (
    <ul className="py-3 px-3 space-y-2">
      <li className={menuItemClass}>
        <NavLink
          to="/admin"
          className={({ isActive }) => (isActive ? activeClass : "")}
          end
        >
          <span className="flex  items-center">
            <RxDashboard size={25} />
            <span className="hidden md:block pl-2"> Dashboard</span>
          </span>
        </NavLink>
      </li>
      <li className={menuItemClass}>
        <NavLink
          to="/admin/depositreq"
          className={({ isActive }) => (isActive ? activeClass : "")}
          end
        >
          <span className="flex  items-center">
            <PiHandDeposit size={25} />
            <span className="hidden md:block pl-2"> Deposit Request</span>
          </span>
        </NavLink>
      </li>
      <li className={menuItemClass}>
        <NavLink
          to="/admin/withdrawreq"
          className={({ isActive }) => (isActive ? activeClass : "")}
          end
        >
          <span className="flex  items-center">
            <PiHandWithdraw size={25} />
            <span className="hidden md:block pl-2"> Withdraw Request</span>
          </span>
        </NavLink>
      </li>
      <li className={menuItemClass}>
        <NavLink
          to="/admin/users"
          className={({ isActive }) => (isActive ? activeClass : "")}
          end
        >
          <span className="flex  items-center">
            <PiUsersThree size={25} />
            <span className="hidden md:block pl-2"> All Users</span>
          </span>
        </NavLink>
      </li>
      <li className={menuItemClass}>
        <NavLink
          to="/admin/history"
          className={({ isActive }) => (isActive ? activeClass : "")}
          end
        >
          <span className="flex  items-center">
            <RiFileHistoryLine size={25} />
            <span className="hidden md:block pl-2"> All Transactions</span>
          </span>
        </NavLink>
      </li>
    </ul>
  );

  const agentMenu = (
    <ul className="py-3 px-3 space-y-2">
      <li className={menuItemClass}>
        <NavLink
          to="/agent"
          className={({ isActive }) => (isActive ? activeClass : "")}
          end
        >
          Dashboard
        </NavLink>
      </li>
      <li className={menuItemClass}>
        <NavLink
          to="/agent/cashinreq"
          className={({ isActive }) => (isActive ? activeClass : "")}
          end
        >
          Cash In Request
        </NavLink>
      </li>
      <li className={menuItemClass}>
        <NavLink
          to="/agent/addmoney"
          className={({ isActive }) => (isActive ? activeClass : "")}
          end
        >
          Deposit Money
        </NavLink>
      </li>
      <li className={menuItemClass}>
        <NavLink
          to="/agent/withdrawmoney"
          className={({ isActive }) => (isActive ? activeClass : "")}
          end
        >
          Withdraw Money
        </NavLink>
      </li>
      <li className={menuItemClass}>
        <NavLink
          to="/agent/history"
          className={({ isActive }) => (isActive ? activeClass : "")}
          end
        >
          Transaction History
        </NavLink>
      </li>
    </ul>
  );

  return (
    <div
      className="bg-cover w-full  bg-center min-h-screen  "
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="backdrop-blur min-h-screen ">
        <div className="flex">
          <div className="w-[23%] fixed h-[100%] bg-gradient-to-br bg-[#6d6d6d34]">
            <div className="flex justify-center items-center flex-col pt-5 pb-1 mx-3">
              <AvatarDropdown />
              <h1 className="text-center text-white mt-2">
                {user?.name || "Anonymous"}
              </h1>
            </div>
            <div className="mb-4 py-2 mx-3 border-b flex justify-center space-x-4 items-center text-white">
              <button>
                <BiSolidUserCircle size={25} />
              </button>
              <button>
                <LiaEdit size={25} />
              </button>
              <button>
                <IoLogOut size={25} />
              </button>
            </div>
            {user?.role === "agent" ? agentMenu : adminMenu}
          </div>

          <div className="ml-[23%] overflow-auto flex-grow p-6 md:p-8 backdrop-blur-lg ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
