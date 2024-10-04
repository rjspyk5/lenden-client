import { useQuery } from "@tanstack/react-query";

import { useAxiosSequre } from "../../Hooks/useAxiosSequre";

export const Notification = ({ number }) => {
  const axiosSequre = useAxiosSequre();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      const result = await axiosSequre.get(`/notifications/${number}`);
      return result?.data;
    },
  });

  return (
    <ul className="space-y-2  p-2 bg-[#1c1c1caa] backdrop-blur-3xl">
      {data?.map((el) => {
        return (
          <li
            className={`text-white border-b p-2 rounded ${
              el.status === "unread" && "bg-blue-gray-300"
            }`}
            key={el._id}
          >
            {el?.message}
          </li>
        );
      })}
    </ul>
  );
};
