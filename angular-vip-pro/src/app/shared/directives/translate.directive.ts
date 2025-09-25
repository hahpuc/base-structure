// import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';

// import { AppTranslationService } from '../services/translation/app-translation.service';

// @Directive({
//   selector: '[appTranslate]',
//   standalone: true,
// })
// export class TranslateDirective implements OnInit, OnDestroy {
//   @Input('appTranslate') key!: string;
//   @Input() translateParams?: Record<string, unknown>;

//   private destroy$ = new Subject<void>();

//   constructor(
//     private elementRef: ElementRef,
//     private translationService: AppTranslationService
//   ) {}

//   ngOnInit(): void {
//     this.updateTranslation();

//     // Listen for language changes
//     this.translationService.currentLanguage$.pipe(takeUntil(this.destroy$)).subscribe(() => {
//       this.updateTranslation();
//     });
//   }

//   ngOnDestroy(): void {
//     this.destroy$.next();
//     this.destroy$.complete();
//   }

//   private updateTranslation(): void {
//     this.translationService
//       .translate(this.key, this.translateParams)
//       .pipe(takeUntil(this.destroy$))
//       .subscribe(translation => {
//         this.elementRef.nativeElement.textContent = translation;
//       });
//   }
// }
