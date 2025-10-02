# Form Component Migration Guide

## From Ant Design Grid to Tailwind CSS Grid

## Summary of Changes

### What Changed?

1. **Grid System**: Replaced Ant Design's `Row` and `Col` components with Tailwind CSS `grid` utility classes
2. **Responsive Support**: Added mobile-first responsive design with Tailwind breakpoints
3. **Simplified Configuration**: More intuitive grid configuration with `gridCols` and `gridGap`
4. **Better Flexibility**: Full control over responsive behavior using Tailwind classes

### Benefits

✅ **Mobile-First**: Better support for mobile devices and responsive design  
✅ **Consistent**: Uses the same design system (Tailwind CSS) throughout the project  
✅ **Flexible**: More control over layout with Tailwind's utility classes  
✅ **Modern**: Follows current best practices in web development  
✅ **Smaller Bundle**: Removes dependency on Ant Design's grid components

## Migration Steps

### Step 1: Update FormOption Configuration

#### Before (Ant Design Grid)

```typescript
const formOptions: FormOption = {
  layout: "horizontal",
  size: "large",
  gutter: 16, // ❌ Old way
  controls: [
    {
      name: "name",
      span: 12, // ❌ Old way
    },
    {
      name: "email",
      span: 12, // ❌ Old way
    },
  ],
};
```

#### After (Tailwind Grid)

```typescript
const formOptions: FormOption = {
  layout: "horizontal",
  size: "large",
  gridCols: "grid-cols-1 md:grid-cols-2", // ✅ New way
  gridGap: "gap-4 md:gap-6", // ✅ New way
  controls: [
    {
      name: "name",
      className: "col-span-1", // ✅ New way
    },
    {
      name: "email",
      className: "col-span-1", // ✅ New way
    },
  ],
};
```

### Step 2: Convert Span Values

| Old (Ant Design) | New (Tailwind) - 2 columns              | New (Tailwind) - 3 columns              |
| ---------------- | --------------------------------------- | --------------------------------------- |
| `span: 24`       | `className: "col-span-1 md:col-span-2"` | `className: "col-span-1 md:col-span-3"` |
| `span: 12`       | `className: "col-span-1"`               | `className: "col-span-1 md:col-span-1"` |
| `span: 8`        | N/A (use 3-col grid)                    | `className: "col-span-1"`               |
| `span: 6`        | N/A (use 4-col grid)                    | N/A                                     |

### Step 3: Add Responsive Behavior

```typescript
// Example: Full width on mobile, half on tablet, third on desktop
{
  name: "field",
  className: "col-span-1 md:col-span-1 lg:col-span-1",
}

// When using: gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
// Mobile: Takes full width (1 column)
// Tablet: Takes half width (1 of 2 columns)
// Desktop: Takes third width (1 of 3 columns)
```

## Common Patterns

### Pattern 1: Two Column Form (Most Common)

```typescript
const formOptions: FormOption = {
  gridCols: "grid-cols-1 md:grid-cols-2",
  gridGap: "gap-4",
  controls: [
    {
      name: "firstName",
      className: "col-span-1", // Half width on tablet+
    },
    {
      name: "lastName",
      className: "col-span-1", // Half width on tablet+
    },
    {
      name: "email",
      className: "col-span-1 md:col-span-2", // Full width
    },
  ],
};
```

### Pattern 2: Three Column Form

```typescript
const formOptions: FormOption = {
  gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  gridGap: "gap-4",
  controls: [
    {
      name: "field1",
      className: "col-span-1", // Takes 1 column
    },
    {
      name: "field2",
      className: "col-span-1", // Takes 1 column
    },
    {
      name: "field3",
      className: "col-span-1", // Takes 1 column
    },
    {
      name: "fullWidth",
      className: "col-span-1 md:col-span-2 lg:col-span-3", // Full width
    },
  ],
};
```

### Pattern 3: Complex Layout (12-Column Grid)

