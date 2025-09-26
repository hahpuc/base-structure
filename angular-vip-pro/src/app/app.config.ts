import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import en from '@angular/common/locales/en';
import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { firstValueFrom } from 'rxjs';

import { routes } from './app.routes';
import { httpCustomInterceptor } from './shared/http-interceptor/http-custom-interceptor';
import { AppInitializationService } from './shared/services/app-initialization.service';
import { LocaleService } from './shared/services/i18n.service';

registerLocaleData(en);

/**
 * Factory function to initialize the application
 * Loads language and translation data before app starts
 */

function initializeAppFactory() {
  return async () => {
    try {
      const appInitService = inject(AppInitializationService);
      await firstValueFrom(appInitService.initializeApp());
      return true;
    } catch (error) {
      return true;
    }
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptors([httpCustomInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(TranslateModule.forRoot()),

    // Initialize app with language data before startup
    provideAppInitializer(initializeAppFactory()),

    {
      provide: NZ_I18N,
      useFactory: () => {
        const localeService = inject(LocaleService);
        return localeService.getNzLocale();
      },
    },
  ],
};
