import { useQuery } from "@tanstack/react-query";
import { useAxiosSequre } from "../../../Hooks/useAxiosSequre";
import { useAuth } from "../../../Hooks/useAuth";
export const AddMoneyRequest = () => {
  const axiosSequre = useAxiosSequre();
  const { user } = useAuth();
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["addmoneyreq"],
    queryFn: async () => {
      const result = await axiosSequre(
        `/requesttoagent/${user?.number}?method=send_money`
      );
      return result.data;
    },
  });

  return <div>AddMoneyRequest</div>;
};
