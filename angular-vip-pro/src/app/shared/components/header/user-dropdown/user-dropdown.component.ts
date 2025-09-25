import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DropdownComponent } from '../../ui/dropdown/dropdown.component';

interface Language {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  imports: [CommonModule, RouterModule, DropdownComponent],
})
export class UserDropdownComponent {
  isOpen = false;
  isLanguageDropdownOpen = false;

  selectedLanguage: Language = {
    code: 'en',
    name: 'English',
    flag: 'https://flagcdn.com/us.svg',
  };

  languages: Language[] = [
    { code: 'vi', name: 'Vietnam', flag: 'https://flagcdn.com/vn.svg' },
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/us.svg' },
    { code: 'fr', name: 'Français', flag: 'https://flagcdn.com/fr.svg' },
    { code: 'de', name: 'Deutsch', flag: 'https://flagcdn.com/de.svg' },
    { code: 'it', name: 'Italiano', flag: 'https://flagcdn.com/it.svg' },
    { code: 'pt', name: 'Português', flag: 'https://flagcdn.com/pt.svg' },
    { code: 'ja', name: '日本語', flag: 'https://flagcdn.com/jp.svg' },
    { code: 'ko', name: '한국어', flag: 'https://flagcdn.com/kr.svg' },
    { code: 'zh', name: '中文', flag: 'https://flagcdn.com/cn.svg' },
  ];

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
    this.isLanguageDropdownOpen = false;
  }

  toggleLanguageDropdown() {
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  selectLanguage(language: Language) {
    this.selectedLanguage = language;
    this.isLanguageDropdownOpen = false;
    // Here you can add logic to actually change the application language
  }

  trackByLanguageCode(index: number, language: Language): string {
    return language.code;
  }
}
