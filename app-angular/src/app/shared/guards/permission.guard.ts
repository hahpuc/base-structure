import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';

export const PermissionGuard: CanActivateFn = async (route: ActivatedRouteSnapshot) => {
  return true;
};

const collectPermissions = (route: ActivatedRouteSnapshot): string[] => {
  return [];
};
