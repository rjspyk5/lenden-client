import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

export const AgentAddOrWithdrawMoney = () => {
  return (
    <div>
      <FormControl sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Amount"
        />
      </FormControl>
      <Button variant="contained" endIcon={"send"}>
        Send
      </Button>
    </div>
  );
};
