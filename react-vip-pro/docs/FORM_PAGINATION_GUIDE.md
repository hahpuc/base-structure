# Form Select Pagination Implementation Guide

## Overview

This guide explains how to implement paginated select inputs in your dynamic form component. The implementation allows you to load data in chunks as users scroll, improving performance for large datasets.

## Key Components

### 1. Form Component (`form.component.tsx`)

The form component handles pagination automatically when `usePagination` is set to `true`. It:

- Loads data in pages based on `pageSize`
- Supports infinite scroll (load more on scroll)
- Handles search/filter functionality
- Manages loading states

### 2. Type Definitions (`form.model.ts`)

The `ListPaginate<T>` type supports both response formats:

```typescript
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

### 3. Base Service (`base.service.ts`)

Your base service already provides `getByPaged()` method that accepts `BaseQuery`:

```typescript
getByPaged(params?: TQueryEntityDto): Promise<ApiResult<ListPaginate<TEntityDto>>>
```

## Implementation Steps

### Step 1: Configure the Control

Add a select control with pagination enabled:

```typescript
{
  name: "ward_pagination_id",
  label: "Ward (with Pagination)",
  type: "select",
  placeholder: "Select ward",
  className: "col-span-1",

  // Pagination Configuration
  usePagination: true,      // Enable pagination
  pageSize: 10,             // Items per page (default: 20)
  showSearch: true,         // Enable search
  allowClear: true,         // Allow clearing selection

  // Options function
  options: (async (query: BaseQuery) => {
    // Convert BaseQuery to your specific QueryDto
    const wardQuery: QueryWard = {
      page: query.page,
      limit: query.limit,
      filter: query.filter,
    };

    // Call service with pagination
    return await wardService.getByPaged(wardQuery);
  }) as (input: BaseQuery) => Promise<ApiResult<ListPaginate<unknown>>>,
}
```

### Step 2: Type Casting (Important!)

The `as (input: BaseQuery) => Promise<ApiResult<ListPaginate<unknown>>>` type assertion is **required** because TypeScript cannot automatically infer which function overload to use from the union type.

### Step 3: Query Parameter Mapping

The form component passes a `BaseQuery` object with:

- `page`: Current page number
- `limit`: Page size (from `pageSize` property)
- `filter`: Search text (when user types in the select)

Map these to your specific query type:

```typescript
const wardQuery: QueryWard = {
  page: query.page,
  limit: query.limit,
  filter: query.filter,
  // Add any additional filters specific to your query
};
```

## How It Works

### Loading Process

1. **Initial Load**: Component loads first page when mounted
2. **Search**: When user types, it resets to page 1 with filter
3. **Scroll**: When user scrolls to bottom, loads next page
4. **Infinite Scroll**: New items are appended to existing options

### Data Mapping

The form component automatically maps your API response to select options:

```typescript
options = result.data?.data.map((item) => ({
  label: item.name || item.label || item.title,
  value: item.id || item.value,
}));
```

Make sure your DTOs have either:

- `name`, `label`, or `title` for the label
- `id` or `value` for the value

### Pagination Detection

The component calculates if more data is available using:

```typescript
const totalPages = result.data?.total_pages ?? 0;
const totalRecords = result.data?.total_records ?? 0;
hasMore = totalPages > page || totalRecords > page * pageSize;
```

## Configuration Options

| Property        | Type    | Default | Description                        |
| --------------- | ------- | ------- | ---------------------------------- |
| `usePagination` | boolean | false   | Enable pagination for this select  |
| `pageSize`      | number  | 20      | Number of items per page           |
| `showSearch`    | boolean | false   | Enable search/filter functionality |
| `allowClear`    | boolean | false   | Show clear button                  |

## Complete Example

```typescript
import { BaseQuery, ListPaginate } from "@/types/base";
import { QueryWard } from "@/types/ward";
import { wardService } from "@/services/ward.service";
import { ApiResult } from "@/services/client/api-result";

const formOptions: FormOption = {
  controls: [
    {
      name: "ward_id",
      label: "Ward",
      type: "select",
      placeholder: "Select ward",
      required: true,
      usePagination: true,
      pageSize: 20,
      showSearch: true,
      allowClear: true,
      options: (async (query: BaseQuery) => {
        const wardQuery: QueryWard = {
          page: query.page,
          limit: query.limit,
          filter: query.filter,
          // Add custom filters if needed
          status: EStatus.ACTIVE,
        };

        return await wardService.getByPaged(wardQuery);
      }) as (input: BaseQuery) => Promise<ApiResult<ListPaginate<unknown>>>,
    },
  ],
};
```

## Non-Paginated Select (for comparison)

If you don't need pagination, use the simpler format:

```typescript
{
  name: "category_id",
  label: "Category",
  type: "select",
  placeholder: "Select category",
  // No usePagination flag
  options: async () => {
    const result = await categoryService.getAll();
    if (result.isSuccess && result.data) {
      return result.data.map((category) => ({
        label: category.name,
        value: category.id,
      }));
    }
    return [];
  },
}
```

## Troubleshooting

### Issue: Type error on options function

**Solution**: Add the type assertion `as (input: BaseQuery) => Promise<ApiResult<ListPaginate<unknown>>>`

### Issue: Options not loading

**Check**:

1. `usePagination` is set to `true`
2. Service returns data in the correct format
3. DTO has `name`/`label`/`title` and `id`/`value` properties

### Issue: Search not working

**Check**:

1. `showSearch` is set to `true`
2. Backend supports `filter` parameter in query
3. Backend filters results based on the filter value

### Issue: Infinite scroll not working

**Check**:

1. Backend returns correct `total_pages` or `total_records`
2. Backend returns `hasMore` flag or enough data for calculation
3. Page size is correctly set

## Backend Requirements

Your API endpoint should:

1. Accept query parameters: `page`, `limit`, `filter`
2. Return response with structure:

```typescript
{
  data: T[],
  total_records: number,
  total_pages: number,
  page: number,
  limit: number,
  hasMore: boolean // optional, calculated from total_pages
}
```

## Performance Tips

1. **Choose appropriate page size**:

   - Too small: Many requests
   - Too large: Slow initial load
   - Recommended: 10-20 items

2. **Enable search only when needed**: Search triggers additional API calls

3. **Use proper indexing**: Ensure your database has indexes on searchable fields

4. **Consider caching**: For static or rarely-changing data, consider caching responses

## Related Files

- `src/components/forms/form/form.component.tsx` - Form component implementation
- `src/components/forms/form/models/form.model.ts` - Type definitions
- `src/services/base.service.ts` - Base service with pagination
- `src/pages/forms-antd/dynamic-forms.page.tsx` - Example implementation
