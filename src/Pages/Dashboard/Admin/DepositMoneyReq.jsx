import { Backdrop, CircularProgress } from "@mui/material";
import { usePendingReq } from "../../../Hooks/usePendingReq";
import CustomTable from "../../../Components/Table/CustomTable";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";
import Swal from "sweetalert2";
import { useAxiosSequre } from "../../../Hooks/useAxiosSequre";

export const DepositMoneyReq = () => {
  const { data, refetch, isLoading } = usePendingReq("deposit_money");
  const axiossequre = useAxiosSequre();
  const handleButton = (id, sender, rcver, action, amount) => {
    axiossequre
      .patch(
        `/pendingreq/${id}?status=${action}&sender=${sender}&rcver=${rcver}&amount=${amount}`
      )
      .then((res) => {
        return refetch();
      })
      .then(() =>
        Swal.fire({
          icon: "success",
          text: `Success`,
        })
      )
      .catch((er) => console.log(er));
  };

  return (
    <div>
      <h1 className="font-bold text-black border-b  border-blue-300 mb-5 py-4 text-3xl text-center">
        Deposit Money Request
      </h1>
      <div className="m-10 rounded-lg shadow-lg shadow-gray-500 ">
        <div>
          {isLoading && (
            <div className=" flex flex-col justify-center items-center">
              <Backdrop
                sx={(theme) => ({
                  color: "#fff",
                  zIndex: theme.zIndex.drawer + 1,
                  backgroundColor: "#0008ff25",
                  backdropFilter: "blur(6px)",
                })}
                open={true}
              >
                <div className="flex flex-col justify-center items-center ">
                  <CircularProgress
                    disableShrink
                    size={40}
                    thickness={4}
                    sx={{ color: "purple", marginLeft: "200px" }}
                  />

                  <h1 className="text-center mt-3 ml-52 font-bold text-[blue] text-4xl">
                    Loading........
                  </h1>
                </div>
              </Backdrop>
            </div>
          )}
        </div>

        <CustomTable
          handleButton={handleButton}
          refetch={refetch}
          loading={isLoading}
          data={data}
          method="Deposit"
        />
      </div>
    </div>
  );
};
