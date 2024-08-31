import { AvatarDropdown } from "../Components/AvatarDropdown/AvatarDropdown";
import { useUser } from "../Hooks/useUser";
export const Navbarr = () => {
  const { userRole } = useUser();

  return (
    <div className="flex justify-between border items-center">
      <h1>Lenden</h1>

      <h1 className="text-black">Balance :{userRole?.amount}</h1>

      <AvatarDropdown />
    </div>
  );
};
