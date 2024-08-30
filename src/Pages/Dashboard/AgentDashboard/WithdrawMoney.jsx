import React from "react";
import { AgentAddOrWithdrawMoney } from "../../../Components/AgentAddOrWithdrawMoney/AgentAddOrWithdrawMoney";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";

export const WithdrawMoney = () => {
  return (
    <div className="m-10 rounded-sm shadow-md">
      <SectionHeader heading="Withdraw Money" />
      <AgentAddOrWithdrawMoney />
    </div>
  );
};
