import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { dashboardRoutes } from './dashboard.routes';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardHomeComponent,
    ProfileComponent,
    SettingsComponent,
  ],
  imports: [
    SharedModule, // This provides CommonModule, FormsModule, ReactiveFormsModule, etc.
    RouterModule.forChild(dashboardRoutes),
  ],
  exports: [
    DashboardLayoutComponent,
    DashboardHomeComponent,
    ProfileComponent,
    SettingsComponent,
  ],
})
export class DashboardModule {}
