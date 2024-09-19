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

export default function CustomizableTable({
  data,
  loading,
  headArray,
  action,
}) {
  return (
    <>
      <div className="m-5">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {headArray.map((el, idx) => (
                  <StyledTableCell align="center" key={idx}>
                    {el}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((el) => {
                  return (
                    <TableRow
                      key={el._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {Object.keys(el).map((value, idx) => {
                        return (
                          value !== "_id" && (
                            <TableCell key={idx} align="center">
                              {el[value]}
                            </TableCell>
                          )
                        );
                      })}

                      {action && (
                        <TableCell align="center">
                          <button className="btn bg-green-500 text-white rounded-md px-2 py-1 hover:bg-green-600 hover:shadow-green-300 hover:shadow-lg">
                            {el.accountStatus === "pending"
                              ? "Active"
                              : el.accountStatus == "active"
                              ? "Hold"
                              : "Reactive"}
                          </button>
                          <button className="btn bg-red-500 text-white rounded-md px-2 py-1 hover:bg-red-600 hover:shadow-red-300 hover:shadow-lg">
                            {el.accountStatus === "pending"
                              ? "Cancel"
                              : "Delete"}
                          </button>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
