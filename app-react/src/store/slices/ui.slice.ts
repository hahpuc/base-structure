import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UIState = {
  sidebarCollapsed: boolean;
  loading: boolean;
  theme: 'light' | 'dark';
  language: string;
};

const initialState: UIState = {
  sidebarCollapsed: false,
  loading: false,
  theme: 'light',
  language: 'en',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: state => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarCollapsed, setLoading, setTheme, setLanguage } =
  uiSlice.actions;

export default uiSlice.reducer;
