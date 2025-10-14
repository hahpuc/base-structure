# Form Pagination with Parent-Child Relationship - Implementation Summary

## Overview

This document summarizes the implementation of paginated select controls with parent-child relationships, including support for multiple selection in parent controls.

## Key Features Implemented

### 1. **Paginated Select with Search**

- Load data in pages (default 20 items, configurable via `pageSize`)
- Infinite scroll to load more data
- Search functionality with backend filter support
- Fixed search trigger issue (now works with `showSearch` flag)

### 2. **Paginated Parent-Child Relationship**

- Parent select with pagination
- Child select with pagination that depends on parent value(s)
- Support for multiple selection in parent
- Automatic child clearing when parent changes

### 3. **Multiple Selection Support**

- Parent can have `mode: "multiple"` for selecting multiple values
- Child filter receives array of parent IDs
- Proper validation for array values

## Implementation Details

### Form Component Updates (`form.component.tsx`)

#### 1. Enhanced `loadSelectOptions` Function

Now supports parent value parameter for child filters:

```typescript
const loadSelectOptions = useCallback(
  async (
    control: FtFormControl,
    searchText = "",
    page = 1,
    parentValue?: string | number
  ) => {
    // Uses different state key for child filters: `${control.name}_${parentValue}`
    // Supports both parent and child paginated filters
  }
);
```

#### 2. Updated `handleValuesChange`

Handles both paginated and non-paginated child filters:

```typescript
// Check if child uses pagination
if (childControl.usePagination) {
  loadSelectOptions(childControl, "", 1, parentValue as string | number);
} else {
  loadChildFilterOptions(childControl, parentValue as string | number);
}
```

#### 3. Enhanced Select Rendering

Properly handles paginated child filters:

```typescript
// For child filters with pagination
if (control.parent && control.usePagination) {
  const filterKey = `${control.name}_${parentValue}`;
  selectState = selectOptionsState[filterKey];
}
```

#### 4. Fixed Search Functionality

Added `filterOption` prop to disable client-side filtering for paginated selects:

```typescript
<Select
  filterOption={!control.usePagination} // Disable client-side filter for paginated
  onSearch={
    control.usePagination && (control.showSearch || control.searchable)
      ? (value) => loadSelectOptions(control, value, 1, currentParentValue)
      : undefined
  }
/>
```

### Type Definitions (`form.model.ts`)

Added support for paginated child filters:

```typescript
options?:
  // ... other types
  | ((input: BaseQuery) => Promise<ApiResult<ListPaginate<unknown>>>)
  // NEW: For paginated child filters with parent dependency
  | ((input: BaseQuery, parentValue: string | number) => Promise<ApiResult<ListPaginate<unknown>>>)
```

### Dynamic Form Page Example

#### Province with Multiple Selection (Pagination)

```typescript
{
  name: "province_pagination_id",
  label: "Province (with Pagination - Multiple)",
  type: "select",
  placeholder: "Select provinces",
  usePagination: true,
  pageSize: 10,
  showSearch: true,
  allowClear: true,
  mode: "multiple", // Multiple selection
  options: (async (query: BaseQuery) => {
    const provinceQuery: QueryProvince = {
      page: query.page,
      limit: query.limit,
      filter: query.filter,
    };
    return await provinceService.getByPaged(provinceQuery);
  }) as (input: BaseQuery) => Promise<ApiResult<ListPaginate<unknown>>>,
}
```

#### Ward Depending on Multiple Provinces (Pagination)

