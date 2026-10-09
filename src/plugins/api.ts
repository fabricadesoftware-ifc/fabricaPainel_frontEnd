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

    // 403 = autenticado mas sem permissão para essa ação específica — não é
    // problema de sessão, então não deve derrubar o login do usuário.
    if (error.response?.status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    if (originalRequest._retry || isTokenEndpoint(originalRequest.url)) {
      redirectToLogin();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Se outra requisição já renovou o token enquanto esta estava em voo, o 401
      // veio do token antigo: basta repetir com o atual, sem gastar outro refresh
      // (o refresh token é de uso único).
      const sentWith = String(originalRequest.headers?.Authorization || "").replace(/^Bearer\s+/i, "");
      const current = useAuth().token;
      const token = current && sentWith && current !== sentWith ? current : await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return api(originalRequest);
    } catch (refreshError) {
      redirectToLogin();
      return Promise.reject(refreshError);
    }
  }
);

export default api;
