import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';

import { PermissionService } from '@shared/services/permission.service';

@Directive({
  selector: '[appHasPermission]',
  standalone: true,
})
export class HasPermissionDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private permissions: string | string[] = [];
  private permissionMode: 'all' | 'any' = 'all';

  @Input() set appHasPermission(permissions: string | string[]) {
    this.permissions = permissions;
    this.updateView();
  }

  @Input() set appHasPermissionMode(mode: 'all' | 'any') {
    this.permissionMode = mode;
    this.updateView();
  }

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService
  ) {}

  ngOnInit() {
    this.updateView();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async updateView() {
    try {
      const hasPermission = await this.hasPermission();

      if (hasPermission) {
        // User has permission, show the element
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        // User doesn't have permission, hide the element
        this.viewContainer.clear();
      }
    } catch (error) {
      // On error, hide the element for security
      this.viewContainer.clear();
    }
  }

  private async hasPermission(): Promise<boolean> {
    // If no permissions are defined, allow access
    if (!this.permissions) {
      return true;
    }

    // Convert single permission to array for consistent handling
    const permissionsArray = Array.isArray(this.permissions)
      ? this.permissions
      : [this.permissions];

    // If empty array, allow access
    if (permissionsArray.length === 0) {
      return true;
    }

    // Check permissions based on mode
    if (this.permissionMode === 'any') {
      return await this.permissionService.checkAnyPermissions(permissionsArray);
    } else {
      return await this.permissionService.checkPermissions(permissionsArray);
    }
  }
}
