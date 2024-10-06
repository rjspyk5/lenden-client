import { Backdrop, CircularProgress } from "@mui/material";
import { usePendingReq } from "../../../Hooks/usePendingReq";
import CustomTable from "../../../Components/Table/CustomTable";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";
import Swal from "sweetalert2";
import { useAxiosSequre } from "../../../Hooks/useAxiosSequre";
import { Fade } from "react-awesome-reveal";
import { useUser } from "../../../Hooks/useUser";
import { useState } from "react";
import { Loading } from "../../../Components/Loading/Loading";

export const DepositMoneyReq = () => {
  const { data, refetch, isLoading } = usePendingReq("deposit_money");
  const { refetch: balanceRefetch, isLoading: balanceLoading } = useUser();
  const [customLoading, setcustomLoading] = useState(false);
  const axiossequre = useAxiosSequre();
  const handleButton = (id, sender, rcver, action, amount, method) => {
    setcustomLoading(true);
    axiossequre
      .patch(
        `/pendingreq/${id}?status=${action}&sender=${sender}&rcver=${rcver}&amount=${amount}&method=${method}`
      )
      .then((res) => {
        return refetch();
      })
      .then(() => balanceRefetch())
      .then(() => {
        setcustomLoading(false);
        Swal.fire({
          icon: "success",
          text: `Success`,
        });
      })
      .catch((er) => console.log(er));
  };

  return (
    <Fade>
      {customLoading && (
        <div className=" flex flex-col justify-center items-center">
          <Backdrop
            sx={(theme) => ({
              color: "#fff",
              zIndex: theme.zIndex.drawer + 1,
              backgroundColor: "#b3acac9c",
              backdropFilter: "blur(6px)",
            })}
            open={true}
          >
            <div className="flex flex-col  justify-center items-center ">
              <CircularProgress
                disableShrink
                size={40}
                thickness={4}
                sx={{ color: "white", marginLeft: "200px" }}
              />

              <h1 className="text-center mt-3 ml-52 font-bold text-[white] text-4xl">
                Loading........
              </h1>
            </div>
          </Backdrop>
        </div>
      )}
      <div>
        {isLoading && (
          <div className=" flex  flex-col justify-center items-center">
            <Backdrop
              sx={(theme) => ({
                color: "#fff",
                zIndex: theme.zIndex.drawer + 1,
                backgroundColor: "#b3acac9c",
                backdropFilter: "blur(6px)",
              })}
              open={true}
            >
              <div className="flex flex-col  justify-center items-center ">
                <CircularProgress
                  disableShrink
                  size={40}
                  thickness={4}
                  sx={{ color: "blue", marginLeft: "200px" }}
                />

                <h1 className="text-center mt-3 ml-52 font-bold text-[blue] text-4xl">
                  Loading........
                </h1>
              </div>
            </Backdrop>
          </div>
        )}
        <div>
          <SectionHeader heading=" Deposit Money Request" />
          <div className="my-5 rounded-lg shadow shadow-gray-500 ">
            <CustomTable
              handleButton={handleButton}
              refetch={refetch}
              loading={isLoading}
              data={data}
              method="Deposit"
            />
          </div>
        </div>
      </div>
    </Fade>
  );
};
