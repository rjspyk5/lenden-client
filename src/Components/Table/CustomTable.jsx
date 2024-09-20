import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1c24bd",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const head = ["Receiver Number", "Amount", "Action"];

export default function CustomTable({ method, data, loading, handleButton }) {
  return (
    <>
      <div className="min-h-[370px] ">
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {head.map((el, idx) => (
                  <StyledTableCell
                    align={idx === 0 ? "left" : "center"}
                    key={idx}
                    sx={{ padding: "12px" }}
                  >
                    {el}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((el) => (
                  <TableRow
                    key={el._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{ padding: "12px" }}
                      component="th"
                      scope="row"
                    >
                      {el?.ReciverNumber}
                    </TableCell>
                    <TableCell sx={{ padding: "12px" }} align="center">
                      {el.amount}
                    </TableCell>
                    <TableCell sx={{ padding: "12px" }} align="center">
                      {" "}
                      <button
                        onClick={() =>
                          handleButton(
                            el._id,
                            el.senderNumber,
                            el.ReciverNumber,
                            "success",
                            el.amount
                          )
                        }
                        className="btn bg-green-500 text-white rounded-md px-2 py-1 hover:bg-green-600 hover:shadow-green-300 hover:shadow-lg"
                      >
                        Approve
                      </button>{" "}
                      <button
                        onClick={() =>
                          handleButton(
                            el._id,
                            el.senderNumber,
                            el.ReciverNumber,
                            "cancel",
                            0
                          )
                        }
                        className="btn bg-red-500 text-white rounded-md px-2 py-1 hover:bg-red-600 hover:shadow-red-300 hover:shadow-lg"
                      >
                        Cancel
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {data?.length < 1 && (
          <h1 className="text-center text-gray-700 font-bold flex justify-center items-center min-h-52 text-lg">
            You havent any {method} req
          </h1>
        )}
      </div>
    </>
  );
}
