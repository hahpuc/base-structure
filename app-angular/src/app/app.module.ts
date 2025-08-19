import { registerLocaleData } from '@angular/common';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import en from '@angular/common/locales/en';
import vi from '@angular/common/locales/vi';
import { inject, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TRANSLATE_HTTP_LOADER_CONFIG, TranslateHttpLoader } from '@ngx-translate/http-loader';
import { en_US, NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpCustomInterceptor } from './shared/http-interceptor/http-custom-interceptor';
import { SharedModule } from './shared/shared.module';

registerLocaleData(en);
registerLocaleData(vi);

// AoT requires an exported function for factories
export function HttpLoaderFactory() {
  return new TranslateHttpLoader();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    provideHttpClient(withFetch(), withInterceptors([httpCustomInterceptor])),
    {
      provide: NZ_I18N,
      useFactory: () => {
        const localId = inject(LOCALE_ID);
        switch (localId) {
          case 'en':
            return en_US;
          /** keep the same with angular.json/i18n/locales configuration **/
          case 'vi':
            return vi_VN;
          default:
            return en_US;
        }
      },
    },
    {
      provide: TRANSLATE_HTTP_LOADER_CONFIG,
      useValue: {
        prefix: '/assets/i18n/',
        suffix: '.json',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
