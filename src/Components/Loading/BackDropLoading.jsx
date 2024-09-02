import { Backdrop, CircularProgress, Stack } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

export const BackDropLoading = ({ msz }) => {
  return (
    <div className=" flex flex-col justify-center items-center">
      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: "#1311118e",
          backdropFilter: "blur(6px)",
        })}
        open={true}
      >
        <div className="w-48 mx-auto space-y-6">
          <LinearProgress />
          <LinearProgress />
          <LinearProgress />
          <h1 className="text-center mt-3 font-bold text-white text-2xl">
            {msz}........
          </h1>
        </div>
      </Backdrop>
    </div>
  );
};
