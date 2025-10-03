import { useEffect } from "react";
import { useAppSelector } from "./redux.hooks";
import { permissionService } from "@/services/permissions.service";

/**
 * Hook to check user permissions
 * @returns Object with permission checking functions
 */
export const usePermission = () => {
  const userPermissions = useAppSelector(
    (state) => state.permissions.permissions
  );

  // Update permission service when permissions change
  useEffect(() => {
    if (userPermissions && userPermissions.length > 0) {
      permissionService.setPermissions(userPermissions);
    }
  }, [userPermissions]);

  /**
   * Check if user has ALL of the specified permissions
   * @param permissions Array of permission strings to check
   * @returns true if user has all permissions, false otherwise
   */
  const hasPermissions = (permissions: string[]): boolean => {
    if (!permissions || permissions.length === 0) return true;
    return permissions.every((p) => userPermissions.includes(p));
  };

  /**
   * Check if user has ANY of the specified permissions
   * @param permissions Array of permission strings to check
   * @returns true if user has at least one permission, false otherwise
   */
  const hasAnyPermission = (permissions: string[]): boolean => {
    if (!permissions || permissions.length === 0) return true;
    return permissions.some((p) => userPermissions.includes(p));
  };

  /**
   * Check if user has a single permission
   * @param permission Permission string to check
   * @returns true if user has the permission, false otherwise
   */
  const hasPermission = (permission: string): boolean => {
    return userPermissions.includes(permission);
  };

  return {
    permissions: userPermissions,
    hasPermissions,
    hasAnyPermission,
    hasPermission,
  };
};
