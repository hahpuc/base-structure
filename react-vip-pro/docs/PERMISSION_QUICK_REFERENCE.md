# Permission System - Quick Reference

## 🚀 Quick Start

### 1. Add Permission to Table Column

```typescript
{
  title: "Email",
  name: "email",
  type: "text",
  permission: "users_view_email", // Add this line
}
```

### 2. Add Permission to Table Action

```typescript
{
  label: "Edit",
  icon: <PencilIcon />,
  handler: handleEdit,
  permission: "users_edit", // Add this line
}
```

### 3. Add Permission to Header Button

```typescript
useHeader("User Management", [
  {
    id: "create-user",
    title: "Create",
    icon: "plus",
    type: "primary",
    permission: "users_create", // Add this line
    handler: () => navigate("/user/create"),
  },
]);
```

### 4. Check Permission in Component

```typescript
import { usePermission } from "@/hooks/use-permission.hook";

const MyComponent = () => {
  const { hasPermission } = usePermission();

  return <div>{hasPermission("users_create") && <CreateButton />}</div>;
};
```

### 5. Use Permission Guard Component

```typescript
import { PermissionGuard } from "@/components/common/permission-guard";

<PermissionGuard permission="users_create">
  <CreateUserButton />
</PermissionGuard>;
```

## 📋 Permission Naming Convention

Follow this pattern: `module_action_resource`

### Common Patterns:

```
✅ role_manage_create
✅ role_manage_read
✅ role_manage_edit
✅ role_manage_delete

✅ users_create
✅ users_view
✅ users_edit
✅ users_delete
✅ users_view_email
✅ users_view_phone

✅ reports_view
✅ reports_export

✅ admin_access
```

## 🎯 Common Use Cases

### Hide Sensitive Table Columns

```typescript
columns: [
  { title: "Name", name: "name", type: "text" },
  {
    title: "Salary",
    name: "salary",
    type: "number",
    permission: "users_view_salary", // Only show if user has permission
  },
];
```

### Multiple Actions with Different Permissions

```typescript
actions: [
  {
    label: "View",
    handler: handleView,
    // No permission - everyone can view
  },
  {
    label: "Edit",
    handler: handleEdit,
    permission: "users_edit",
  },
  {
    label: "Delete",
    handler: handleDelete,
    permission: "users_delete",
  },
];
```

### Conditional Rendering

```typescript
const { hasPermission, hasPermissions, hasAnyPermission } = usePermission();

// Single permission
{
  hasPermission("users_create") && <CreateButton />;
}

// Multiple permissions (ALL required)
{
  hasPermissions(["users_view", "users_edit"]) && <EditForm />;
}

// Multiple permissions (ANY required)
{
  hasAnyPermission(["admin_access", "superadmin_access"]) && <AdminPanel />;
}
```

### Protect Entire Page

```typescript
import { PermissionGuard } from "@/components/common/permission-guard";

const AdminPage = () => {
  return (
    <PermissionGuard permission="admin_access" fallback={<AccessDenied />}>
      <AdminContent />
    </PermissionGuard>
  );
};
```

## 🔧 API Reference

### `usePermission()` Hook

```typescript
const {
  permissions, // string[] - Array of all user permissions
  hasPermission, // (permission: string) => boolean
  hasPermissions, // (permissions: string[]) => boolean - Requires ALL
  hasAnyPermission, // (permissions: string[]) => boolean - Requires ANY
} = usePermission();
```

### `PermissionGuard` Component

```typescript
<PermissionGuard
  permission="users_create" // string | string[]
  requireAll={true} // boolean - true: ALL, false: ANY
  fallback={<AccessDenied />} // React.ReactNode - shown when no permission
>
  <ProtectedContent />
</PermissionGuard>
```

### Table Column Props

```typescript
{
  title: string;
  name: string;
  type: TableColumnType;
  permission?: string;           // Add this for permission check
  // ... other props
}
```

### Table Action Props

```typescript
{
  label: string;
  handler: (row: T) => void;
  permission?: string;           // Add this for permission check
  // ... other props
}
```

### Header Button Props

```typescript
{
  id: string;
  title: string;
  handler: () => void;
  permission?: string;           // Add this for permission check
  // ... other props
}
```

## ⚠️ Important Notes

1. **Permission strings are case-sensitive**

   - `users_create` ≠ `Users_Create`

2. **Missing permissions = no access**

   - If permission is specified but user doesn't have it, element is hidden

3. **No permission = always visible**

   - If `permission` prop is not specified, element is always shown

4. **Load permissions on login**

   ```typescript
   dispatch(fetchPermissions());
   ```

5. **Permissions are reactive**
   - When permissions change in Redux, all components update automatically

## 🐛 Troubleshooting

### Element not showing

- ✅ Check Redux DevTools - are permissions loaded?
- ✅ Verify permission string matches exactly
- ✅ Check if permission is in user's permission list
- ✅ Ensure `fetchPermissions()` was called

### Element always showing

- ✅ Check if `permission` prop is specified
- ✅ If no permission prop, element is always visible

### Permissions not updating

- ✅ Verify Redux store is configured correctly
- ✅ Check that permission slice is included in store
- ✅ Ensure components use `usePermission()` hook

## 📚 Examples

See these files for complete examples:

- `/pages/role/role.page.tsx` - Table with permissions
- `/pages/role/create-edit/create-edit-role.page.tsx` - Complex form
- `/docs/PERMISSION_SYSTEM.md` - Full documentation
