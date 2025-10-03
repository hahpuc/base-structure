import React from "react";
import { usePermission } from "@/hooks/use-permission.hook";

interface PermissionGuardProps {
  permission?: string | string[];
  requireAll?: boolean; // If true, requires ALL permissions; if false, requires ANY permission
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Component to conditionally render children based on user permissions
 *
 * @example
 * // Single permission
 * <PermissionGuard permission="users.create">
 *   <Button>Create User</Button>
 * </PermissionGuard>
 *
 * @example
 * // Multiple permissions (requires ALL by default)
 * <PermissionGuard permission={["users.create", "users.edit"]}>
 *   <Button>Edit User</Button>
 * </PermissionGuard>
 *
 * @example
 * // Multiple permissions (requires ANY)
 * <PermissionGuard permission={["users.view", "users.edit"]} requireAll={false}>
 *   <UserList />
 * </PermissionGuard>
 *
 * @example
 * // With fallback
 * <PermissionGuard permission="admin.access" fallback={<div>Access Denied</div>}>
 *   <AdminPanel />
 * </PermissionGuard>
 */
export const PermissionGuard: React.FunctionComponent<PermissionGuardProps> = ({
  permission,
  requireAll = true,
  fallback = null,
  children,
}) => {
  const { hasPermissions, hasAnyPermission, hasPermission } = usePermission();

  // No permission required, always show
  if (!permission) {
    return <>{children}</>;
  }

  // Single permission check
  if (typeof permission === "string") {
    return hasPermission(permission) ? <>{children}</> : <>{fallback}</>;
  }

  // Multiple permissions check
  const hasAccess = requireAll
    ? hasPermissions(permission)
    : hasAnyPermission(permission);

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};
