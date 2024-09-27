import { SectionHeader } from "./../../Components/SectionHeader/SectionHeader";
import { useHistory } from "../../Hooks/useHistory";
import { useAuth } from "../../Hooks/useAuth";
import { Loading } from "../../Components/Loading/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Fade } from "react-awesome-reveal";
export const TransictionHistory = () => {
  const { data, isLoading } = useHistory();
  const { user } = useAuth();

  const head = [
    " Number",
    "Amount",
    "Charge",
    "Method",
    "Date",
    "Time",
    "Status",
  ];
  return (
    <Fade>
      <div>
        <SectionHeader heading="Transition History" />
        {isLoading ? (
          <Loading />
        ) : (
          <div className="relative min-h-[300px] md:min-h-[420px]  rounded-[10px] overflow-hidden">
            <div className="absolute inset-0 backdrop-blur-2xl bg-[#7d7d7d50]" />
            <TableContainer
              sx={{
                position: "relative",
                backgroundColor: "transparent",
                boxShadow: "none",
                height: "420px",
              }}
            >
              <Table aria-label="simple table">
                <TableHead sx={{ position: "sticky", top: "0px" }}>
                  <TableRow>
                    {head.map((el, idx) => (
                      <TableCell
                        sx={{
                          padding: { xs: "7px", md: "12px" },
                          border: "0px",
                          backgroundColor: "#1c24bd",
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                        align="center"
                        key={idx}
                      >
                        {el}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data &&
                    user &&
                    data.map((el) => {
                      return (
                        <TableRow key={el._id}>
                          {Object.keys(el).map((value, idx) => {
                            if (el[value] === user.number || value === "status")
                              return;
                            return (
                              value !== "_id" && (
                                <TableCell
                                  sx={{
                                    padding: { xs: "7px", md: "12px" },
                                    color: "white",
                                  }}
                                  key={idx}
                                  align="center"
                                >
                                  {el[value] === null ? "test" : el[value]}
                                </TableCell>
                              )
                            );
                          })}
                          <TableCell
                            sx={{
                              padding: { xs: "7px", md: "12px" },
                              color: "white",
                            }}
                            align="center"
                          >
                            <span
                              className={`${
                                el.status === "success"
                                  ? "  p-2 rounded-md  bg-[#6dff6d67] text-[#3efe3e]"
                                  : el.status === "cancel"
                                  ? " font-body p-2 rounded-md  bg-[#ff00004c] text-red-500"
                                  : "  font-body p-2 rounded-md  bg-[#254ef46a] text-[#4975f9]"
                              }`}
                            >
                              {el.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </Fade>
  );
};
