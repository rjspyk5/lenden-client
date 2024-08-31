import CustomTable from "../../../Components/Table/CustomTable";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";
import { useAgentRequestList } from "../../../Hooks/useAgentRequestList";
export const CashInReq = () => {
  const { data: cashInReqList } = useAgentRequestList("cash_in");
  console.log(cashInReqList);
  return (
    <div className="m-10 rounded-lg shadow-lg shadow-gray-500 ">
      <SectionHeader heading="Cash In Request" />
      <CustomTable data={cashInReqList} method="Cash In" />
    </div>
  );
};
