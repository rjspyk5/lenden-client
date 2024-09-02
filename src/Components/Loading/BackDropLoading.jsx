import { Backdrop, CircularProgress } from "@mui/material";

export const BackDropLoading = () => {
  return (
    <div className="min-h-96 flex justify-center items-center">
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
