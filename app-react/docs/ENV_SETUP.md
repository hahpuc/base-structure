# 🔧 Environment Configuration Guide

This guide explains how to set up and configure environment variables for the React Admin Dashboard.

## 📁 Environment Files Structure

```
app-react/
├── .env                    # Default environment variables (committed)
├── .env.local             # Local overrides (not committed)
├── .env.development       # Development environment
├── .env.test             # Testing environment
├── .env.staging          # Staging environment
├── .env.production       # Production environment
└── src/services/envService.ts  # Environment service
```

## 🚀 Quick Setup

### 1. Copy the main environment file

```bash
cp .env .env.local
```

### 2. Update `.env.local` with your settings

```bash
# Update these values for your local development
VITE_API_URL=http://localhost:3001
VITE_APP_TITLE=My Admin Dashboard
```

### 3. Backend Configuration

Make sure your backend NestJS app is running on the configured port:

```bash
# In your be-nestjs directory
npm run start:dev
```

## 📋 Environment Variables Reference

### 🌐 API Configuration

| Variable          | Description      | Default                 | Example                      |
| ----------------- | ---------------- | ----------------------- | ---------------------------- |
| `VITE_API_URL`    | Backend API URL  | `http://localhost:3001` | `https://api.yourdomain.com` |
| `VITE_API_PREFIX` | API route prefix | `/api/v1`               | `/api/v2`                    |

### 📱 App Configuration

| Variable               | Description       | Default                        | Example                     |
| ---------------------- | ----------------- | ------------------------------ | --------------------------- |
| `VITE_APP_TITLE`       | Application title | `React Admin Dashboard`        | `My Company Admin`          |
| `VITE_APP_VERSION`     | App version       | `1.0.0`                        | `2.1.3`                     |
| `VITE_APP_DESCRIPTION` | App description   | `Modern React Admin Dashboard` | `Company Management System` |

### 🔐 Authentication

| Variable                       | Description                  | Default         | Example       |
| ------------------------------ | ---------------------------- | --------------- | ------------- |
| `VITE_TOKEN_STORAGE_KEY`       | Access token storage key     | `access_token`  | `jwt_token`   |
| `VITE_REFRESH_TOKEN_KEY`       | Refresh token storage key    | `refresh_token` | `refresh_jwt` |
| `VITE_TOKEN_REFRESH_THRESHOLD` | Token refresh threshold (ms) | `300000`        | `600000`      |

### 🎛️ Features

| Variable                | Description               | Default       | Example |
| ----------------------- | ------------------------- | ------------- | ------- |
| `VITE_ENABLE_MOCK_API`  | Enable mock API responses | `true`        | `false` |
| `VITE_ENABLE_DEBUG`     | Enable debug mode         | `true` in dev | `false` |
| `VITE_ENABLE_ANALYTICS` | Enable analytics          | `false`       | `true`  |

### 🎨 UI Configuration

| Variable                | Description             | Default | Example |
| ----------------------- | ----------------------- | ------- | ------- |
| `VITE_DEFAULT_LANGUAGE` | Default language        | `en`    | `vi`    |
| `VITE_DEFAULT_THEME`    | Default theme           | `light` | `dark`  |
| `VITE_ITEMS_PER_PAGE`   | Default pagination size | `20`    | `50`    |

### 📁 File Upload

| Variable                  | Description            | Default                                          | Example                   |
| ------------------------- | ---------------------- | ------------------------------------------------ | ------------------------- |
| `VITE_MAX_FILE_SIZE`      | Max file size in bytes | `5242880` (5MB)                                  | `10485760` (10MB)         |
| `VITE_ALLOWED_FILE_TYPES` | Allowed MIME types     | `image/jpeg,image/png,image/gif,application/pdf` | `image/*,application/pdf` |

## 🛠️ Environment Service Usage

The app includes a centralized environment service for type-safe access to environment variables:

