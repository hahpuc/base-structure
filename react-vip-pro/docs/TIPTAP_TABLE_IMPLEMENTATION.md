# TipTap Table Implementation Guide

## Overview

This document describes the complete table functionality implementation for your TipTap rich text editor in the React application.

## Files Created/Modified

### 1. Table Button Hook (`use-table.ts`)

**Location:** `/src/components/tiptap/components/tiptap-ui/table-button/use-table.ts`

This hook follows the same pattern as `use-text-align.ts` and provides:

- **Table Actions**: 11 different table operations
  - `addTable` - Insert a 3x3 table with header row
  - `insertRowTop` - Add row above current cell
  - `insertRowBottom` - Add row below current cell
  - `insertColumnLeft` - Add column to the left
  - `insertColumnRight` - Add column to the right
  - `mergeCellHorizontal` - Merge cells horizontally
  - `mergeCellVertical` - Merge cells vertically
  - `splitCellHorizontal` - Split cell horizontally
  - `splitCellVertical` - Split cell vertically
  - `deleteRow` - Remove current row
  - `deleteColumn` - Remove current column

**Key Functions:**

- `canPerformTableAction()` - Checks if action is available
- `performTableAction()` - Executes the table action
- `isInTable()` - Checks if cursor is in a table
- `useTable()` - React hook that manages table state

### 2. Table Button Component (`table-button.tsx`)

**Location:** `/src/components/tiptap/components/tiptap-ui/table-button/table-button.tsx`

A reusable button component for individual table actions, following the `TextAlignButton` pattern.

**Features:**

- Automatically shows/hides based on context
- Disabled state when action unavailable
- Icon support (uses icons from tiptap-icons folder)
- Optional text label
- Tooltip support
- Active state indication

**Usage Example:**

```tsx
<TableButton action="addTable" text="Add Table" />
<TableButton action="insertRowTop" />
```

### 3. Table Dropdown Menu Hook (`use-table-dropdown-menu.ts`)

**Location:** `/src/components/tiptap/components/tiptap-ui/table-button/use-table-dropdown-menu.ts`

Manages the dropdown menu state and filters available table actions.

**Features:**

- Filters actions based on context (in/out of table)
- `tableOptions` - Array of all available table actions with labels
- `canPerformAnyTableAction()` - Checks if any action is available
- `shouldShowTableDropdown()` - Visibility logic

### 4. Table Dropdown Menu Component (`table-dropdown-menu.tsx`)

**Location:** `/src/components/tiptap/components/tiptap-ui/table-button/table-dropdown-menu.tsx`

A dropdown menu that displays all available table actions, following the `ListDropdownMenu` pattern.

**Features:**

- Dynamic action filtering based on editor state
- Portal support for mobile
- Integrates with existing UI primitives (Card, ButtonGroup, etc.)

**Usage Example:**

```tsx
<TableDropdownMenu portal={isMobile} />
```

### 5. Barrel Export (`index.tsx`)

**Location:** `/src/components/tiptap/components/tiptap-ui/table-button/index.tsx`

Exports all table-related components and hooks for easy importing.

### 6. Table Node Styles (`table-node.less`)

**Location:** `/src/components/tiptap/components/tiptap-node/table-node/table-node.less`

Provides styling for tables including:

- Border styles
- Cell padding
- Header background
- Selected cell highlighting
- Column resize handle
- Responsive table wrapper

### 7. Simple Editor Integration (`simple-editor.tsx`)

**Location:** `/src/components/tiptap/components/tiptap-templates/simple/simple-editor.tsx`

**Added:**

1. TipTap table extension imports:

   ```tsx
   import { Table } from "@tiptap/extension-table";
   import { TableRow } from "@tiptap/extension-table-row";
   import { TableHeader } from "@tiptap/extension-table-header";
   import { TableCell } from "@tiptap/extension-table-cell";
   ```

2. Table extensions configuration:

   ```tsx
   Table.configure({
     resizable: true,
   }),
   TableRow,
   TableHeader,
   TableCell,
   ```

3. TableDropdownMenu in toolbar:

   ```tsx
   <ToolbarGroup>
     <TableDropdownMenu portal={isMobile} />
   </ToolbarGroup>
   ```

4. Table styles import

## Architecture Pattern

The implementation follows the exact same pattern as the existing `text-align-button`:

```
text-align-button/          table-button/
├── index.tsx              ├── index.tsx
├── text-align-button.tsx  ├── table-button.tsx
└── use-text-align.ts      ├── table-dropdown-menu.tsx
                           ├── use-table.ts
                           └── use-table-dropdown-menu.ts
```

## Icon Integration

All required icons are already in `/components/tiptap/components/tiptap-icons/`:

- ✅ add-table-icon.tsx
- ✅ insert-row-top-icon.tsx
- ✅ insert-row-bottom-icon.tsx
- ✅ insert-column-left-icon.tsx (exports as `InsertColumnLeft`)
- ✅ insert-column-right-icon.tsx (exports as `InsertColumnRight`)
- ✅ merge-cell-horizontal-icon.tsx
- ✅ merge-cell-vertical-icon.tsx
- ✅ split-cell-horizontal-icon.tsx
- ✅ split-cell-vertical-icon.tsx
- ✅ delete-row-icon.tsx
- ✅ delete-column-icon.tsx

## Usage in Editor

The table functionality is now available in the `SimpleEditor` toolbar:

1. **Add Table**: Click the table dropdown and select "Add table" to insert a 3x3 table
2. **Modify Table**: When cursor is in a table, the dropdown shows additional options:
   - Insert rows/columns
   - Merge/split cells
   - Delete rows/columns

## Dependencies Required

Make sure these packages are installed:

```bash
npm install @tiptap/extension-table @tiptap/extension-table-row @tiptap/extension-table-header @tiptap/extension-table-cell
```

Or with yarn:

```bash
yarn add @tiptap/extension-table @tiptap/extension-table-row @tiptap/extension-table-header @tiptap/extension-table-cell
```

## Features

✅ **11 Table Actions** - All standard table operations
✅ **Context-Aware UI** - Actions show/hide based on cursor position
✅ **Icon Support** - All actions have corresponding icons
✅ **Dropdown Menu** - Organized access to all table functions
✅ **Individual Buttons** - Can use `TableButton` for custom toolbars
✅ **Mobile Support** - Portal rendering for mobile devices
✅ **Resizable Columns** - Tables support column resizing
✅ **Styled Tables** - Professional table appearance with borders and headers
✅ **Type-Safe** - Full TypeScript support with proper types

## Code Quality

- Follows existing codebase patterns
- TypeScript strict mode compatible
- Consistent naming conventions
- Comprehensive JSDoc comments
- Reusable and composable components

## Next Steps

1. Install the required TipTap table packages (if not already installed)
2. Test the table functionality in your editor
3. Customize table styles in `table-node.less` if needed
4. Add keyboard shortcuts if desired (similar to text-align shortcuts)
5. Consider adding table-specific features like:
   - Background color for cells
   - Text alignment per cell
   - Table templates

## Testing

To test the table functionality:

1. Start your React app
2. Navigate to the TipTap editor page
3. Click the table dropdown in the toolbar
4. Select "Add table" to insert a table
5. Try different table operations by clicking inside cells and using the dropdown

Enjoy your new table functionality! 🎉
