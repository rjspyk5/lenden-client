import { useQuery } from "@tanstack/react-query";
import { useAxiosSequre } from "../../../Hooks/useAxiosSequre";
import CustomizableTable from "../../../Components/Table/CustomizableTable";

export const AllUser = () => {
  const axiosSequre = useAxiosSequre();
  const head = [
    "Name",
    "Number",
    "Email",
    "Role",
    "Balance",
    "Account Status",
    "Action",
  ];
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["allusers"],
    queryFn: async () => {
      const result = await axiosSequre.get("/users");
      return result.data;
    },
  });

  return (
    <div>
      <h1 className="font-bold text-black border-b border-blue-300 mb-5 py-4 text-3xl text-center">
        All User
      </h1>

      <CustomizableTable
        data={data}
        loading={isLoading}
        headArray={head}
        action={true}
      />
    </div>
  );
};
