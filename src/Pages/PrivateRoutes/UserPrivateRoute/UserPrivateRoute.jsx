import { Navigate } from "react-router-dom";
import { useAuth } from "../../../Hooks/useAuth";

export const UserPrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading................</h1>;
  }
  if (!loading && user) {
    return children;
  }
  return <Navigate to="/login" />;
};
