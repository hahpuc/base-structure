import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux.hooks";
import {
  setTheme,
  toggleTheme,
  initializeTheme,
  toggleSidebar,
  toggleMobileSidebar,
  setIsHovered,
  setActiveItem,
  toggleSubmenu,
  setIsMobile,
  type Theme,
} from "../store/slices/ui.slice";

// Theme hooks
export const useTheme = () => {
  const dispatch = useAppDispatch();
  const { theme, isThemeInitialized } = useAppSelector((state) => state.ui);

  useEffect(() => {
    if (!isThemeInitialized) {
      dispatch(initializeTheme());
    }
  }, [dispatch, isThemeInitialized]);

  const changeTheme = (newTheme: Theme) => {
    dispatch(setTheme(newTheme));
  };

  const toggleCurrentTheme = () => {
    dispatch(toggleTheme());
  };

  return {
    theme,
    setTheme: changeTheme,
    toggleTheme: toggleCurrentTheme,
  };
};

// Sidebar hooks
export const useSidebar = () => {
  const dispatch = useAppDispatch();
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    activeItem,
    openSubmenu,
    isMobile,
  } = useAppSelector((state) => state.ui);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      dispatch(setIsMobile(mobile));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleToggleMobileSidebar = () => {
    dispatch(toggleMobileSidebar());
  };

  const handleSetIsHovered = (hovered: boolean) => {
    dispatch(setIsHovered(hovered));
  };

  const handleSetActiveItem = (item: string | null) => {
    dispatch(setActiveItem(item));
  };

  const handleToggleSubmenu = (item: string) => {
    dispatch(toggleSubmenu(item));
  };

  return {
    isExpanded: isMobile ? false : isExpanded,
    isMobileOpen,
    isHovered,
    activeItem,
    openSubmenu,
    toggleSidebar: handleToggleSidebar,
    toggleMobileSidebar: handleToggleMobileSidebar,
    setIsHovered: handleSetIsHovered,
    setActiveItem: handleSetActiveItem,
    toggleSubmenu: handleToggleSubmenu,
  };
};
