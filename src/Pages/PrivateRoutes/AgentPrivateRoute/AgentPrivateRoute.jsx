import { useAuth } from "../../../Hooks/useAuth";
import { useUser } from "../../../Hooks/useUser";
import { Navigate } from "react-router-dom";

export const AgentPrivateRoute = ({ children }) => {
  const { userRole, isLoading, isPending } = useUser();
  const { logout } = useAuth();
  if (isLoading || isPending) {
    return <h1>Loding.............</h1>;
  }
  if (!isLoading && userRole?.role === "agent") {
    return children;
  }
  logout();
  return <Navigate to="/login" />;
};
