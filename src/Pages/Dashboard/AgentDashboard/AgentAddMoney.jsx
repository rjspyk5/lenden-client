import React from "react";
import { AgentAddOrWithdrawMoney } from "../../../Components/AgentAddOrWithdrawMoney/AgentAddOrWithdrawMoney";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";
import { Fade } from "react-awesome-reveal";

export const AgentAddMoney = () => {
  return (
    <>
      <Fade>
        <SectionHeader heading="Deposit Money" />
        <div className="m-10  ">
          <AgentAddOrWithdrawMoney method="deposit_money" />
        </div>
      </Fade>
    </>
  );
};
