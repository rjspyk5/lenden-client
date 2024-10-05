import { SendOrCashout } from "../../Components/SendOrCashout/SendOrCashout";
import { Fade } from "react-awesome-reveal";

export const Payment = () => {
  return (
    <div>
      <Fade>
        <SendOrCashout methodparam="payment" />
      </Fade>
    </div>
  );
};
