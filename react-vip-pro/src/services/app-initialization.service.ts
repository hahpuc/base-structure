import { LanguageDto, TranslationCache } from "@/types/language";
import { languageService } from "./language.service";

/**
 * App initialization service similar to Angular's AppInitializationService
 * Handles loading and caching of languages and translations data
 */
export class AppInitializationService {
  private static instance: AppInitializationService;

  constructor() {
    // Singleton pattern
    if (AppInitializationService.instance) {
      return AppInitializationService.instance;
    }
    AppInitializationService.instance = this;
  }

  /**
   * Initialize the application with language and translation data
   * @returns Promise<boolean> - True if initialization is successful
   */
  async initializeApp(): Promise<boolean> {
    try {
      const [languages, translations] = await Promise.all([
        this.loadLanguages(),
        this.loadTranslations(),
      ]);

      // Cache the data with timestamp
      this.cacheLanguages(languages);
      this.cacheTranslations(translations);

      // Set initial language based on cached preference or first available language
      const savedLanguage = this.getStoredLanguage();
      const availableLanguageCodes = languages.map((lang) => lang.code);

      if (!savedLanguage || !availableLanguageCodes.includes(savedLanguage)) {
        if (languages.length > 0) {
          this.setStoredLanguage(languages[0].code);
        }
      }

      return true;
    } catch (error) {
      console.error("App initialization failed:", error);
      // Return true to continue app initialization even if language loading fails
      return true;
    }
  }

  /**
   * Refresh language data by clearing cache and reloading
   * @returns Promise<boolean> - True if refresh is successful
   */
  async refreshLanguageData(): Promise<boolean> {
    this.clearCache();
    return this.initializeApp();
  }

  /**
   * Get cached languages from localStorage
   * @returns LanguageDto[] - Array of cached languages
   */
  getCachedLanguages(): LanguageDto[] {
    if (typeof localStorage !== "undefined") {
      const cached = localStorage.getItem("app_languages");
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch (error) {
          console.error("Error parsing cached languages:", error);
          return [];
        }
      }
    }
    return [];
  }

  /**
   * Get cached translations from localStorage
   * @returns TranslationCache - Object with translations by language
   */
  getCachedTranslations(): TranslationCache {
    if (typeof localStorage !== "undefined") {
      const cached = localStorage.getItem("app_translations");
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch (error) {
          console.error("Error parsing cached translations:", error);
          return {};
        }
      }
    }
    return {};
  }

  /**
   * Get stored language preference
   * @returns string | null - Stored language code or null
   */
  getStoredLanguage(): string | null {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem("selected_language");
    }
    return null;
  }

  /**
   * Set language preference in localStorage
   * @param languageCode - Language code to store
   */
  setStoredLanguage(languageCode: string): void {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("selected_language", languageCode);
    }
  }

  /**
   * Check if cache is valid (not older than specified time)
   * @param maxAge - Maximum age in milliseconds (default: 1 hour)
   * @returns boolean - True if cache is valid
   */
  isCacheValid(maxAge: number = 60 * 60 * 1000): boolean {
    if (typeof localStorage !== "undefined") {
      const cacheTimestamp = localStorage.getItem("app_cache_timestamp");
      if (cacheTimestamp) {
        const timestamp = parseInt(cacheTimestamp, 10);
        const now = Date.now();
        return now - timestamp < maxAge;
      }
    }
    return false;
  }

  /**
   * Load languages from API with fallback to cache
   * @returns Promise<LanguageDto[]> - Array of languages
   */
  private async loadLanguages(): Promise<LanguageDto[]> {
    try {
      const result = await languageService.getAllLanguages();
      if (result.isSuccess && result.data) {
        return result.data;
      }
      throw new Error(result.error?.message || "Failed to fetch languages");
    } catch (error) {
      console.warn("Failed to load languages from API, using cache:", error);
      // Fallback to cached data
      return this.getCachedLanguages();
    }
  }

  /**
   * Load translations from API with fallback to cache
   * @returns Promise<TranslationCache> - Translation data by language
   */
  private async loadTranslations(): Promise<TranslationCache> {
    try {
      const result = await languageService.getAllTranslations();
      if (result.isSuccess && result.data) {
        return result.data;
      }
      throw new Error(result.error?.message || "Failed to fetch translations");
    } catch (error) {
      console.warn("Failed to load translations from API, using cache:", error);
      // Fallback to cached data
      return this.getCachedTranslations();
    }
  }

  /**
   * Cache languages in localStorage
   * @param languages - Array of languages to cache
   */
  private cacheLanguages(languages: LanguageDto[]): void {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("app_languages", JSON.stringify(languages));
      localStorage.setItem("app_cache_timestamp", Date.now().toString());
    }
  }

  /**
   * Cache translations in localStorage
   * @param translations - Translation data to cache
   */
  private cacheTranslations(translations: TranslationCache): void {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("app_translations", JSON.stringify(translations));
      localStorage.setItem("app_cache_timestamp", Date.now().toString());
    }
  }

  /**
   * Clear all cached data
   */
  private clearCache(): void {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("app_languages");
      localStorage.removeItem("app_translations");
      localStorage.removeItem("app_cache_timestamp");
    }
  }
}

// Export singleton instance
export const appInitializationService = new AppInitializationService();
