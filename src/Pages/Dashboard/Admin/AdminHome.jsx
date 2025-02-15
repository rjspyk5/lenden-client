import React from "react";
import {
  FaMoneyBillWave,
  FaUsers,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import TransitionChart from "../../../Components/Charts/TransitionChart";
import ExpenseProfit from "../../../Components/Charts/ExpenseProfit";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSequre } from "./../../../Hooks/useAxiosSequre";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../Components/Loading/Loading";

export const AdminHome = () => {
  const navigate = useNavigate();
  const axiosSequre = useAxiosSequre();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: async () => {
      const { data } = await axiosSequre.get("/admindashboard");

      return data;
    },
  });

  const {
    totalWithdraw = 0,
    totalDeposit = 0,
    income = 0,
    expense = 0,
    profit = 0,

    totalUsers = 0,

    pendingUsers = 0,
    approvedUsers = 0,
    topBalances = [],
    transactions = [],
    transitionGraph = {},
  } = data || {};

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1>Error fetching data</h1>
      </div>
    );
  }

  return (
    <Fade>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Section - Main Dashboard Cards */}
        <div className="lg:col-span-9 space-y-7">
          {/* Financial and User Data Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* First Card - Financial Summary */}
            <div className="from-[#5f5f5f7b] bg-gradient-to-br to-[#1d11c4da] backdrop-blur-md shadow-sm rounded-lg p-5 flex flex-col justify-between">
              <div>
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
                      <td className="py-2 text-white">
                        {Number(income).toFixed(2)}Tk
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium text-white">
                        Total Expense:
                      </td>
                      <td className="py-2 text-white">
                        {Number(expense).toFixed(2)}Tk
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-white">
                        Net Profit:
                      </td>
                      <td className="py-2 text-white">
                        {Number(profit).toFixed(2)}Tk
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Second Card - Deposits & Withdrawals */}
            <div className="from-[#5f5f5f7b] bg-gradient-to-br  to-[#fafafaef] backdrop-blur-md shadow-sm rounded-lg p-5 flex flex-col justify-between">
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
                    <td className="py-2 text-white">
                      ${Number(totalDeposit).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-white">
                      Total Withdraw:
                    </td>
                    <td className="py-2 text-white">
                      ${Number(totalWithdraw).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Third Card - Total Users */}
            <div className="from-[#5f5f5f7b] bg-gradient-to-br to-[#eb920dda] backdrop-blur-md shadow-sm rounded-lg p-5 flex flex-col justify-between">
              <div className="flex items-center mb-4">
                <FaUsers className="text-white mr-3 text-2xl" />
                <h2 className="text-lg font-semibold text-white">
                  Total Users
                </h2>
              </div>
              <div className="py-2">
                <span className="font-semibold text-white">All Users: </span>
                <span className="font-bold text-white">{totalUsers}</span>
              </div>
              <div className="py-2">
                <span className="font-semibold text-white">Active Users: </span>
                <span className="font-bold text-white">{approvedUsers}</span>
              </div>
              <div className="py-2">
                <span className="font-semibold text-white">
                  Pending Accounts:{" "}
                </span>
                <span className="font-bold text-white">{pendingUsers}</span>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="mt-6">
            <div className="bg-[#63636381] backdrop-blur-3xl rounded-md">
              <TransitionChart graphData={transitionGraph} />
            </div>
          </div>
        </div>

        {/* Right Section - Top Balances and Recent Transactions */}
        <div className="lg:col-span-3 space-y-5">
          {/* Recent Transactions */}
          <div
            onClick={() => navigate("/admin/history")}
            className="bg-gradient-to-br cursor-pointer from-[#5f5f5f7b] to-[#97989736] backdrop-blur-md shadow-sm rounded-lg p-2"
          >
            <h2 className="text-lg font-semibold text-white mb-2 text-center">
              Recent Transactions
            </h2>
            <ul className="space-y-1 text-white lg:max-h-60">
              {transactions?.map((transaction, index) => (
                <li className="text" key={index}>
                  <span className=" text-white">
                    • {transaction.sender || transaction.ReciverNumber}
                  </span>
                  {transaction.method === "withdraw_money"
                    ? " withdraw "
                    : transaction.method === "deposit_money"
                    ? " wants deposit "
                    : transaction.method === "send_money"
                    ? " send to a user "
                    : " cashout "}
                  {Number(transaction.amount).toFixed()} tk
                  <span
                    className={
                      transaction.adminIncome || transaction.charge
                        ? "text-green-400"
                        : "text-blue-400"
                    }
                  >
                    &nbsp; (+
                    {(transaction.adminIncome
                      ? parseFloat(transaction.adminIncome).toFixed(2)
                      : transaction.adminIncome) ||
                      (transaction.charge && transaction.method === "send_money"
                        ? parseFloat(transaction.charge).toFixed(2)
                        : parseFloat(parseInt(transaction.charge) / 2)
                      ).toFixed(2) ||
                      0}
                    )
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* Top Balances */}
          <div
            onClick={() => navigate("/admin/users")}
            className="from-[#5f5f5f7b] to-[#97989736] cursor-pointer  bg-gradient-to-br backdrop-blur-md shadow-sm rounded-lg p-2"
          >
            <h2 className="text-lg font-semibold text-white mb-2 text-center">
              Top Balances
            </h2>
            {/* For small screens, display as cards */}
            <div className=" space-y-3  overflow-y-auto">
              {" "}
              {/* Adjusted height */}
              {topBalances.map((user, index) => (
                <div key={index} className=" p-2  border rounded-lg shadow-md">
                  <div className="flex justify-between items-center ">
                    <span className="text-white font-semibold">Name:</span>
                    <span className="text-white">{user.name}</span>
                  </div>
                  <div className="flex justify-between items-center ">
                    <span className="text-white font-semibold">Mobile:</span>
                    <span className="text-white">{user.number}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Balance:</span>
                    <span className="text-white font-bold">
                      {Number(user.amount).toFixed(1)}Tk
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};
