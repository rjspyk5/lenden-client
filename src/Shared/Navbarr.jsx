import { Link } from "react-router-dom";
import { AvatarDropdown } from "../Components/AvatarDropdown/AvatarDropdown";
import { useUser } from "../Hooks/useUser";
import { useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Badge } from "@mui/material";
export const Navbarr = () => {
  const [balanceShow, setbalanceShow] = useState(false);
  const { userDetails } = useUser();
  const balance = userDetails
    ? parseFloat(userDetails?.amount.toFixed(2))
    : "Loading...";

  return (
    <div className=" shadow-xl  backdrop-blur-2xl bg-[#e1dcdc41] border-blue-gray-300 z-50  py-2 sticky top-0">
      <div className="flex justify-between lg:max-w-[1100px] lg:mx-auto mx-5 items-center ">
        <Link className="text-white text-xl md:text-2xl font-bold" to="/">
          Lenden
        </Link>
        <h1
          onClick={() => setbalanceShow(!balanceShow)}
          className="font-bold text-white rounded-full cursor-pointer bg-transparent border px-2 md:px-4 py-1"
        >
          {balanceShow ? balance : "Tap For Balance"}
        </h1>
        <div className="flex justify-center items-center space-x-3">
          <Badge color="danger" badgeContent={1}>
            <IoIosNotificationsOutline color="skyBlue" size={35} />
          </Badge>
          <AvatarDropdown />
        </div>
      </div>
    </div>
  );
};
