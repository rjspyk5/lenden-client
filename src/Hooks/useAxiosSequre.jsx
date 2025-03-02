import axios from "axios";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSequre = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});
export const useAxiosSequre = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  axiosSequre.interceptors.response.use(
    (res) => res,
    (error) => {
      (error.response?.status === 401 || error.response?.status === 403) &&
        logout().then(() => navigate("/login"));
    }
  );
  return axiosSequre;
};
