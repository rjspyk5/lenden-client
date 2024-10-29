import { Navigate } from "react-router-dom";
import { useAuth } from "../../../Hooks/useAuth";
import { Loading } from "../../../Components/Loading/Loading";

export const UserPrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }
  if (!loading && user) {
    if (user.role !== "user") {
      return <Navigate to={`/${user?.role}`} />;
    }
    return children;
  }
  return <Navigate to="/login" />;
};
