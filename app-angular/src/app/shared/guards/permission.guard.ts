import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

import { PermissionService } from '@shared/services/permission.service';

export const PermissionGuard: CanActivateFn = async (route: ActivatedRouteSnapshot) => {
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  const requiredPermissions = collectPermissions(route);

  if (requiredPermissions.length === 0) {
    // No permissions required, allow access
    return true;
  }

  try {
    const hasPermission = await permissionService.checkPermissions(requiredPermissions);

    if (!hasPermission) {
      // Redirect to unauthorized page or dashboard
      return router.createUrlTree(['/dashboard']); // or '/unauthorized'
    }

    return hasPermission;
  } catch (error) {
    // Handle permission check error silently
    return router.createUrlTree(['/dashboard']);
  }
};

const collectPermissions = (route: ActivatedRouteSnapshot): string[] => {
  const permissions: string[] = [];

  // Check for permissions in route data
  if (route.data['permissions']) {
    if (Array.isArray(route.data['permissions'])) {
      permissions.push(...route.data['permissions']);
    } else {
      permissions.push(route.data['permissions']);
    }
  }

  // Check for permissions in query params
  if (route.queryParams['permissions']) {
    if (Array.isArray(route.queryParams['permissions'])) {
      permissions.push(...route.queryParams['permissions']);
    } else {
      permissions.push(route.queryParams['permissions']);
    }
  }

  return permissions;
};
