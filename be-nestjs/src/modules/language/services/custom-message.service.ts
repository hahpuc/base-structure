import { Injectable } from '@nestjs/common';

import { I18nService } from './i18n.service';

@Injectable()
export class CustomMessageService {
  private _context = '';

  constructor(
    private readonly i18n: I18nService,
    context?: string,
  ) {
    this._context = context ?? 'APP';
  }

  async get(
    key: string,
    context?: string,
    options?: Record<string, string | number>,
    lang?: string,
  ): Promise<string> {
    const namespace = context ?? this._context;

    return await this.i18n.t(key, {
      lang: lang ?? 'en', // Default language
      namespace: namespace.toLowerCase(),
      args: options,
      defaultValue: key, // Fallback to key if translation not found
    });
  }

  /**
   * Synchronous version that returns the key if no translation is immediately available
   * This is for backward compatibility with existing sync code
   */
  getSync(
    key: string,
    context?: string,
    options?: Record<string, string | number>,
  ): string {
    // For sync calls, return the key as fallback
    // In a real implementation, you might want to cache translations
    return key;
  }
}
