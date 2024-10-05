import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const Loan = () => {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState("");
  const [interestRate, setInterestRate] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [message, setMessage] = useState("");
  const [isAgreed, setIsAgreed] = useState(false); // Agree checkbox state

  // Interest calculation logic based on duration
  useEffect(() => {
    if (duration && amount) {
      let baseRate = 0.05; // Base annual interest rate 5%

      // Adjust interest rate based on duration (example logic)
      if (duration <= 6) {
        baseRate = 0.04; // Lower rate for shorter durations
      } else if (duration <= 12) {
        baseRate = 0.05; // Base rate for medium durations
      } else if (duration <= 24) {
        baseRate = 0.06; // Higher rate for longer durations
      }

      const interest = amount * baseRate * (duration / 12); // simple interest formula
      setInterestRate((baseRate * 100).toFixed(2)); // Update interest rate in percentage
      const total = parseFloat(amount) + interest;
      setTotalAmount(total.toFixed(2)); // Update total amount to be repaid
      setMonthlyPayment((total / duration).toFixed(2)); // Update monthly payment
    }
  }, [amount, duration]);

  const handleSubmit = async () => {
    const loanData = {
      amount,
      reason,
      duration,
      interestRate,
      totalAmount,
      monthlyPayment,
    };

    // try {
    //   const response = await axios.post("/api/loan-request", loanData);
    //   if (response.status === 200) {
    //     setMessage("Loan request sent successfully!");
    //     setAmount("");
    //     setReason("");
    //     setDuration("");
    //     setInterestRate(0);
    //     setTotalAmount(0);
    //     setMonthlyPayment(0);
    //   } else {
    //     setMessage("Failed to send loan request.");
    //   }
    // } catch (error) {
    //   console.error("Error sending loan request:", error);
    //   setMessage("An error occurred while sending the loan request.");
    // }
  };

  const confirmSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to submit the loan request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmit();
      }
    });
  };

  return (
    <div className="flex flex-col w-auto justify-center md:min-h-[500px] min-h-[400px] items-center">
      <div className="p-10 md:w-[600px] w-auto bg-[#f9f9fb41] border border-gray-300 shadow-2xl backdrop-blur shadow-[#006efffa] rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Send Loan Request
        </h2>
        {message && (
          <p
            className={`mb-4 text-center ${
              message.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={confirmSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Loan Amount */}
            <div>
              <label
                htmlFor="amount"
                className="block text-white font-medium mb-1"
              >
                Loan Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full px-4 bg-transparent placeholder:text-gray-400 text-white py-2 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
                placeholder="Enter loan amount"
              />
            </div>

            {/* Repayment Duration */}
            <div>
              <label
                htmlFor="duration"
                className="block text-white font-medium mb-1"
              >
                Repayment Duration (Months){" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                className="w-full px-4 py-2 border bg-transparent text-white placeholder:text-gray-400 rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
              >
                <option value="" disabled className="text-black">
                  Select duration
                </option>
                <option value="6" className="text-black">
                  6 months
                </option>
                <option value="12" className="text-black">
                  12 months
                </option>
                <option value="18" className="text-black">
                  18 months
                </option>
                <option value="24" className="text-black">
                  24 months
                </option>
              </select>
            </div>
          </div>

          {/* Reason for Loan */}
          <div>
            <label
              htmlFor="reason"
              className="block text-white font-medium mb-1"
            >
              Reason for Loan <span className="text-red-500">*</span>
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full px-4 py-2 border bg-transparent placeholder:text-gray-400 text-white rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
              placeholder="Why do you need the loan?"
              rows="3"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Interest Rate */}
            <div>
              <label className="block text-white font-medium mb-1">
                Interest Rate (%) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={interestRate}
                readOnly
                disabled
                className="w-full px-4 py-2 border bg-gray-700 text-gray-300 rounded-md focus:outline-none"
              />
            </div>

            {/* Total Amount to Repay */}
            <div>
              <label className="block text-white font-medium mb-1">
                Total Amount to Repay <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={totalAmount}
                readOnly
                disabled
                className="w-full px-4 py-2 border bg-gray-700 text-gray-300 rounded-md focus:outline-none"
              />
            </div>
          </div>

          {/* Monthly Payment */}
          <div>
            <label className="block text-white font-medium mb-1">
              Monthly Payment <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={monthlyPayment}
              readOnly
              disabled
              className="w-full px-4 py-2 border bg-gray-700 text-gray-300 rounded-md focus:outline-none"
            />
          </div>

          {/* Agree Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agree"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="agree" className="text-white">
              I agree to the terms and conditions{" "}
              <span className="text-red-500">*</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isAgreed} // Disable button if not agreed
            className={`w-full ${
              isAgreed ? "bg-blue-800 hover:bg-indigo-600" : "bg-gray-400"
            } text-white font-medium py-2 rounded-md focus:outline-none focus:ring-4 focus:ring-indigo-300`}
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};
