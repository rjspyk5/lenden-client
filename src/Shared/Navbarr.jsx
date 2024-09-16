import { Link } from "react-router-dom";
import { AvatarDropdown } from "../Components/AvatarDropdown/AvatarDropdown";
import { useUser } from "../Hooks/useUser";
import { useState } from "react";
export const Navbarr = () => {
  const [balanceShow, setbalanceShow] = useState(false);
  const { userDetails } = useUser();

  const balance = parseFloat(userDetails?.amount.toFixed(2));

  return (
    <div className=" shadow-xl  bg-[#0d1051f2] backdrop-blur-xl   border-blue-gray-700 z-50  py-2 sticky top-0">
      <div className="flex justify-between lg:max-w-[1100px] lg:mx-auto mx-10 items-center ">
        <Link className="text-white text-2xl font-bold" to="/">
          Lenden
        </Link>
        <h1
          onClick={() => setbalanceShow(!balanceShow)}
          className="font-bold text-white rounded-full cursor-pointer bg-transparent border px-4 py-1"
        >
          {balanceShow ? balance : "Tap For Balance"}
        </h1>
        <AvatarDropdown />
      </div>
    </div>
  );
};
