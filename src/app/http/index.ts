import axios, { AxiosInstance } from "axios";
import { API_URL } from "shared/constants";

const http: AxiosInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: { "ngrok-skip-browser-warning": "69420" }, //TODO: remove from final version
});

http.interceptors.request.use((config) => {
  const route = config.url?.split("/") ?? [];

  if (route[1] !== "auth") {
    const bearerToken = localStorage.getItem("bearer_token");
    config.headers.Authorization = `Bearer ${bearerToken}`;
  }

  return config;
});

export { http };
