import { createContext, useEffect, useState } from "react";
import { useAxiosPublic } from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [loading, setloading] = useState(true);
  const [user, setuser] = useState(null);
  const axiosPublic = useAxiosPublic();

  const test = {
    name: "rakib",
  };

  const logout = () => {
    localStorage.removeItem("lenden_user");
    setloading(true);
  };

  const login = (number, pass) => {
    setloading(true);
    localStorage.setItem("lenden_user", JSON.stringify(test));
  };

  const registration = (data) => {
    setloading(true);
    return axiosPublic.post("/reg", data);
  };

  useEffect(() => {
    const info = localStorage.getItem("lenden_user") || null;
    setuser(info);
    setloading(false);
    if (user) {
      axiosPublic.post("/jwt", { email: user?.email }).then((res) => res.data);
    } else {
      axiosPublic.post("/logout").then((res) => console.log(res.data));
    }
  }, [login, registration, logout]);

  const providerValue = { loading, user, login, logout, registration };
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
