import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';
import { PermissionGuard } from './shared/guards/permission.guard';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [AuthGuard, PermissionGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@pages/dashboard/dashboard.module').then(x => x.DashboardModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('@pages/profile/profile.module').then(x => x.ProfileModule),
        data: { title: 'Profile' },
      },
      {
        path: 'role',
        loadChildren: () => import('@pages/role/role.module').then(x => x.RoleModule),
      },
      {
        path: 'province',
        loadChildren: () =>
          import('@pages/location/province/province.module').then(x => x.ProvinceModule),
      },
      {
        path: 'ward',
        loadChildren: () => import('@pages/location/ward/ward.module').then(x => x.WardModule),
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'error',
        loadChildren: () => import('@pages/error/error.module').then(x => x.ErrorModule),
      },
      {
        path: '',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/error/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
