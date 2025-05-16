import axios from "axios";
import { store, type RootState } from "@/store";
import { logout } from "@/utils/auth/logout";
import { setToken } from "@/store/slices";
import { BeRoutesConstants, PagesRoutesConstants } from "@/utils/constants";
import type { RefreshTokenResponseDto } from "@/types";
import i18n from "@/i18n/i18n";
import { HTTP_HEADERS } from "@/utils/constants/http/http-headers.constants";
import { UserService } from "./services";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

const privateRoutes = [
  PagesRoutesConstants.USER_DASHBOARD,
  PagesRoutesConstants.ADMIN_DASHBOARD,
];

api.interceptors.request.use(
  (config) => {
    if (config.url?.includes(BeRoutesConstants.REFRESH_TOKEN)) {
      return config;
    }

    const state: RootState = store.getState();
    const token = state.auth.token;
    const currentPath = window.location.pathname;

    config.headers[HTTP_HEADERS.ACCEPT_LANGUAGE] = i18n.language;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (privateRoutes.some(route => currentPath.startsWith(route)) && !token) {
      window.location.href = PagesRoutesConstants.SIGN_IN;
      return Promise.reject('No token available');
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
    const refreshToken = state.auth.refreshToken;

    // Handle 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If this is a refresh token request that failed, don't try to refresh again
      if (originalRequest.url?.includes(BeRoutesConstants.REFRESH_TOKEN)) {
        logout();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }


        let newToken = null;
        try {
          const response = await UserService.refreshToken(refreshToken);
          newToken = (response as RefreshTokenResponseDto).token;
        } catch (error) {
          // If refresh fails, logout and don't retry
          logout();
          return Promise.reject(error);
        }

        store.dispatch(setToken(newToken));
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh token request returns 401, simply logout
        if (axios.isAxiosError(refreshError) && refreshError.response?.status === 401) {
          logout();
          return Promise.reject(refreshError);
        }

        logout();
        const currentPath = window.location.pathname;
        if (privateRoutes.some(route => currentPath.startsWith(route))) {
          window.location.href = PagesRoutesConstants.SIGN_IN;
        }
        
        return Promise.reject(refreshError);
      }
    }

    // Handle 403 errors
    if (error.response?.status === 403) {
      const currentPath = window.location.pathname;
      if (privateRoutes.some(route => currentPath.startsWith(route))) {
        window.location.href = PagesRoutesConstants.EVENTS;
      }
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
