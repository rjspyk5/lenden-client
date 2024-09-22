import { OptionCard } from "../../Components/OptionCard/OptionCard";
import { useNavigate } from "react-router-dom";
import cashin from "../../assets/images/cashin.png";
import cashout from "../../assets/images/cashout.png";
import sendmoney from "../../assets/images/send.png";
import savings from "../../assets/images/Savings.png";
import loan from "../../assets/images/loan.png";
import history from "../../assets/images/history.png";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-16">
        <OptionCard name="Send Money" link="/sendmoney" logo={sendmoney} />
        <OptionCard name="Cash Out" link="/cashout" logo={cashout} />
        <OptionCard name="Cash In" link="/cashin" logo={cashin} />
        {/* <OptionCard name="Savings" link="/savings" logo={savings} /> */}
        <OptionCard name="Loan" link="/loan" logo={loan} />
        <OptionCard name="Payment" link="/payment" logo={history} />
        <OptionCard name="Transition History" link="/history" logo={history} />
      </div>
    </div>
  );
};
