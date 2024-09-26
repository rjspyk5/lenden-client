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
      <div className="rounded-lg shadow shadow-gray-500 min-h-[300px] md:min-h-[470px] relative overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-2xl bg-[#7d7d7d50]" />
        <TableContainer
          sx={{
            position: "relative",
            backgroundColor: "transparent",
            boxShadow: "none",
            height: "470px",
          }}
        >
          <Table aria-label="simple table">
            <TableHead sx={{ position: "sticky", top: "0px" }}>
              <TableRow>
                {headArray.map((el, idx) => (
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
                data.map((el) => {
                  return (
                    <TableRow key={el._id}>
                      {Object.keys(el).map((value, idx) => {
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
                              {value === "status" ? (
                                <span
                                  className={`${
                                    el[value] === "success"
                                      ? "text-[green]  py-1 px-2 rounded-md  bg-[#19b51967]"
                                      : el[value] === "cancel"
                                      ? "text-red-500 font-body py-1 px-2 rounded-md  bg-[#ff00004c]"
                                      : "text-[#3737ff]   font-body py-1 px-2 rounded-md  bg-[#153ddc48]"
                                  } `}
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
                        <TableCell
                          sx={{ padding: { xs: "7px", md: "12px" } }}
                          align="center"
                        >
                          <span className="space-x-2 space-y-1">
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
                          </span>
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
