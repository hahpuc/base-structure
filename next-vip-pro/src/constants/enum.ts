export enum EStatus {
  INACTIVE = 0,
  ACTIVE = 1,
}

export enum EDocumentUploadType {
  TRANSLATION_IMPORT = "TRANSLATION_IMPORT",
}

export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REFRESH: "/auth/refresh",

  // Languages & Translations
  LANGUAGES: "/languages",
  TRANSLATIONS: "/translations",
  NAMESPACES: "/namespaces",

  // Blog Posts
  BLOG_POSTS: "/blog-posts",
  CATEGORIES: "/categories",

  // Other
  UPLOAD: "/upload",
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  DEFAULT_MAX_LIMIT: 100,
} as const;

export const CACHE_KEYS = {
  LANGUAGES: "app_languages",
  TRANSLATIONS: "app_translations",
  SELECTED_LANGUAGE: "selected_language",
  THEME: "theme",
  USER: "user_data",
} as const;
