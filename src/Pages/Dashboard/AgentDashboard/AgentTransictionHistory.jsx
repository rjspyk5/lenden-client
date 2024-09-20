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
      const result = await axiossequre.get(`/history?number=${user?.number}`);
      return result.data;
    },
  });

  return (
    <>
      <SectionHeader heading="Transition History" />
      <div className="mx-10 my-5 rounded-lg ">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="overflow-auto shadow shadow-gray-500  h-[370px] rounded">
            <table className="table-auto w-full overflow-x-scroll  ">
              <thead className="bg-[#292ce3]  sticky z-0 top-0">
                <tr className="text-left text-white  font-semibold *:p-3">
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
                      className="border-b border-gray-300 *:px-3 *:py-2"
                    >
                      <td>{number}</td>
                      <td>{el?.amount}</td>
                      <td>{parseFloat(el.charge.toFixed(2))}</td>
                      <td>{method}</td>

                      <td>date date</td>
                      <td>time</td>
                      <td>
                        <span
                          className={`${
                            el.status === "success"
                              ? "text-[#1c7e1c]  py-1 px-2 rounded-md  bg-[#27f82765]"
                              : el.status === "cancel"
                              ? "text-red-500 font-body py-1 px-2 rounded-md  bg-[#df3f2374]"
                              : "text-[#3737ff]   font-body py-1 px-2 rounded-md  bg-[#4d5a8f74]"
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
    </>
  );
};
