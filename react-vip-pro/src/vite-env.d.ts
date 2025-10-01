/// <reference types="vite/client" />

interface ImportMetaEnv {
  // API Configuration
  readonly VITE_API_URL: string;
  readonly VITE_API_PREFIX: string;

  // App Configuration
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_DESCRIPTION: string;

  // Authentication
  readonly VITE_TOKEN_STORAGE_KEY: string;
  readonly VITE_REFRESH_TOKEN_KEY: string;
  readonly VITE_TOKEN_REFRESH_THRESHOLD: string;

  // Features
  readonly VITE_ENABLE_MOCK_API: string;
  readonly VITE_ENABLE_DEBUG: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_DEVTOOLS: string;

  // UI Configuration
  readonly VITE_DEFAULT_LANGUAGE: string;
  readonly VITE_DEFAULT_THEME: string;
  readonly VITE_ITEMS_PER_PAGE: string;

  // File Upload
  readonly VITE_MAX_FILE_SIZE: string;
  readonly VITE_ALLOWED_FILE_TYPES: string;

  // Development
  readonly VITE_LOG_LEVEL: string;
  readonly VITE_MOCK_DELAY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
