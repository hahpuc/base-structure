import { Component, OnInit } from '@angular/core';
import { SharedModule, ToastService } from '../../../../shared/shared.module';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  settings = {
    notifications: {
      email: true,
      push: false,
      sms: false,
    },
    privacy: {
      profileVisibility: 'public',
      dataSharing: false,
      analytics: true,
    },
    appearance: {
      theme: 'light',
      language: 'en',
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
    },
  };

  languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
  ];

  themes = [
    { value: 'light', name: 'Light' },
    { value: 'dark', name: 'Dark' },
    { value: 'auto', name: 'Auto' },
  ];

  profileVisibilityOptions = [
    { value: 'public', name: 'Public' },
    { value: 'friends', name: 'Friends Only' },
    { value: 'private', name: 'Private' },
  ];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings(): void {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
    }
  }

  saveSettings(): void {
    localStorage.setItem('userSettings', JSON.stringify(this.settings));
    this.toastService.success(
      'Settings Saved',
      'Your preferences have been updated successfully.'
    );
  }

  resetSettings(): void {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      this.settings = {
        notifications: { email: true, push: false, sms: false },
        privacy: {
          profileVisibility: 'public',
          dataSharing: false,
          analytics: true,
        },
        appearance: { theme: 'light', language: 'en' },
        security: { twoFactorAuth: false, sessionTimeout: 30 },
      };
      this.toastService.info(
        'Settings Reset',
        'All settings have been reset to default values.'
      );
    }
  }

  exportData(): void {
    this.toastService.info(
      'Export Started',
      'Your data export has been initiated.'
    );
  }

  deleteAccount(): void {
    if (
      confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      this.toastService.error(
        'Account Deletion',
        'Account deletion request submitted.'
      );
    }
  }
}
