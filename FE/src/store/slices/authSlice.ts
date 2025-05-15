import { createSlice } from '@reduxjs/toolkit';
import { type AuthState } from '@/types';
import { LocalStorageConstants } from '@/utils/constants';

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isLoginModalOpen: false,
};

const authSlice = createSlice({
  name: LocalStorageConstants.AUTH,
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setAuth: (state, action) => {
      const { user, token, refreshToken } = action.payload as AuthState;
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken;
    },
    removeUser: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isLoginModalOpen = false;
    },
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    },
  },
});

export const { setUser, setToken, setRefreshToken, setAuth, removeUser, openLoginModal, closeLoginModal } = authSlice.actions;
export default authSlice.reducer;
