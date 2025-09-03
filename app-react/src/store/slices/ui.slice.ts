import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { HeaderButton } from '@/components/layout/header.component';

export type UIState = {
  sidebarCollapsed: boolean;
  loading: boolean;
  theme: 'light' | 'dark';
  language: string;
  headerTitle: string;
  buttons: HeaderButton[];
};

const initialState: UIState = {
  sidebarCollapsed: false,
  loading: false,
  theme: 'light',
  language: 'en',
  headerTitle: 'Admin',
  buttons: [],
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
    setHeaderTitle: (state, action: PayloadAction<string>) => {
      state.headerTitle = action.payload;
    },
    setButtons: (state, action: PayloadAction<HeaderButton[]>) => {
      state.buttons = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  setLoading,
  setTheme,
  setLanguage,
  setHeaderTitle,
  setButtons,
} = uiSlice.actions;

export default uiSlice.reducer;
