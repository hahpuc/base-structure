/**
 * Environment configuration service
 * Centralizes access to environment variables with type safety
 */

interface EnvironmentConfig {
  // API Configuration
  apiUrl: string;
  apiPrefix: string;

  // App Configuration
  appTitle: string;
  appVersion: string;
  appDescription: string;

  // Authentication
  tokenStorageKey: string;
  refreshTokenKey: string;
  tokenRefreshThreshold: number;

  // Features
  enableMockApi: boolean;
  enableDebug: boolean;
  enableAnalytics: boolean;
  enableDevtools: boolean;

  // UI Configuration
  defaultLanguage: string;
  defaultTheme: "light" | "dark";
  itemsPerPage: number;

  // File Upload
  maxFileSize: number;
  allowedFileTypes: string[];

  // Development
  logLevel: "debug" | "info" | "warn" | "error";
  mockDelay: number;

  // S3 Configuration
  s3Region: string;
  s3Endpoint: string;
  s3AccessKeyId: string;
  s3SecretAccessKey: string;
  s3BucketName: string;
  s3PublicUrl: string;
}

class EnvironmentService {
  private config: EnvironmentConfig;

  constructor() {
    this.config = this.loadConfig();
  }

  private loadConfig(): EnvironmentConfig {
    return {
      // API Configuration
      apiUrl: this.getEnv("VITE_API_URL", "http://localhost:3000"),
      apiPrefix: this.getEnv("VITE_API_PREFIX", "/api/v1"),

      // App Configuration
      appTitle: this.getEnv("VITE_APP_TITLE", "React Admin Dashboard"),
      appVersion: this.getEnv("VITE_APP_VERSION", "1.0.0"),
      appDescription: this.getEnv(
        "VITE_APP_DESCRIPTION",
        "Modern React Admin Dashboard"
      ),

      // Authentication
      tokenStorageKey: this.getEnv("VITE_TOKEN_STORAGE_KEY", "access_token"),
      refreshTokenKey: this.getEnv("VITE_REFRESH_TOKEN_KEY", "refresh_token"),
      tokenRefreshThreshold: this.getEnvNumber(
        "VITE_TOKEN_REFRESH_THRESHOLD",
        300000
      ),

      // Features
      enableMockApi: this.getEnvBoolean("VITE_ENABLE_MOCK_API", true),
      enableDebug: this.getEnvBoolean("VITE_ENABLE_DEBUG", import.meta.env.DEV),
      enableAnalytics: this.getEnvBoolean("VITE_ENABLE_ANALYTICS", false),
      enableDevtools: this.getEnvBoolean(
        "VITE_ENABLE_DEVTOOLS",
        import.meta.env.DEV
      ),

      // UI Configuration
      defaultLanguage: this.getEnv("VITE_DEFAULT_LANGUAGE", "en"),
      defaultTheme: this.getEnv("VITE_DEFAULT_THEME", "light") as
        | "light"
        | "dark",
      itemsPerPage: this.getEnvNumber("VITE_ITEMS_PER_PAGE", 20),

      // File Upload
      maxFileSize: this.getEnvNumber("VITE_MAX_FILE_SIZE", 5242880), // 5MB
      allowedFileTypes: this.getEnvArray("VITE_ALLOWED_FILE_TYPES", [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
      ]),

      // Development
      logLevel: this.getEnv("VITE_LOG_LEVEL", "info") as
        | "debug"
        | "info"
        | "warn"
        | "error",
      mockDelay: this.getEnvNumber("VITE_MOCK_DELAY", 0),

      // S3 Configuration
      s3Region: this.getEnv("VITE_S3_REGION", ""),
      s3Endpoint: this.getEnv("VITE_S3_ENDPOINT", ""),
      s3AccessKeyId: this.getEnv("VITE_S3_ACCESS_KEY_ID", ""),
      s3SecretAccessKey: this.getEnv("VITE_S3_SECRET_ACCESS_KEY", ""),
      s3BucketName: this.getEnv("VITE_S3_BUCKET_NAME", ""),
      s3PublicUrl: this.getEnv("VITE_S3_PUBLIC_URL", ""),
    };
  }

  private getEnv(key: string, defaultValue: string): string {
    return import.meta.env[key] || defaultValue;
  }

  private getEnvNumber(key: string, defaultValue: number): number {
    const value = import.meta.env[key];
    return value ? parseInt(value, 10) : defaultValue;
  }

  private getEnvBoolean(key: string, defaultValue: boolean): boolean {
    const value = import.meta.env[key];
    if (value === undefined) return defaultValue;
    return value === "true" || value === "1";
  }

  private getEnvArray(key: string, defaultValue: string[]): string[] {
    const value = import.meta.env[key];
    return value
      ? value.split(",").map((item: string) => item.trim())
      : defaultValue;
  }

  // Getters for easy access
  get api() {
    return {
      url: this.config.apiUrl,
      prefix: this.config.apiPrefix,
      fullUrl: `${this.config.apiUrl}${this.config.apiPrefix}`,
    };
  }

  get app() {
    return {
      title: this.config.appTitle,
      version: this.config.appVersion,
      description: this.config.appDescription,
    };
  }

  get auth() {
    return {
      tokenStorageKey: this.config.tokenStorageKey,
      refreshTokenKey: this.config.refreshTokenKey,
      tokenRefreshThreshold: this.config.tokenRefreshThreshold,
    };
  }

  get features() {
    return {
      enableMockApi: this.config.enableMockApi,
      enableDebug: this.config.enableDebug,
      enableAnalytics: this.config.enableAnalytics,
      enableDevtools: this.config.enableDevtools,
    };
  }

  get ui() {
    return {
      defaultLanguage: this.config.defaultLanguage,
      defaultTheme: this.config.defaultTheme,
      itemsPerPage: this.config.itemsPerPage,
    };
  }

  get fileUpload() {
    return {
      maxFileSize: this.config.maxFileSize,
      allowedFileTypes: this.config.allowedFileTypes,
    };
  }

  get development() {
    return {
      logLevel: this.config.logLevel,
      mockDelay: this.config.mockDelay,
    };
  }

  get s3() {
    return {
      region: this.config.s3Region,
      endpoint: this.config.s3Endpoint,
      accessKeyId: this.config.s3AccessKeyId,
      secretAccessKey: this.config.s3SecretAccessKey,
      bucketName: this.config.s3BucketName,
      publicUrl: this.config.s3PublicUrl,
    };
  }

  // Utility methods
  isDevelopment(): boolean {
    return import.meta.env.DEV;
  }

  isProduction(): boolean {
    return import.meta.env.PROD;
  }

  getMode(): string {
    return import.meta.env.MODE;
  }

  // Debug method to log all config (only in development)
  debugConfig(): void {
    if (this.features.enableDebug) {
      console.group("🔧 Environment Configuration");
      console.table(this.config);
      console.groupEnd();
    }
  }
}

// Export singleton instance
export const env = new EnvironmentService();

// Export types for TypeScript
export type { EnvironmentConfig };
