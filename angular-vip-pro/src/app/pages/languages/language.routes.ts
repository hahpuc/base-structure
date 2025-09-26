import { Routes } from '@angular/router';

import { InternalizationComponent } from './internalization/internalization.component';
import { LanguagesComponent } from './languages/languages.component';
import { NamespacesComponent } from './namespaces/namespaces.component';
import { TranslationsComponent } from './translations/translations.component';

const routes: Routes = [
  {
    path: 'languages',
    component: LanguagesComponent,
  },
  {
    path: 'namespaces',
    component: NamespacesComponent,
  },
  {
    path: 'translations',
    component: TranslationsComponent,
  },
  {
    path: 'internalization',
    component: InternalizationComponent,
  },
];

export default routes;
