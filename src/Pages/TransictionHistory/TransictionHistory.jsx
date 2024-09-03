import { SectionHeader } from "./../../Components/SectionHeader/SectionHeader";
import { useHistory } from "../../Hooks/useHistory";
import { useAuth } from "../../Hooks/useAuth";
import { Loading } from "../../Components/Loading/Loading";
export const TransictionHistory = () => {
  const { data, isLoading } = useHistory();
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-center font-bold text-2xl py-8  text-white">
        Transition History
      </h1>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-auto shadow-xl shadow-[#190e1c] min-h-60 rounded-xl">
          <table className="table-auto w-full min-w-[600px] ">
            <thead className="bg-[#70147080] ">
              <tr className="text-left text-white font-semibold *:p-2">
                <th> Number</th>
                <th>Amount</th>
                <th>Charge</th>
                <th>Method</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-white space-y-4">
              {data?.map((el) => {
                const method =
                  el.ReciverNumber !== user.number
                    ? el.method
                    : el.method === "send_money"
                    ? "Received Money"
                    : el.method;
                const number =
                  el.ReciverNumber === user.number
                    ? el.senderNumber
                    : el.ReciverNumber;
                return (
                  <tr
                    key={el._id}
                    className="border-b border-blue-gray-600 *:p-2"
                  >
                    <td>{number}</td>
                    <td>{el?.amount}</td>
                    <td>{parseFloat(el.charge.toFixed(2))}</td>
                    <td>{method}</td>

                    <td>date</td>
                    <td>time</td>
                    <td>
                      <span
                        className={`${
                          el.status === "success"
                            ? "text-[#32e632]  py-1 px-2 rounded-md  bg-[#62b56274]"
                            : el.status === "cancel"
                            ? "text-red-500 font-body py-1 px-2 rounded-md  bg-[#df3f2374]"
                            : "text-[#3737ff] font-body py-1 px-2 rounded-md  bg-[#4d5a8f74]"
                        }`}
                      >
                        {el.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {data.length < 1 && (
            <h1 className="flex min-h-60 justify-center text-white items-center">
              No Transition Found
            </h1>
          )}
        </div>
      )}
    </div>
  );
};
