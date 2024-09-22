import { Input, Typography } from "@material-tailwind/react";
import { Button } from "@mui/material";

export const SendMoneyFrom = ({ number, error, name }) => {
  return (
    // <div className=" ">
    //   <h1 className="text-center text-white font-bold text-2xl">{name}</h1>
    //   <div className="mb-1 flex flex-col gap-6 text-white">
    //     <h1 className="-mb-3">
    //       Number <span className="text-red-500">*</span>
    //     </h1>
    //     <input
    //       name="number"
    //       ref={number}
    //       size="lg"
    //       placeholder="Enter number"
    //       className="py-2 px-3 rounded-md bg-transparent border border-white text-white placeholder:text-gray-600"
    //     />

    //     {error && <h1 className="text-red-500">{error}</h1>}
    //   </div>
    // </div>
    <div className="p-5">
      <div className="mb-1 ">
        <h1 className="mb-9 text-white  text-center text-3xl">Enter Number</h1>
        <div className="flex justify-center items-center ">
          <div className="flex flex-col items-cener justify-center w-72">
            <input
              name="number"
              ref={number}
              size="lg"
              placeholder="Enter number"
              className="py-2 px-3 rounded-md bg-transparent border border-gray-500 focus:outline-none focus:border-white text-white placeholder:text-gray-500"
            />
            {error && <h1 className="text-red-500 mt-4">{error}</h1>}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SendMoneyFromStepTwo = ({ amount, reciverDetails }) => {
  return (
    <div className="space-y-5">
      <h1 className="mb-9 text-white  text-center text-3xl">Enter Amount</h1>
      <div className="mb-1 flex justify-between ">
        <div>
          {" "}
          <h1 className="-mb-3 flex justify-between text-white font-bold">
            Receiver Name
          </h1>
        </div>
        <div className="w-4/12">
          {" "}
          <h1 className="text-white opacity-50">{reciverDetails?.name}</h1>
        </div>
      </div>
      <div className="mb-1 flex justify-between ">
        <div>
          {" "}
          <h1 className="-mb-3  flex justify-between text-white font-bold">
            Receiver Number
          </h1>
        </div>
        <div className="w-4/12">
          {" "}
          <h1 className="text-white opacity-50">{reciverDetails?.number}</h1>
        </div>
      </div>
      <div className="mb-1 flex justify-between ">
        <div>
          {" "}
          <h1 className="-mb-3  flex justify-between text-white font-bold">
            Amount
          </h1>
        </div>
        <div className="w-4/12">
          {" "}
          <input
            ref={amount}
            name="amount"
            placeholder="amount"
            className="px-2 py-1 border rounded-md outline-none border-gray-500 focus:border-white w-24 text-white bg-transparent placeholder:text-gray-600"
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

export const SendMoneyFromStepThree = ({ handleConfrim, error, method }) => {
  return (
    <div>
      <div className="mb-1 ">
        <form className="" onSubmit={handleConfrim} action="">
          <h1 className="mb-9 text-white  text-center text-3xl">
            Enter Your Pin
          </h1>
          <div className="flex justify-center items-center ">
            <div className="flex flex-col items-cener justify-center w-72">
              <input
                name="pin"
                placeholder="
******"
                className="py-2 px-3  rounded-md bg-transparent border border-white text-white placeholder:text-gray-600"
              />
              <button
                type="submit"
                className="mt-7 p-2 rounded-md text-white bg-gradient-to-r from-blue-800 to-blue-500 "
              >
                {method === "send_money"
                  ? "Send Money"
                  : method === "cash_in"
                  ? "Cash In"
                  : "Cash Out"}
              </button>
            </div>
          </div>

          {error && <h1 className="text-red-500">{error}</h1>}
        </form>
      </div>
    </div>
  );
};
