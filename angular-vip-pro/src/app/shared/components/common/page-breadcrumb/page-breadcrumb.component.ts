import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { BreadCrumbService } from '@shared/services/bread-crumb.service';
import { PermissionService } from '@shared/services/permission.service';
import { BreadCrumbButton } from '@shared/types/bread-crumb';

@Component({
  selector: 'app-page-breadcrumb',
  imports: [RouterModule, NzButtonModule, NzIconModule, CommonModule],
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
        icon: icon || '',
        class: 'ant-btn-primary',
      },
      export: {
        title: title || 'Export',
        icon: icon || '',
        class: 'ant-btn-default',
      },
      import: {
        title: title || 'Import',
        icon: icon || '',
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
