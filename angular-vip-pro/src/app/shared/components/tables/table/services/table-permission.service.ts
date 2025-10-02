import { Injectable } from '@angular/core';

import { PermissionService } from '@/app/shared/services/permission.service';

import { TableAction, TableColumn, TableRowData } from '../table.model';

@Injectable({ providedIn: 'root' })
export class TablePermissionService<T extends TableRowData = TableRowData> {
  private columnPermissionCache: { [key: string]: boolean } = {};
  private actionPermissionCache: { [key: string]: boolean } = {};

  constructor(private permissionService: PermissionService) {}

  async initializePermissionCache(
    columns?: TableColumn<T>[],
    actions?: TableAction<T>[]
  ): Promise<void> {
    // Cache column permissions
    if (columns) {
      for (const column of columns) {
        if (column.permission) {
          this.columnPermissionCache[column.permission] =
            await this.permissionService.checkPermissions([column.permission]);
        }
      }
    }
    // Cache action permissions
    if (actions) {
      for (const action of actions) {
        if (action.permission) {
          this.actionPermissionCache[action.permission] =
            await this.permissionService.checkPermissions([action.permission]);
        }
      }
    }
  }

  isColumnVisibleSync(column: TableColumn<T>): boolean {
    if (column.permission) {
      return this.columnPermissionCache[column.permission] ?? false;
    }
    return true;
  }

  isActionVisibleSync(action: TableAction<T>, row: T): boolean {
    if (action.permission) {
      const hasPermission = this.actionPermissionCache[action.permission] ?? false;
      if (!hasPermission) {
        return false;
      }
    }
    if (action.visible) {
      return action.visible(row);
    }
    return true;
  }

  async isColumnVisible(column: TableColumn<T>): Promise<boolean> {
    if (column.permission) {
      return await this.permissionService.checkPermissions([column.permission]);
    }
    return true;
  }

  async isActionVisible(action: TableAction<T>, row: T): Promise<boolean> {
    if (action.permission) {
      const hasPermission = await this.permissionService.checkPermissions([action.permission]);
      if (!hasPermission) {
        return false;
      }
    }
    if (action.visible) {
      return action.visible(row);
    }
    return true;
  }

  getColumnPermissionCache() {
    return this.columnPermissionCache;
  }

  getActionPermissionCache() {
    return this.actionPermissionCache;
  }
}
