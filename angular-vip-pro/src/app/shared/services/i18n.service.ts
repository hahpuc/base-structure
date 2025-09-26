import { Injectable, signal } from '@angular/core';
import { en_US, vi_VN, NzI18nInterface } from 'ng-zorro-antd/i18n';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private currentLanguage = signal<string>('en');
  private languageSubject = new BehaviorSubject<string>('en');

  // Observable for components to subscribe to language changes
  public language$ = this.languageSubject.asObservable();

  // Map language codes to ng-zorro locales
  private nzLocaleMap: Record<string, NzI18nInterface> = {
    en: en_US,
    vi: vi_VN,
  };

  constructor() {
    // Initialize language from localStorage or default to 'en'
    const savedLanguage = this.getStoredLanguage();
    if (savedLanguage) {
      this.setLanguage(savedLanguage);
    }
  }

  setLanguage(lang: string): void {
    this.currentLanguage.set(lang);
    this.languageSubject.next(lang);
    this.storeLanguage(lang);
  }

  getLanguage(): string {
    return this.currentLanguage();
  }

  getCurrentLanguageSignal() {
    return this.currentLanguage;
  }

  getNzLocale(): NzI18nInterface {
    return this.nzLocaleMap[this.getLanguage()] || en_US;
  }

  private storeLanguage(lang: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('selected_language', lang);
    }
  }

  private getStoredLanguage(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('selected_language');
    }
    return null;
  }
}
