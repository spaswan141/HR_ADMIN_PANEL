import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const publicPaths = ["/auth/register", "/auth/login"];

// Attach token from cookies to every request
api.interceptors.request.use(
  (config) => {
    // Skip token check for public endpoints
    if (!publicPaths.some((path) => config.url?.includes(path))) {
      const token = Cookies.get("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        // No token for a protected route → force login
        window.location.href = "/auth/sign-in";
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle new token from response & global errors
api.interceptors.response.use(
  (response) => {
    if (response.data?.accessToken) {
      Cookies.set("accessToken", response.data.accessToken, {
        expires: 0.0833, // ~2 hours
        secure: import.meta.env.MODE === "production",
        sameSite: "Strict",
      });
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status === 401) {
      Cookies.remove("accessToken");
      window.location.href = "/login";
    } else if (status) {
      switch (status) {
        case 400: toast.error(message || "Bad Request"); break;
        case 403: toast.error(message || "Forbidden: Access denied"); break;
        case 404: toast.error(message || "Not Found"); break;
        case 422: toast.error(message || "Validation Error"); break;
        case 429: toast.error(message || "Too many requests"); break;
        case 500: toast.error(message || "Internal Server Error"); break;
        default: toast.error(message || "An error occurred");
      }
    } else {
      toast.error("Network error. Please check your connection.");
    }
    return Promise.reject(error);
  }
);

export default api;
