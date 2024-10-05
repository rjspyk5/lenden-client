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
import { HiOutlineCash } from "react-icons/hi";
import { useState } from "react";
import { useAxiosSequre } from "../Hooks/useAxiosSequre";
import { useQuery } from "@tanstack/react-query";

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [showNotification, setshowNotification] = useState(false);
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

  const axiosSequre = useAxiosSequre();
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      const result = await axiosSequre.get(`/notifications/${user.number}`);
      return result?.data;
    },
  });
  const unreadNotificationCount = data?.filter((el) => el.status === "unread");
  const handleRead = async (id) => {
    const result = await axiosSequre.patch(`/notification/${id}`);
    if (result?.data?.modifiedCount) {
      refetch();
    }
  };

  return (
    <Fade>
      <div
        className="bg-cover w-full bg-center min-h-screen"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="backdrop-blur min-h-screen">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-[20%] fixed top-0 h-[100%] bg-gradient-to-br bg-[#71707065]">
              <div className="flex justify-center items-center flex-col pt-5 pb-1 mx-3">
                <AvatarDropdown />
                <h1 className="text-center text-white mt-2 md:text-base">
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
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  <IoLogOut size={25} />
                </button>
              </div>
              {user?.role === "agent" ? agentMenu : adminMenu}
            </div>

            {/* Right Content with Scroll */}
            <div className="ml-[20%] flex-grow max-h-screen overflow-y-auto px-3 md:px-6">
              <div className="sticky top-0 z-50 backdrop-blur-3xl bg-[#23232324] flex justify-end py-2 pr-1">
                <span
                  className="btn cursor-pointer "
                  onClick={() => setshowNotification(!showNotification)}
                >
                  <IoIosNotificationsOutline color="skyBlue" size={35} />
                </span>
                {showNotification && (
                  <Notification
                    handleRead={handleRead}
                    classs={"right-5 top-12"}
                    data={data}
                  />
                )}
                {unreadNotificationCount?.length > 0 && (
                  <span className="absolute top-[4px] right-[4px] px-[6px] text-sm animate-pulse rounded-full bg-red-500 text-white">
                    {unreadNotificationCount?.length}
                  </span>
                )}
              </div>

              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};
