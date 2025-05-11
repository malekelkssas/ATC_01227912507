import axios from "axios";
import { store, type RootState } from "@/store";
import { logout } from "@/utils/auth/logout";
import { setToken } from "@/store/slices";
import { BeRoutesConstants, PagesRoutesConstants } from "@/utils/constants";
import { UserService } from "./services";
import type { RefreshTokenResponseDto } from "@/types";

const publicEndpoints = [
  `/${BeRoutesConstants.USERS}/${BeRoutesConstants.SIGN_IN}`,
  `/${BeRoutesConstants.USERS}/${BeRoutesConstants.SIGN_UP}`,
];
const refreshTokenEndpoint = `/${BeRoutesConstants.USERS}/${BeRoutesConstants.REFRESH_TOKEN}`;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use(
  (config) => {
    // Skip token check for public endpoints
    if (
      publicEndpoints.includes(config.url || "") ||
      config.url === refreshTokenEndpoint
    ) {
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
    if (
      originalRequest &&
      publicEndpoints.includes(originalRequest.url || "")
    ) {
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

        const response = await UserService.refreshToken(refreshToken);
        const data = response as RefreshTokenResponseDto;

        const { token: newToken } = data;

        // Update token in Redux store
        store.dispatch(setToken(newToken));

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
      window.location.href = PagesRoutesConstants.EVENTS;
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
