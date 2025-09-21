import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { SafeHtmlPipe } from '@/app/shared/pipe/safe-html.pipe';
import { BreadCrumbService } from '@shared/services/bread-crumb.service';
import { PermissionService } from '@shared/services/permission.service';
import { BreadCrumbButton } from '@shared/types/bread-crumb';

@Component({
  selector: 'app-page-breadcrumb',
  imports: [RouterModule, NzButtonModule, NzIconModule, CommonModule, SafeHtmlPipe],
  templateUrl: './page-breadcrumb.component.html',
  styles: ``,
})
export class PageBreadcrumbComponent {
  private breadCrumbService = inject(BreadCrumbService);
  private permissionService = inject(PermissionService);

  // Cache for button permissions to avoid async issues in template
  private buttonPermissions = signal<{ [key: string]: boolean }>({});

  title = computed(() => {
    const titleValue = this.breadCrumbService.title();
    if (typeof titleValue === 'function') {
      return titleValue();
    }
    return titleValue || '';
  });

  actions = computed(() => {
    const actions = this.breadCrumbService.actions();
    this.checkAllPermissions(actions);
    return actions;
  });

  // Check permissions for all buttons when actions change
  private async checkAllPermissions(actions: BreadCrumbButton[]) {
    const permissions: { [key: string]: boolean } = {};

    for (const action of actions) {
      if (action.permission) {
        try {
          permissions[action.permission] = await this.permissionService.checkPermissions([
            action.permission,
          ]);
        } catch (error) {
          permissions[action.permission] = false;
        }
      }
    }

    this.buttonPermissions.set(permissions);
  }

  // Get button configuration for predefined types
  getButtonConfig(button: BreadCrumbButton) {
    const type = typeof button.type === 'function' ? button.type() : button.type;
    const title = typeof button.title === 'function' ? button.title() : button.title;
    const icon = typeof button.icon === 'function' ? button.icon() : button.icon;

    const configs = {
      create: {
        title: title || 'Create',
        icon:
          icon ||
          '<svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 10V7.5C21 5.29086 19.2091 3.5 17 3.5H7C4.79086 3.5 3 5.29086 3 7.5V18C3 20.2091 4.79086 22 7 22H9M8 2V5M16 2V5M9 11L10.7528 12.4023C11.1707 12.7366 11.7777 12.6826 12.1301 12.2799L15 9M12 22L15.0608 21.1274C15.2249 21.0806 15.3743 20.9928 15.495 20.8721L20.5098 15.8573C21.1634 15.2037 21.1634 14.1439 20.5098 13.4902C19.8561 12.8366 18.7963 12.8366 18.1427 13.4902L13.1279 18.505C13.0072 18.6257 12.9194 18.7751 12.8726 18.9392L12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        class: 'ant-btn-primary',
      },
      export: {
        title: title || 'Export',
        icon:
          icon ||
          '<svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.99993 15L10.5857 16.5858C11.3668 17.3668 12.6331 17.3668 13.4141 16.5858L14.9999 15M11.9999 17V12M19.9999 7V8H3.99993V5C3.99993 3.34315 5.34308 2 6.99993 2H9.5691C10.2372 2 10.8861 2.22298 11.4131 2.6336L12.3535 3.3664C12.8804 3.77702 13.5294 4 14.1974 4H16.9999C18.6568 4 19.9999 5.34315 19.9999 7ZM3.47391 8H20.526C21.7992 8 22.7484 9.17403 22.4816 10.4191L20.6775 18.8381C20.2823 20.6824 18.6524 22 16.7663 22H7.2336C5.34745 22 3.71759 20.6824 3.32239 18.8381L1.5183 10.4191C1.25151 9.17404 2.20062 8 3.47391 8Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        class: 'ant-btn-default',
      },
      import: {
        title: title || 'Import',
        icon:
          icon ||
          '<svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.99993 15L10.5857 13.4142C11.3668 12.6332 12.6331 12.6332 13.4141 13.4142L14.9999 15M11.9999 13V18M19.9999 7V8H3.99993V5C3.99993 3.34315 5.34308 2 6.99993 2H9.5691C10.2372 2 10.8861 2.22298 11.4131 2.6336L12.3535 3.3664C12.8804 3.77702 13.5294 4 14.1974 4H16.9999C18.6568 4 19.9999 5.34315 19.9999 7ZM3.47391 8H20.526C21.7992 8 22.7484 9.17403 22.4816 10.4191L20.6775 18.8381C20.2823 20.6824 18.6524 22 16.7663 22H7.2336C5.34745 22 3.71759 20.6824 3.32239 18.8381L1.5183 10.4191C1.25151 9.17404 2.20062 8 3.47391 8Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        class: 'ant-btn-default',
      },
      back: {
        title: title || 'Back',
        icon:
          icon ||
          '<svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 8L6 12M6 12L10 16M6 12L18 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        class: 'ant-btn-default',
      },
      custom: {
        title: title || 'Action',
        icon: icon || '',
        class: 'ant-btn-default',
      },
    };

    return configs[type] || configs.custom;
  }

  // Check if button is visible (synchronous version)
  isButtonVisible(button: BreadCrumbButton): boolean {
    const visible = typeof button.visible === 'function' ? button.visible() : button.visible;
    if (visible === false) return false;

    if (button.permission) {
      return this.buttonPermissions()[button.permission] || false;
    }

    return true;
  }

  // Check if button is disabled
  isButtonDisabled(button: BreadCrumbButton): boolean {
    return typeof button.disable === 'function' ? button.disable() : button.disable || false;
  }

  // Handle button click
  async onButtonClick(button: BreadCrumbButton) {
    if (this.isButtonDisabled(button)) return;
    if (button.click) {
      await button.click();
    }
  }
}
