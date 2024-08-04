import { Input, Typography } from "@material-tailwind/react";

export const SendMoneyFrom = () => {
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
          size="lg"
          placeholder="Enter your email or number"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>
    </div>
  );
};
