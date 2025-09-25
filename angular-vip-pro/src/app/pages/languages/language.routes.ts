import { Routes } from '@angular/router';

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
];

export default routes;
