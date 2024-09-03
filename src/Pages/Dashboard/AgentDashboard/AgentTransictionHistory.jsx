import { useQuery } from "@tanstack/react-query";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";
import { useAxiosSequre } from "../../../Hooks/useAxiosSequre";
import { useAuth } from "../../../Hooks/useAuth";
import { Loading } from "../../../Components/Loading/Loading";

export const AgentTransictionHistory = () => {
  const axiossequre = useAxiosSequre();
  const { user } = useAuth();
  const { data, isLoading, refetch } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const result = await axiossequre.get(
        `http://localhost:5000/history?number=${user?.number}`
      );
      return result.data;
    },
  });

  return (
    <div className="m-10 rounded-lg shadow-lg shadow-gray-500 ">
      <SectionHeader heading="Transciton History" />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-auto shadow-xl shadow-[#190e1c] min-h-60 rounded-xl">
          <table className="table-auto w-full min-w-[600px] ">
            <thead className="bg-[#211128] ">
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
            <tbody className=" space-y-4">
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
                            ? "text-[#1c7e1c]  py-1 px-2 rounded-md  bg-[#27f82765]"
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
