import { SectionHeader } from "./../../Components/SectionHeader/SectionHeader";
import { useHistory } from "../../Hooks/useHistory";
import { useAuth } from "../../Hooks/useAuth";
export const TransictionHistory = () => {
  const { data, isLoading } = useHistory();
  const { user } = useAuth();
  return (
    <div>
      <SectionHeader heading="Transition History" />
      {isLoading ? (
        <h1>Loading..............</h1>
      ) : (
        <div className="overflow-auto">
          <table className="table-auto w-full min-w-[600px] ">
            <thead>
              <tr className="text-left text-white font-bold">
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
                    <td>{el.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
