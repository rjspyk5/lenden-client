import React from "react";
import CustomTable from "../../../Components/Table/CustomTable";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";

export const CashInReq = () => {
  return (
    <div className="m-10 rounded-lg shadow-lg shadow-gray-500 ">
      <SectionHeader heading="Cash In Request" />
      <CustomTable method="Cash In" />
    </div>
  );
};
