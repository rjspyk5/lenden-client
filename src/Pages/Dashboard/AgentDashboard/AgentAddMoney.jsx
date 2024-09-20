import React from "react";
import { AgentAddOrWithdrawMoney } from "../../../Components/AgentAddOrWithdrawMoney/AgentAddOrWithdrawMoney";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";

export const AgentAddMoney = () => {
  return (
    <>
      <SectionHeader heading="Deposit Money" />
      <div className="m-10  ">
        <AgentAddOrWithdrawMoney method="deposit_money" />
      </div>
    </>
  );
};
