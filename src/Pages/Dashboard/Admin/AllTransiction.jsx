import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAxiosSequre } from "../../../Hooks/useAxiosSequre";
import { useAuth } from "../../../Hooks/useAuth";
import CustomizableTable from "../../../Components/Table/CustomizableTable";

export const AllTransiction = () => {
  const axiosSequre = useAxiosSequre();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["allhistory"],
    queryFn: async () => {
      const result = await axiosSequre(`/history`);
      return result.data;
    },
  });

  const head = [
    "Sender Number",
    "Reciver Number",
    "Amount",
    "Charge",
    "Method",

    "Date",
    "Time",
    "Status",
  ];
  return (
    <div>
      <h1 className="font-bold text-black border-b border-blue-300 mb-5 py-4 text-3xl text-center">
        All Transition
      </h1>
      <CustomizableTable data={data} loading={isLoading} headArray={head} />
    </div>
  );
};
