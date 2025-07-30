import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sidebar-menu',
  standalone: false,
  templateUrl: './sidebar-menu.component.html',
})
export class SidebarMenuComponent implements OnInit {
  navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'home' },
    { name: 'Profile', path: '/dashboard/profile', icon: 'user' },
    { name: 'Settings', path: '/dashboard/settings', icon: 'settings' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  isActiveRoute(path: string): boolean {
    return this.router.url === path;
  }
}
