import axios from "axios";
import { store, type RootState } from "@/store";
import { logout } from "@/utils/auth/logout";
import { setRefreshToken } from "@/store/slices";
import { BeRoutesConstants, PagesRoutesConstants } from "@/utils/constants";
import { UserService } from "./services";

const publicEndpoints = [BeRoutesConstants.SIGN_IN, BeRoutesConstants.SIGN_UP, BeRoutesConstants.REFRESH_TOKEN];

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  validateStatus: () => true,
});

api.interceptors.request.use(
  (config) => {
    // Skip token check for public endpoints
    if (publicEndpoints.includes(config.url || "")) {
      return config;
    }

    let token = null;
    try {
      const state: RootState = store.getState();
      token = state.auth.token;
    } catch {
      logout();
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // If no token is available for protected routes, reject the request
      if (window.location.pathname !== PagesRoutesConstants.SIGN_IN) {
        logout();
      }
      return Promise.reject(new Error("No authentication token available"));
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh token logic for public endpoints
    if (publicEndpoints.includes(originalRequest.url || "")) {
      return Promise.reject(error);
    }
    const state: RootState = store.getState();

    // If error is 401 and we haven't tried to refresh token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = state.auth.refreshToken;

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }
        // add the refresh token to the original request
        originalRequest.headers.Authorization = `Bearer ${refreshToken}`;

        const response = await UserService.refreshToken();

        const { refreshToken: newRefreshToken } = response;

        // Update token in Redux store
        store.dispatch(setRefreshToken(newRefreshToken));

        // Retry original request with new token
        // originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, log out user
        logout();
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 403) {
      window.location.href = PagesRoutesConstants.DASHBOARD;
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
