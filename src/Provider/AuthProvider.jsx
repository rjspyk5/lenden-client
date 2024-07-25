import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [loading, setloading] = useState(true);
  const [user, setuser] = useState(null);

  const test = {
    name: "rakib",
  };

  const login = (number, pass) => {
    setloading(true);
    localStorage.setItem("lenden_user", JSON.stringify(test));
  };

  const logout = () => {
    setloading(true);
    localStorage.removeItem("lenden_user");
  };

  const registration = (name, email, number, pass) => {
    console.log("registration");
  };

  const { isPending, data, refetch } = useQuery({
    queryKey: [login, logout, registration],
    queryFn: async () => {
      const info = localStorage.getItem("lenden_user") || null;
      setuser(info);
      setloading(false);
      return info;
    },
  });

  const providerValue = { loading, user };
  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
