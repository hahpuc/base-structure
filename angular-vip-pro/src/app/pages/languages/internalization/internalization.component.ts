import { CommonModule } from '@angular/common';
import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppBaseComponent } from '@/app/shared/components/base/app.base.component';
import { AppInitializationService } from '@/app/shared/services/app-initialization.service';
import { LocaleService } from '@/app/shared/services/i18n.service';
import { LanguageDto } from '@/app/shared/types/language';
import { TranslationData } from '@/app/shared/types/translation';

@Component({
  imports: [CommonModule, NzButtonModule],
  templateUrl: './internalization.component.html',
})
export class InternalizationComponent extends AppBaseComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  availableLanguages: LanguageDto[] = [];
  currentLanguage = '';
  allTranslations: Record<string, TranslationData> = {};
  isRefreshing = false;

  constructor(
    injector: Injector,
    private appInitService: AppInitializationService,
    private localeService: LocaleService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.setPageTitle('Internationalization Test');
    this.loadData();
    this.subscribeToLanguageChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectLanguage(language: LanguageDto): void {
    this.localeService.setLanguage(language.code);
  }

  getCurrentLanguageDetails(): LanguageDto | undefined {
    return this.availableLanguages.find(lang => lang.code === this.currentLanguage);
  }

  getNamespaces(): string[] {
    const translations = this.allTranslations[this.currentLanguage];
    return translations ? Object.keys(translations).sort() : [];
  }

  getTranslationsForNamespace(namespace: string): Record<string, string> {
    const translations = this.allTranslations[this.currentLanguage];
    return translations?.[namespace] || {};
  }

  getTranslationCount(namespace: string): number {
    return Object.keys(this.getTranslationsForNamespace(namespace)).length;
  }

  getTotalNamespaces(): number {
    const translations = this.allTranslations[this.currentLanguage];
    return translations ? Object.keys(translations).length : 0;
  }

  getTotalTranslationKeys(): number {
    const translations = this.allTranslations[this.currentLanguage];
    if (!translations) return 0;

    return Object.values(translations).reduce((total, namespace) => {
      return total + Object.keys(namespace).length;
    }, 0);
  }

  getCacheStatus(): string {
    const hasLanguages = this.availableLanguages.length > 0;
    const hasTranslations = Object.keys(this.allTranslations).length > 0;

    if (hasLanguages && hasTranslations) {
      return 'Loaded';
    } else if (hasLanguages || hasTranslations) {
      return 'Partial';
    } else {
      return 'Empty';
    }
  }

  refreshCache(): void {
    this.isRefreshing = true;
    this.appInitService.refreshLanguageData().subscribe({
      next: () => {
        this.loadData();
        this.isRefreshing = false;
      },
      error: () => {
        this.isRefreshing = false;
      },
    });
  }

  private loadData(): void {
    this.availableLanguages = this.appInitService.getCachedLanguages();
    this.allTranslations = this.appInitService.getCachedTranslations();
    this.currentLanguage = this.localeService.getLanguage();
  }

  private subscribeToLanguageChanges(): void {
    this.localeService.language$.pipe(takeUntil(this.destroy$)).subscribe(langCode => {
      this.currentLanguage = langCode;
    });
  }
}
