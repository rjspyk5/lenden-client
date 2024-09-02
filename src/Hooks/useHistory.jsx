import React from "react";
import { useAuth } from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSequre } from "./useAxiosSequre";

export const useHistory = (method) => {
  const { user } = useAuth();
  const axiosSequre = useAxiosSequre();
  let url = `/history?number=${user?.number}`;
  if (method) {
    url = `/history?method=${method}&number=${user?.number}`;
  }
  const { data, refetch, isLoading } = useQuery({
    queryKey: [method, user],
    queryFn: async () => {
      const result = await axiosSequre.get(url);

      return result.data;
    },
  });

  return { data, refetch, isLoading };
};
