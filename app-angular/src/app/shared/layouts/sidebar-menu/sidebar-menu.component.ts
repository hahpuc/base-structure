import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface MenuItem {
  label: string;
  path?: string;
  icon: string;
  children?: MenuItem[];
  isAccordion?: boolean;
}

@Component({
  selector: 'app-sidebar-menu',
  standalone: false,
  templateUrl: './sidebar-menu.component.html',
})
export class SidebarMenuComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Overview',
      path: '/dashboard',
      icon: 'ki-home-3',
    },
    {
      label: 'User Management',
      icon: 'ki-users',
      isAccordion: true,
      children: [
        { label: 'Role', path: '/role', icon: '' },
        { label: 'User', path: '/user', icon: '' },
      ],
    },
    {
      label: 'Account Management',
      icon: 'ki-profile-circle',
      isAccordion: true,
      children: [
        { label: 'Default', path: '/profile', icon: '' },
        {
          label: 'Profiles',
          icon: '',
          isAccordion: true,
          children: [
            {
              label: 'Creator',
              path: '/public-profile/profiles/creator',
              icon: '',
            },
            {
              label: 'Company',
              path: '/public-profile/profiles/company',
              icon: '',
            },
            { label: 'NFT', path: '/public-profile/profiles/nft', icon: '' },
            {
              label: 'Blogger',
              path: '/public-profile/profiles/blogger',
              icon: '',
            },
            { label: 'CRM', path: '/public-profile/profiles/crm', icon: '' },
            {
              label: 'Gamer',
              path: '/public-profile/profiles/gamer',
              icon: '',
            },
            {
              label: 'Feeds',
              path: '/public-profile/profiles/feeds',
              icon: '',
            },
            {
              label: 'Plain',
              path: '/public-profile/profiles/plain',
              icon: '',
            },
            {
              label: 'Modal',
              path: '/public-profile/profiles/modal',
              icon: '',
            },
          ],
        },
        {
          label: 'Projects',
          icon: '',
          isAccordion: true,
          children: [
            {
              label: '3 Columns',
              path: '/public-profile/projects/3-columns',
              icon: '',
            },
            {
              label: '2 Columns',
              path: '/public-profile/projects/2-columns',
              icon: '',
            },
          ],
        },
        { label: 'Works', path: '/public-profile/works', icon: '' },
        { label: 'Teams', path: '/public-profile/teams', icon: '' },
        { label: 'Network', path: '/public-profile/network', icon: '' },
        { label: 'Activity', path: '/public-profile/activity', icon: '' },
        {
          label: 'Campaigns - Card',
          path: '/public-profile/campaigns/card',
          icon: '',
        },
        {
          label: 'Campaigns - List',
          path: '/public-profile/campaigns/list',
          icon: '',
        },
        { label: 'Empty', path: '/public-profile/empty', icon: '' },
      ],
    },
    {
      label: 'Location Management',
      icon: 'ki-setting-2',
      isAccordion: true,
      children: [
        { label: 'Province', path: '/province', icon: '' },
        { label: 'Ward', path: '/ward', icon: '' },
      ],
    },

    {
      label: 'Authentication',
      icon: 'ki-security-user',
      isAccordion: true,
      children: [
        {
          label: 'Get Started',
          icon: '',
          isAccordion: true,
          children: [
            {
              label: 'Welcome',
              path: '/authentication/get-started/welcome',
              icon: '',
            },
            {
              label: 'Overview',
              path: '/authentication/get-started/overview',
              icon: '',
            },
          ],
        },
      ],
    },
  ];

  constructor(private router: Router) {}

  isActiveRoute(path: string): boolean {
    const currentPath = this.router.url.split('?')[0];
    return currentPath === path;
  }

  isParentActive(item: MenuItem): boolean {
    if (item.path && this.isActiveRoute(item.path)) {
      return true;
    }
    if (item.children) {
      return item.children.some(child => this.isParentActive(child));
    }
    return false;
  }
}
