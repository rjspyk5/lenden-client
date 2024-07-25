import React from "react";
import { useAuth } from "../../Hooks/useAuth";
import { Login } from "../Login/Login";
import { useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  if (loading) {
    return <h1>Loading................</h1>;
  }
  if (!loading && !user) {
    return navigate("/login");
  }
  return children;
};
