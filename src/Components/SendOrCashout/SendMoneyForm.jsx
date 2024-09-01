import { Input, Typography } from "@material-tailwind/react";
import { Button } from "@mui/material";

export const SendMoneyFrom = ({ number, error, name }) => {
  return (
    <div className=" ">
      <h1 className="text-center text-white font-bold text-2xl">{name}</h1>
      <div className="mb-1 flex flex-col gap-6 text-white">
        <h1 className="-mb-3">
          Number <span className="text-red-500">*</span>
        </h1>
        <Input
          name="number"
          ref={number}
          size="lg"
          placeholder="Enter your email or number"
          className=" !border-t-gray focus:!border-t-gray  "
        />
        {/* <input
        
          placeholder="Enter your email or number"
          className="bg-transparent p-2 border-white border rounded-md"
          type="text"
        /> */}
        {error && <h1 className="text-red-500">{error}</h1>}
      </div>
    </div>
  );
};

export const SendMoneyFromStepTwo = ({ amount, reciverDetails }) => {
  return (
    <div className="space-y-5">
      <div className="mb-1 flex justify-between ">
        <div>
          {" "}
          <h1 className="-mb-3 flex justify-between text-white font-bold">
            Reciver Name
          </h1>
        </div>
        <div className="w-6/12">
          {" "}
          <h1 className="text-white opacity-50">{reciverDetails?.name}</h1>
        </div>
      </div>
      <div className="mb-1 flex justify-between ">
        <div>
          {" "}
          <h1 className="-mb-3  flex justify-between text-white font-bold">
            Reciver Number
          </h1>
        </div>
        <div className="w-6/12">
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
        <div className="w-6/12">
          {" "}
          <input
            ref={amount}
            name="amount"
            placeholder="amount"
            className="px-2 py-1 border rounded-sm outline-none w-20"
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

export const SendMoneyFromStepThree = ({ handleConfrim, error }) => {
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
                className="py-2 px-3 rounded-md bg-transparent border border-white text-white placeholder:text-gray-600"
              />
              <button
                type="submit"
                className="mt-6 p-2 rounded-md text-white bg-[#50155b] hover:bg-[#691d76] "
              >
                Send Money
              </button>
            </div>
          </div>

          {error && <h1 className="text-red-500">{error}</h1>}
        </form>
      </div>
    </div>
  );
};
