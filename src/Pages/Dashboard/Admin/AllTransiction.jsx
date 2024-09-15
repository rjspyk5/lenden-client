import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useAxiosSequre } from "../../../Hooks/useAxiosSequre";
import { useAuth } from "../../../Hooks/useAuth";

export const AllTransiction = () => {
  const axiosSequre = useAxiosSequre();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["allhistory"],
    queryFn: async () => {
      const result = await axiosSequre(`/history`);
      return result.data;
    },
  });

  return (
    <div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>senderNumber</th>
            <th>ReciverNumber</th>
            <th>amount</th>
            <th>method</th>
            <th>charge</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((el) => {
            return (
              <tr key={el._id}>
                <td>{el.senderNumber}</td>
                <td>{el.ReciverNumber}</td>
                <td>{el.amount}</td>
                <td>{el.method}</td>
                <td>{el.charge}</td>
                <td>{el.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
