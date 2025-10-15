import { useCallback } from "react";
import { useAppSelector } from "@/hooks/redux.hooks";

/**
 * Translation service class similar to Angular's TranslateService
 * Provides methods to get translations with context and parameter interpolation
 */
export class TranslateService {
  private _context = "";

  constructor(context: string = "common") {
    this._context = context;
  }

  /**
   * Create a new instance with specific context
   */
  static withContext(context: string): TranslateService {
    return new TranslateService(context);
  }

  /**
   * Get translation for a key
   * @param key Translation key
   * @param params Optional parameters for interpolation
   * @param namespace Optional namespace override
   * @param currentLanguage Current language code
   * @param translations Translation cache
   * @returns Translated string or key if translation not found
   */
  instant(
    key: string,
    params?: Record<string, string | number>,
    namespace?: string,
    currentLanguage?: string,
    translations?: Record<string, Record<string, Record<string, string>>>
  ): string {
    if (!currentLanguage || !translations?.[currentLanguage]) {
      return key;
    }

    const ns = namespace || this._context;
    const translation = translations[currentLanguage][ns]?.[key];

    if (!translation) {
      return key;
    }

    // Handle parameter interpolation
    if (params) {
      return this.interpolate(translation, params);
    }

    return translation;
  }

  /**
   * Get translation with specific namespace
   * @param namespace Namespace to use
   * @param key Translation key
   * @param params Optional parameters for interpolation
   * @param currentLanguage Current language code
   * @param translations Translation cache
   * @returns Translated string or key if translation not found
   */
  get(
    namespace: string,
    key: string,
    params?: Record<string, string | number>,
    currentLanguage?: string,
    translations?: Record<string, Record<string, Record<string, string>>>
  ): string {
    return this.instant(key, params, namespace, currentLanguage, translations);
  }

  /**
   * Set the default context/namespace for this service instance
   * @param context New context to set
   */
  setContext(context: string): void {
    this._context = context;
  }

  /**
   * Get current context/namespace
   * @returns Current context
   */
  getContext(): string {
    return this._context;
  }

  /**
   * Check if translation exists for given key
   * @param key Translation key
   * @param namespace Optional namespace override
   * @param currentLanguage Current language code
   * @param translations Translation cache
   * @returns True if translation exists
   */
  hasTranslation(
    key: string,
    namespace?: string,
    currentLanguage?: string,
    translations?: Record<string, Record<string, Record<string, string>>>
  ): boolean {
    if (!currentLanguage || !translations?.[currentLanguage]) {
      return false;
    }

    const ns = namespace || this._context;
    return !!translations[currentLanguage][ns]?.[key];
  }

  /**
   * Get all translations for current language and namespace
   * @param namespace Optional namespace override
   * @param currentLanguage Current language code
   * @param translations Translation cache
   * @returns Object with all translations
   */
  getAll(
    namespace?: string,
    currentLanguage?: string,
    translations?: Record<string, Record<string, Record<string, string>>>
  ): Record<string, string> {
    if (!currentLanguage || !translations?.[currentLanguage]) {
      return {};
    }

    const ns = namespace || this._context;
    return translations[currentLanguage][ns] || {};
  }

  /**
   * Interpolate parameters in translation text
   * @param text Translation text
   * @param params Parameters to interpolate
   * @returns Interpolated text
   */
  private interpolate(
    text: string,
    params: Record<string, string | number>
  ): string {
    return text.replace(/{{(\w+)}}/g, (match, key) => {
      return params[key]?.toString() || match;
    });
  }
}

/**
 * React hook for translations - main hook for components
 * Similar to Angular's TranslateService but as a React hook
 */
export const useTranslation = (context: string = "common") => {
  const { currentLanguage, translations } = useAppSelector(
    (state) => state.locale
  );

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const service = new TranslateService(context);
      return service.instant(
        key,
        params,
        undefined,
        currentLanguage,
        translations
      );
    },
    [context, currentLanguage, translations]
  );

  const tNs = useCallback(
    (
      namespace: string,
      key: string,
      params?: Record<string, string | number>
    ) => {
      const service = new TranslateService(context);
      return service.get(namespace, key, params, currentLanguage, translations);
    },
    [context, currentLanguage, translations]
  );

  const hasTranslation = useCallback(
    (key: string, namespace?: string) => {
      const service = new TranslateService(context);
      return service.hasTranslation(
        key,
        namespace,
        currentLanguage,
        translations
      );
    },
    [context, currentLanguage, translations]
  );

  const getAll = useCallback(
    (namespace?: string) => {
      const service = new TranslateService(context);
      return service.getAll(namespace, currentLanguage, translations);
    },
    [context, currentLanguage, translations]
  );

  return {
    t, // translate in current context
    tNs, // translate with specific namespace
    hasTranslation,
    getAll,
    currentLanguage,
  };
};

/**
 * Hook specifically for common translations
 * Convenience hook for the most common use case
 */
export const useCommonTranslation = () => {
  return useTranslation("common");
};

/**
 * Hook for auth-related translations
 */
export const useAuthTranslation = () => {
  return useTranslation("auth");
};

/**
 * Hook for admin-related translations
 */
export const useAdminTranslation = () => {
  return useTranslation("admin");
};

/**
 * Hook for validation-related translations
 */
export const useValidationTranslation = () => {
  return useTranslation("validation");
};

/**
 * Global translation service instance
 * Can be used outside React components
 */
export const translateService = new TranslateService("common");
