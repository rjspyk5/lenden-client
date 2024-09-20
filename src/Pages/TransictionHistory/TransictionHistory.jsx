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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {head.map((el, idx) => (
                    <StyledTableCell align="center" key={idx}>
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
                          console.log(el[value]);
                          if (el[value] === user.number || value === "status")
                            return;
                          return (
                            value !== "_id" && (
                              <TableCell key={idx} align="center">
                                {el[value] === null ? "test" : el[value]}
                              </TableCell>
                            )
                          );
                        })}
                        <TableCell align="center">
                          <span
                            className={`${
                              el.status === "success"
                                ? "text-[#32e632]  py-2 px-3 rounded-md  bg-[#62b56274]"
                                : el.status === "cancel"
                                ? "text-red-500 font-body py-2 px-3 rounded-md  bg-[#df3f2374]"
                                : "text-[#3737ff] font-body py-2 px-3 rounded-md  bg-[#4d5a8f74]"
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
