import React from "react";
import { usePendingReq } from "../../../Hooks/usePendingReq";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";
import CustomTable from "../../../Components/Table/CustomTable";
import { Backdrop, CircularProgress } from "@mui/material";
import { useAxiosSequre } from "../../../Hooks/useAxiosSequre";
import Swal from "sweetalert2";

export const WithdrawReqeust = () => {
  const { data, refetch, isLoading } = usePendingReq("withdraw_money");
  const axiossequre = useAxiosSequre();
  const handleButton = (id, sender, rcver, action, amount, method) => {
    axiossequre
      .patch(
        `/pendingreq/${id}?status=${action}&sender=${sender}&rcver=${rcver}&amount=${amount}&method=${method}`
      )
      .then((res) => {
        return refetch();
      })
      .then(() =>
        Swal.fire({
          icon: "success",
          text: `Success`,
        })
      );
  };

  return (
    <div>
      <SectionHeader heading=" Withdraw Money Request" />
      <div className=" my-5  rounded-lg shadow shadow-gray-500 ">
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
                    sx={{ color: "blue", marginLeft: "200px" }}
                  />

                  <h1 className="text-center mt-4 ml-52 font-bold text-[blue] text-4xl">
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
  );
};
