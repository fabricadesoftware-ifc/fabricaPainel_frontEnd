import axios from "axios";
import { useAuth } from "@/stores/auth";
import { globalRouter } from "./globalRouter";

const apiUrl = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: apiUrl,

  headers: {
    "Content-Type": "application/json",
  },
  timeout: 100000,
});

api.interceptors.request.use((config) => {
  const authStore = useAuth();
  const token = authStore?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status == 401) {
      useAuth().logout();
      globalRouter.router?.push("/auth/login/");
    }
    return Promise.reject(error);
  }
);

export default api;
