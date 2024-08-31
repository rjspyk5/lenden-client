import { useAuth } from "../../../Hooks/useAuth";
import { Navigate } from "react-router-dom";

export const AgentPrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { logout } = useAuth();
  if (loading) {
    return <h1>Loding.............</h1>;
  }
  if (!loading && user?.role === "agent") {
    return children;
  }
  logout();
  return <Navigate to="/login" />;
};
