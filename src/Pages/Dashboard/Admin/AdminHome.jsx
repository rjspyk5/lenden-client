import React from "react";
import {
  FaMoneyBillWave,
  FaUsers,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import TransitionChart from "../../../Components/Charts/TransitionChart";
import ExpenseProfit from "../../../Components/Charts/ExpenseProfit";

export const AdminHome = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-9 space-y-8">
        <div className="grid grid-cols-12 gap-6">
          {/* First Card - Financial Summary */}
          <div className="col-span-4 from-[#5f5f5f7b] bg-gradient-to-br to-[#11a9c4da] backdrop-blur-md shadow-sm rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FaMoneyBillWave className="text-white mr-3 text-2xl" />
              <h2 className="text-lg font-semibold text-white">
                Financial Summary
              </h2>
            </div>
            {/* Table for Financial Summary */}
            <table className="w-full text-left text-white">
              <tbody>
                <tr>
                  <td className="py-2 font-medium text-white">
                    Total Revenue:
                  </td>
                  <td className="py-2 text-white">$170,000</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium text-white">
                    Total Expense:
                  </td>
                  <td className="py-2 text-white">$50,000</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-white">Net Profit:</td>
                  <td className="py-2 text-white">$120,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Second Card - Deposits and Withdrawals (Updated to Table Format) */}
          <div className="col-span-4 from-[#5f5f5f7b] bg-gradient-to-br to-[#6b9810ef] backdrop-blur-md shadow-sm rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FaArrowUp className="text-white mr-1 text-2xl" />
              <h2 className="text-lg font-semibold text-white">
                Deposit & Withdraw
              </h2>
            </div>
            {/* Table for Deposits & Withdrawals */}
            <table className="w-full text-left text-white">
              <tbody>
                <tr>
                  <td className="py-2 font-medium text-white">
                    Total Deposit:
                  </td>
                  <td className="py-2 text-white">$150,000</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-white">
                    Total Withdraw:
                  </td>
                  <td className="py-2 text-white">$80,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* User Categories */}
          <div className="text-white col-span-4 from-[#5f5f5f7b] bg-gradient-to-br to-[#c41179da] backdrop-blur-md shadow-sm rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FaUsers className="text-white mr-3 text-2xl" />
              <h2 className="text-lg font-semibold text-white">Total Users</h2>
            </div>
            <div className="py-2">
              <span className="font-semibold">All Users: </span>
              <span className="font-bold">2,350</span>
            </div>
            <div className="py-2">
              <span className="font-semibold">Active Users: </span>
              <span className="font-bold">1,800</span>
            </div>
            <div className="py-2">
              <span className="font-semibold">Pending Accounts: </span>
              <span className="font-bold">150</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-1 bg-[#63636381] backdrop-blur-3xl rounded-md">
            <TransitionChart />
          </div>
          <div className="col-span-1 bg-[#62616181] backdrop-blur-3xl rounded-md">
            <ExpenseProfit />
          </div>
        </div>
      </div>

      <div className="col-span-3">
        <div className=" from-[#5f5f5f7b] to-[#97989736] bg-gradient-to-br backdrop-blur-md shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Top Balances
          </h2>
          <ul className="space-y-2 text-white">
            <li className="text-lg">
              User 1: <span className="font-bold text-white">$50,000</span>
            </li>
            <li className="text-lg">
              User 2: <span className="font-bold text-white">$45,000</span>
            </li>
            <li className="text-lg">
              User 3: <span className="font-bold text-white">$42,500</span>
            </li>
            <li className="text-lg">
              User 4: <span className="font-bold text-white">$40,000</span>
            </li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-[#5f5f5f7b] to-[#97989736] backdrop-blur-md mt-6 shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Recent Transactions
          </h2>
          <ul className="space-y-2 text-white">
            <li className="text-lg">
              <span className="font-bold text-white">User 1</span> sent
              <span className="text-green-400">$500</span>
              <span className="text-gray-400 text-sm">(2 mins ago)</span>
            </li>
            <li className="text-lg">
              <span className="font-bold text-white">User 2</span> received
              <span className="text-red-400">$300</span>
              <span className="text-gray-400 text-sm">(10 mins ago)</span>
            </li>
            <li className="text-lg">
              <span className="font-bold text-white">User 2</span> received
              <span className="text-red-400">$300</span>
              <span className="text-gray-400 text-sm">(10 mins ago)</span>
            </li>
            <li className="text-lg">
              <span className="font-bold text-white">User 2</span> received
              <span className="text-red-400">$300</span>
              <span className="text-gray-400 text-sm">(10 mins ago)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
