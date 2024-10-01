import axios from "axios";
import { useAuth } from "@/stores/auth";
import { useRouter } from "vue-router";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  // Lazy initialize useAuth inside the request
  const authStore = useAuth();  // Only initialize here
  const token = authStore?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Lazy initialize useRouter inside the response interceptor
    const router = useRouter();  // Only initialize here

    if (error.response?.status === 401) {
      router.push("/auth/login/");
    }
    return Promise.reject(error);
  }
);

export default api;
