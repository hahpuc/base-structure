import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//ant design
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { SafeHtmlPipe } from './pipes/safe-html.pipe';

import { ThrottleClickDirective } from './directives/throttle-click.directive';

import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SidebarMenuComponent } from './layouts/sidebar-menu/sidebar-menu.component';

import { ToastComponent } from './components/toast/toast.component';
import { BreadcrumbComponent } from './layouts/breadcrumb/breadcrumb.component';

const layouts = [
  BlankLayoutComponent,
  AuthLayoutComponent,
  MainLayoutComponent,
  SidebarMenuComponent,
  BreadcrumbComponent,
];

const components = [ToastComponent];

const directives = [ThrottleClickDirective];

const pipes = [SafeHtmlPipe];

const antD = [
  NzLayoutModule,
  NzBreadCrumbModule,
  NzButtonModule,
  NzMenuModule,
  NzIconModule,

  NzIconModule,
  NzDropDownModule,
  NzAvatarModule,
  NzFormModule,
  NzCheckboxModule,
  NzInputModule,
  NzSelectModule,
  NzDatePickerModule,
  NzTableModule,
  NzDividerModule,
  NzImageModule,
  NzSwitchModule,
  NzCardModule,
  NzInputNumberModule,
  NzPopconfirmModule,
  NzSpinModule,
  NzModalModule,
  NzSpaceModule,
  NzUploadModule,
  NzGridModule,
];
@NgModule({
  declarations: [...layouts, ...components, ...directives, ...pipes],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    ScrollingModule,
    FormsModule,
    ...antD,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ...layouts,
    ...components,
    ...antD,
    ...pipes,
  ],
})
export class SharedModule {}
