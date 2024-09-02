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
export const AgentAddOrWithdrawMoney = ({ method }) => {
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
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data.method = method;
    data.number = "01684883865";
    data.senderNumber = user?.number;
    // console.log(data);
  };
  return (
    <div>
      <form
        className="flex flex-col justify-center space-y-4 min-h-96 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <FormControl sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            className="mb-5"
            placeholder="Minimum value is 1000"
            {...register("amount", { required: true, min: 1000 })}
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">৳</InputAdornment>}
            label="Amount"
          />
          <input
            placeholder="Minimum value is 1000"
            {...register("amount", { required: true, min: 1000 })}
            className="border border-blue-gray-100 p-3 rounded-md focus:outline-purple-500"
            type="text"
          />
          {errors?.amount?.type === "required" && (
            <span className="text-red-500">This field is required</span>
          )}
          {errors?.amount?.type === "min" && (
            <span className="text-red-500">Give more that 1000 tk</span>
          )}
        </FormControl>

        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">PIN</InputLabel>
          <OutlinedInput
            {...register("pin", { required: true })}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />

          
        </FormControl> */}
        <div className="flex flex-col">
          <label>Amount </label>
          <input
            placeholder="Minimum value is 1000"
            {...register("amount", { required: true, min: 1000 })}
            className="border mt-1 border-blue-gray-100 p-3 rounded-md focus:outline-purple-500"
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
            className="border mt-1 border-blue-gray-100 p-3 rounded-md focus:outline-purple-500"
            type="text"
            label="pin"
          />
          {errors?.pin?.type === "required" && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <button
          className="btn rounded text-center p-2 bg-purple-500 text-white w-56 font-bold"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};
