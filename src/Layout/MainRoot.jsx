import { useUser } from "../Hooks/useUser";
import { UserRoot } from "./UserRoot";
import { AgentRoot } from "./AgentRoot";
import { AdminRoot } from "./AdminRoot";

export const MainRoot = () => {
  const { userRole } = useUser();

  let stucture;
  userRole?.role === "user"
    ? (stucture = <UserRoot />)
    : userRole?.role === "agent"
    ? (stucture = <AgentRoot />)
    : (stucture = <AdminRoot />);
  return <div>{stucture}</div>;
};
