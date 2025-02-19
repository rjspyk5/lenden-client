import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AvatarDropdown } from "../AvatarDropdown/AvatarDropdown";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { BiSolidUserCircle } from "react-icons/bi";
import { LiaEdit } from "react-icons/lia";
import { IoLogOut } from "react-icons/io5";
import { useUser } from "../../Hooks/useUser";
 
export function DrawerSection({menu}) {
  const [open, setOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { userDetails } = useUser();
  const balance = userDetails ? parseFloat(userDetails?.amount.toFixed(1)) : "Loading...";

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
 
  return (
    <React.Fragment className="relative">
      <button className="p-2 rounded-md  " onClick={openDrawer}>
        <GiHamburgerMenu size={24} className="text-white transition-colors hover:text-[#c6c6c6] "/>
      </button>
      <Drawer 
        open={open} 
        onClose={closeDrawer} 
        className="bg-[#757575] bakcdrop-blur-xxl"
        placement="left"
        size={300}
      >
        <span className="absolute top-2 right-3">
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </span>

        {/* Profile Section */}
        <div className="flex flex-col items-center  mt-4 border-b ">
          <AvatarDropdown />
          <h1 className="text-center mt-2 text-white  font-medium">
            {user?.name || "Anonymous"}
          </h1>
          <h2 className="text-center text-white ">
            Balance: {balance}
          </h2>
          <div className="flex justify-center space-x-4 mt-1">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <BiSolidUserCircle size={25} className="text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <LiaEdit size={25} className="text-gray-700" />
            </button>
            <button 
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => {
                logout();
                navigate("/login");
                closeDrawer();
              }}
            >
              <IoLogOut size={25} className="text-gray-700" />
            </button>
          </div>
        </div>

        <div className="">
          {menu}
        </div>

      </Drawer>
    </React.Fragment>
  );
}