import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  ChangeDetectorRef,
  Injector,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { NavigationEnd, RouterModule } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';

import { AppBaseComponent } from '../../components/base/app.base.component';
import { SafeHtmlPipe } from '../../pipe/safe-html.pipe';
import { SidebarService } from '../../services/sidebar.service';

import { MenuSections } from './menu-sections';
import { MenuItem, MenuSection } from './types/menu.type';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, SafeHtmlPipe],
  templateUrl: './app-sidebar.component.html',
})
export class AppSidebarComponent extends AppBaseComponent implements OnInit, OnDestroy {
  // Dynamic menu sections
  menuSections = MenuSections;

  // Legacy arrays (kept for backward compatibility if needed)
  menuItems: MenuItem[] = [];
  othersItems: MenuItem[] = [];

  // Dynamic filtered sections
  filteredMenuSections: MenuSection[] = [];

  filteredMenuItems: MenuItem[] = [];
  filteredOthersItems: MenuItem[] = [];

  openSubmenu: string | null | number = null;
  subMenuHeights: { [key: string]: number } = {};
  @ViewChildren('subMenu') subMenuRefs!: QueryList<ElementRef>;

  readonly isExpanded$;
  readonly isMobileOpen$;
  readonly isHovered$;

  private subscription: Subscription = new Subscription();

  constructor(
    injector: Injector,
    public sidebarService: SidebarService,
    private cdr: ChangeDetectorRef
  ) {
    super(injector);
    this.isExpanded$ = this.sidebarService.isExpanded$;
    this.isMobileOpen$ = this.sidebarService.isMobileOpen$;
    this.isHovered$ = this.sidebarService.isHovered$;
  }

