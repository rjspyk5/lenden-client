import { useQuery } from "@tanstack/react-query";
import { useAxiosPublic } from "./useAxiosPublic";
import { useAuth } from "./useAuth";

export const useUser = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const userParsed = JSON.parse(user);

  const {
    data: userRole,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [user],
    queryFn: async () => {
      const result = await axiosPublic.get(
        `/checkrole?emailOrNumber=${userParsed?.email || userParsed?.number}`
      );

      return result.data;
    },
  });
  return { userRole, refetch, isLoading };
};
