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
    data.number = "01777777777";
    data.senderNumber = user?.number;
    console.log(data);
  };
  return (
    <div>
      <form
        className="flex flex-col justify-center min-h-96 items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            className="mb-5"
            placeholder="Minimum value is 1000"
            {...register("amount", { required: true, min: 1000 })}
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">৳</InputAdornment>}
            label="Amount"
          />

          {errors?.amount?.type === "required" && (
            <span className="text-red-500">This field is required</span>
          )}
          {errors?.amount?.type === "min" && (
            <span className="text-red-500">Give more that 1000 tk</span>
          )}

          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">PIN</InputLabel>
            <OutlinedInput
              {...register("pin", { required: true, min: 1000 })}
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
            {errors?.pin?.type === "required" && (
              <span className="text-red-500">This field is required</span>
            )}
            {errors?.amount?.type === "min" && (
              <span className="text-red-500">Give more that 1000 tk</span>
            )}
          </FormControl>
          <Button type="submit" variant="contained" endIcon={"send"}>
            Send
          </Button>
        </FormControl>
      </form>
    </div>
  );
};
