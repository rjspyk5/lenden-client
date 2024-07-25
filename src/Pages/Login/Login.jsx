import React, { useEffect } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";

export const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    user && navigate("/");
  }, [user]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <button onClick={() => login()}>Login</button>
    </div>
  );
};
