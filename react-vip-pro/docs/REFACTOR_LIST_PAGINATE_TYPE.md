# Refactor: Remove Duplicate ListPaginate Type

## Overview

This refactor removes the duplicate `ListPaginate<T>` type definition from `form.model.ts` and consolidates it to use the single source of truth in `base.ts`.

## Changes Made

### 1. Updated `src/types/base.ts`

Added optional compatibility fields to `ListPaginate<T>`:

```typescript
export type ListPaginate<T> = {
  data: T[];
  total_records: number;
  limit: number;
  page: number;
  total_pages: number;
  // Optional fields for compatibility with different API responses
  total?: number; // Alias for total_records
  size?: number; // Alias for limit
  hasMore?: boolean; // Calculated or provided by API
};
```

**Why these optional fields?**

- `total`: Some APIs might use `total` instead of `total_records`
- `size`: Some APIs might use `size` instead of `limit`
- `hasMore`: Used by the form component to determine if more data can be loaded

### 2. Updated `src/components/forms/form/models/form.model.ts`

- **Removed** the duplicate `ListPaginate<T>` type definition
- **Added** import: `import { BaseQuery, ListPaginate } from "@/types/base";`

**Before:**

```typescript
import { BaseQuery } from "@/types/base";

export type ListPaginate<T> = {
  data: T[];
  total: number;
  total_records: number;
  total_pages: number;
  page: number;
  limit: number;
  size: number;
  hasMore: boolean;
};
```

**After:**

```typescript
import { BaseQuery, ListPaginate } from "@/types/base";
// ListPaginate type removed - now using the one from base.ts
```

### 3. Updated `src/components/forms/form/form.component.tsx`

- **Changed** import to get `ListPaginate` from `@/types/base` instead of `./models/form.model`

**Before:**

```typescript
import {
  // ...
  ListPaginate,
  // ...
} from "./models/form.model";
import { BaseQuery } from "@/types/base";
```

**After:**

```typescript
import // ...
// ListPaginate removed from here
"./models/form.model";
import { BaseQuery, ListPaginate } from "@/types/base";
```

### 4. Updated `src/components/forms/form/index.ts`

- **Added** re-export for `ListPaginate` from `@/types/base` for convenience

```typescript
export type { ListPaginate } from "@/types/base";
```

This allows consumers to still import `ListPaginate` from `@/components/forms/form` if needed, maintaining backward compatibility.

## Benefits

1. **Single Source of Truth**: `ListPaginate<T>` is now defined only in `base.ts`
2. **Consistency**: All parts of the application use the same type definition
3. **Maintainability**: Future changes to the pagination structure only need to be made in one place
4. **Backward Compatibility**: The re-export in the form index ensures existing imports still work

## Import Options

After this refactor, you can import `ListPaginate` from either location:

```typescript
// Option 1: Direct from base (recommended)
import { ListPaginate } from "@/types/base";

// Option 2: From form component (backward compatible)
import { ListPaginate } from "@/components/forms/form";
```

Both work, but Option 1 is recommended as it's more explicit about where the type is defined.

## Files Modified

1. `src/types/base.ts` - Enhanced `ListPaginate<T>` with optional fields
2. `src/components/forms/form/models/form.model.ts` - Removed duplicate type, added import
3. `src/components/forms/form/form.component.tsx` - Updated import source
4. `src/components/forms/form/index.ts` - Added re-export for convenience
5. `docs/FORM_PAGINATION_GUIDE.md` - Updated documentation to reflect correct import

## Testing Checklist

- [x] No TypeScript compilation errors
- [x] Form component still works correctly
- [x] Pagination functionality unchanged
- [x] All imports resolved correctly
- [ ] Manual testing of paginated select controls
- [ ] Verify API responses still map correctly
