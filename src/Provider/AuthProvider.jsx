import { createContext, useEffect, useState } from "react";
import { useAxiosPublic } from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [loading, setloading] = useState(true);
  const [user, setuser] = useState(null);

  const axiosPublic = useAxiosPublic();

  const logout = () => {
    setloading(true);
    localStorage.removeItem("lenden_user");
    setuser(null);
    setloading(false);
    axiosPublic.post("/logout").then((res) => console.log(res.data));
  };

  const login = (data) => {
    setloading(true);
    localStorage.setItem("lenden_user", JSON.stringify(data));
    setuser(data);
    setloading(false);
    axiosPublic.post("/jwt", { email: user?.email }).then((res) => res.data);
  };

  const registration = (data) => {
    setloading(true);
    return axiosPublic.post("/reg", data);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("lenden_user") || null;
    const info = storedUser ? JSON.parse(storedUser) : null;
    setuser(info);
    // todo: rolebased naviagate route
    // if (info) {
    //   const role = info?.role;
    //   role === "user"
    //     ? (window.location.href = "/")
    //     : (window.location.href = "/agent");
    // }

    setloading(false);
  }, []);

  const providerValue = {
    loading,
    user,
    login,
    logout,
    registration,
    setloading,
  };
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
