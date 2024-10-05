import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material";

export default function CustomizableTable({
  data,
  loading,
  headArray,
  action,
  handleAction,
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
                              {value === "accountStatus" ? (
                                <span
                                  className={`${
                                    el[value] === "approved"
                                      ? "  py-1 px-2 rounded-md  bg-[#6dff6d67] text-[#3efe3e]"
                                      : el[value] === "reject"
                                      ? " font-body py-1 px-2 rounded-md  bg-[#ff00004c] text-red-500"
                                      : "font-body py-1 px-2 rounded-md  bg-[#254ef46a] text-[#4975f9]"
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
                            <button
                              onClick={() =>
                                handleAction(
                                  el.accountStatus === "pending"
                                    ? "approved"
                                    : el.accountStatus == "approved"
                                    ? "deactive"
                                    : "approved",
                                  el._id
                                )
                              }
                              className={`btn ${
                                el.accountStatus === "pending"
                                  ? "bg-green-500 hover:bg-green-600 hover:shadow-green-300"
                                  : el.accountStatus == "approved"
                                  ? "bg-[#2b050b] hover:bg-[#481119] hover:shadow-[#2b050b]"
                                  : "bg-green-500 hover:bg-green-600 hover:shadow-green-300"
                              } text-white rounded-md px-2 py-1   hover:shadow-lg`}
                            >
                              {el.accountStatus === "pending"
                                ? "Approve"
                                : el.accountStatus == "approved"
                                ? "Deactive"
                                : "Reactive"}
                            </button>
                            {el.accountStatus !== "delete" && (
                              <button
                                onClick={() =>
                                  handleAction(
                                    el.accountStatus === "pending"
                                      ? "reject"
                                      : "delete",
                                    el._id
                                  )
                                }
                                className="btn bg-red-500 text-white rounded-md px-2 py-1 hover:bg-red-600 hover:shadow-red-300 hover:shadow-lg"
                              >
                                {el.accountStatus === "pending"
                                  ? "Reject"
                                  : "Delete"}
                              </button>
                            )}
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
