// Theme types and utilities
export type ThemeMode = 'light' | 'dark';

export interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

// Local storage key for theme preference
export const THEME_STORAGE_KEY = 'antd-theme-preference';

// Helper function to get theme-aware classes
export const getThemeClass = (lightClass: string, darkClass: string): string => {
  return `${lightClass} dark:${darkClass}`;
};