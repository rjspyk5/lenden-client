import axios from "axios";
const axiosPublic = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
export const useAxiosPublic = () => {
  return axiosPublic;
};

// https://lenden-server.vercel.app
