import { useQuery } from "@tanstack/react-query";
import { useAxiosSequre } from "../../../Hooks/useAxiosSequre";
import CustomizableTable from "../../../Components/Table/CustomizableTable";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";

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
    <>
      <SectionHeader heading="All Users" />

      <CustomizableTable
        data={data}
        loading={isLoading}
        headArray={head}
        action={true}
      />
    </>
  );
};
