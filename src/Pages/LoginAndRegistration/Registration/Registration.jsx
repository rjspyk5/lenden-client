import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import "./Registration.css";
import Swal from "sweetalert2";
import { useAxiosPublic } from "../../../Hooks/useAxiosPublic";
import axios from "axios";
// Create a custom styled Select component using Material-UI's styled API
const CustomSelect = styled(Select)(({ theme }) => ({
  // When the Select is focused, change the border color to black
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "black",
  },
  // Change the text color to black
  "& .MuiSelect-select": {
    color: "black",
    height: "25px",
    minHeight: "10px",
    maxHeight: "25px",
  },
  // When the Select is hovered over, change the border color to black
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "black",
  },
  "& .MuiOutlinedInput-input": {
    height: "40px", // Adjust height here
    padding: "10px", // Adjust padding to ensure vertical alignment
  },
}));

const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
  "&.Mui-focused": {
    color: "black", // Change the label color when focused
  },
}));
export const Registration = () => {
  const { registration, logout } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.accountStatus = "pending";

    try {
      const { data: emailExistanceResult } = await axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${
          import.meta.env.VITE_ABSTRACT_API
        }&email=${data?.email}`
      );

      if (
        emailExistanceResult?.deliverability !== "DELIVERABLE" ||
        !(emailExistanceResult?.quality_score >= 0.8)
      ) {
        return Swal.fire({
          icon: "error",
          text: "This email is not valid for our site.Try with a valid or strong email.",
        });
      }
      const result = await registration(data);
      if (result.data?.insertedId) {
        Swal.fire({
          icon: "success",
          text: "Successfully registered. You may now log in.",
        });
        logout();
        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          text: "You Already Have an Account.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Something went wrong.Please try again.",
      });
    }
  };

  return (
    <div>
      <Card color="transparent" shadow={false}>
        <Typography className="text-center" variant="h4" color="white">
          Sign Up
        </Typography>
        <Typography color="white" className="mt-1 text-center font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2">
          <div className="mb-1 flex flex-col gap-6">
            <div className="flex gap-5 flex-col md:flex-row">
              <div className="md:w-1/2">
                <Typography variant="h6" color="white">
                  Your Name <span className="text-red-500">*</span>
                </Typography>
                <Input
                  {...register("name", { required: true })}
                  size="lg"
                  placeholder="Your Name"
                  className=" !border-t-blue-gray-200  focus:border-blue-gray-200 text-white placeholder:text-gray-600"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.name && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="md:w-1/2">
                <Typography variant="h6" color="white">
                  Your Email
                </Typography>
                <Input
                  {...register("email", {
                    required: false,
                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  })}
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200  focus:border-blue-gray-200 text-white placeholder:text-gray-600"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />

                {errors.email?.type === "pattern" && (
                  <span className="text-red-500">Enter a valid email </span>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <Typography variant="h6" color="white">
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
                  className=" !border-t-blue-gray-200  focus:border-blue-gray-200 text-white placeholder:text-gray-600"
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
                <Typography variant="h6" color="white">
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
                    Only six digit number are allowed for password
                  </span>
                )}
              </div>
            </div>

            {/* <div className="md:w-1/2">
              <Typography variant="h6" color="white">
                Select Role <span className="text-red-500">*</span>
              </Typography>
              <select
                className="bg-transparent text-white p-3 border border-white rounded-md w-full"
                name="role"
                id=""
              >
                <option value="user">User</option>
                <option value="agent">Agent</option>
              </select>
            </div> */}

            <div className="md:w-1/2">
              <Typography variant="h6" color="white">
                Select Role <span className="text-red-500">*</span>
              </Typography>
              <Controller
                name="role"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <CustomInputLabel
                      sx={{ color: "white" }}
                      id="demo-simple-select-label"
                    >
                      Role
                    </CustomInputLabel>
                    <CustomSelect
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      {...field}
                      label="Role"
                    >
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="agent">Agent</MenuItem>
                      <MenuItem value="marchent">Marchent</MenuItem>
                    </CustomSelect>
                  </FormControl>
                )}
              />
              {errors.role && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="mt-6 bg-gradient-to-tr from-[#0317fc] to-blue-500 hover:bg-gradient-to-tl"
            fullWidth
          >
            Sign Up
          </Button>
        </form>
      </Card>
    </div>
  );
};
