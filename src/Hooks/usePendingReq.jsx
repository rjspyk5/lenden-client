import { useAuth } from "./useAuth";
import { useAxiosSequre } from "./useAxiosSequre";
import { useQuery } from "@tanstack/react-query";
export const usePendingReq = (method) => {
  const { user } = useAuth();
  const axiossequre = useAxiosSequre();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["pendingreqq", user],
    queryFn: async () => {
      const result = await axiossequre.get(
        `/pendingreq/${user?.number}?method=${method}`
      );
      return result.data;
    },
  });
  return { data, isLoading, refetch };
};
