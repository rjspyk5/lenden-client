import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AvatarDropdown } from "../Components/AvatarDropdown/AvatarDropdown";
import { useAuth } from "../Hooks/useAuth";
import bg from "../../public/img/bg-03.jpeg";
import { BiSolidUserCircle } from "react-icons/bi";
import { LiaEdit } from "react-icons/lia";
import { IoLogOut } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { Fade } from "react-awesome-reveal";
import { PiHandDeposit, PiHandWithdraw, PiUsersThree } from "react-icons/pi";
import { RiFileHistoryLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Notification } from "../Components/Notification/Notification";
import { Tooltip } from "@material-tailwind/react";
import { HiOutlineCash } from "react-icons/hi";

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItemClass =
    "hover:bg-[#1C24BD] hover:shadow-2xl hover:shadow-blue-500 *:text-white *:py-2 *:px-1 *:md:py-3 *:md::px-4 *:block *:rounded-r-3xl hover:rounded-r-3xl ";
  const activeClass =
    "bg-[#1C24BD] border-l-2 border-[white] shadow-2xl shadow-blue-500 ";

  const adminMenu = (
    <ul className="py-3 px-3 space-y-2">
      <li className={menuItemClass}>
        <NavLink
          to="/admin"
          className={({ isActive }) => (isActive ? activeClass : "")}
          end
        >
          <span className="flex  items-center justify-center md:justify-start">
            <RxDashboard size={25} />
            <span className="hidden md:block pl-2 "> Dashboard</span>
          </span>
        </NavLink>
      </li>
      <li className={menuItemClass}>
        <NavLink
          to="/admin/depositreq"
          className={({ isActive }) => (isActive ? activeClass : "")}
          end
        >
          <span className="flex  items-center justify-center md:justify-start">
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
          <span className="flex  items-center justify-center md:justify-start">
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
          <span className="flex  items-center justify-center md:justify-start">
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
          <span className="flex  items-center justify-center md:justify-start">
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
          <span className="flex  items-center justify-center md:justify-start">
            <RxDashboard size={25} />
            <span className="hidden md:block pl-2"> Dashboard</span>
          </span>
        </NavLink>
      </li>
      <li className={menuItemClass}>
        <NavLink
          to="/agent/cashinreq"
          className={({ isActive }) => (isActive ? activeClass : "")}
          end
        >
          <span className="flex  items-center justify-center md:justify-start">
            <HiOutlineCash size={25} />
            <span className="hidden md:block pl-2"> Cash In Req</span>
          </span>
        </NavLink>
      </li>
      <li className={menuItemClass}>
        <NavLink
          to="/agent/addmoney"
          className={({ isActive }) => (isActive ? activeClass : "")}
          end
        >
          <span className="flex  items-center justify-center md:justify-start">
            <PiHandWithdraw size={25} />
            <span className="hidden md:block pl-2"> Deposit Money</span>
          </span>
        </NavLink>
      </li>
      <li className={menuItemClass}>
        <NavLink
          to="/agent/withdrawmoney"
          className={({ isActive }) => (isActive ? activeClass : "")}
          end
        >
          <span className="flex  items-center justify-center md:justify-start">
            <PiHandDeposit size={25} />
            <span className="hidden md:block pl-2"> Withdraw Money</span>
          </span>
        </NavLink>
      </li>
      <li className={menuItemClass}>
        <NavLink
          to="/agent/history"
          className={({ isActive }) => (isActive ? activeClass : "")}
          end
        >
          <span className="flex  items-center justify-center md:justify-start">
            <RiFileHistoryLine size={25} />
            <span className="hidden md:block pl-2"> Transaction History</span>
          </span>
        </NavLink>
      </li>
    </ul>
  );

  return (
    <Fade>
      <div
        className="bg-cover w-full  bg-center min-h-screen  "
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="backdrop-blur min-h-screen ">
          <div className="flex">
            <div className="w-[20%] fixed h-[100%] bg-gradient-to-br bg-[#c5c3c365]">
              <div className="flex justify-center items-center flex-col pt-5 pb-1 mx-3">
                <AvatarDropdown />
                <h1 className="text-center text-white mt-2 md:text-base ">
                  {user?.name || "Anonymous"}
                </h1>
              </div>
              <div className="mb-4 py-2 md:mx-3 mx-1 border-b flex justify-center space-x-1 md:space-x-4 items-center text-white">
                <button>
                  <BiSolidUserCircle size={25} />
                </button>
                <button>
                  <LiaEdit size={25} />
                </button>

                <button>
                  <IoLogOut
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                    size={25}
                  />
                </button>
              </div>
              {user?.role === "agent" ? agentMenu : adminMenu}
            </div>

            <div className="ml-[20%]  flex-grow px-4 md:px-8 backdrop-blur-lg ">
              <div className="flex justify-end py-2 pr-1 relative">
                <IoIosNotificationsOutline color="skyBlue" size={35} />
                <div className="max-h-[500px] border hidden border-blue-500 overflow-auto  w-96 right-5 top-12 absolute backdrop-blur-3xl rounded-lg z-50">
                  <Notification number={user?.number} />
                </div>
              </div>

              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};
