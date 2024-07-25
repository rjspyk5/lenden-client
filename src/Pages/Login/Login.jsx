import React, { useEffect } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import { TabsCustomAnimation } from "../../Components/Tabs/TabsCustomAnimation";

export const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    user && navigate("/");
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="border p-10 rounded-lg backdrop-blur-md bg-[#aeaeae38]">
        <form action="">
          <TabsCustomAnimation />
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
