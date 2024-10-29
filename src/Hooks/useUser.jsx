import { useQuery } from "@tanstack/react-query";
import { useAxiosPublic } from "./useAxiosPublic";
import { useAuth } from "./useAuth";

export const useUser = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const {
    data: userDetails,
    refetch,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const result = await axiosPublic.get(
        `/user?emailOrNumber=${user?.email || user?.number}`
      );

      return result.data;
    },
  });
  return { userDetails, refetch, isLoading, isPending };
};
