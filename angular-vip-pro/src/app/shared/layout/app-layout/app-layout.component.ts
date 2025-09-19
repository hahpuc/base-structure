import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageBreadcrumbComponent } from '../../components/common/page-breadcrumb/page-breadcrumb.component';
import { SidebarService } from '../../services/sidebar.service';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { AppSidebarComponent } from '../app-sidebar/app-sidebar.component';
import { BackdropComponent } from '../backdrop/backdrop.component';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterModule,
    AppHeaderComponent,
    AppSidebarComponent,
    BackdropComponent,
    PageBreadcrumbComponent,
  ],
  templateUrl: './app-layout.component.html',
})
export class AppLayoutComponent {
  readonly isExpanded$;
  readonly isHovered$;
  readonly isMobileOpen$;

  constructor(public sidebarService: SidebarService) {
    this.isExpanded$ = this.sidebarService.isExpanded$;
    this.isHovered$ = this.sidebarService.isHovered$;
    this.isMobileOpen$ = this.sidebarService.isMobileOpen$;
  }

  get containerClasses() {
    return [
      'flex-1',
      'transition-all',
      'duration-300',
      'ease-in-out',
      this.isExpanded$ || this.isHovered$ ? 'xl:ml-[290px]' : 'xl:ml-[90px]',
      this.isMobileOpen$ ? 'ml-0' : '',
    ];
  }
}
