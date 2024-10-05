import React from "react";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";
import { Fade } from "react-awesome-reveal";
import { AgentAddOrWithdrawMoney } from "../../../Components/AgentAddOrWithdrawMoney/AgentAddOrWithdrawMoney";

export const MarchentWithdraw = () => {
  return (
    <div>
      <Fade>
        <SectionHeader heading="Withdraw Money" />
        <div className="m-10 rounded-lg  ">
          <AgentAddOrWithdrawMoney method="withdraw_money" />
        </div>
      </Fade>
    </div>
  );
};
