import { Card, Input, Button, Typography } from "@material-tailwind/react";

import { useForm } from "react-hook-form";
import { useAxiosPublic } from "../../../Hooks/useAxiosPublic";
import { useAuth } from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Registration = () => {
  const { registration, logout } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.accountStatus = "pending";
    const result = await registration(data);
    if (result.data?.insertedId) {
      alert("succssfully Registration complete now you may have login");
      logout();
      navigate("/");
    } else {
      alert("already have and account");
    }
  };
  return (
    <div>
      <Card color="transparent" shadow={false}>
        <Typography className="text-center" variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 text-center font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2">
          <div className="mb-1 flex flex-col gap-6">
            <div className="flex gap-5 flex-col md:flex-row">
              <div className="md:w-1/2">
                <Typography variant="h6" color="blue-gray">
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
              </div>
              <div className="md:w-1/2">
                <Typography variant="h6" color="blue-gray">
                  Your Email <span className="text-red-500">*</span>
                </Typography>
                <Input
                  {...register("email", {
                    required: true,
                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  })}
                  size="lg"
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
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                {" "}
                <Typography variant="h6" color="blue-gray">
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
              </div>
              <div className="md:w-1/2">
                {" "}
                <Typography variant="h6" color="blue-gray">
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
            </div>
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            sign up
          </Button>
        </form>
      </Card>
    </div>
  );
};
