import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAxiosSequre } from "../../../Hooks/useAxiosSequre";

export const AllUser = () => {
  const axiosSequre = useAxiosSequre();
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["allusers"],
    queryFn: async () => {
      const result = await axiosSequre.get("/users");
      return result.data;
    },
  });
  console.log(data);
  return <div>AllUser</div>;
};
