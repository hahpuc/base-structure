import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { LanguageDto, TranslationCache } from "@/types/language";
import { languageService } from "@/services/language.service";

// Types
export interface LocaleState {
  // Current language
  currentLanguage: string;
  isLanguageInitialized: boolean;

  // Available languages
  languages: LanguageDto[];
  languagesLoading: boolean;
  languagesError: string | null;

  // Translations cache
  translations: TranslationCache;
  translationsLoading: boolean;
  translationsError: string | null;

  // General loading state
  isInitializing: boolean;
}

// Helper function to get initial language from localStorage
const getInitialLanguage = (): string => {
  if (typeof window !== "undefined") {
    const savedLanguage = localStorage.getItem("selected_language");
    if (savedLanguage) {
      return savedLanguage;
    }
  }
  return "en"; // fallback to English
};

// Helper function to get cached languages from localStorage
const getCachedLanguages = (): LanguageDto[] => {
  if (typeof window !== "undefined") {
    const cachedLanguages = localStorage.getItem("app_languages");
    if (cachedLanguages) {
      try {
        return JSON.parse(cachedLanguages);
      } catch (error) {
        console.error("Error parsing cached languages:", error);
      }
    }
  }
  return [];
};

// Helper function to get cached translations from localStorage
const getCachedTranslations = (): TranslationCache => {
  if (typeof window !== "undefined") {
    const cachedTranslations = localStorage.getItem("app_translations");
    if (cachedTranslations) {
      try {
        return JSON.parse(cachedTranslations);
      } catch (error) {
        console.error("Error parsing cached translations:", error);
      }
    }
  }
  return {};
};

const initialState: LocaleState = {
  currentLanguage: getInitialLanguage(),
  isLanguageInitialized: false,

  languages: getCachedLanguages(),
  languagesLoading: false,
  languagesError: null,

  translations: getCachedTranslations(),
  translationsLoading: false,
  translationsError: null,

  isInitializing: false,
};

