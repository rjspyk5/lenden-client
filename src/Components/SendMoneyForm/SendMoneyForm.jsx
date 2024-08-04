import { Input, Typography } from "@material-tailwind/react";
import { Button } from "@mui/material";

export const SendMoneyFrom = ({ number, error }) => {
  return (
    <div>
      <Typography variant="h4" className="text-center" color="blue-gray">
        Sign In
      </Typography>
      <Typography color="gray" className="mt-1 text-center font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <div className="mb-1 flex flex-col gap-6">
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Email or Number <span className="text-red-500">*</span>
        </Typography>
        <Input
          name="number"
          ref={number}
          size="lg"
          placeholder="Enter your email or number"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        />
        {error && <h1 className="text-red-500">{error}</h1>}
      </div>
    </div>
  );
};

export const SendMoneyFromStepTwo = ({ amount }) => {
  return (
    <div>
      <div className="mb-1 flex justify-between ">
        <div>
          {" "}
          <Typography
            variant="h6"
            color="blue-gray"
            className="-mb-3 flex justify-between"
          >
            Reciver Name
          </Typography>
        </div>
        <div className="w-6/12">
          {" "}
          <h1>Rakibul Islam</h1>
        </div>
      </div>
      <div className="mb-1 flex justify-between ">
        <div>
          {" "}
          <Typography
            variant="h6"
            color="blue-gray"
            className="-mb-3  flex justify-between"
          >
            Reciver Number
          </Typography>
        </div>
        <div className="w-6/12">
          {" "}
          <h1>01684883865</h1>
        </div>
      </div>
      <div className="mb-1 flex justify-between ">
        <div>
          {" "}
          <Typography
            variant="h6"
            color="blue-gray"
            className="-mb-3  flex justify-between"
          >
            Amount
          </Typography>
        </div>
        <div className="w-6/12">
          {" "}
          <input
            ref={amount}
            name="amount"
            placeholder="amount"
            className="px-2 py-1 border rounded-sm outline-none"
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

export const SendMoneyFromStepThree = ({ error }) => {
  return (
    <div>
      <div className="mb-1 flex flex-col gap-6">
        <form action="">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Pin <span className="text-red-500">*</span>
          </Typography>
          <Input
            name="number"
            size="lg"
            placeholder="Enter your email or number"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          />
          <Button type="submit" className="mt-6" fullWidth>
            Login
          </Button>
          {error && <h1 className="text-red-500">{error}</h1>}
        </form>
      </div>
    </div>
  );
};
