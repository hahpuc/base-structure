import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent {
  isSidebarOpen = false;
  currentUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };

  navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'home' },
    { name: 'Profile', path: '/dashboard/profile', icon: 'user' },
    { name: 'Settings', path: '/dashboard/settings', icon: 'settings' },
  ];

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout(): void {
    // Implement logout logic here
    this.router.navigate(['/auth/login']);
  }

  isActiveRoute(path: string): boolean {
    return this.router.url === path;
  }
}
