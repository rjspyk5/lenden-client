import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAxiosSequre } from "../../../Hooks/useAxiosSequre";
import { useAuth } from "../../../Hooks/useAuth";
import CustomizableTable from "../../../Components/Table/CustomizableTable";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";

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
      <SectionHeader heading=" All Transition" />
      <CustomizableTable data={data} loading={isLoading} headArray={head} />
    </div>
  );
};
