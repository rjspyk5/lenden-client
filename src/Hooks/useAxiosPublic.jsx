import axios from "axios";
const axiosPublic = axios.create({
  baseURL: "https://lenden-server.vercel.app",
  withCredentials: true,
});
export const useAxiosPublic = () => {
  return axiosPublic;
};
