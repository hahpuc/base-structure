import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface MenuItem {
  label: string;
  path?: string;
  icon: string;
  children?: MenuItem[];
  isAccordion?: boolean;
}

@Component({
  selector: 'sidebar-menu',
  standalone: false,
  templateUrl: './sidebar-menu.component.html',
})
export class SidebarMenuComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      label: 'Overview',
      path: '/dashboard',
      icon: 'ki-home-3',
    },
    {
      label: 'Public Profile',
      icon: 'ki-profile-circle',
      isAccordion: true,
      children: [
        {
          label: 'Profiles',
          icon: '',
          isAccordion: true,
          children: [
            {
              label: 'Default',
              path: '/profile',
              icon: '',
            },
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
      label: 'My Account',
      icon: 'ki-setting-2',
      isAccordion: true,
      children: [
        {
          label: 'Account Home',
          icon: '',
          isAccordion: true,
          children: [
            {
              label: 'Get Started',
              path: '/account/home/get-started',
              icon: '',
            },
            {
              label: 'User Profile',
              path: '/account/home/user-profile',
              icon: '',
            },
            {
              label: 'Company Profile',
              path: '/account/home/company-profile',
              icon: '',
            },
            {
              label: 'Settings - With Sidebar',
              path: '/account/home/settings-sidebar',
              icon: '',
            },
            {
              label: 'Settings - Enterprise',
              path: '/account/home/settings-enterprise',
              icon: '',
            },
            {
              label: 'Settings - Plain',
              path: '/account/home/settings-plain',
              icon: '',
            },
            {
              label: 'Settings - Modal',
              path: '/account/home/settings-modal',
              icon: '',
            },
          ],
        },
        {
          label: 'Billing',
          icon: '',
          isAccordion: true,
          children: [
            {
              label: 'Billing - Basic',
              path: '/account/billing/basic',
              icon: '',
            },
            {
              label: 'Billing - Enterprise',
              path: '/account/billing/enterprise',
              icon: '',
            },
            { label: 'Plans', path: '/account/billing/plans', icon: '' },
            {
              label: 'Billing History',
              path: '/account/billing/history',
              icon: '',
            },
          ],
        },
        {
          label: 'Security',
          icon: '',
          isAccordion: true,
          children: [
            {
              label: 'Get Started',
              path: '/account/security/get-started',
              icon: '',
            },
            {
              label: 'Security Overview',
              path: '/account/security/overview',
              icon: '',
            },
            {
              label: 'Allowed IP Addresses',
              path: '/account/security/allowed-ip-addresses',
              icon: '',
            },
            {
              label: 'Privacy Settings',
              path: '/account/security/privacy-settings',
              icon: '',
            },
            {
              label: 'Device Management',
              path: '/account/security/device-management',
              icon: '',
            },
            {
              label: 'Backup & Recovery',
              path: '/account/security/backup-and-recovery',
              icon: '',
            },
            {
              label: 'Current Sessions',
              path: '/account/security/current-sessions',
              icon: '',
            },
            {
              label: 'Security Log',
              path: '/account/security/security-log',
              icon: '',
            },
          ],
        },
        {
          label: 'Members & Roles',
          icon: '',
          isAccordion: true,
          children: [
            {
              label: 'Teams Starter',
              path: '/account/members/team-starter',
              icon: '',
            },
            { label: 'Teams', path: '/account/members/teams', icon: '' },
            {
              label: 'Team Info',
              path: '/account/members/team-info',
              icon: '',
            },
            {
              label: 'Members Starter',
              path: '/account/members/members-starter',
              icon: '',
            },
            {
              label: 'Team Members',
              path: '/account/members/team-members',
              icon: '',
            },
            {
              label: 'Import Members',
              path: '/account/members/import-members',
              icon: '',
            },
            { label: 'Roles', path: '/account/members/roles', icon: '' },
            {
              label: 'Permissions - Toggler',
              path: '/account/members/permissions-toggle',
              icon: '',
            },
            {
              label: 'Permissions - Check',
              path: '/account/members/permissions-check',
              icon: '',
            },
          ],
        },
        { label: 'Integrations', path: '/account/integrations', icon: '' },
        { label: 'Notifications', path: '/account/notifications', icon: '' },
        { label: 'API Keys', path: '/account/api-keys', icon: '' },
        { label: 'Appearance', path: '/account/appearance', icon: '' },
        {
          label: 'Invite a Friend',
          path: '/account/invite-a-friend',
          icon: '',
        },
        { label: 'Activity', path: '/account/activity', icon: '' },
      ],
    },
    {
      label: 'Network',
      icon: 'ki-users',
      isAccordion: true,
      children: [
        { label: 'Get Started', path: '/network/get-started', icon: '' },
        {
          label: 'User Cards',
          icon: '',
          isAccordion: true,
          children: [
            {
              label: 'Mini Cards',
              path: '/network/user-cards/mini-cards',
              icon: '',
            },
            {
              label: 'Team Crew',
              path: '/network/user-cards/team-crew',
              icon: '',
            },
            { label: 'Author', path: '/network/user-cards/author', icon: '' },
            { label: 'NFT', path: '/network/user-cards/nft', icon: '' },
            { label: 'Social', path: '/network/user-cards/social', icon: '' },
          ],
        },
        {
          label: 'User Table',
          icon: '',
          isAccordion: true,
          children: [
            {
              label: 'Team Crew',
              path: '/network/user-table/team-crew',
              icon: '',
            },
            {
              label: 'App Roster',
              path: '/network/user-table/app-roster',
              icon: '',
            },
            {
              label: 'Market Authors',
              path: '/network/user-table/market-authors',
              icon: '',
            },
          ],
        },
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

  ngOnInit(): void {}

  isActiveRoute(path: string): boolean {
    console.log('Checking active route:', this.router.url, 'against', path);

    return this.router.url === path;
  }

  isParentActive(item: MenuItem): boolean {
    if (item.path && this.isActiveRoute(item.path)) {
      return true;
    }
    if (item.children) {
      return item.children.some((child) => this.isParentActive(child));
    }
    return false;
  }
}
