import axios from "axios";
import { BACKEND_URL } from "./config";

const apiClient = axios.create({
  baseURL: BACKEND_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Normalize network errors
    if (error.response) {
      // Server responded with a status outside 2xx
      console.error("API error:", error.response.status, error.response.data);
    } else if (error.request) {
      // No response received
      console.error("API network error: no response", error.message);
    } else {
      // Error setting up the request
      console.error("API config error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
