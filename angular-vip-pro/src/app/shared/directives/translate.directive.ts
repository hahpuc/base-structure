import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { LocaleService } from '../services/i18n.service';
import { TranslateService } from '../services/translate.service';

@Directive({
  selector: '[appTranslate]',
  standalone: true,
})
export class TranslateDirective implements OnInit, OnDestroy {
  @Input('appTranslate') key!: string;
  @Input() translateParams?: Record<string, string | number>;
  @Input() translateNamespace?: string;

  private destroy$ = new Subject<void>();

  constructor(
    private el: ElementRef,
    private translateService: TranslateService,
    private localeService: LocaleService
  ) {}

  ngOnInit() {
    this.updateTranslation();

    // Subscribe to language changes to update translations automatically
    this.localeService.language$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateTranslation();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateTranslation() {
    if (!this.key) {
      return;
    }

    let translatedText: string;

    if (this.translateNamespace) {
      translatedText = this.translateService.get(
        this.translateNamespace,
        this.key,
        this.translateParams
      );
    } else {
      translatedText = this.translateService.instant(this.key, this.translateParams);
    }

    this.el.nativeElement.textContent = translatedText;
  }
}
