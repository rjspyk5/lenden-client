import CustomTable from "../../../Components/Table/CustomTable";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSequre } from "../../../Hooks/useAxiosSequre";
import { useAuth } from "../../../Hooks/useAuth";
import { useAgentRequestList } from "../../../Hooks/useAgentRequestList";
export const CashOutReq = () => {
  const { data: cashOutReqList } = useAgentRequestList("cash_out");
  console.log(cashOutReqList);
  return (
    <div className="m-10 rounded-lg shadow-lg shadow-gray-500 ">
      <SectionHeader heading="Cash Out Request" />
      <CustomTable method="Cash Out" />
    </div>
  );
};
