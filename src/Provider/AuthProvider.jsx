import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [loading, setloading] = useState(true);
  const [user, setuser] = useState(null);

  const test = {
    name: "rakib",
  };

  const {
    isPending,
    data,
    refetch: authRefetch,
  } = useQuery({
    queryKey: ["login", "registration"],
    queryFn: async () => {
      const info = localStorage.getItem("lenden_user") || null;
      setuser(info);
      setloading(false);
      return info;
    },
  });

  const logout = () => {
    localStorage.removeItem("lenden_user");
    setloading(true);
    authRefetch();
  };

  const login = (number, pass) => {
    setloading(true);
    localStorage.setItem("lenden_user", JSON.stringify(test));
    authRefetch();
  };

  const registration = (name, email, number, pass) => {
    setloading(true);
    authRefetch();
  };

  const providerValue = { loading, user, login, logout, authRefetch };
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
