import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { LanguageDto } from '../types/language';
import { TranslationData } from '../types/translation';

import { LocaleService } from './i18n.service';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class AppInitializationService {
  constructor(
    private languageService: LanguageService,
    private localeService: LocaleService
  ) {}

  /**
   * Initialize the application by loading languages and translations
   * This should be called during app startup
   */
  initializeApp(): Observable<boolean> {
    // Check if data is already cached and fresh
    if (this.isCacheValid()) {
      return of(true);
    }

    return forkJoin({
      languages: this.loadLanguages(),
      translations: this.loadTranslations(),
    }).pipe(
      tap(({ languages, translations }) => {
        // Cache the data with timestamp
        this.cacheLanguages(languages);
        this.cacheTranslations(translations);
        this.setCacheTimestamp();

        // Set initial language based on cached preference or first available language
        const savedLanguage = this.localeService.getLanguage();
        const availableLanguageCodes = languages.map(lang => lang.code);

        if (!availableLanguageCodes.includes(savedLanguage) && languages.length > 0) {
          // If saved language is not available, use first available language
          this.localeService.setLanguage(languages[0].code);
        }

        // Language data loaded and cached successfully
      }),
      map(() => true),
      catchError(() => {
        // Return true to continue app initialization even if language loading fails
        return of(true);
      })
    );
  }

  /**
   * Refresh language and translation data from APIs
   */
  refreshLanguageData(): Observable<boolean> {
    this.clearCache();
    return this.initializeApp();
  }

  /**
   * Get cached languages from localStorage
   */
  getCachedLanguages(): LanguageDto[] {
    if (typeof localStorage !== 'undefined') {
      const cached = localStorage.getItem('app_languages');
      return cached ? JSON.parse(cached) : [];
    }
    return [];
  }

  /**
   * Get cached translations from localStorage
   */
  getCachedTranslations(): Record<string, TranslationData> {
    if (typeof localStorage !== 'undefined') {
      const cached = localStorage.getItem('app_translations');
      return cached ? JSON.parse(cached) : {};
    }
    return {};
  }

  private loadLanguages(): Observable<LanguageDto[]> {
    return this.languageService.getAllLanguages().pipe(
      catchError(() => {
        return of([]);
      })
    );
  }

  private loadTranslations(): Observable<Record<string, TranslationData>> {
    return this.languageService.getAllTranslations().pipe(
      catchError(() => {
        return of({});
      })
    );
  }

  private cacheLanguages(languages: LanguageDto[]): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('app_languages', JSON.stringify(languages));
    }
  }

  private cacheTranslations(translations: Record<string, TranslationData>): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('app_translations', JSON.stringify(translations));
    }
  }

  private setCacheTimestamp(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('app_cache_timestamp', Date.now().toString());
    }
  }

  private getCacheTimestamp(): number {
    if (typeof localStorage !== 'undefined') {
      const timestamp = localStorage.getItem('app_cache_timestamp');
      return timestamp ? parseInt(timestamp, 10) : 0;
    }
    return 0;
  }

  private isCacheValid(): boolean {
    const cacheAge = Date.now() - this.getCacheTimestamp();
    const maxCacheAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const hasLanguages = this.getCachedLanguages().length > 0;
    const hasTranslations = Object.keys(this.getCachedTranslations()).length > 0;

    return cacheAge < maxCacheAge && hasLanguages && hasTranslations;
  }

  private clearCache(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('app_languages');
      localStorage.removeItem('app_translations');
      localStorage.removeItem('app_cache_timestamp');
    }
  }
}
