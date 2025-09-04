import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { HeaderButton } from '@/components/layout/header.component';

export type UIState = {
  sidebarCollapsed: boolean;
  isMobileView: boolean;
  userCollapsedSidebar: boolean; // Track if user manually collapsed sidebar
  loading: boolean;
  theme: 'light' | 'dark';
  language: string;
  headerTitle: string;
  buttons: HeaderButton[];
};

const initialState: UIState = {
  sidebarCollapsed: false,
  isMobileView: false,
  userCollapsedSidebar: false,
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
      state.userCollapsedSidebar = state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
      // Only track user preference on desktop
      if (!state.isMobileView) {
        state.userCollapsedSidebar = action.payload;
      }
    },
    setMobileView: (state, action: PayloadAction<boolean>) => {
      const wasMobile = state.isMobileView;
      state.isMobileView = action.payload;

      if (action.payload) {
        state.sidebarCollapsed = true;
      } else if (wasMobile && !action.payload) {
        state.sidebarCollapsed = state.userCollapsedSidebar;
      }
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
  setMobileView,
  setLoading,
  setTheme,
  setLanguage,
  setHeaderTitle,
  setButtons,
} = uiSlice.actions;

export default uiSlice.reducer;
