# Form Component - Responsive Grid with Tailwind CSS

## Overview

The form component now uses Tailwind CSS grid system instead of Ant Design's Row/Col for better flexibility and responsive design support.

## Grid Configuration

### FormOption Level (Global Grid Settings)

#### `gridCols` Property

Defines the number of columns in the grid with responsive breakpoints.

**Default**: `"grid-cols-1 md:grid-cols-2 lg:grid-cols-3"`

**Examples**:

```typescript
// Single column on mobile, 2 columns on tablet, 3 columns on desktop
gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

// Always 2 columns
gridCols: "grid-cols-2";

// Single column on mobile, 2 on medium, 4 on large screens
gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

// 12-column grid system (similar to Bootstrap)
gridCols: "grid-cols-12";
```

#### `gridGap` Property

Defines the gap between grid items.

**Default**: `"gap-4"`

**Examples**:

```typescript
// Fixed gap
gridGap: "gap-4"; // 1rem (16px)
gridGap: "gap-6"; // 1.5rem (24px)

// Responsive gaps
gridGap: "gap-2 md:gap-4 lg:gap-6";

// Different horizontal and vertical gaps
gridGap: "gap-x-4 gap-y-6";
```

### Control Level (Individual Field Settings)

#### `className` Property

Defines how many columns a field should span with responsive support.

**Default**: `"col-span-1"`

**Examples**:

```typescript
// Full width on all screens
className: "col-span-full";

// Half width on medium screens and up
className: "col-span-1 md:col-span-6";

// Responsive spanning
className: "col-span-12 md:col-span-6 lg:col-span-4";

// Full width on mobile, half on tablet, third on desktop
className: "col-span-1 md:col-span-1 lg:col-span-1"; // When parent has grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

## Complete Examples

### Example 1: Basic Responsive Form

```typescript
const formOptions: FormOption = {
  layout: "vertical",
  size: "large",

  // Grid configuration
  gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  gridGap: "gap-4",

  controls: [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      required: true,
      className: "col-span-1 md:col-span-2 lg:col-span-3", // Full width on all screens
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      className: "col-span-1 md:col-span-1 lg:col-span-2", // Responsive width
    },
    {
      name: "phone",
      label: "Phone",
      type: "text",
      className: "col-span-1", // Takes one column (mobile: full, tablet: half, desktop: third)
    },
    {
      name: "address",
      label: "Address",
      type: "textarea",
      className: "col-span-1 md:col-span-2 lg:col-span-3", // Full width
      rows: 4,
    },
  ],
};
```

### Example 2: Two Column Layout

```typescript
const formOptions: FormOption = {
  layout: "horizontal",
  size: "default",

  // Two columns on tablet and up, single column on mobile
  gridCols: "grid-cols-1 md:grid-cols-2",
  gridGap: "gap-6",

  controls: [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      required: true,
      className: "col-span-1", // Takes one column
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      required: true,
      className: "col-span-1", // Takes one column
    },
    {
      name: "bio",
      label: "Biography",
      type: "textarea",
      className: "col-span-1 md:col-span-2", // Full width
      rows: 5,
    },
  ],
};
```

### Example 3: Complex Layout with 12-Column Grid

```typescript
const formOptions: FormOption = {
  layout: "vertical",

  // 12-column grid system (like Bootstrap)
  gridCols: "grid-cols-12",
  gridGap: "gap-4",

  controls: [
    {
      name: "title",
      label: "Title",
      type: "text",
      className: "col-span-12", // Full width
    },
    {
      name: "province_id",
      label: "Province",
      type: "select",
      className: "col-span-12 md:col-span-6 lg:col-span-4", // Responsive
      options: async () => {
        const result = await provinceService.getAll();
        return result.data?.map((p) => ({ label: p.name, value: p.id })) || [];
      },
    },
    {
      name: "district_id",
      label: "District",
      type: "select",
      className: "col-span-12 md:col-span-6 lg:col-span-4",
      parent: { filterName: "province_id" },
      options: async (provinceId: number) => {
        const result = await districtService.getAll(provinceId);
        return result.data?.map((d) => ({ label: d.name, value: d.id })) || [];
      },
    },
    {
      name: "ward_id",
      label: "Ward",
      type: "select",
      className: "col-span-12 md:col-span-6 lg:col-span-4",
      parent: { filterName: "district_id" },
      options: async (districtId: number) => {
        const result = await wardService.getAll(districtId);
        return result.data?.map((w) => ({ label: w.name, value: w.id })) || [];
      },
    },
    {
      name: "status",
      label: "Status",
      type: "switch",
      className: "col-span-12",
      defaultValue: true,
    },
  ],
};
```

### Example 4: Mobile-First Design

```typescript
const formOptions: FormOption = {
  layout: "vertical",

  // Optimized for mobile
  gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  gridGap: "gap-3 md:gap-4 lg:gap-6",

  controls: [
    {
      name: "productName",
      label: "Product Name",
      type: "text",
      required: true,
      className: "col-span-1 sm:col-span-2 lg:col-span-4", // Full width
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      required: true,
      className: "col-span-1 sm:col-span-1 lg:col-span-2", // Half width on tablet, 50% on desktop
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      required: true,
      className: "col-span-1 sm:col-span-1 lg:col-span-2", // Half width on tablet, 50% on desktop
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      className: "col-span-1 sm:col-span-1 lg:col-span-2",
      options: [
        { label: "Electronics", value: 1 },
        { label: "Clothing", value: 2 },
        { label: "Food", value: 3 },
      ],
    },
    {
      name: "tags",
      label: "Tags",
      type: "select",
      mode: "tags",
      className: "col-span-1 sm:col-span-1 lg:col-span-2",
    },
  ],
};
```

## Tailwind CSS Grid Breakpoints

| Breakpoint | Min Width | Device        |
| ---------- | --------- | ------------- |
| (default)  | 0px       | Mobile        |
| `sm:`      | 640px     | Small tablet  |
| `md:`      | 768px     | Tablet        |
| `lg:`      | 1024px    | Desktop       |
| `xl:`      | 1280px    | Large desktop |
| `2xl:`     | 1536px    | Extra large   |

## Common Patterns

### Full Width Field

```typescript
className: "col-span-full";
// or for specific grid
className: "col-span-12";
```

### Half Width on Desktop

```typescript
// In a 2-column grid
className: "col-span-1";

