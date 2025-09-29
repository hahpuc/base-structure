# I18n Performance Strategy

## Overview

You're absolutely right to be concerned about performance! The implemented solution now includes both **cache warming on startup** and **periodic cache refresh** for optimal performance.

## Cache Strategy

### 1. **Startup Cache Warming** ✅

- **When**: Application startup (with 2-second delay for DB readiness)
- **What**: Preloads ALL active translations into cache
- **Benefit**: Zero cold-start latency for translation requests
- **Logs**: Detailed timing and statistics

```typescript
// Automatically called on app startup
await this.i18nService.warmUpCache();
```

### 2. **Periodic Cache Refresh** ✅

- **Every 4 hours**: Automatic cache refresh
- **Daily at midnight**: Full cache refresh with statistics
- **Manual trigger**: Admin endpoint for on-demand refresh

```typescript
@Cron(CronExpression.EVERY_4_HOURS)
async refreshCachePeriodically() {
  await this.i18nService.refreshCache();
}
```

### 3. **Smart Cache Management** ✅

- **Multi-level caching**: Language-wide + namespace-specific
- **Selective invalidation**: Clear specific language/namespace
- **Cache statistics**: Monitor performance and hit rates
- **Graceful degradation**: Fallbacks if cache fails

## Performance Benefits

### Before (On-demand loading):

```
First request: DB query (100-300ms)
Subsequent requests: Cache hit (1-5ms)
```

### After (Cache warming):

```
All requests: Cache hit (1-5ms)
No cold-start penalty
```

## Implementation Details

### Cache Keys Structure:

```
i18n_translations:en:common          # Namespace-specific
i18n_translations:all:en             # All translations for language
i18n_translations:languages          # Available languages list
```

### Startup Process:

1. App starts → 2s delay for DB readiness
2. Load all active translations from DB
3. Group by language and namespace
4. Bulk cache all translations
5. Log statistics (timing, counts)

### Monitoring & Administration:

- `GET /languages/cache/stats` - View cache performance
- `POST /languages/cache/refresh` - Manual refresh
- `POST /languages/cache/warm-up` - Re-warm cache
- Detailed logging for all cache operations

## Configuration Options

You can customize the cache behavior:

```typescript
// In i18n.service.ts
private readonly CACHE_TTL = 3600; // 1 hour - adjust as needed
private readonly DEFAULT_LANGUAGE = 'en'; // Your default language

// In i18n-cache.service.ts
@Cron(CronExpression.EVERY_4_HOURS) // Adjust frequency
```

## Production Recommendations

### 1. **Cache TTL**:

- **Development**: 1 hour (3600s) for frequent changes
- **Production**: 6-12 hours for stability

### 2. **Refresh Frequency**:

- **High-change environments**: Every 2-4 hours
- **Stable environments**: Once daily

### 3. **Monitoring**:

- Set up alerts for cache refresh failures
- Monitor cache hit rates via `/cache/stats` endpoint
- Track startup cache warming time

### 4. **Memory Considerations**:

- Estimate: ~1KB per 10 translations
- 10,000 translations ≈ 1MB cache memory
- Adjust `max` in CacheModule.register() accordingly

## Example Performance Results

Typical startup cache warming:

```
[I18nService] Starting cache warm-up...
[I18nService] Cache warm-up completed in 450ms.
Cached 2,847 translations across 15 namespaces in 5 languages.
```

Cache statistics example:

```json
{
  "languages": 5,
  "namespaces": {
    "common": 234,
    "auth": 89,
    "user": 156,
    "category": 45
  },
  "totalTranslations": 2847
}
```

This implementation ensures your i18n system will have excellent performance from the first request onwards! 🚀
