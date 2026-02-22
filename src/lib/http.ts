import axios, { AxiosHeaders } from "axios";
import { getToken, clearAuth } from "../stores/authStore";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
});

http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    toast.error(message);

    const userNeedsToLogInAgain =
      status === 401 &&
      (error.config.headers as AxiosHeaders).hasAuthorization();

    if (userNeedsToLogInAgain) {
      clearAuth();

      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  },
);