```typescript
import { env } from '@/services/envService';

// API configuration
console.log(env.api.url); // http://localhost:3001
console.log(env.api.prefix); // /api/v1
console.log(env.api.fullUrl); // http://localhost:3001/api/v1

// App configuration
console.log(env.app.title); // React Admin Dashboard
console.log(env.app.version); // 1.0.0

// Feature flags
if (env.features.enableDebug) {
  console.log('Debug mode enabled');
}

// Authentication
localStorage.setItem(env.auth.tokenStorageKey, token);

// UI settings
const theme = env.ui.defaultTheme;
const language = env.ui.defaultLanguage;
```

## 🌍 Environment-Specific Configurations

### Development (.env.development)

```bash
VITE_API_URL=http://localhost:3001
VITE_ENABLE_MOCK_API=true
VITE_ENABLE_DEBUG=true
VITE_LOG_LEVEL=debug
```

### Testing (.env.test)

```bash
VITE_API_URL=https://api-test.yourdomain.com
VITE_ENABLE_MOCK_API=false
VITE_ENABLE_DEBUG=true
VITE_LOG_LEVEL=info
```

### Staging (.env.staging)

```bash
VITE_API_URL=https://api-staging.yourdomain.com
VITE_ENABLE_MOCK_API=false
VITE_ENABLE_DEBUG=false
VITE_ENABLE_ANALYTICS=true
VITE_LOG_LEVEL=warn
```

### Production (.env.production)

```bash
VITE_API_URL=https://api.yourdomain.com
VITE_ENABLE_MOCK_API=false
VITE_ENABLE_DEBUG=false
VITE_ENABLE_ANALYTICS=true
VITE_LOG_LEVEL=error
```

## 🔒 Security Best Practices

### ✅ DO:

- ✅ Use `.env.local` for sensitive local development settings
- ✅ Prefix all variables with `VITE_` to expose them to the frontend
- ✅ Use different API URLs for different environments
- ✅ Keep sensitive data in backend environment variables
- ✅ Validate environment variables on app startup

### ❌ DON'T:

- ❌ Store secrets or API keys in frontend environment variables
- ❌ Commit `.env.local` to version control
- ❌ Use production URLs in development
- ❌ Include database credentials in frontend env files

## 🚦 Build Commands with Environments

```bash
# Development
npm run dev                    # Uses .env.development + .env.local

# Testing
npm run build:test            # Uses .env.test

# Staging
npm run build:staging         # Uses .env.staging

# Production
npm run build:prod            # Uses .env.production
```

## 🔍 Debugging Environment Variables

Use the environment service debug method:

```typescript
import { env } from '@/services/envService';

// Debug all environment variables (only in development)
env.debugConfig();
```

Or check them manually:

```typescript
console.log('Environment mode:', env.getMode());
console.log('Is development:', env.isDevelopment());
console.log('Is production:', env.isProduction());
```

## 📝 Adding New Environment Variables

1. **Add to environment files:**

   ```bash
   # Add to .env, .env.development, etc.
   VITE_NEW_FEATURE=true
   ```

2. **Update TypeScript types:**

   ```typescript
   // In src/vite-env.d.ts
   interface ImportMetaEnv {
     readonly VITE_NEW_FEATURE: string;
     // ... other variables
   }
   ```

3. **Add to environment service:**

   ```typescript
   // In src/services/envService.ts
   interface EnvironmentConfig {
     newFeature: boolean
     // ... other config
   }

   private loadConfig(): EnvironmentConfig {
     return {
       newFeature: this.getEnvBoolean('VITE_NEW_FEATURE', false),
       // ... other config
     }
   }
   ```

4. **Use in your app:**

   ```typescript
   import { env } from '@/services/envService';

   if (env.config.newFeature) {
     // Feature logic
   }
   ```

## 🆘 Troubleshooting

### Environment variables not loading?

1. Ensure variables are prefixed with `VITE_`
2. Restart the development server
3. Check the file names are correct
4. Verify the syntax in environment files

### API calls failing?

1. Check `VITE_API_URL` is correct
2. Ensure backend server is running
3. Verify CORS settings on backend
4. Check browser network tab for actual requests

### Build issues?

1. Ensure all required environment variables are set
2. Check for typos in variable names
3. Verify environment-specific files exist
4. Review build logs for missing variables

## 📚 Related Documentation

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [React Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [Backend API Documentation](../be-nestjs/README.md)
