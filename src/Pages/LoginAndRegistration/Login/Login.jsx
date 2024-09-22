import { useEffect } from "react";
import { useAuth } from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useAxiosPublic } from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

export const Login = () => {
  const axiosPublic = useAxiosPublic();
  const { user, login, setloading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      user.role === "user"
        ? navigate("/")
        : user.role === "agent"
        ? navigate("/agent")
        : navigate("/admin");
    }
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
        login(result.data?.data);
        Swal.fire({
          icon: "success",
          text: "Successfully Login",
        });
      } else {
        Swal.fire({
          icon: "error",
          text: result.data?.result,
        });
      }
    } catch (error) {
      alert("something went wrong");
    }
  };
  return (
    <div>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" className="text-center" color="white">
          Sign In
        </Typography>
        <Typography color="white" className="mt-1 text-center font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 ">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="white" className="-mb-3">
              Email or Number <span className="text-red-500">*</span>
            </Typography>
            <Input
              {...register("emailOrNumber", { required: true })}
              size="lg"
              placeholder="Enter your email or number"
              className=" !border-t-blue-gray-200  focus:border-blue-gray-200 text-white placeholder:text-gray-600"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.emailOrNumber && (
              <span className="text-red-500">This field is required</span>
            )}

            <Typography variant="h6" color="white" className="-mb-3">
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
              className=" !border-t-blue-gray-200  focus:border-blue-gray-200 text-white placeholder:text-gray-600"
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
                Password cannot be less than or more than six
              </span>
            )}
          </div>
          <Button
            type="submit"
            className="mt-6 bg-gradient-to-tr from-[#0317fc] to-blue-500 hover:bg-gradient-to-tl"
            fullWidth
          >
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};
