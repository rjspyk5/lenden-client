import CustomTable from "../../../Components/Table/CustomTable";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";
import { useAgentRequestList } from "../../../Hooks/useAgentRequestList";
import Swal from "sweetalert2";
import { useAxiosSequre } from "../../../Hooks/useAxiosSequre";
export const CashOutReq = () => {
  const {
    data: cashOutReqList,
    refetch,
    isLoading,
  } = useAgentRequestList("cash_out");
  const axiossequre = useAxiosSequre();
  const handleButton = (id, action) => {
    axiossequre
      .patch(`/reqesttoagent/${id}?${action}`)
      .then(() => {
        return Swal.fire({
          icon: "success",
          text: `Success`,
        });
      })
      .then(() => refetch());
  };
  return (
    <div className="m-10 rounded-lg shadow-lg shadow-gray-500 ">
      <SectionHeader heading="Cash Out Request" />
      <CustomTable
        handleButton={handleButton}
        loading={isLoading}
        data={cashOutReqList}
        method="Cash Out"
      />
    </div>
  );
};
