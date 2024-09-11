import { useQuery } from "@tanstack/react-query";
import { useAxiosSequre } from "../../../Hooks/useAxiosSequre";

export const AllUser = () => {
  const axiosSequre = useAxiosSequre();
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["allusers"],
    queryFn: async () => {
      const result = await axiosSequre.get("/users");
      return result.data;
    },
  });

  return (
    <div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <td>Name</td>
            <td>Number</td>
            <td>Email</td>
            <td>Role</td>
            <td>Balance</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data?.map((el) => {
            return (
              <tr key={el._id}>
                <td>{el?.name}</td>
                <td>{el?.number}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{el?.amount}</td>
                <td>6test</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
