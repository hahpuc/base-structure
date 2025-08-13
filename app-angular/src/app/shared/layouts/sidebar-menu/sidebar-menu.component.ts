import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PermissionService } from '@shared/services/permission.service';

export interface MenuItem {
  label: string;
  path?: string;
  icon: string;
  children?: MenuItem[];
  isAccordion?: boolean;
  permissions?: string | string[]; // Single permission string or array of permission slugs required to access this menu item
  permissionMode?: 'all' | 'any'; // 'all' means user needs ALL permissions, 'any' means user needs at least ONE permission (default: 'all' for single items, 'any' for parent items)
}

@Component({
  selector: 'app-sidebar-menu',
  standalone: false,
  templateUrl: './sidebar-menu.component.html',
})
export class SidebarMenuComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      label: 'Overview',
      path: '/dashboard',
      icon: 'ki-home-3',
    },
    {
      label: 'User Management',
      icon: 'ki-users',
      isAccordion: true,
      permissions: ['user_manage_read', 'role_manage_read'],
      permissionMode: 'any',
      children: [
        {
          label: 'Role',
          path: '/role',
          icon: '',
          permissions: 'role_manage_read',
        },
        {
          label: 'User',
          path: '/user',
          icon: '',
          permissions: 'user_manage_read',
        },
      ],
    },
    {
      label: 'Account Management',
      icon: 'ki-profile-circle',
      isAccordion: true,
      permissions: 'user_manage_read',
      children: [{ label: 'Default', path: '/profile', icon: '', permissions: 'user_manage_read' }],
    },
    {
      label: 'Location Management',
      icon: 'ki-setting-2',
      isAccordion: true,
      permissions: ['province_manage_read', 'ward_manage_read'],
      permissionMode: 'any',
      children: [
        { label: 'Province', path: '/province', icon: '', permissions: ['province_manage_read'] },
        { label: 'Ward', path: '/ward', icon: '', permissions: ['ward_manage_read'] },
      ],
    },
    {
      label: 'Article Management',
      icon: 'ki-security-user',
      isAccordion: true,
      children: [
        { label: 'Category', path: '/category', icon: '', permissions: [] },
        { label: 'Blog Post', path: '/blog-post', icon: '', permissions: [] },
      ],
    },
  ];

  filteredMenuItems: MenuItem[] = [];

  constructor(
    private router: Router,
    private permissionService: PermissionService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.filterMenuByPermissions();
  }

  private async filterMenuByPermissions(): Promise<void> {
    this.filteredMenuItems = await this.filterMenuItems(this.menuItems);
  }

  private async filterMenuItems(items: MenuItem[]): Promise<MenuItem[]> {
    const filteredItems: MenuItem[] = [];

    for (const item of items) {
      const hasPermission = await this.hasPermission(item);

      if (hasPermission) {
        const filteredItem: MenuItem = { ...item };

        // If item has children, filter them recursively
        if (item.children && item.children.length > 0) {
          filteredItem.children = await this.filterMenuItems(item.children);

          // Only include parent if it has visible children or if it has its own path
          if (filteredItem.children.length > 0 || item.path) {
            filteredItems.push(filteredItem);
          }
        } else {
          filteredItems.push(filteredItem);
        }
      }
    }

    return filteredItems;
  }

  private async hasPermission(item: MenuItem): Promise<boolean> {
    // If no permissions are defined for this item, allow access
    if (!item.permissions) {
      return true;
    }

    // Convert single permission to array for consistent handling
    const permissionsArray = Array.isArray(item.permissions)
      ? item.permissions
      : [item.permissions];

    // If empty array, allow access
    if (permissionsArray.length === 0) {
      return true;
    }

    // Determine permission mode
    // Default: 'all' for single permissions, 'any' for parent items with children
    const mode = item.permissionMode || (item.children && item.children.length > 0 ? 'any' : 'all');

    // Check permissions based on mode
    if (mode === 'any') {
      return await this.permissionService.checkAnyPermissions(permissionsArray);
    } else {
      return await this.permissionService.checkPermissions(permissionsArray);
    }
  }

  // Method to check if a specific menu item should be visible
  async isMenuItemVisible(item: MenuItem): Promise<boolean> {
    return await this.hasPermission(item);
  }

  isActiveRoute(path: string): boolean {
    const currentPath = this.router.url.split('?')[0];
    return currentPath === path || currentPath.startsWith(path + '/');
  }

  isParentActive(item: MenuItem): boolean {
    if (item.path && this.isActiveRoute(item.path)) {
      return true;
    }
    if (item.children) {
      return item.children.some(child => this.isParentActive(child));
    }
    return false;
  }
}
