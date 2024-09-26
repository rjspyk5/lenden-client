import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";

const head = ["Receiver Number", "Amount", "Action"];

export default function CustomTable({ method, data, loading, handleButton }) {
  return (
    <div className="relative min-h-[300px] md:min-h-[470px]  rounded-[10px] overflow-hidden">
      {/* Backdrop Blur */}
      <div className="absolute inset-0 backdrop-blur-2xl bg-[#7d7d7d50]" />

      <TableContainer
        component={Paper}
        sx={{
          position: "relative",
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {head.map((el, idx) => (
                <TableCell
                  align={idx === 0 ? "left" : "center"}
                  key={idx}
                  sx={{
                    padding: { xs: "7px", md: "12px" },
                    border: "0px",
                    backgroundColor: "#1c24bd",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {el}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((el) => (
                <TableRow key={el._id}>
                  <TableCell
                    sx={{ padding: { xs: "7px", md: "12px" }, color: "white" }}
                    component="th"
                    scope="row"
                  >
                    {el?.ReciverNumber}
                  </TableCell>
                  <TableCell
                    sx={{ padding: { xs: "7px", md: "12px" }, color: "white" }}
                    align="center"
                  >
                    {el?.amount}
                  </TableCell>
                  <TableCell
                    sx={{ padding: { xs: "7px", md: "12px" } }}
                    align="center"
                  >
                    <span className="md:space-x-2 space-x-1 space-y-1">
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
                        Accept
                      </button>
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
                    </span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data?.length < 1 && (
        <h1 className="text-center text-gray-700 font-bold flex justify-center items-center min-h-52 text-lg">
          You haven't any {method} req
        </h1>
      )}
    </div>
  );
}
