import { OptionCard } from "../../Components/OptionCard/OptionCard";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-16">
        <OptionCard name="Send Money" link="/sendmoney" />
        <OptionCard name="Cash Out" link="/cashout" />
        <OptionCard name="Cash In" link="/cashin" />
        <OptionCard name="Savings" link="/savings" />
        <OptionCard name="Loan" link="/loan" />
        <OptionCard name="Transcition History" link="/transictionhistory" />
      </div>
    </div>
  );
};
