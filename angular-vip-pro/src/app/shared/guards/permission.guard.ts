import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from "@angular/router";

import { PermissionService } from "@shared/services/permission.service";

import { AuthService } from "../services/auth.service";

export const PermissionGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (!authService.isLoggedIn()) {
    return router.createUrlTree(["/login"], {
      queryParams: { return_url: state.url },
    });
  }

  const permissions: string[] = collectPermissions(route);

  return (
    (await inject(PermissionService).checkPermissions(permissions)) ||
    router.createUrlTree(["/error/401"])
  );
};

const collectPermissions = (route: ActivatedRouteSnapshot): string[] => {
  let permissions: string[] = [];

  if (route.data?.["permissions"]) {
    permissions = [...permissions, route.data["permissions"]];
  }

  if (route.firstChild) {
    permissions = [...permissions, ...collectPermissions(route.firstChild)];
  }

  return Array.from(new Set(permissions));
};
