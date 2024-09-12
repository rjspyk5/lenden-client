import React from "react";
import { usePendingReq } from "../../../Hooks/usePendingReq";

export const DepositMoneyReq = () => {
  const { data, refetch, isLoading } = usePendingReq("deposit_money");
  console.log(data);
  return <div>deposit</div>;
};
