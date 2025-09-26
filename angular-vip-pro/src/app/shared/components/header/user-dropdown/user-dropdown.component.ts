import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppInitializationService } from '../../../services/app-initialization.service';
import { LocaleService } from '../../../services/i18n.service';
import { LanguageDto } from '../../../types/language';
import { DropdownComponent } from '../../ui/dropdown/dropdown.component';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  imports: [CommonModule, RouterModule, DropdownComponent],
})
export class UserDropdownComponent implements OnInit, OnDestroy {
  isOpen = false;
  isLanguageDropdownOpen = false;
  private destroy$ = new Subject<void>();

  selectedLanguage: LanguageDto | null = null;
  languages: LanguageDto[] = [];

  constructor(
    private appInitializationService: AppInitializationService,
    private localeService: LocaleService
  ) {}

  ngOnInit(): void {
    this.loadLanguages();
    this.subscribeToLanguageChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  closeDropdown(): void {
    this.isOpen = false;
    this.isLanguageDropdownOpen = false;
  }

  toggleLanguageDropdown(): void {
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  selectLanguage(language: LanguageDto): void {
    this.localeService.setLanguage(language.code);
    this.isLanguageDropdownOpen = false;
  }

  trackByLanguageCode(index: number, language: LanguageDto): string {
    return language.code;
  }

  private loadLanguages(): void {
    // Load languages from cache
    this.languages = this.appInitializationService.getCachedLanguages();

    // Set initial selected language
    const currentLangCode = this.localeService.getLanguage();
    this.selectedLanguage = this.languages.find(lang => lang.code === currentLangCode) || null;
  }

  private subscribeToLanguageChanges(): void {
    this.localeService.language$.pipe(takeUntil(this.destroy$)).subscribe(langCode => {
      this.selectedLanguage = this.languages.find(lang => lang.code === langCode) || null;
    });
  }
}
