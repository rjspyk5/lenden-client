import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Hooks/useAuth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useAxiosSequre } from "../../Hooks/useAxiosSequre";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export const AgentAddOrWithdrawMoney = ({ method }) => {
  const axiosSequre = useAxiosSequre();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    data.method = method;
    data.number = "01684883865";
    data.senderNumber = user?.number;

    try {
      const result = await axiosSequre.post("/transactions", data);
      if (result) {
        Swal.fire({
          icon: "success",
          text: `Req send successfully`,
        });
        navigate("/agent/history");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <form
        className="flex flex-col justify-center  space-y-4 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="shadow-2xl shadow-[#0000ff88] p-9 rounded-md bg-white *:w-full lg:w-80 ">
          <div className="flex flex-col ">
            <label>Amount </label>
            <input
              placeholder="Minimum value is 1000"
              {...register("amount", { required: true, min: 1000 })}
              className="border my-2 border-blue-gray-100 p-3 rounded-md focus:outline-[blue]"
              type="text"
            />
            {errors?.amount?.type === "required" && (
              <span className="text-red-500">This field is required</span>
            )}
            {errors?.amount?.type === "min" && (
              <span className="text-red-500">Give more that 1000 tk</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="pin">Pin </label>
            <input
              placeholder="******"
              {...register("pin", { required: true })}
              className="border mt-2 mb-5 border-blue-gray-100 p-3 rounded-md focus:outline-[blue]"
              type="text"
              label="pin"
            />
            {errors?.pin?.type === "required" && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <button
            className="btn rounded text-center p-2 bg-gradient-to-br from-[blue] to-[#00005e] hover:bg-gradient-to-tl  text-white w-56 font-bold"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
