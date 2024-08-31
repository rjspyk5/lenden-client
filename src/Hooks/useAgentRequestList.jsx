import { useAuth } from "./useAuth";
import { useAxiosSequre } from "./useAxiosSequre";
import { useQuery } from "@tanstack/react-query";

export const useAgentRequestList = (method) => {
  const { user } = useAuth();
  const axiossequre = useAxiosSequre();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["agentrequestlist"],
    queryFn: async () => {
      const result = await axiossequre.get(
        `/requesttoagent/${user?.number}?method=${method}`
      );
      return result.data;
    },
  });
  return { data, isLoading, refetch };
};
