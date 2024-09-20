import { AgentAddOrWithdrawMoney } from "../../../Components/AgentAddOrWithdrawMoney/AgentAddOrWithdrawMoney";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";

export const WithdrawMoney = () => {
  return (
    <>
      {" "}
      <SectionHeader heading="Withdraw Money" />
      <div className="m-10 rounded-lg  ">
        <AgentAddOrWithdrawMoney method="withdraw_money" />
      </div>
    </>
  );
};
