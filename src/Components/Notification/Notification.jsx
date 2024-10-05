import { useQuery } from "@tanstack/react-query";

import { useAxiosSequre } from "../../Hooks/useAxiosSequre";
import { useNavigate } from "react-router-dom";

export const Notification = ({ data, classs, handleRead }) => {
  const navigate = useNavigate();
  // const axiosSequre = useAxiosSequre();

  // const { data, refetch, isLoading } = useQuery({
  //   queryKey: ["notification"],
  //   queryFn: async () => {
  //     const result = await axiosSequre.get(`/notifications/${number}`);
  //     return result?.data;
  //   },
  // });

  return (
    <div
      className={`max-h-[500px] border  border-blue-500 overflow-auto w-96 bg-[#1c1c1cda]   absolute backdrop-blur-3xl rounded-lg z-50 ${classs}`}
    >
      <ul className="space-y-2  p-2 ">
        {data?.map((el) => {
          return (
            <li
              className={`text-white relative  p-2 rounded ${
                el.status === "unread" && "bg-[#568ce8bf]"
              }`}
              key={el._id}
            >
              {el?.message}
              {el.status === "unread" && (
                <span className="absolute bottom-1 right-1">
                  <button
                    onClick={() => handleRead(el._id)}
                    className="px-2 text-base bg-black rounded-md"
                  >
                    Mark as Read
                  </button>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
