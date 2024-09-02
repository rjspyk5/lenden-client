import { CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <div className="min-h-96 flex flex-col space-y-4 justify-center items-center">
      <CircularProgress
        disableShrink
        size={40}
        thickness={4}
        sx={{ color: "white" }}
      />
      <h1 className="text-white font-xl font-bold">Loading.....</h1>
    </div>
  );
};
