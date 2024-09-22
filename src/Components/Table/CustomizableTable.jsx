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
        <TableContainer
          sx={{ height: "380px", overflow: "auto" }}
          component={Paper}
        >
          <Table aria-label="simple table">
            <TableHead sx={{ position: "sticky", top: "0px" }}>
              <TableRow>
                {headArray.map((el, idx) => (
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
                data.map((el) => {
                  return (
                    <TableRow
                      key={el._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {Object.keys(el).map((value, idx) => {
                        return (
                          value !== "_id" && (
                            <TableCell
                              sx={{ padding: "10px" }}
                              key={idx}
                              align="center"
                            >
                              {value === "status" ? (
                                <span
                                  className={`${
                                    el[value] === "success"
                                      ? "text-[green]  py-1 px-2 rounded-md  bg-[#19b51967]"
                                      : el[value] === "cancel"
                                      ? "text-red-500 font-body py-1 px-2 rounded-md  bg-[#ff00004c]"
                                      : "text-[#3737ff]   font-body py-1 px-2 rounded-md  bg-[#153ddc48]"
                                  }`}
                                >
                                  {el[value]}
                                </span>
                              ) : value === ("amount" || "charge") ? (
                                parseFloat(parseFloat(el[value]).toFixed(2))
                              ) : (
                                el[value]
                              )}
                            </TableCell>
                          )
                        );
                      })}

                      {action && (
                        <TableCell sx={{ padding: "7px" }} align="center">
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
