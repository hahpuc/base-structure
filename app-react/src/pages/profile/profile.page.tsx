import React from 'react';

import CustomTabs, { TabItem } from '@/components/partials/tabs/custom-tabs.component';
import useHeader from '@/hooks/use-header.hook';

import ActivityLoginComponent from './components/activity-login.component';
import ActivityTab from './components/activity-tab.component';
import PersonalInfoTab from './components/personal-info-tab.component';
import ProfileHeader from './components/profile-header.component';
import ProjectComponent from './components/project.component';
import SettingsSecurityComponent from './components/settings-security.component';
import SettingsTab from './components/settings-tab.component';

const ProfilePage: React.FunctionComponent = () => {
  useHeader('Profile');

  const tabItems: TabItem[] = [
    {
      key: 'personal',
      label: 'Personal Info',
      content: <PersonalInfoTab />,
      icon: <span className="text-lg">👤</span>,
    },
    {
      key: 'project',
      label: 'Projects',
      content: <ProjectComponent />,
      icon: <span className="text-lg">📁</span>,
    },
    {
      key: 'activity',
      label: 'Activity',
      icon: <span className="text-lg">📊</span>,
      badge: '12',
      dropdown: {
        items: [
          {
            key: 'all',
            label: 'All Activities',
            icon: <span>📋</span>,
            content: <ActivityTab />,
          },
          {
            key: 'login',
            label: 'Login Activity',
            icon: <span>🔐</span>,
            content: <ActivityLoginComponent />,
          },
          {
            key: 'profile',
            label: 'Profile Changes',
            icon: <span>👤</span>,
            content: (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Profile Changes</h2>
                <p>Profile changes content goes here...</p>
              </div>
            ),
          },
          {
            key: 'security',
            label: 'Security Events',
            icon: <span>🛡️</span>,
            content: (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Security Events</h2>
                <p>Security events content goes here...</p>
              </div>
            ),
          },
          {
            key: 'more',
            label: 'More Options',
            icon: <span>⚙️</span>,
            submenu: [
              {
                key: 'export',
                label: 'Export Data',
                icon: <span>📤</span>,
                content: (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Export Data</h2>
                    <p>Export functionality goes here...</p>
                  </div>
                ),
              },
              {
                key: 'archive',
                label: 'Archive Old Records',
                icon: <span>📦</span>,
                content: (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Archive Records</h2>
                    <p>Archive functionality goes here...</p>
                  </div>
                ),
              },
              {
                key: 'settings-sub',
                label: 'Activity Settings',
                icon: <span>⚙️</span>,
                content: (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Activity Settings</h2>
                    <p>Activity settings go here...</p>
                  </div>
                ),
              },
            ],
          },
        ],
      },
    },
    {
      key: 'settings',
      label: 'Settings',
      // No content for tabs with dropdown - content comes from dropdown items
      icon: <span className="text-lg">⚙️</span>,
      dropdown: {
        items: [
          {
            key: 'general',
            label: 'General Settings',
            icon: <span>🔧</span>,
            content: <SettingsTab />,
          },
          {
            key: 'security',
            label: 'Security Settings',
            icon: <span>🔒</span>,
            content: <SettingsSecurityComponent />,
          },
          {
            key: 'privacy',
            label: 'Privacy Settings',
            icon: <span>👁️</span>,
            content: (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
                <p>Privacy settings content goes here...</p>
              </div>
            ),
          },
          {
            key: 'advanced',
            label: 'Advanced',
            icon: <span>🚀</span>,
            submenu: [
              {
                key: 'developer',
                label: 'Developer Options',
                icon: <span>💻</span>,
                content: (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Developer Options</h2>
                    <p>Developer options go here...</p>
                  </div>
                ),
              },
              {
                key: 'experimental',
                label: 'Experimental Features',
                icon: <span>🧪</span>,
                content: (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Experimental Features</h2>
                    <p>Experimental features go here...</p>
                  </div>
                ),
              },
            ],
          },
          {
            key: 'divider1',
            label: '',
            divider: true,
            onClick: () => {},
          },
          {
            key: 'reset',
            label: 'Reset All Settings',
            icon: <span>🔄</span>,
            content: (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Reset Settings</h2>
                <p>Reset settings functionality goes here...</p>
              </div>
            ),
          },
        ],
      },
    },
  ];

  return (
    <div className="profile-page">
      <ProfileHeader />

      <div className="container mx-auto px-2 sm:px-4 lg:px-6 max-w-[1320px] mt-6">
        <CustomTabs
          items={tabItems}
          defaultActiveKey="personal"
          className="w-full"
          tabHeaderClassName="bg-white rounded-t-lg py-2"
          tabContentClassName="min-h-[400px] px-2 sm:px-4"
          animated={true}
          onChange={_key => {
            // Handle tab change if needed
          }}
          size="default"
          tabPosition="top"
        />
      </div>
    </div>
  );
};

export default ProfilePage;
