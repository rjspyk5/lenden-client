import { Link } from "react-router-dom";
import { AvatarDropdown } from "../Components/AvatarDropdown/AvatarDropdown";
import { useUser } from "../Hooks/useUser";
export const Navbarr = () => {
  const { userDetails } = useUser();

  return (
    <div className=" shadow-xl  bg-[#171a547a] backdrop-blur-xl   border-blue-gray-700 z-50  py-2 sticky top-0">
      <div className="flex justify-between lg:max-w-[1100px] lg:mx-auto mx-10 items-center ">
        <Link className="text-white text-2xl font-bold" to="/">
          Lenden
        </Link>
        <h1 className="font-bold text-white ">
          Balance : {parseFloat(userDetails?.amount.toFixed(2))}
        </h1>
        <AvatarDropdown />
      </div>
    </div>
  );
};
