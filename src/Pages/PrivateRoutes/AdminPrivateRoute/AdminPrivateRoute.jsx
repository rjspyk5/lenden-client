import { Loading } from "../../../Components/Loading/Loading";
import { useAuth } from "../../../Hooks/useAuth";
import { Navigate } from "react-router-dom";
export const AdminPrivateRoute = ({ children }) => {
  const { logout, loading, user } = useAuth();
  if (loading) {
    return <Loading />;
  }
  if (!loading && user?.role === "admin") {
    return children;
  }
  logout();
  return <Navigate to="/login" />;
};
