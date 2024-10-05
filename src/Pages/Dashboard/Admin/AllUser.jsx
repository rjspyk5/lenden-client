import { useQuery } from "@tanstack/react-query";
import { useAxiosSequre } from "../../../Hooks/useAxiosSequre";
import CustomizableTable from "../../../Components/Table/CustomizableTable";
import { SectionHeader } from "../../../Components/SectionHeader/SectionHeader";
import Swal from "sweetalert2";

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

  const handleAction = async (status, id) => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085e1",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confrim",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSequre
          .patch(`/user/${id}`, { status })
          .then((res) => refetch())
          .then((res) =>
            Swal.fire({
              title: "Success!",
              text: "Successfully complete your action.",
              icon: "success",
            })
          );
      }
    });
  };
  return (
    <>
      <SectionHeader heading="All Users" />

      <CustomizableTable
        data={data}
        loading={isLoading}
        headArray={head}
        action={true}
        handleAction={handleAction}
      />
    </>
  );
};