```typescript
const formOptions: FormOption = {
  gridCols: "grid-cols-12",
  gridGap: "gap-4",
  controls: [
    {
      name: "title",
      className: "col-span-12", // Full width
    },
    {
      name: "firstName",
      className: "col-span-12 md:col-span-6 lg:col-span-4",
    },
    {
      name: "lastName",
      className: "col-span-12 md:col-span-6 lg:col-span-4",
    },
    {
      name: "middleName",
      className: "col-span-12 md:col-span-12 lg:col-span-4",
    },
  ],
};
```

## Real World Example

### Before: CreateEditWardPage (Old)

```typescript
const formOptions: FormOption = {
  layout: "horizontal",
  size: "large",
  gutter: 16,
  controls: [
    {
      name: "name",
      label: "Name",
      type: "text",
      span: 12,
    },
    {
      name: "province_id",
      label: "Province",
      type: "select",
      span: 12,
    },
    {
      name: "ward_id",
      label: "Ward",
      type: "select",
      span: 12,
    },
    {
      name: "status",
      label: "Status",
      type: "switch",
      span: 24,
    },
  ],
};
```

### After: CreateEditWardPage (New)

```typescript
const formOptions: FormOption = {
  layout: "horizontal",
  size: "large",

  // Mobile-first responsive grid
  gridCols: "grid-cols-1 md:grid-cols-2",
  gridGap: "gap-4 md:gap-6",

  controls: [
    {
      name: "name",
      label: "Name",
      type: "text",
      className: "col-span-1", // Half width on tablet+
    },
    {
      name: "province_id",
      label: "Province",
      type: "select",
      className: "col-span-1", // Half width on tablet+
    },
    {
      name: "ward_id",
      label: "Ward",
      type: "select",
      className: "col-span-1 md:col-span-2", // Full width
    },
    {
      name: "status",
      label: "Status",
      type: "switch",
      className: "col-span-1 md:col-span-2", // Full width
    },
  ],
};
```

## Responsive Breakpoints Reference

| Breakpoint | Screen Size | Typical Device |
| ---------- | ----------- | -------------- |
| (default)  | < 640px     | Mobile phones  |
| `sm:`      | ≥ 640px     | Large phones   |
| `md:`      | ≥ 768px     | Tablets        |
| `lg:`      | ≥ 1024px    | Desktops       |
| `xl:`      | ≥ 1280px    | Large desktops |
| `2xl:`     | ≥ 1536px    | Extra large    |

## Testing Checklist

After migration, test your forms on:

- [ ] Mobile (< 640px) - Should show single column
- [ ] Tablet (768px - 1024px) - Should show configured grid
- [ ] Desktop (> 1024px) - Should show full grid layout
- [ ] Form validation still works
- [ ] Dynamic fields (showWhen, enableWhen) still work
- [ ] Parent-child filters still work
- [ ] Default values are applied correctly

## Troubleshooting

### Issue: Fields are too narrow on mobile

**Solution**: Make sure your `className` includes `col-span-1` for mobile:

```typescript
className: "col-span-1 md:col-span-6"; // ✅ Good
className: "md:col-span-6"; // ❌ Bad - no mobile fallback
```

### Issue: Fields not spanning correctly

**Solution**: Ensure your `gridCols` and `className` values match:

```typescript
// Using 2-column grid
gridCols: "grid-cols-1 md:grid-cols-2";
// Field should use col-span-1 or col-span-2
className: "col-span-1"; // ✅ Correct
className: "col-span-6"; // ❌ Wrong - only works with 12-col grid
```

### Issue: Gaps too small/large on mobile

**Solution**: Use responsive gap classes:

```typescript
gridGap: "gap-2 md:gap-4 lg:gap-6"; // ✅ Responsive gaps
gridGap: "gap-8"; // ❌ Same gap on all screens
```

## Need Help?

- See [FORM_RESPONSIVE_GRID.md](./FORM_RESPONSIVE_GRID.md) for detailed examples
- Check Tailwind CSS documentation: https://tailwindcss.com/docs/grid-template-columns
- Review the updated CreateEditWardPage for a working example

## Backward Compatibility

The old `span` and `gutter` properties still work but will be removed in future versions. They are automatically converted to default grid behavior. Please migrate to `className` and `gridCols`/`gridGap` for full control.
