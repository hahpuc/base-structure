# Language Module Implementation

This document provides an overview of the implemented language module with custom i18n service.

## Features

### 1. Database-backed Translations

- **Entities**: `Language`, `Translation`, `TranslationNamespace`
- **Support for multiple languages and namespaces**
- **Translation versioning and status management**

### 2. Custom I18nService

- **Database-backed translations** instead of JSON files
- **Built-in caching** for performance optimization (1-hour TTL)
- **Variable interpolation** support with `{{variable}}` syntax
- **Namespace support** for organizing translations
- **Fallback mechanism** to default values

### 3. Admin API Controllers

- **Language Management**: CRUD operations for languages
- **Translation Management**: CRUD operations, bulk import/export
- **File upload support** for bulk translation imports

### 4. Migration Support

- **Custom MessageService** that works with the new I18nService
- **Backward compatibility** approach for existing services

## Usage Examples

### Using the Custom I18nService

```typescript
import { I18nService } from '@modules/language/services/i18n.service';

@Injectable()
export class YourService {
  constructor(private readonly i18n: I18nService) {}

  async getTranslation() {
    // Basic translation
    const hello = await this.i18n.t('HELLO', {
      lang: 'en',
      namespace: 'common',
    });

    // Translation with variables
    const welcome = await this.i18n.t('WELCOME_MESSAGE', {
      lang: 'en',
      namespace: 'user',
      args: { name: 'John' },
      defaultValue: 'Welcome {{name}}!',
    });

    // Get all translations for a namespace
    const allCommonTranslations = await this.i18n.getTranslations(
      'common',
      'en',
    );

    // Get all translations for a language
    const allEnglishTranslations = await this.i18n.getAllTranslations('en');
  }
}
```

### Using the Custom MessageService

```typescript
import { CustomMessageService } from '@modules/language/services/custom-message.service';
import { I18nService } from '@modules/language/services/i18n.service';

@Injectable()
export class YourService {
  private messageService: CustomMessageService;

  constructor(private readonly i18n: I18nService) {
    this.messageService = new CustomMessageService(i18n, 'your-namespace');
  }

  async someMethod() {
    // Get translated message
    const message = await this.messageService.get(
      'ERROR_MESSAGE',
      undefined,
      {
        field: 'email',
      },
      'en',
    );

    throw new CustomError(400, 'VALIDATION_ERROR', message);
  }
}
```

## API Endpoints

### Language Management

- `GET /languages` - List languages with pagination
- `GET /languages/all` - Get all active languages
- `POST /languages` - Create a new language
- `PUT /languages` - Update a language
- `DELETE /languages/:id` - Delete a language
- `GET /languages/:id` - Get language by ID

### Cache Management

- `POST /languages/cache/refresh` - Manual cache refresh
- `GET /languages/cache/stats` - Get cache statistics
- `POST /languages/cache/warm-up` - Warm up cache manually
- `DELETE /languages/cache/:language` - Clear cache for specific language
- `DELETE /languages/cache/:language/:namespace` - Clear cache for specific namespace

### Translation Management

- `GET /translations` - List translations with pagination
- `GET /translations/all` - Get all translations
- `POST /translations` - Create a new translation
- `PUT /translations` - Update a translation
- `DELETE /translations/:id` - Delete a translation
- `POST /translations/bulk-import` - Bulk import from file
- `POST /translations/bulk-import-json` - Bulk import from JSON
- `GET /translations/export/:language` - Export translations

## Database Schema

### Languages Table

```sql
CREATE TABLE `languages` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `code` varchar(10) UNIQUE NOT NULL,
  `name` varchar(100) NOT NULL,
  `native_name` varchar(100) NOT NULL,
  `flag_code` varchar(10),
  `flag_icon` text,
  `is_rtl` boolean DEFAULT false,
  `status` tinyint DEFAULT 1,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Translation Namespaces Table

```sql
CREATE TABLE `translation_namespaces` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) UNIQUE NOT NULL,
  `description` varchar(255),
  `status` tinyint DEFAULT 1,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Translations Table

```sql
CREATE TABLE `translations` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `value` text NOT NULL,
  `description` text,
  `status` tinyint DEFAULT 1,
  `version` int DEFAULT 1,
  `namespace_id` int NOT NULL,
  `language_id` int NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (`namespace_id`) REFERENCES `translation_namespaces`(`id`),
  FOREIGN KEY (`language_id`) REFERENCES `languages`(`id`),

  UNIQUE KEY `unique_translation` (`namespace_id`, `key`, `language_id`),
  INDEX `idx_language_namespace` (`language_id`, `namespace_id`),
  INDEX `idx_key` (`key`)
);
```

## Migration from nestjs-i18n

1. **Update imports** in your services:

   ```typescript
   // Old
   import { I18nService } from 'nestjs-i18n';

   // New
   import { I18nService } from '@modules/language/services/i18n.service';
   ```

2. **Update MessageService usage**:

   ```typescript
   // Old (synchronous)
   const message = this.messageService.get('ERROR_KEY');

   // New (asynchronous)
   const message = await this.customMessageService.get('ERROR_KEY');
   ```

3. **Import LanguageModule** in your app module:
   ```typescript
   @Module({
     imports: [
       // ... other modules
       LanguageModule,
     ],
   })
   export class AppModule {}
   ```

## Caching Strategy

- **Cache TTL**: 1 hour (3600 seconds)
- **Cache Keys**:
  - `i18n_translations:{language}:{namespace}` - Specific namespace translations
  - `i18n_translations:all:{language}` - All translations for a language
  - `i18n_translations:languages` - Available languages list
- **Cache Invalidation**: Automatic on translation updates, creates, or deletes

## Performance Considerations

1. **Cache Warming**: All translations are preloaded into cache on application startup
2. **Periodic Refresh**: Cache is automatically refreshed every 4 hours and daily at midnight
3. **Bulk Operations**: Support for bulk import/export to handle large datasets
4. **Indexing**: Proper database indexes for efficient querying
5. **Smart Caching**: Both namespace-specific and language-wide caching strategies

### Cache Management Features

- **Startup Cache Warming**: Automatically loads all active translations on app start
- **Periodic Refresh**: Scheduled cache refreshes to keep data fresh
- **Manual Cache Control**: Admin endpoints for manual cache management
- **Cache Statistics**: Monitoring endpoints for cache performance
- **Selective Cache Clearing**: Clear cache for specific languages or namespaces

## Security & Permissions

All admin endpoints require authentication and specific permissions:

- `language_manage_create` - Create languages
- `language_manage_update` - Update languages
- `language_manage_delete` - Delete languages
- `translation_manage_create` - Create/import translations
- `translation_manage_update` - Update translations
- `translation_manage_delete` - Delete translations

# Language You can use translations like:

// Common translations
await this.i18nService.t('common.HELLO', 'en'); // "Hello"
await this.i18nService.t('common.HELLO', 'vi'); // "Xin chào"

// Category translations  
await this.i18nService.t('category.CREATE_CATEGORY', 'en'); // "Create Category"
await this.i18nService.t('category.CREATE_CATEGORY', 'vi'); // "Tạo danh mục"

// Validation messages
await this.i18nService.t('validation.REQUIRED', 'vi'); // "Trường này là bắt buộc"
