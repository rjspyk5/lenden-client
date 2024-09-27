import React from "react";
import { SendOrCashout } from "../../Components/SendOrCashout/SendOrCashout";

export const Payment = () => {
  return (
    <div>
      {" "}
      <SendOrCashout methodparam="payment" />
    </div>
  );
};