// Async thunks
export const initializeLocaleData = createAsyncThunk(
  "locale/initializeData",
  async (_, { rejectWithValue }) => {
    try {
      // Fetch both languages and translations in parallel
      const [languagesResult, translationsResult] = await Promise.all([
        languageService.getAllLanguages(),
        languageService.getAllTranslations(),
      ]);

      if (!languagesResult.isSuccess) {
        throw new Error(
          languagesResult.error?.message || "Failed to fetch languages"
        );
      }

      if (!translationsResult.isSuccess) {
        throw new Error(
          translationsResult.error?.message || "Failed to fetch translations"
        );
      }

      return {
        languages: languagesResult.data || [],
        translations: translationsResult.data || {},
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to initialize locale data";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchLanguages = createAsyncThunk(
  "locale/fetchLanguages",
  async (_, { rejectWithValue }) => {
    const result = await languageService.getAllLanguages();

    if (result.isSuccess) {
      return result.data || [];
    }

    return rejectWithValue(
      result.error?.message || "Failed to fetch languages"
    );
  }
);

export const fetchTranslations = createAsyncThunk(
  "locale/fetchTranslations",
  async (_, { rejectWithValue }) => {
    const result = await languageService.getAllTranslations();

    if (result.isSuccess) {
      return result.data || {};
    }

    return rejectWithValue(
      result.error?.message || "Failed to fetch translations"
    );
  }
);

const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    // Language management
    setCurrentLanguage: (state, action: PayloadAction<string>) => {
      const newLanguage = action.payload;
      state.currentLanguage = newLanguage;

      // Handle DOM updates and localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("selected_language", newLanguage);
      }

      state.isLanguageInitialized = true;
    },

    // Initialize from localStorage
    initializeLanguage: (state) => {
      if (typeof window !== "undefined") {
        const savedLanguage = localStorage.getItem("selected_language");
        if (savedLanguage && savedLanguage !== state.currentLanguage) {
          state.currentLanguage = savedLanguage;
        }
      }
      state.isLanguageInitialized = true;
    },

    // Cache management
    setCachedLanguages: (state, action: PayloadAction<LanguageDto[]>) => {
      state.languages = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("app_languages", JSON.stringify(action.payload));
      }
    },

    setCachedTranslations: (state, action: PayloadAction<TranslationCache>) => {
      state.translations = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "app_translations",
          JSON.stringify(action.payload)
        );
      }
    },

    loadFromCache: (state) => {
      if (typeof window !== "undefined") {
        // Load languages
        const cachedLanguages = localStorage.getItem("app_languages");
        if (cachedLanguages) {
          try {
            state.languages = JSON.parse(cachedLanguages);
          } catch (error) {
            console.error("Error parsing cached languages:", error);
          }
        }

        // Load translations
        const cachedTranslations = localStorage.getItem("app_translations");
        if (cachedTranslations) {
          try {
            state.translations = JSON.parse(cachedTranslations);
          } catch (error) {
            console.error("Error parsing cached translations:", error);
          }
        }

        // Load current language
        const savedLanguage = localStorage.getItem("selected_language");
        if (savedLanguage) {
          state.currentLanguage = savedLanguage;
        }
      }

      state.isLanguageInitialized = true;
    },

    clearCache: (state) => {
      state.languages = [];
      state.translations = {};

      if (typeof window !== "undefined") {
        localStorage.removeItem("app_languages");
        localStorage.removeItem("app_translations");
      }
    },

    // Error management
    clearErrors: (state) => {
      state.languagesError = null;
      state.translationsError = null;
    },
  },
  extraReducers: (builder) => {
    // Initialize locale data
    builder
      .addCase(initializeLocaleData.pending, (state) => {
        state.isInitializing = true;
        state.languagesError = null;
        state.translationsError = null;
      })
      .addCase(initializeLocaleData.fulfilled, (state, action) => {
        state.isInitializing = false;
        state.languages = action.payload.languages;
        state.translations = action.payload.translations;

        // Cache in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "app_languages",
            JSON.stringify(action.payload.languages)
          );
          localStorage.setItem(
            "app_translations",
            JSON.stringify(action.payload.translations)
          );
        }

        // Initialize language selection
        if (action.payload.languages.length > 0) {
          const availableLanguageCodes = action.payload.languages.map(
            (lang) => lang.code
          );

          // Check if current language from localStorage is still valid
          if (!availableLanguageCodes.includes(state.currentLanguage)) {
            // If saved language is not available, fall back to first available language
            state.currentLanguage = action.payload.languages[0].code;
            if (typeof window !== "undefined") {
              localStorage.setItem("selected_language", state.currentLanguage);
            }
          }
          // If current language is valid, keep it as is (already loaded from localStorage)

          state.isLanguageInitialized = true;
        }
      })
      .addCase(initializeLocaleData.rejected, (state, action) => {
        state.isInitializing = false;
        const errorMessage = action.payload as string;
        state.languagesError = errorMessage;
        state.translationsError = errorMessage;

        message.error("Failed to load localization data");
        console.error("Locale initialization failed:", errorMessage);
      });

    // Fetch languages
    builder
      .addCase(fetchLanguages.pending, (state) => {
        state.languagesLoading = true;
        state.languagesError = null;
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.languagesLoading = false;
        state.languages = action.payload;

        if (typeof window !== "undefined") {
          localStorage.setItem("app_languages", JSON.stringify(action.payload));
        }
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.languagesLoading = false;
        state.languagesError = action.payload as string;
      });

    // Fetch translations
    builder
      .addCase(fetchTranslations.pending, (state) => {
        state.translationsLoading = true;
        state.translationsError = null;
      })
      .addCase(fetchTranslations.fulfilled, (state, action) => {
        state.translationsLoading = false;
        state.translations = action.payload;

        if (typeof window !== "undefined") {
          localStorage.setItem(
            "app_translations",
            JSON.stringify(action.payload)
          );
        }
      })
      .addCase(fetchTranslations.rejected, (state, action) => {
        state.translationsLoading = false;
        state.translationsError = action.payload as string;
      });
  },
});

export const {
  setCurrentLanguage,
  initializeLanguage,
  setCachedLanguages,
  setCachedTranslations,
  loadFromCache,
  clearCache,
  clearErrors,
} = localeSlice.actions;

export default localeSlice.reducer;
