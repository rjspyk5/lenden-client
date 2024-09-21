import { SectionHeader } from "./../../Components/SectionHeader/SectionHeader";
import { useHistory } from "../../Hooks/useHistory";
import { useAuth } from "../../Hooks/useAuth";
import { Loading } from "../../Components/Loading/Loading";
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
export const TransictionHistory = () => {
  const { data, isLoading } = useHistory();
  const { user } = useAuth();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1c24bd",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
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
    <div>
      <h1 className="font-bold text-black border-b border-blue-300 mb-5 py-4 text-3xl text-center">
        Transition History
      </h1>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <TableContainer
            sx={{ height: "380px", overflow: "auto" }}
            component={Paper}
          >
            <Table aria-label="simple table">
              <TableHead sx={{ position: "sticky", top: "0px" }}>
                <TableRow>
                  {head.map((el, idx) => (
                    <StyledTableCell
                      sx={{ padding: "10px" }}
                      align="center"
                      key={idx}
                    >
                      {el}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  user &&
                  data.map((el) => {
                    return (
                      <TableRow
                        key={el._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        {Object.keys(el).map((value, idx) => {
                          if (el[value] === user.number || value === "status")
                            return;
                          return (
                            value !== "_id" && (
                              <TableCell
                                sx={{ padding: "8px" }}
                                key={idx}
                                align="center"
                              >
                                {el[value] === null ? "test" : el[value]}
                              </TableCell>
                            )
                          );
                        })}
                        <TableCell sx={{ padding: "8px" }} align="center">
                          <span
                            className={`${
                              el.status === "success"
                                ? "text-[green]  py-1 px-2 rounded-md  bg-[#19b51967]"
                                : el.status === "cancel"
                                ? "text-red-500 font-body py-1 px-2 rounded-md  bg-[#ff00004c]"
                                : "text-[#3737ff]   font-body py-1 px-2 rounded-md  bg-[#153ddc48]"
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
  );
};
