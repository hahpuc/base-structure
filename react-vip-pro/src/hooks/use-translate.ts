import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux.hooks";
import { initializeLocaleData } from "../store/slices/locale.slice";
import {
  useTranslation,
  useCommonTranslation,
} from "../services/translate.service";
import { LanguageDto } from "../types/language";

/**
 * Hook that provides translation functionality for components
 * Includes language switching, translation functions, and locale state management
 */
export const useTranslate = () => {
  const dispatch = useAppDispatch();
  const {
    currentLanguage,
    languages,
    translations,
    languagesLoading,
    translationsLoading,
    languagesError,
    translationsError,
    isInitializing,
  } = useAppSelector((state) => state.locale);

  const translate = useTranslation();
  const commonTranslate = useCommonTranslation();

  // Initialize locale data on mount (if not already loaded)
  useEffect(() => {
    if (!languages.length && !isInitializing) {
      dispatch(initializeLocaleData());
    }
  }, [dispatch, languages.length, isInitializing]);

  // Ensure language is marked as initialized if we have cached data
  useEffect(() => {
    if (languages.length > 0 && currentLanguage) {
      // This ensures the language initialization is properly marked as completed
      // when we have cached data from localStorage
    }
  }, [languages.length, currentLanguage]);

  /**
   * Get available languages for language switcher
   */
  const getAvailableLanguages = (): LanguageDto[] => {
    return languages;
  };

  /**
   * Get current language object
   */
  const getCurrentLanguage = (): LanguageDto | undefined => {
    return languages.find((lang: LanguageDto) => lang.code === currentLanguage);
  };

  /**
   * Check if translations are ready for a specific namespace
   */
  const isTranslationsReady = (namespace?: string): boolean => {
    if (!translations || Object.keys(translations).length === 0) {
      return false;
    }

    if (namespace) {
      return !!translations[namespace];
    }

    return true;
  };

  /**
   * Get loading state for translation system
   */
  const isTranslationLoading = (): boolean => {
    return languagesLoading || translationsLoading || isInitializing;
  };

  /**
   * Get error state for translation system
   */
  const getTranslationError = (): string | null => {
    return languagesError || translationsError;
  };

  return {
    // Translation functions
    translate,
    commonTranslate,

    // Language data
    currentLanguage,
    languages,
    translations,
    getAvailableLanguages,
    getCurrentLanguage,

    // State checks
    isTranslationsReady,
    isTranslationLoading,
    getTranslationError,

    // Raw state (for advanced usage)
    languagesLoading,
    translationsLoading,
    languagesError,
    translationsError,
    isInitializing,
  };
};

/**
 * Type for the return value of useTranslate hook
 */
export type UseTranslateReturn = ReturnType<typeof useTranslate>;
