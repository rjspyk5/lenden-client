import { Navbarr } from "../Shared/Navbarr";
import { Outlet } from "react-router-dom";
import bg from "../../public/img/bg-04.jpeg";

export const MainRoot = () => {
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className={`min-h-screen bg-blend-screen  bg-contain  bg-center relative`}
    >
      <Navbarr />
      <div className="mt-5">
        <div className="lg:max-w-[1100px] lg:mx-auto mx-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