// In a 12-column grid
className: "col-span-12 md:col-span-6";
```

### Third Width on Desktop

```typescript
// In a 3-column grid
className: "col-span-1";

// In a 12-column grid
className: "col-span-12 md:col-span-4";
```

### Two-Thirds Width

```typescript
// In a 3-column grid
className: "col-span-1 md:col-span-2";

// In a 12-column grid
className: "col-span-12 md:col-span-8";
```

## Migration from Ant Design Grid

### Old Way (Ant Design)

```typescript
{
  span: 12,  // Half width
  offset: 0,
}
```

### New Way (Tailwind)

```typescript
{
  className: "col-span-12 md:col-span-6",  // Full on mobile, half on tablet+
}
```

### Conversion Table (24-column to 12-column grid)

| Ant Design `span` | Tailwind `className` (in grid-cols-12) |
| ----------------- | -------------------------------------- |
| 24                | `col-span-12`                          |
| 12                | `col-span-6`                           |
| 8                 | `col-span-4`                           |
| 6                 | `col-span-3`                           |
| 4                 | `col-span-2`                           |

## Best Practices

1. **Mobile First**: Always start with mobile layout (`col-span-1`) and add responsive classes
2. **Consistent Gaps**: Use the same gap size across similar forms for consistency
3. **Full Width Fields**: Use `col-span-full` or `col-span-12` for textareas and long text inputs
4. **Group Related Fields**: Use the same column span for related fields (e.g., first name and last name)
5. **Test Responsiveness**: Always test your forms on different screen sizes

## Backward Compatibility

The old `span` and `gutter` properties still work but are deprecated. They will be converted automatically:

- `span: 24` → uses default grid behavior
- `gutter: 16` → converted to gap-4

It's recommended to migrate to the new `className` and `gridCols`/`gridGap` properties for better control.
