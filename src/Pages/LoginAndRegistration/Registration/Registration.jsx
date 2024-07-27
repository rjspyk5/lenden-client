import { Card, Input, Button, Typography } from "@material-tailwind/react";

import { useForm } from "react-hook-form";
export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name <span className="text-red-500">*</span>
            </Typography>
            <Input
              {...register("name", { required: true })}
              size="lg"
              placeholder="Your Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.name && (
              <span className="text-red-500">This field is required</span>
            )}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email <span className="text-red-500">*</span>
            </Typography>
            <Input
              {...register("email", {
                required: true,
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              })}
              size="lg"
              type="email"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.email?.type === "required" && (
              <span className="text-red-500">This field is required</span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="text-red-500">Enter a valid email </span>
            )}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Number <span className="text-red-500">*</span>
            </Typography>
            <Input
              {...register("number", {
                required: true,
                maxLength: 11,
                minLength: 11,
              })}
              size="lg"
              placeholder="01700000000"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.number?.type === "required" && (
              <span className="text-red-500">This field is required</span>
            )}
            {(errors.number?.type === "maxLength" ||
              errors.number?.type === "minLength") && (
              <span className="text-red-500">
                Enter eleven digit number only
              </span>
            )}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password <span className="text-red-500">*</span>
            </Typography>
            <Input
              {...register("password", {
                required: true,
                maxLength: 6,
                minLength: 6,
              })}
              type="password"
              size="lg"
              placeholder="Enter six digit pin"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.password?.type === "required" && (
              <span className="text-red-500">This field is required</span>
            )}
            {(errors.password?.type === "maxLength" ||
              errors.password?.type === "minLength") && (
              <span className="text-red-500">
                Only six digit number are allowed for password
              </span>
            )}
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            sign up
          </Button>
        </form>
      </Card>
    </div>
  );
};
