import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Theme, THEME } from '@/types/theme';
import { LocalStorageConstants } from '@/utils/constants';

interface ThemeState {
  mode: Theme;
}


const getInitialTheme = (): Theme => {
    if (typeof window !== LocalStorageConstants.UNDEFINED) {
      const savedTheme = localStorage.getItem(LocalStorageConstants.THEME) as Theme;
      if (savedTheme) {
        return savedTheme;
      }
      return THEME.LIGHT;
    }
    return THEME.LIGHT;
  };
  
const initialState: ThemeState = {
    mode: getInitialTheme(),
  };

  export const themeSlice = createSlice({
    name: LocalStorageConstants.THEME,
    initialState,
    reducers: {
      toggleTheme: (state) => {
        state.mode = state.mode === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
        if (typeof window !== LocalStorageConstants.UNDEFINED) {
          localStorage.setItem(LocalStorageConstants.THEME, state.mode);
        }
        if (state.mode === THEME.DARK) {
          document.documentElement.classList.add(THEME.DARK);
        } else {
          document.documentElement.classList.remove(THEME.DARK);
        }
      },
      setTheme: (state, action: PayloadAction<Theme>) => {
        state.mode = action.payload;
        if (typeof window !== LocalStorageConstants.UNDEFINED) {
          localStorage.setItem(LocalStorageConstants.THEME, state.mode);
        }
        if (state.mode === THEME.DARK) {
          document.documentElement.classList.add(THEME.DARK);
        } else {
          document.documentElement.classList.remove(THEME.DARK);
        }
      },
    },
  });

  export const { toggleTheme, setTheme } = themeSlice.actions;
  export default themeSlice.reducer;