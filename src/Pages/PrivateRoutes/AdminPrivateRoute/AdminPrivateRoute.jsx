import { useUser } from "../../../Hooks/useUser";
import { useAuth } from "../../../Hooks/useAuth";
import { Navigate } from "react-router-dom";
export const AdminPrivateRoute = ({ children }) => {
  const { userRole, isPending, isLoading } = useUser();
  const { logout } = useAuth();
  if (isPending || isLoading) {
    return <h1>Loading..........</h1>;
  }
  if (!isLoading && userRole.role === "admin") {
    return children;
  }
  logout();
  return <Navigate to="/login" />;
};
