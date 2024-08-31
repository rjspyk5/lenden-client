import { useAuth } from "../../../Hooks/useAuth";
import { Navigate } from "react-router-dom";
export const AdminPrivateRoute = ({ children }) => {
  const { logout, loading, user } = useAuth();
  if (loading) {
    return <h1>Loading..........</h1>;
  }
  if (!loading && user?.role === "admin") {
    return children;
  }
  logout();
  return <Navigate to="/login" />;
};
