import React from "react";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";
import CustomTable from "../../../Components/Table/CustomTable";

export const AgentTransictionHistory = () => {
  return (
    <div className="m-10 rounded-lg shadow-lg shadow-gray-500 ">
      <SectionHeader heading="Transciton History" />
      <CustomTable method="transcition" />
    </div>
  );
};
