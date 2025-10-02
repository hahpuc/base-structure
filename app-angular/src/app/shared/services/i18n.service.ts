import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { en_US, vi_VN, NzI18nService } from 'ng-zorro-antd/i18n';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private currentLang: BehaviorSubject<string>;

  constructor(
    private nzI18nService: NzI18nService,
    private translateService: TranslateService
  ) {
    const lang = localStorage.getItem('lang') || 'en';
    this.currentLang = new BehaviorSubject<string>(lang);
    this.nzI18nService.setLocale(lang === 'vi' ? vi_VN : en_US);
    this.translateService.use(lang);
  }

  setLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    this.currentLang.next(lang);
    this.nzI18nService.setLocale(lang === 'vi' ? vi_VN : en_US);
    this.translateService.use(lang);
  }

  getLanguage(): string {
    return this.currentLang.value;
  }
}