```typescript
{
  name: "ward_pagination_id",
  label: "Ward (with Pagination - depends on Provinces)",
  type: "select",
  placeholder: "Select ward",
  usePagination: true,
  pageSize: 10,
  showSearch: true,
  allowClear: true,
  enableWhen: (form) => {
    return !!(form.province_pagination_id &&
              Array.isArray(form.province_pagination_id) &&
              form.province_pagination_id.length > 0);
  },
  showWhen: (form) => {
    return !!(form.province_pagination_id &&
              Array.isArray(form.province_pagination_id) &&
              form.province_pagination_id.length > 0);
  },
  parent: {
    filterName: "province_pagination_id",
  },
  options: (async (query: BaseQuery, province_ids?: string | number) => {
    if (!province_ids) return { isSuccess: false, data: null };

    // Handle multiple selection - convert to array
    const provinceIdsArray = Array.isArray(province_ids)
      ? province_ids.map(id => +id)
      : [+province_ids];

    const wardQuery: QueryWard = {
      page: query.page,
      limit: query.limit,
      filter: query.filter,
      province_ids: provinceIdsArray, // Use array for multiple provinces
    };

    return await wardService.getByPaged(wardQuery);
  }) as (input: BaseQuery, parentValue?: string | number) => Promise<ApiResult<ListPaginate<unknown>>>,
}
```

## How It Works

### 1. Initial Load

- Parent control loads first page on mount
- Child control is disabled until parent has value(s)

### 2. Parent Selection

- User selects one or more provinces
- Child control becomes enabled
- Child control loads first page with parent value(s)

### 3. Search in Parent

- User types in parent select
- `onSearch` triggers with search text
- `loadSelectOptions` called with `filter` parameter
- Backend filters results, returns matching page 1

### 4. Scroll in Parent

- User scrolls to bottom
- `onPopupScroll` detects scroll reached bottom
- Checks `hasMore` flag
- Loads next page and appends to existing options

### 5. Parent Change

- User changes parent selection
- Child value is cleared automatically
- Child options are reset
- New options loaded for new parent value(s)

### 6. Search in Child

- User types in child select
- `onSearch` triggers with search text and parent value(s)
- Backend filters results for selected province(s)
- Returns matching results

## Key Points

### Multiple Selection Handling

When parent has `mode: "multiple"`:

- Parent value is an array: `[1, 2, 3]`
- Form component passes entire array to child's options function
- Child function must handle array properly:
  ```typescript
  const provinceIdsArray = Array.isArray(province_ids)
    ? province_ids.map((id) => +id)
    : [+province_ids];
  ```

### State Management

- Parent filters use `control.name` as state key
- Child filters use `${control.name}_${parentValue}` as state key
- This allows same child control to have different options for different parent values

### enableWhen vs showWhen

- `enableWhen`: Control is visible but disabled
- `showWhen`: Control is completely hidden
- Use `!!` to convert to boolean for TypeScript

### Backend Requirements

Your backend must support:

1. `page`, `limit` parameters for pagination
2. `filter` parameter for search
3. `province_ids` array parameter for filtering by multiple provinces
4. Return format matching `ListPaginate<T>` type

## Testing Checklist

- [x] Parent select loads first page
- [x] Parent search filters correctly
- [x] Parent infinite scroll loads more pages
- [x] Child is disabled when parent is empty
- [x] Child enables when parent has value(s)
- [x] Child loads correct data for selected parent(s)
- [x] Child clears when parent changes
- [x] Child search works with parent filter
- [x] Child infinite scroll works
- [x] Multiple province selection works
- [x] Ward loads for multiple provinces

## Files Modified

1. `/src/components/forms/form/form.component.tsx`

   - Enhanced `loadSelectOptions` with parent value support
   - Updated `handleValuesChange` for paginated children
   - Fixed search functionality
   - Enhanced select rendering for paginated children

2. `/src/components/forms/form/models/form.model.ts`

   - Added type signature for paginated child filters

3. `/src/pages/forms-antd/dynamic-forms.page.tsx`
   - Added `province_pagination_id` with multiple selection
   - Updated `ward_pagination_id` to depend on multiple provinces
   - Used `province_ids` array for ward query

## Related Documentation

- [FORM_PAGINATION_GUIDE.md](./FORM_PAGINATION_GUIDE.md) - Basic pagination implementation
- [REFACTOR_LIST_PAGINATE_TYPE.md](./REFACTOR_LIST_PAGINATE_TYPE.md) - Type refactoring details
