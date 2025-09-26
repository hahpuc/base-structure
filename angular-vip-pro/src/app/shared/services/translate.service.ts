import { Injectable } from '@angular/core';

import { TranslationData } from '../types/translation';

import { LocaleService } from './i18n.service';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private _context = '';

  constructor(private localeService: LocaleService) {
    this._context = 'common';
  }

  /**
   * Create a new instance with specific context
   */
  static withContext(context: string, localeService: LocaleService): TranslateService {
    const service = new TranslateService(localeService);
    service.setContext(context);
    return service;
  }

  /**
   * Get translation for a key
   * @param key Translation key
   * @param params Optional parameters for interpolation
   * @param namespace Optional namespace override
   * @returns Translated string or key if translation not found
   */
  instant(key: string, params?: Record<string, string | number>, namespace?: string): string {
    const currentLang = this.localeService.getLanguage();
    const translations = this.getTranslationsFromStorage();

    if (!translations?.[currentLang]) {
      return key;
    }

    const ns = namespace || this._context;
    const translation = translations[currentLang][ns]?.[key];

    if (!translation) {
      return key;
    }

    // Handle parameter interpolation
    if (params) {
      return this.interpolate(translation, params);
    }

    return translation;
  }

  /**
   * Get translation with specific namespace
   * @param namespace Namespace to use
   * @param key Translation key
   * @param params Optional parameters for interpolation
   * @returns Translated string or key if translation not found
   */
  get(namespace: string, key: string, params?: Record<string, string | number>): string {
    return this.instant(key, params, namespace);
  }

  /**
   * Set the default context/namespace for this service instance
   * @param context New context to set
   */
  setContext(context: string): void {
    this._context = context;
  }

  /**
   * Get current context/namespace
   * @returns Current context
   */
  getContext(): string {
    return this._context;
  }

  /**
   * Check if translation exists for given key
   * @param key Translation key
   * @param namespace Optional namespace override
   * @returns True if translation exists
   */
  hasTranslation(key: string, namespace?: string): boolean {
    const currentLang = this.localeService.getLanguage();
    const translations = this.getTranslationsFromStorage();

    if (!translations?.[currentLang]) {
      return false;
    }

    const ns = namespace || this._context;
    return !!translations[currentLang][ns]?.[key];
  }

  /**
   * Get all translations for current language and namespace
   * @param namespace Optional namespace override
   * @returns Object with all translations
   */
  getAll(namespace?: string): Record<string, string> {
    const currentLang = this.localeService.getLanguage();
    const translations = this.getTranslationsFromStorage();

    if (!translations?.[currentLang]) {
      return {};
    }

    const ns = namespace || this._context;
    return translations[currentLang][ns] || {};
  }

  private getTranslationsFromStorage(): Record<string, TranslationData> | null {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('app_translations');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  }

  private interpolate(text: string, params: Record<string, string | number>): string {
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] !== undefined ? String(params[key]) : match;
    });
  }
}
