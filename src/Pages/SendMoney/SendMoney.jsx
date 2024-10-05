import { Fade } from "react-awesome-reveal";
import { SendOrCashout } from "../../Components/SendOrCashout/SendOrCashout";

export const SendMoney = () => {
  return (
    <div>
      <Fade>
        <SendOrCashout methodparam="send_money" />
      </Fade>
    </div>
  );
};
