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
    backgroundColor: "#211128",
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
      <div className="">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {head.map((el, idx) => (
                  <StyledTableCell
                    align={idx === 0 ? "left" : "center"}
                    key={idx}
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
                    <TableCell component="th" scope="row">
                      {el?.ReciverNumber}
                    </TableCell>
                    <TableCell align="center">{el.amount}</TableCell>

                    <TableCell align="center">
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
          <h1 className="text-center flex justify-center items-center text-lg  min-h-96">
            You havent any {method} req
          </h1>
        )}
        {/* <table className="table-fixed w-full">
        <thead>
          <tr>
            {head.map((el, idx) => (
              <th className="border-b border-t" key={idx}>
                {el}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr className="border-b" key={row.name}>
              <td scope="row">{row.name}</td>
              <td align="center">{row.calories}</td>
              <td align="center">{row.fat}</td>
              <td align="center">
                {" "}
                <button className="btn bg-green-500 text-white rounded-md px-2 py-1 hover:bg-green-600 hover:shadow-green-300 hover:shadow-lg">
                  Approve
                </button>{" "}
                <button className="btn bg-red-500 text-white rounded-md px-2 py-1 hover:bg-red-600 hover:shadow-red-300 hover:shadow-lg">
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      </div>
    </>
  );
}