  async ngOnInit(): Promise<void> {
    await this.filterMenuByPermissions();

    // Subscribe to router events
    this.subscription.add(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.setActiveMenuFromRoute(this.router.url);
        }
      })
    );

    // Subscribe to combined observables to close submenus when all are false
    this.subscription.add(
      combineLatest([this.isExpanded$, this.isMobileOpen$, this.isHovered$]).subscribe(
        ([isExpanded, isMobileOpen, isHovered]) => {
          if (!isExpanded && !isMobileOpen && !isHovered) {
            this.cdr.detectChanges();
          }
        }
      )
    );

    // Initial load - call after menu filtering is complete
    this.setActiveMenuFromRoute(this.router.url);
  }

  ngOnDestroy() {
    // Clean up subscriptions
    this.subscription.unsubscribe();
  }

  private async filterMenuByPermissions(): Promise<void> {
    // Filter dynamic menu sections
    this.filteredMenuSections = await this.filterMenuSections(this.menuSections);

    // Legacy support - populate the old arrays if needed
    const mainSection = this.filteredMenuSections.find(section => section.id === 'main');
    const othersSection = this.filteredMenuSections.find(section => section.id === 'others');

    this.filteredMenuItems = mainSection ? mainSection.items : [];
    this.filteredOthersItems = othersSection ? othersSection.items : [];

    // After filtering is complete, ensure the active menu state is set
    if (this.router) {
      this.setActiveMenuFromRoute(this.router.url);
    }
  }

  private async filterMenuSections(sections: MenuSection[]): Promise<MenuSection[]> {
    const filteredSections: MenuSection[] = [];

    for (const section of sections) {
      if (section.visible === false) {
        continue; // Skip sections marked as not visible
      }

      const filteredItems = await this.filterMenuItems(section.items);

      if (filteredItems.length > 0) {
        filteredSections.push({
          ...section,
          items: filteredItems,
        });
      }
    }

    // Sort sections by order if specified
    return filteredSections.sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  private async filterMenuItems(items: MenuItem[]): Promise<MenuItem[]> {
    const filteredItems: MenuItem[] = [];

    for (const item of items) {
      const hasPermission = await this.hasPermissionForItem(item);

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

  private async hasPermissionForItem(item: MenuItem): Promise<boolean> {
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
    return await this.hasPermissionForItem(item);
  }

  isActiveRoute(path: string): boolean {
    const currentPath = this.router.url.split('?')[0].replace(/\/$/, '');
    const cleanPath = path.replace(/\/$/, '');
    return currentPath === cleanPath || currentPath.startsWith(cleanPath + '/');
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

  isActive(path: string | undefined): boolean {
    if (!path) return false;
    return this.router.url === path;
  }

  toggleSubmenu(sectionId: string, index: number) {
    const key = `${sectionId}-${index}`;

    if (this.openSubmenu === key) {
      this.openSubmenu = null;
      this.subMenuHeights[key] = 0;
    } else {
      this.openSubmenu = key;

      setTimeout(() => {
        const el = document.getElementById(key);
        if (el) {
          this.subMenuHeights[key] = el.scrollHeight;
          this.cdr.detectChanges(); // Ensure UI updates
        }
      });
    }
  }

  onSidebarMouseEnter() {
    this.isExpanded$
      .subscribe(expanded => {
        if (!expanded) {
          this.sidebarService.setHovered(true);
        }
      })
      .unsubscribe();
  }

  private setActiveMenuFromRoute(currentUrl: string) {
    // Clean the current URL (remove query parameters and trailing slash)
    const cleanUrl = currentUrl.split('?')[0].replace(/\/$/, '') || '/';

    // Reset all open submenus first
    this.openSubmenu = null;

    let bestMatch: { key: string; navLabel: string; matchLength: number } | null = null;

    // Process dynamic menu sections to find the best match
    this.filteredMenuSections.forEach((section, sectionIndex) => {
      section.items.forEach((nav, itemIndex) => {
        if (nav.children && nav.children.length > 0) {
          // Check if any child matches the current route
          const matchingChild = nav.children.find(subItem => {
            if (!subItem.path) return false;

            const cleanSubPath = subItem.path.replace(/\/$/, '') || '/';

            // Skip empty paths or root-only paths for non-root URLs
            if (!cleanSubPath || (cleanSubPath === '/' && cleanUrl !== '/')) {
              return false;
            }

            const isExactMatch = cleanUrl === cleanSubPath;
            const isSubPathMatch = cleanUrl.startsWith(cleanSubPath + '/') && cleanSubPath !== '/';

            return isExactMatch || isSubPathMatch;
          });

          if (matchingChild) {
            const key = `${section.id}-${itemIndex}`;
            const matchLength = matchingChild.path?.replace(/\/$/, '').length || 0;

            // Keep track of the best (most specific) match
            if (!bestMatch || matchLength > bestMatch.matchLength) {
              bestMatch = {
                key,
                navLabel: nav.label,
                matchLength,
              };
            }
          }
        }
      });
    });

    // Apply the best match if found
    if (bestMatch !== null && bestMatch !== undefined) {
      const match = bestMatch as { key: string; navLabel: string; matchLength: number };
      const selectedKey = match.key;
      this.openSubmenu = selectedKey;

      // Use a slight delay to ensure DOM is ready
      setTimeout(() => {
        const el = document.getElementById(selectedKey);
        if (el) {
          this.subMenuHeights[selectedKey] = el.scrollHeight;
          this.cdr.detectChanges(); // Ensure UI updates
        }
      }, 10);
    }
  }

  onSubmenuClick() {
    this.isMobileOpen$
      .subscribe(isMobile => {
        if (isMobile) {
          this.sidebarService.setMobileOpen(false);
        }
      })
      .unsubscribe();
  }

  // Helper methods for dynamic menu sections
  getMenuSection(sectionId: string): MenuSection | undefined {
    return this.filteredMenuSections.find(section => section.id === sectionId);
  }

  // Method to add a new menu section dynamically
  addMenuSection(section: MenuSection): void {
    const existingIndex = this.menuSections.findIndex(s => s.id === section.id);
    if (existingIndex >= 0) {
      this.menuSections[existingIndex] = section;
    } else {
      this.menuSections.push(section);
    }
    this.filterMenuByPermissions(); // Re-filter after adding (this will also set active menu)
  }

  // Method to remove a menu section
  removeMenuSection(sectionId: string): void {
    this.menuSections = this.menuSections.filter(section => section.id !== sectionId);
    this.filterMenuByPermissions(); // Re-filter after removal (this will also set active menu)
  }

  // Method to update section visibility
  updateSectionVisibility(sectionId: string, visible: boolean): void {
    const section = this.menuSections.find(s => s.id === sectionId);
    if (section) {
      section.visible = visible;
      this.filterMenuByPermissions(); // Re-filter after update (this will also set active menu)
    }
  }
}
