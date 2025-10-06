# Permission System Documentation

## Overview

The React application now includes a comprehensive permission system that integrates with Redux and can be used throughout the application, particularly in the dynamic table component.

## Architecture

### 1. **Redux Store** (`permissions.slice.ts`)

- Manages user permissions state
- Provides actions to fetch, set, and clear permissions
- Permissions are stored as an array of strings

### 2. **Permission Service** (`permissions.service.ts`)

- API calls to fetch permissions from backend
- Helper methods to check permissions
- Maintains a local cache of permissions

### 3. **Permission Hook** (`use-permission.hook.ts`)

- Custom React hook for accessing permissions
- Provides helper functions: `hasPermission`, `hasPermissions`, `hasAnyPermission`
- Automatically syncs with Redux store

### 4. **Permission Guard Component** (`permission-guard.tsx`)

- Wrapper component for conditional rendering based on permissions
- Supports single or multiple permissions
- Supports "require all" or "require any" logic

## Usage

### In Table Component

The table component automatically filters columns and actions based on permissions:

```typescript
import AppTable from "@/components/forms/table/table.component";
import { TableOption } from "@/components/forms/table/models/table.model";

const tableOptions: TableOption<UserType> = {
  data: fetchUsers,
  columns: [
    {
      title: "Name",
      name: "name",
      type: "text",
      // No permission - always visible
    },
    {
      title: "Email",
      name: "email",
      type: "text",
      permission: "users.view.email", // Only visible if user has this permission
    },
    {
      title: "Phone",
      name: "phone",
      type: "text",
      permission: "users.view.phone", // Only visible if user has this permission
    },
  ],
  actions: [
    {
      label: "View",
      icon: <EyeIcon />,
      handler: handleView,
      // No permission - always visible
    },
    {
      label: "Edit",
      icon: <EditIcon />,
      handler: handleEdit,
      permission: "users.edit", // Only visible if user has this permission
    },
    {
      label: "Delete",
      icon: <TrashIcon />,
      color: "danger",
      handler: handleDelete,
      permission: "users.delete", // Only visible if user has this permission
    },
  ],
};

return <AppTable option={tableOptions} />;
```

### Using the Permission Hook

```typescript
import { usePermission } from "@/hooks/use-permission.hook";

function MyComponent() {
  const { hasPermission, hasPermissions, hasAnyPermission } = usePermission();

  // Check single permission
  if (hasPermission("users.create")) {
    return <CreateUserButton />;
  }

  // Check multiple permissions (requires ALL)
  if (hasPermissions(["users.view", "users.edit"])) {
    return <EditUserForm />;
  }

  // Check multiple permissions (requires ANY)
  if (hasAnyPermission(["admin.access", "superadmin.access"])) {
    return <AdminPanel />;
  }

  return <AccessDenied />;
}
```

### Using the Permission Guard Component

```typescript
import { PermissionGuard } from "@/components/common/permission-guard";

function UserManagement() {
  return (
    <div>
      {/* Single permission */}
      <PermissionGuard permission="users.create">
        <Button>Create User</Button>
      </PermissionGuard>

      {/* Multiple permissions (requires ALL) */}
      <PermissionGuard permission={["users.view", "users.edit"]}>
        <EditUserSection />
      </PermissionGuard>

      {/* Multiple permissions (requires ANY) */}
      <PermissionGuard
        permission={["users.delete", "admin.access"]}
        requireAll={false}
      >
        <DeleteButton />
      </PermissionGuard>

      {/* With fallback */}
      <PermissionGuard
        permission="admin.access"
        fallback={<div>You don't have access</div>}
      >
        <AdminPanel />
      </PermissionGuard>
    </div>
  );
}
```

### Permission Naming Convention

Use a hierarchical naming structure:

```
module.action.resource

Examples:
- users.view
- users.create
- users.edit
- users.delete
- users.view.email
- users.view.phone
- roles.assign
- admin.access
- reports.export
```

## How It Works

### 1. **Loading Permissions**

When a user logs in, permissions are fetched and stored in Redux:

