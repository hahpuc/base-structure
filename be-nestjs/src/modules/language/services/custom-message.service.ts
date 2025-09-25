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
      lang: lang,
      namespace: namespace.toLowerCase(),
      args: options,
      defaultValue: key,
    });
  }
}
