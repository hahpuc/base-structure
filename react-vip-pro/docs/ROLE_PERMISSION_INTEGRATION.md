# Role & Permission Integration Guide

## Overview

This guide explains how the role management system integrates with the permission system in the React VIP Pro application.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      User Login                              │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│           Fetch User Permissions (fetchPermissions)          │
│              GET /admin/permissions/my-permission            │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│               Store in Redux (permissions.slice)             │
│          State: { permissions: ['users_create', ...] }       │
└─────────────────────────┬───────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
          ▼               ▼               ▼
    ┌─────────┐    ┌──────────┐    ┌──────────┐
    │  Table  │    │  Header  │    │   Custom │
    │ Columns │    │ Buttons  │    │Components│
    └─────────┘    └──────────┘    └──────────┘
```

## Data Flow

### 1. Role Management

```typescript
// Role entity structure
type RoleDto = {
  id: number;
  name: string; // e.g., "Admin"
  slug: string; // e.g., "admin"
  status: EStatus;
  permissions: {
    // Grouped by module
    "User Management": [
      { id: 1; name: "Create User"; slug: "users_create" },
      { id: 2; name: "Edit User"; slug: "users_edit" }
    ];
    "Role Management": [
      { id: 10; name: "Create Role"; slug: "role_manage_create" }
    ];
  };
};
```

### 2. Creating/Editing Roles

When creating or editing a role:

```typescript
// User selects permissions in the UI
selectedPermissions = [1, 2, 10]; // Permission IDs

// Submit to backend
const payload: CreateRole = {
  name: "Manager",
  slug: "manager",
  status: EStatus.active,
  permission_ids: [1, 2, 10],
};

await roleService.create(payload);
```

### 3. User Permission Resolution

When a user logs in:

```typescript
// 1. Backend resolves user's role(s)
// 2. Backend combines all permissions from user's roles
// 3. Backend returns permission slugs

GET /admin/permissions/my-permission
Response: {
  "data": ["users_create", "users_edit", "role_manage_create"]
}

// 4. Frontend stores in Redux
dispatch(fetchPermissions());
// Redux state: { permissions: ["users_create", "users_edit", ...] }
```

### 4. Permission Checking

Throughout the app:

```typescript
// Table columns
permission: "users_view_email"
→ Check if "users_view_email" is in Redux permissions array

// Table actions
permission: "users_edit"
→ Check if "users_edit" is in Redux permissions array

// Header buttons
permission: "role_manage_create"
→ Check if "role_manage_create" is in Redux permissions array
```

## Backend API Contract

### Get All Permissions (for role management)

```http
GET /admin/permissions

Response:
{
  "User Management": [
    {
      "id": 1,
      "name": "Create User",
      "slug": "users_create",
      "position": 1
    },
    {
      "id": 2,
      "name": "View User",
      "slug": "users_view",
      "position": 2
    }
  ],
  "Role Management": [
    {
      "id": 10,
      "name": "Create Role",
      "slug": "role_manage_create",
      "position": 1
    }
  ]
}
```

### Get User's Permissions

```http
GET /admin/permissions/my-permission

Response:
{
  "data": [
    "users_create",
    "users_view",
    "users_edit",
    "role_manage_create"
  ]
}
```

### Create Role

```http
POST /admin/roles

Body:
{
  "name": "Manager",
  "slug": "manager",
  "status": "active",
  "permission_ids": [1, 2, 10, 11]
}

Response:
{
  "data": {
    "id": 5,
    "name": "Manager",
    "slug": "manager",
    "status": "active"
  }
}
```

### Update Role

```http
PUT /admin/roles/:id

Body:
{
  "id": 5,
  "name": "Manager",
  "slug": "manager",
  "status": "active",
  "permission_ids": [1, 2, 10, 11, 15]
}
```

### Get Role with Permissions

```http
GET /admin/roles/:id

Response:
{
  "data": {
    "id": 5,
    "name": "Manager",
    "slug": "manager",
    "status": "active",
    "permissions": {
      "User Management": [
        { "id": 1, "name": "Create User", "slug": "users_create" },
        { "id": 2, "name": "View User", "slug": "users_view" }
      ],
      "Role Management": [
        { "id": 10, "name": "Create Role", "slug": "role_manage_create" }
      ]
    }
  }
}
```

## Frontend Components

### Role List Page (`role.page.tsx`)

```typescript
// Displays list of roles
// Actions: Edit (permission: "role_manage_edit")
// Header Button: Create (permission: "role_manage_create")

const tableOption: TableOption<RoleDto> = {
  actions: [
    {
      label: "edit",
      handler: (row) => navigate(`/role/edit/${row.id}`),
      permission: "role_manage_edit",
    },
  ],
};
```

### Create/Edit Role Page (`create-edit-role.page.tsx`)

```typescript
// Form: name, slug, status
// Permission Selection:
//   - Grouped by module
//   - Module-level checkbox (select all in module)
//   - Individual permission checkboxes
//   - Two-column layout

