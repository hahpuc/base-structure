import { Routes } from '@angular/router';

import { BlankComponent } from './pages/blank/blank.component';
import { BarChartComponent } from './pages/charts/bar-chart/bar-chart.component';
import { LineChartComponent } from './pages/charts/line-chart/line-chart.component';
import { EcommerceComponent } from './pages/dashboard/ecommerce/ecommerce.component';
import { LoadingExampleComponent } from './pages/example/example.component';
import { FormElementsComponent } from './pages/forms/form-elements/form-elements.component';
import { NzDemoFormNormalLoginComponent } from './pages/forms-antd/forms-antd.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { NotFoundComponent } from './pages/other-page/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BasicTablesComponent } from './pages/tables/basic-tables/basic-tables.component';
import { AlertsComponent } from './pages/ui-elements/alerts/alerts.component';
import { AvatarElementComponent } from './pages/ui-elements/avatar-element/avatar-element.component';
import { BadgesComponent } from './pages/ui-elements/badges/badges.component';
import { ButtonsComponent } from './pages/ui-elements/buttons/buttons.component';
import { ImagesComponent } from './pages/ui-elements/images/images.component';
import { VideosComponent } from './pages/ui-elements/videos/videos.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { PermissionGuard } from './shared/guards/permission.guard';
import { AppLayoutComponent } from './shared/layout/app-layout/app-layout.component';
import { AuthPageLayoutComponent } from './shared/layout/auth-page-layout/auth-page-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivateChild: [AuthGuard, PermissionGuard],
    children: [
      {
        path: 'dashboard',
        component: EcommerceComponent,
      },

      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'form-elements',
        component: FormElementsComponent,
      },
      {
        path: 'basic-tables',
        component: BasicTablesComponent,
      },
      {
        path: 'blank',
        component: BlankComponent,
      },
      // UI Components
      {
        path: 'invoice',
        component: InvoicesComponent,
      },
      {
        path: 'line-chart',
        component: LineChartComponent,
      },
      {
        path: 'bar-chart',
        component: BarChartComponent,
      },
      {
        path: 'alerts',
        component: AlertsComponent,
      },
      {
        path: 'avatars',
        component: AvatarElementComponent,
      },
      {
        path: 'badge',
        component: BadgesComponent,
      },
      {
        path: 'buttons',
        component: ButtonsComponent,
      },
      {
        path: 'images',
        component: ImagesComponent,
      },
      {
        path: 'videos',
        component: VideosComponent,
      },
      {
        path: 'form-antd',
        component: NzDemoFormNormalLoginComponent,
      },
      {
        path: 'loading',
        component: LoadingExampleComponent,
      },
      {
        path: '',
        loadChildren: () => import('./pages/location/location.routes'),
      },
      {
        path: '',
        loadChildren: () => import('./pages/user/user.routes'),
      },
    ],
  },
  {
    path: '',
    component: AuthPageLayoutComponent,
    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  // error pages
  {
    path: '**',
    component: NotFoundComponent,
  },
];
