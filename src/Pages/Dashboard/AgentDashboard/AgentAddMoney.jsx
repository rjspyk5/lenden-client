import React from "react";
import { AgentAddOrWithdrawMoney } from "../../../Components/AgentAddOrWithdrawMoney/AgentAddOrWithdrawMoney";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";

export const AgentAddMoney = () => {
  return (
    <div>
      <SectionHeader heading="Add Money" />
      <AgentAddOrWithdrawMoney />
    </div>
  );
};