const handleSubmit = async () => {
  const payload = {
    name: formValues.name,
    slug: formValues.slug,
    status: formValues.status,
    permission_ids: selectedPermissionIds, // [1, 2, 10, ...]
  };

  await roleService.create(payload);
};
```

## Permission Assignment Flow

```
1. Admin opens Create/Edit Role page
   ↓
2. Page loads all available permissions
   GET /admin/permissions
   ↓
3. Permissions grouped by module and displayed
   ├─ User Management
   │  ├─ ☑ Create User
   │  ├─ ☑ Edit User
   │  └─ ☐ Delete User
   └─ Role Management
      ├─ ☑ Create Role
      └─ ☐ Delete Role
   ↓
4. Admin selects permissions (checkboxes)
   selectedPermissionIds = [1, 2, 10]
   ↓
5. Admin saves role
   POST /admin/roles
   Body: { ..., permission_ids: [1, 2, 10] }
   ↓
6. Backend saves role-permission associations
   ↓
7. When user with this role logs in
   Backend resolves permissions
   Returns: ["users_create", "users_edit", "role_manage_create"]
   ↓
8. Frontend stores in Redux
   ↓
9. UI components check permissions and show/hide elements
```

## Database Structure (Backend Reference)

```sql
-- Permissions table
permissions (
  id: int,
  name: varchar,           -- "Create User"
  slug: varchar,           -- "users_create"
  module: varchar,         -- "User Management"
  position: int            -- Order in module
)

-- Roles table
roles (
  id: int,
  name: varchar,           -- "Manager"
  slug: varchar,           -- "manager"
  status: enum             -- "active" | "inactive"
)

-- Role-Permission association table
role_permissions (
  id: int,
  role_id: int,            -- FK to roles
  permission_id: int       -- FK to permissions
)

-- Users table (simplified)
users (
  id: int,
  name: varchar,
  role_id: int             -- FK to roles
)
```

## Permission Check Logic

### In Table Component

```typescript
// Filter columns
const visibleColumns = columns.filter((col) => {
  if (!col.permission) return true;
  return userPermissions.includes(col.permission);
});

// Filter actions
const visibleActions = actions.filter((action) => {
  if (!action.permission) return true;
  return userPermissions.includes(action.permission);
});
```

### In Header Buttons

```typescript
// Filter buttons
const visibleButtons = buttons.filter((button) => {
  if (!button.permission) return true;
  return userPermissions.includes(button.permission);
});
```

### In Custom Components

```typescript
// Direct check
const { hasPermission } = usePermission();
if (hasPermission("users_create")) {
  return <CreateButton />;
}

// Or use PermissionGuard
<PermissionGuard permission="users_create">
  <CreateButton />
</PermissionGuard>;
```

## Testing Scenarios

### 1. Admin User (All Permissions)

```typescript
permissions: [
  "users_create", "users_view", "users_edit", "users_delete",
  "role_manage_create", "role_manage_edit", "role_manage_delete",
  "reports_view", "reports_export"
]

Result:
✅ Sees all table columns
✅ Sees all table actions
✅ Sees all header buttons
✅ Can access all pages
```

### 2. Manager (Limited Permissions)

```typescript
permissions: [
  "users_view", "users_edit",
  "role_manage_read"
]

Result:
✅ Sees basic columns
❌ Cannot see salary column (needs "users_view_salary")
✅ Sees view and edit actions
❌ Cannot see delete action (needs "users_delete")
✅ Can view roles
❌ Cannot create/edit roles (needs "role_manage_create/edit")
```

### 3. Viewer (Minimal Permissions)

```typescript
permissions: [
  "users_view",
  "reports_view"
]

Result:
✅ Sees basic columns only
✅ Sees view action only
❌ Cannot edit or delete
❌ Cannot see create buttons
✅ Can view reports
❌ Cannot export reports
```

## Best Practices

1. **Hierarchical Permissions**

   ```
   users_view          → Can view user list
   users_view_email    → Can view email column
   users_view_salary   → Can view salary column
   ```

2. **Module-Based Grouping**

   ```
   User Management:
     - users_create
     - users_view
     - users_edit
     - users_delete

   Role Management:
     - role_manage_create
     - role_manage_read
     - role_manage_edit
     - role_manage_delete
   ```

3. **Consistent Naming**

   - Use snake_case
   - Format: `module_action_resource`
   - Be descriptive but concise

4. **Default Permissions**
   - Every role should have basic view permissions
   - Admin role should have all permissions
   - Consider a "Public" role with minimal permissions

## Summary

The role and permission system provides:

1. ✅ **Role Management**: Create/edit roles with permission assignment
2. ✅ **Permission Resolution**: Backend resolves user permissions from roles
3. ✅ **Frontend Storage**: Permissions stored in Redux
4. ✅ **Automatic Filtering**: Table columns, actions, and buttons filtered by permissions
5. ✅ **Flexible Checking**: Hook and component for custom permission checks
6. ✅ **Real-time Updates**: Changes in permissions automatically update UI

This creates a robust, flexible, and maintainable authorization system!
