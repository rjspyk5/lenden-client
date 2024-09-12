import React from "react";
import { usePendingReq } from "../../../Hooks/usePendingReq";

export const WithdrawReqeust = () => {
  const { data, refetch, isLoading } = usePendingReq("withdraw_money");

  return <div>WithdrawReqeust</div>;
};
