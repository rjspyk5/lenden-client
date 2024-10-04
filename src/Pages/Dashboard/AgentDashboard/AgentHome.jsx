import {
  FaMoneyBillWave,
  FaArrowUp,
  FaArrowDown,
  FaWallet,
} from "react-icons/fa";
import TransitionChart from "../../../Components/Charts/TransitionChart";
import ExpenseProfit from "../../../Components/Charts/ExpenseProfit";

export const AgentHome = () => {
  return (
    <div className="space-y-12">
      {/* Responsive Grid for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* First Card - Available Balance */}
        <div className="from-[#2d3e501e] bg-gradient-to-br to-[#48C9B0] shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          <div className="flex items-center mb-4">
            <FaWallet className="text-white mr-3 text-2xl" />
            <h2 className="text-lg font-semibold text-white">
              Available Balance
            </h2>
          </div>
          <div className="text-3xl font-bold text-white">$70,000</div>
        </div>

        {/* Second Card - Net Profit */}
        <div className="from-[#1f3a931b] bg-gradient-to-br to-[#3498DB] shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          <div className="flex items-center mb-4">
            <FaMoneyBillWave className="text-white mr-3 text-2xl" />
            <h2 className="text-lg font-semibold text-white">Net Profit</h2>
          </div>
          <div className="text-3xl font-bold text-white">$120,000</div>
        </div>

        {/* Third Card - Total Income */}
        <div className="from-[#27ae5f23] bg-gradient-to-br to-[#2ECC71] shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          <div className="flex items-center mb-4">
            <FaArrowUp className="text-white mr-1 text-2xl" />
            <h2 className="text-lg font-semibold text-white">Total Income</h2>
          </div>
          <div className="text-3xl font-bold text-white">$170,000</div>
        </div>

        {/* Fourth Card - Total Expense */}
        <div className="from-[#e74d3c1b] bg-gradient-to-br to-[#C0392B] shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          <div className="flex items-center mb-4">
            <FaArrowDown className="text-white mr-3 text-2xl" />
            <h2 className="text-lg font-semibold text-white">Total Expense</h2>
          </div>
          <div className="text-3xl font-bold text-white">$50,000</div>
        </div>
      </div>

      {/* Responsive Grid for Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-[#2C3E50] bg-opacity-90 rounded-md p-4 shadow-md">
          <TransitionChart />
        </div>
        <div className="bg-[#2C3E50] bg-opacity-90 rounded-md p-4 shadow-md">
          <ExpenseProfit />
        </div>
      </div>
    </div>
  );
};
