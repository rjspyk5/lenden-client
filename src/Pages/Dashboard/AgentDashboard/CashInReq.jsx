import CustomTable from "../../../Components/Table/CustomTable";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";
import { useAgentRequestList } from "../../../Hooks/useAgentRequestList";
import Swal from "sweetalert2";
import { useAxiosSequre } from "../../../Hooks/useAxiosSequre";
export const CashInReq = () => {
  const {
    data: cashInReqList,
    refetch,
    isLoading,
  } = useAgentRequestList("cash_in");

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
      <SectionHeader heading="Cash In Request" />
      <CustomTable
        handleButton={handleButton}
        refetch={refetch}
        loading={isLoading}
        data={cashInReqList}
        method="Cash In"
      />
    </div>
  );
};
