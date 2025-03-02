import axios from "axios";
const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});
export const useAxiosPublic = () => {
  return axiosPublic;
};
