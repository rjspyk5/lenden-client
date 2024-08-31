import React from "react";
import { AgentAddOrWithdrawMoney } from "../../../Components/AgentAddOrWithdrawMoney/AgentAddOrWithdrawMoney";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";

export const AgentAddMoney = () => {
  return (
    <div className="m-10 rounded-lg shadow-lg shadow-gray-500 ">
      <SectionHeader heading="Add Money" />
      <AgentAddOrWithdrawMoney method="add_money" />
    </div>
  );
};
