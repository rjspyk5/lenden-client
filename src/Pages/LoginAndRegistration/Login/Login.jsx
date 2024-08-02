import { useEffect } from "react";
import { useAuth } from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useAxiosPublic } from "../../../Hooks/useAxiosPublic";
export const Login = () => {
  const axiosPublic = useAxiosPublic();
  const { user, login, setloading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/");
  }, [user]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setloading(true);
    try {
      const result = await axiosPublic.post("/login", data);
      if (result.data.result === true) {
        login(result.data?.result?.data);
      } else {
        alert(result.data?.result);
      }
    } catch (error) {
      alert("something went wrong");
    }
  };
  return (
    <div>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" className="text-center" color="blue-gray">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 text-center font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 ">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email or Number <span className="text-red-500">*</span>
            </Typography>
            <Input
              {...register("emailOrNumber", { required: true })}
              size="lg"
              placeholder="Enter your email or number"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.emailOrNumber && (
              <span className="text-red-500">This field is required</span>
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
                Password can't be less than or more than six
              </span>
            )}
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};
