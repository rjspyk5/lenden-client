import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material";
import { SectionHeader } from "../SectionHeader/SectionHeader";

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const rows = [
  // createData("Frozen yoghurt", 159, 6.0, 24),
  // createData("Ice cream sandwich", 237, 9.0, 37),
  // createData("Eclair", 262, 16.0, 24),
  // createData("Cupcake", 305, 3.7, 67),
  // createData("Gingerbread", 356, 16.0, 49),
];
const head = ["Sender Name", "Sender Number", "Amount", "Action"];

export default function CustomTable({ method }) {
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
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.calories}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">
                    {" "}
                    <button className="btn bg-green-500 text-white rounded-md px-2 py-1 hover:bg-green-600 hover:shadow-green-300 hover:shadow-lg">
                      Approve
                    </button>{" "}
                    <button className="btn bg-red-500 text-white rounded-md px-2 py-1 hover:bg-red-600 hover:shadow-red-300 hover:shadow-lg">
                      Cancel
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {rows.length < 1 && (
          <h1 className="text-center flex justify-center items-center text-lg  min-h-[200px]">
            You haven't any {method} req
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