```typescript
import { useDispatch } from "react-redux";
import { fetchPermissions } from "@/store/slices/permissions.slice";

function LoginComponent() {
  const dispatch = useDispatch();

  const handleLogin = async () => {
    // After successful login
    dispatch(fetchPermissions());
  };
}
```

### 2. **Table Component Permission Flow**

```
1. User permissions are fetched from Redux store
2. Permission service is updated with current permissions
3. Table columns are filtered based on `column.permission`
4. Table actions are filtered based on `action.permission`
5. Only authorized columns and actions are rendered
```

### 3. **Real-time Updates**

Permissions are reactive - when Redux state updates, all components automatically re-render with new permissions.

## API Integration

### Backend API Structure

The backend should return permissions in this format:

```json
{
  "data": [
    "users.view",
    "users.create",
    "users.edit",
    "roles.view",
    "roles.edit"
  ]
}
```

### Permission List API

```typescript
// Get all available permissions (grouped by module)
GET /admin/permissions
Response: {
  "Users": [
    { "id": 1, "name": "View Users", "slug": "users.view" },
    { "id": 2, "name": "Create Users", "slug": "users.create" }
  ],
  "Roles": [
    { "id": 10, "name": "View Roles", "slug": "roles.view" },
    { "id": 11, "name": "Edit Roles", "slug": "roles.edit" }
  ]
}
```

### User Permissions API

```typescript
// Get current user's permissions
GET /admin/permissions/my-permission
Response: {
  "data": ["users.view", "users.create", "roles.view"]
}
```

## Best Practices

1. **Always specify permissions for sensitive operations**

   - Edit, delete, export actions should have permissions
   - Sensitive data columns (email, phone) should have permissions

2. **Use descriptive permission names**

   - Good: `users.edit`, `reports.export`
   - Bad: `edit`, `view1`

3. **Group permissions logically**

   - By module: `users.*`, `roles.*`, `reports.*`
   - By action: `*.view`, `*.edit`, `*.delete`

4. **Don't overuse permissions**

   - Basic view actions often don't need permissions
   - Common columns like "name" or "title" typically don't need permissions

5. **Test with different permission sets**
   - Test as admin (all permissions)
   - Test as regular user (limited permissions)
   - Test with no permissions

## Example: Complete User Management Page

```typescript
import AppTable from "@/components/forms/table/table.component";
import { PermissionGuard } from "@/components/common/permission-guard";
import { usePermission } from "@/hooks/use-permission.hook";
import { Button } from "antd";

function UserManagementPage() {
  const { hasPermission } = usePermission();

  const tableOptions = {
    data: fetchUsers,
    columns: [
      { title: "ID", name: "id", type: "text" },
      { title: "Name", name: "name", type: "text" },
      {
        title: "Email",
        name: "email",
        type: "text",
        permission: "users.view.email",
      },
      {
        title: "Phone",
        name: "phone",
        type: "text",
        permission: "users.view.phone",
      },
      {
        title: "Salary",
        name: "salary",
        type: "number",
        permission: "users.view.salary",
      },
    ],
    actions: [
      {
        label: "View",
        handler: handleView,
      },
      {
        label: "Edit",
        handler: handleEdit,
        permission: "users.edit",
      },
      {
        label: "Delete",
        color: "danger",
        handler: handleDelete,
        permission: "users.delete",
      },
    ],
  };

  return (
    <div>
      <div className="mb-4">
        <PermissionGuard permission="users.create">
          <Button type="primary">Create New User</Button>
        </PermissionGuard>

        <PermissionGuard permission="users.export">
          <Button>Export Users</Button>
        </PermissionGuard>
      </div>

      <AppTable option={tableOptions} />
    </div>
  );
}
```

## Troubleshooting

### Permissions not updating

- Check Redux DevTools to verify permissions are in store
- Ensure `fetchPermissions()` is called after login
- Verify backend API is returning correct format

### Table columns/actions not filtering

- Verify permission strings match exactly (case-sensitive)
- Check that permissionService.setPermissions() is being called
- Ensure Redux store is properly configured

### Components not re-rendering

- Use `usePermission()` hook instead of directly accessing Redux
- Verify components are wrapped in Redux Provider
- Check that permission changes trigger Redux state updates
