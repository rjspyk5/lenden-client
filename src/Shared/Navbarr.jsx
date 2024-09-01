import { Link } from "react-router-dom";
import { AvatarDropdown } from "../Components/AvatarDropdown/AvatarDropdown";
import { useUser } from "../Hooks/useUser";
export const Navbarr = () => {
  const { userDetails } = useUser();

  return (
    <div className=" shadow  bg-[#4c205c4c] z-50 backdrop-blur-lg py-2 sticky top-0">
      <div className="flex justify-between lg:max-w-[1100px] lg:mx-auto mx-10 items-center ">
        <Link className="text-white font-bold" to="/">
          Lenden
        </Link>
        <h1 className="font-bold text-white ">
          Balance :{userDetails?.amount}
        </h1>
        <AvatarDropdown />
      </div>
    </div>
  );
};
