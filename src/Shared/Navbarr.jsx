import { AvatarDropdown } from "../Components/AvatarDropdown/AvatarDropdown";
import { useAuth } from "../Hooks/useAuth";

export const Navbarr = () => {
  const { user } = useAuth();
  const userData = JSON.parse(user);
  return (
    <div className="flex justify-between border items-center">
      <h1>Lenden</h1>

      <h1 className="text-black">Balance :{userData.balance}</h1>

      <AvatarDropdown />
    </div>
  );
};
