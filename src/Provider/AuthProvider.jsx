import { useQuery } from "@tanstack/react-query";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [loading, setloading] = useState(true);
  const [user, setuser] = useState(null);

  const login = (number, pass) => {
    console.log("login");
  };

  const registration = (name, email, number, pass) => {
    console.log("registration");
  };

  const logout = () => {
    console.log("logout");
  };

  const { isPending, data, refetch } = useQuery({
    queryKey: [login, logout, registration],
    queryFn: async () => {
      const info = localStorage.getItem("lenden_user_info") || null;
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
