import { Link } from "react-router-dom";
import { AvatarDropdown } from "../Components/AvatarDropdown/AvatarDropdown";
import { useUser } from "../Hooks/useUser";
import { useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Notification } from "../Components/Notification/Notification";
import { useAuth } from "../Hooks/useAuth";
import { useAxiosSequre } from "../Hooks/useAxiosSequre";
import { useQuery } from "@tanstack/react-query";

export const Navbarr = () => {
  const { user } = useAuth();
  const [balanceShow, setbalanceShow] = useState(false);
  const { userDetails } = useUser();
  const [showNotification, setshowNotification] = useState(false);
  const balance = userDetails
    ? parseFloat(userDetails?.amount.toFixed(2))
    : "Loading...";
  const axiosSequre = useAxiosSequre();
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      const result = await axiosSequre.get(`/notifications/${user.number}`);
      return result?.data;
    },
  });
  const unreadNotificationCount = data?.filter((el) => el.status === "unread");
  const handleRead = async (id) => {
    const result = await axiosSequre.patch(`/notification/${id}`);
    if (result?.data?.modifiedCount) {
      refetch();
    }
  };
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
        <div className="relative">
          <div className="flex justify-center items-center space-x-3 relative">
            <span
              className="btn cursor-pointer "
              onClick={() => setshowNotification(!showNotification)}
            >
              <IoIosNotificationsOutline color="skyBlue" size={35} />
            </span>
            {showNotification && (
              <Notification
                handleRead={handleRead}
                classs={"right-16 top-12"}
                data={data}
              />
            )}
            {unreadNotificationCount?.length > 0 && (
              <span className="absolute top-[-3px] right-14 px-[6px] text-sm animate-pulse rounded-full bg-red-500 text-white">
                {unreadNotificationCount?.length}
              </span>
            )}
            <AvatarDropdown />
          </div>

          {/* <Notification
            handleRead={handleRead}
            classs={"right-16"}
            data={data}
          /> */}
        </div>
      </div>
    </div>
  );
};
