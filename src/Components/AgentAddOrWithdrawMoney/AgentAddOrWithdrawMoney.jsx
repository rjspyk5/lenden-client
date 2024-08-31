import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useForm } from "react-hook-form";
export const AgentAddOrWithdrawMoney = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
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
          <Button type="submit" variant="contained" endIcon={"send"}>
            Send
          </Button>
        </FormControl>
      </form>
    </div>
  );
};
