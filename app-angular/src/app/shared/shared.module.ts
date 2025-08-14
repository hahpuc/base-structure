import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
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
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzUploadModule } from 'ng-zorro-antd/upload';
// eslint-disable-next-line import/no-extraneous-dependencies
import { QuillModule } from 'ngx-quill';

import { FormComponent } from './components/form/form.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { RichTextComponent } from './components/rich-text/rich-text.component';
import { TableComponent } from './components/table/table.component';
import { TableFilterDrawerComponent } from './components/table-filter/drawer/table-filter-drawer.component';
import { TableFilterSearchComponent } from './components/table-filter/search/table-filter-search.component';
import { TableFilterComponent } from './components/table-filter/table-filter.component';
import { TableFilterTagsComponent } from './components/table-filter/tags/table-filter-tags.component';
import { ToastComponent } from './components/toast/toast.component';
import { ThrottleClickDirective } from './directives/throttle-click.directive';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { BreadcrumbComponent } from './layouts/breadcrumb/breadcrumb.component';
import { HeaderComponent } from './layouts/header/header.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SidebarMenuComponent } from './layouts/sidebar-menu/sidebar-menu.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

const layouts = [
  BlankLayoutComponent,
  AuthLayoutComponent,
  MainLayoutComponent,
  SidebarMenuComponent,
  BreadcrumbComponent,
];

const components = [
  ToastComponent,
  FormComponent,
  ProgressBarComponent,
  TableComponent,
  TableFilterComponent,
  TableFilterTagsComponent,
  TableFilterDrawerComponent,
  TableFilterSearchComponent,
  HeaderComponent,
  RichTextComponent,
];

const directives = [ThrottleClickDirective];

const pipes = [SafeHtmlPipe];

const antD = [
  NzLayoutModule,
  NzBreadCrumbModule,
  NzButtonModule,
  NzMenuModule,
  NzIconModule,
  NzDropDownModule,
  NzDrawerModule,
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
  NzPaginationModule,
  NzSpaceModule,
  NzUploadModule,
  NzGridModule,
  NzCollapseModule,
  NzTagModule,
  NzResizableModule,
  NzRadioModule,
  NzTimePickerModule,
  NzTreeModule,
  NzRateModule,
  NzSliderModule,
  NzAutocompleteModule,
  NzColorPickerModule,
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
    QuillModule.forRoot(),
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
