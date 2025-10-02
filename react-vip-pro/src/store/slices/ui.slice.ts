import { HeaderButton } from "@/components/top-actions/header-buttons.component";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";

interface UiState {
  // Theme state
  theme: Theme;
  isThemeInitialized: boolean;

  // Sidebar state
  isExpanded: boolean;
  isMobileOpen: boolean;
  isHovered: boolean;
  activeItem: string | null;
  openSubmenu: string | null;
  isMobile: boolean;

  // Top Actions:
  headerTitle: string;
  buttons: HeaderButton[];
}

const initialState: UiState = {
  // Theme initial state
  theme: "light",
  isThemeInitialized: false,

  // Sidebar initial state
  isExpanded: true,
  isMobileOpen: false,
  isHovered: false,
  activeItem: null,
  openSubmenu: null,
  isMobile: false,

  // Top Actions initial state
  headerTitle: "Admin",
  buttons: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Theme reducers
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;

      // Handle DOM updates and localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload);
        const root = document.documentElement;
        const body = document.body;

        // Remove existing theme classes
        root.classList.remove("light", "dark");
        body.classList.remove("light", "dark");

        // Add current theme class
        root.classList.add(action.payload);
        body.classList.add(action.payload);

        // Set data attribute for CSS selectors
        root.setAttribute("data-theme", action.payload);
        body.setAttribute("data-theme", action.payload);
      }
    },

    toggleTheme: (state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      state.theme = newTheme;

      // Handle DOM updates and localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme);
        const root = document.documentElement;
        const body = document.body;

        // Remove existing theme classes
        root.classList.remove("light", "dark");
        body.classList.remove("light", "dark");

        // Add current theme class
        root.classList.add(newTheme);
        body.classList.add(newTheme);

        // Set data attribute for CSS selectors
        root.setAttribute("data-theme", newTheme);
        body.setAttribute("data-theme", newTheme);
      }
    },

    initializeTheme: (state) => {
      if (typeof window !== "undefined") {
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        const initialTheme = savedTheme || "light";

        state.theme = initialTheme;
        state.isThemeInitialized = true;

        const root = document.documentElement;
        const body = document.body;

        // Remove existing theme classes
        root.classList.remove("light", "dark");
        body.classList.remove("light", "dark");

        // Add current theme class
        root.classList.add(initialTheme);
        body.classList.add(initialTheme);

        // Set data attribute for CSS selectors
        root.setAttribute("data-theme", initialTheme);
        body.setAttribute("data-theme", initialTheme);
      }
    },

    // Sidebar reducers
    toggleSidebar: (state) => {
      state.isExpanded = !state.isExpanded;
    },

    toggleMobileSidebar: (state) => {
      state.isMobileOpen = !state.isMobileOpen;
    },

    setIsHovered: (state, action: PayloadAction<boolean>) => {
      state.isHovered = action.payload;
    },

    setActiveItem: (state, action: PayloadAction<string | null>) => {
      state.activeItem = action.payload;
    },

    toggleSubmenu: (state, action: PayloadAction<string>) => {
      state.openSubmenu =
        state.openSubmenu === action.payload ? null : action.payload;
    },

    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
      if (!action.payload) {
        state.isMobileOpen = false;
      }
    },

    // Top Actions reducers
    setHeaderTitle: (state, action: PayloadAction<string>) => {
      state.headerTitle = action.payload;
    },
    setButtons: (state, action: PayloadAction<HeaderButton[]>) => {
      state.buttons = action.payload;
    },
  },
});

export const {
  // Theme actions
  setTheme,
  toggleTheme,
  initializeTheme,

  // Sidebar actions
  toggleSidebar,
  toggleMobileSidebar,
  setIsHovered,
  setActiveItem,
  toggleSubmenu,
  setIsMobile,

  // Top Actions actions
  setHeaderTitle,
  setButtons,
} = uiSlice.actions;

export default uiSlice.reducer;
