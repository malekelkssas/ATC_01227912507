import axios from "axios";
import { store, type RootState } from "@/store";
import { logout } from "@/utils/auth/logout";
import { setToken } from "@/store/slices";
import { PagesRoutesConstants } from "@/utils/constants";
import { UserService } from "./services";
import type { RefreshTokenResponseDto } from "@/types";
import i18n from "@/i18n/i18n";
import { HTTP_HEADERS } from "@/utils/constants/http/http-headers.constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// TODO: Should include the Admin Routes
const privatePagesRoutes = []

api.interceptors.request.use(
  (config) => {
    // Skip token check for public endpoints

    let token = null;
    try {
      const state: RootState = store.getState();
      token = state.auth.token;
    } finally {
      config.headers.Authorization = `Bearer ${token || ""}`;
      config.headers[HTTP_HEADERS.ACCEPT_LANGUAGE] = i18n.language;
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
        const privatePagesRoutes: string[] = [];
        if (
          window.location.pathname !== PagesRoutesConstants.SIGN_IN &&
          !privatePagesRoutes.includes(window.location.pathname)
        ) {
          window.location.href = PagesRoutesConstants.EVENTS;
        }
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
