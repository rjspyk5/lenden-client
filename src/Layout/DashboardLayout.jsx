import { NavLink, Outlet } from "react-router-dom";
import { AvatarDropdown } from "../Components/AvatarDropdown/AvatarDropdown";
import { useAuth } from "../Hooks/useAuth";
import bg from "../../public/img/bg-03.jpeg";
import { FcEditImage, FcManager } from "react-icons/fc";
import { LiaEdit, LiaUserEditSolid } from "react-icons/lia";
import { FaEdit, FaUserEdit, FaUserTie } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { BiSolidUserCircle } from "react-icons/bi";

export const DashboardLayout = () => {
  const { user } = useAuth();

  const adminMenu = (
    <>
      <ul className="p-3 px-3 ">
        <li className="p-2  hover:bg-[#0051ff73]  rounded-lg">
          <NavLink to="/admin" className="text-white  ">
            Dashboard
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
      <ul className="py-3 px-3 space-y-2">
        <li className="  hover:bg-[#1C24BD] hover:shadow-2xl hover:shadow-blue-500 *:text-white *:py-3 *:px-4 *:block *:rounded-r-3xl hover:rounded-r-3xl ">
          <NavLink
            to="/agent"
            className={({ isActive }) =>
              isActive
                ? "bg-[#1C24BD] border-l-2 shadow-xl shadow-[#e4e3e22f]"
                : ""
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li className="   hover:bg-[#1C24BD] hover:shadow-2xl hover:shadow-blue-500 *:text-white *:py-3 *:px-4 *:block *:rounded-r-3xl hover:rounded-r-3xl ">
          <NavLink
            to="/agent/cashinreq"
            className={({ isActive }) =>
              isActive ? "bg-[#1C24BD] border-l-2" : ""
            }
          >
            Cash In Request
          </NavLink>
        </li>

        <li className="   hover:bg-[#1C24BD] *:text-white *:py-3 *:px-4 *:block *:rounded-r-3xl hover:rounded-r-3xl ">
          <NavLink
            to="/agent/addmoney"
            className={({ isActive }) =>
              isActive ? "bg-[#1C24BD] border-l-2" : ""
            }
          >
            Deposit Money
          </NavLink>
        </li>
        <li className="   hover:bg-[#1C24BD] *:text-white *:py-3 *:px-4 *:block *:rounded-r-3xl hover:rounded-r-3xl ">
          <NavLink
            to="/agent/withdrawmoney"
            className={({ isActive }) =>
              isActive ? "bg-[#1C24BD] border-l-2" : ""
            }
          >
            Withdraw Money
          </NavLink>
        </li>
        <li className="   hover:bg-[#1C24BD] *:text-white *:py-3 *:px-4 *:block *:rounded-r-3xl hover:rounded-r-3xl ">
          <NavLink
            to="/agent/history"
            className={({ isActive }) =>
              isActive ? "bg-[#1C24BD] border-l-2" : ""
            }
          >
            Transition History
          </NavLink>
        </li>
      </ul>
    </>
  );
  return (
    <>
      <div
        className="bg-cover bg-center min-h-screen "
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="backdrop-blur-sm min-h-screen">
          {/* <div className="sticky top-0 py-2  bg-[#6d6d6d34]  backdrop-blur-md   ">
          <div className="flex justify-between items-center mx-5">
            <h1 className="text-center font-bold text-white md:text-2xl  ">
              {user?.role === "agent" ? "Agent" : "Admin"} Dashboard
            </h1>
            <AvatarDropdown />
          </div>
        </div> */}
          <div className="flex ">
            <div
              className="w-[18%] fixed 
            h-[100%] bg-gradient-to-br bg-[#6d6d6d34] "
            >
              {/* <h1 className="text-white font-bold text-xl mx-3 p-3 text-center border-b">
                {" "}
                {user?.role === "agent" ? "Agent" : "Admin"} Dashboard
              </h1> */}
              <div className="flex justify-center items-center flex-col  pt-5 pb-1  mx-3">
                <AvatarDropdown />
                <h1 className="text-center text-white mt-2">
                  {user?.name || "Anonymous"}
                </h1>
              </div>
              <div className="mb-4  py-2 mx-3 border-b flex justify-center space-x-4 items-center text-white">
                <button>
                  {" "}
                  <BiSolidUserCircle size={25} />
                </button>
                <button>
                  {" "}
                  <LiaEdit size={25} />
                </button>
                <button>
                  {" "}
                  <IoLogOut size={25} />
                </button>
              </div>
              {user?.role === "agent" ? agentMenu : adminMenu}
            </div>

            <div className="ml-[18%] flex-grow p-8 backdrop-blur-lg">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
