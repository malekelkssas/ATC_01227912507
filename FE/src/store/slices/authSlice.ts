import { createSlice } from '@reduxjs/toolkit';
import { type AuthState } from '@/types';
import { LocalStorageConstants } from '@/utils/constants';

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
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
    removeUser: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
    },
  },
});

export const { setUser, setToken, setRefreshToken, removeUser } = authSlice.actions;
export default authSlice.reducer;
