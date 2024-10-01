import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAxiosSequre } from "../../Hooks/useAxiosSequre";

export const Notification = () => {
  const axiosSequre = useAxiosSequre();
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      const result = await axiosSequre.get("");
      return data;
    },
  });
  return <div>Notification</div>;
};
