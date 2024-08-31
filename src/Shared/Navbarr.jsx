import { AvatarDropdown } from "../Components/AvatarDropdown/AvatarDropdown";
import { useUser } from "../Hooks/useUser";
export const Navbarr = () => {
  const { userDetails } = useUser();

  return (
    <div className="flex justify-between border items-center">
      <h1>Lenden</h1>
      <h1 className="text-black">Balance :{userDetails?.amount}</h1>
      <AvatarDropdown />
    </div>
  );
};
