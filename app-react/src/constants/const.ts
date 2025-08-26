// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/token',
    LOGOUT: '/auth/revoke',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    CHANGE_PASSWORD: '/auth/change-password',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    GET: (id: string) => `/users/${id}`,
  },
  ROLES: {
    LIST: '/roles',
    CREATE: '/roles',
    UPDATE: (id: string) => `/roles/${id}`,
    DELETE: (id: string) => `/roles/${id}`,
    GET: (id: string) => `/roles/${id}`,
  },
  POSTS: {
    LIST: '/posts',
    CREATE: '/posts',
    UPDATE: (id: string) => `/posts/${id}`,
    DELETE: (id: string) => `/posts/${id}`,
    GET: (id: string) => `/posts/${id}`,
  },
} as const;

// Storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PREFERENCES: 'user_preferences',
  LANGUAGE: 'language',
  THEME: 'theme',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
} as const;

// Application routes
export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  DASHBOARD: '/dashboard',
  USERS: '/users',
  ROLES: '/roles',
  POSTS: '/posts',
  SETTINGS: '/settings',
  PROFILE: '/profile',
} as const;

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Common constants
export const COMMON = {
  PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: ['10', '20', '50', '100'],
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 1000,
  AUTO_SAVE_DELAY: 2000,
  TOKEN_REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes
  PASSWORD_MIN_LENGTH: 6,
  USERNAME_MIN_LENGTH: 3,
} as const;

// User roles and permissions
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user',
} as const;

export const PERMISSIONS = {
  USERS: {
    VIEW: 'users:view',
    CREATE: 'users:create',
    UPDATE: 'users:update',
    DELETE: 'users:delete',
  },
  ROLES: {
    VIEW: 'roles:view',
    CREATE: 'roles:create',
    UPDATE: 'roles:update',
    DELETE: 'roles:delete',
  },
  POSTS: {
    VIEW: 'posts:view',
    CREATE: 'posts:create',
    UPDATE: 'posts:update',
    DELETE: 'posts:delete',
    PUBLISH: 'posts:publish',
  },
} as const;

// File upload constraints
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
} as const;

// Date formats
export const DATE_FORMATS = {
  DATE_ONLY: 'YYYY-MM-DD',
  TIME_ONLY: 'HH:mm:ss',
  DATE_TIME: 'YYYY-MM-DD HH:mm:ss',
  DATE_TIME_COMPACT: 'MM/DD/YYYY HH:mm',
  DISPLAY_DATE: 'MMM DD, YYYY',
  DISPLAY_DATE_TIME: 'MMM DD, YYYY HH:mm',
} as const;

// Validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  PASSWORD_MIN_LENGTH: `Password must be at least ${COMMON.PASSWORD_MIN_LENGTH} characters`,
  USERNAME_MIN_LENGTH: `Username must be at least ${COMMON.USERNAME_MIN_LENGTH} characters`,
  PASSWORDS_NOT_MATCH: 'Passwords do not match',
  FILE_TOO_LARGE: `File size must be less than ${FILE_UPLOAD.MAX_SIZE / 1024 / 1024}MB`,
  FILE_TYPE_INVALID: 'Invalid file type',
} as const;
