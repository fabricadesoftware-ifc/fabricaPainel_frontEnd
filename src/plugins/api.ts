import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuth } from "@/stores/auth";
import { globalRouter } from "./globalRouter";

const apiUrl = import.meta.env.VITE_API_URL
let refreshPromise: Promise<string> | null = null;

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

function isTokenEndpoint(url?: string) {
  return Boolean(url?.includes("token/"));
}

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

async function refreshAccessToken() {
  const authStore = useAuth();

  if (!authStore.refresh) {
    throw new Error("Missing refresh token");
  }

  if (!refreshPromise) {
    refreshPromise = authStore.refreshToken().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

function redirectToLogin() {
  useAuth().logout();
  globalRouter.router?.push("/auth/login/");
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    if (error.response?.status == 403 || !originalRequest) {
      useAuth().logout();
    }

    if (error.response?.status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    if (originalRequest._retry || isTokenEndpoint(originalRequest.url)) {
      redirectToLogin();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const token = await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return api(originalRequest);
    } catch (refreshError) {
      redirectToLogin();
      return Promise.reject(refreshError);
    }
  }
);

export default api;
