import axios, { AxiosHeaders } from "axios";
import { getToken, clearAuth } from "../stores/authStore";
import { toast } from "sonner";
import { API_BASE_URL } from "@/config/api";

export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
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
