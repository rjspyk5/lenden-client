import React, { useState } from "react";
import { usePendingReq } from "../../../Hooks/usePendingReq";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";
import CustomTable from "../../../Components/Table/CustomTable";
import { Backdrop, CircularProgress } from "@mui/material";
import { useAxiosSequre } from "../../../Hooks/useAxiosSequre";
import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";
import { useUser } from "../../../Hooks/useUser";
import { Loading } from "../../../Components/Loading/Loading";

export const WithdrawReqeust = () => {
  const { data, refetch, isLoading } = usePendingReq("withdraw_money");
  const [customLoading, setcustomLoading] = useState(false);
  const axiossequre = useAxiosSequre();
  const { refetch: balanceRefetch, isLoading: balanceLoading } = useUser();

  const handleButton = (id, sender, rcver, action, amount, method) => {
    setcustomLoading(true);
    axiossequre
      .patch(
        `/pendingreq/${id}?status=${action}&sender=${sender}&rcver=${rcver}&amount=${amount}&method=${method}`
      )
      .then((res) => refetch())
      .then(() => balanceRefetch())
      .then(() => {
        setcustomLoading(false);
        Swal.fire({
          icon: "success",
          text: `Success`,
        });
      });
  };

  return (
    <Fade>
      {customLoading && (
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
                sx={{ color: "blue", marginLeft: "200px" }}
              />

              <h1 className="text-center mt-4 ml-52 font-bold text-[blue] text-4xl">
                Loading........
              </h1>
            </div>
          </Backdrop>
        </div>
      )}
      <div>
        <SectionHeader heading=" Withdraw Money Request" />
        <div className=" my-5  rounded-lg shadow shadow-gray-500 ">
          <div>
            {(isLoading || balanceLoading) && (
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
                  <div className="flex flex-col justify-center items-center ">
                    <CircularProgress
                      disableShrink
                      size={40}
                      thickness={4}
                      sx={{ color: "white", marginLeft: "200px" }}
                    />

                    <h1 className="text-center mt-4 ml-52 font-bold text-[white] text-4xl">
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
            method="Withdraw"
          />
        </div>
      </div>
    </Fade>
  );
};
