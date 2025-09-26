import { Routes } from '@angular/router';

import { InternalizationComponent } from './internalization/internalization.component';
import { CreateEditLanguageComponent } from './languages/create-edit/create-edit-language.component';
import { LanguagesComponent } from './languages/languages.component';
import { CreateEditNamespaceComponent } from './namespaces/create-edit/create-edit.namespace.component';
import { NamespacesComponent } from './namespaces/namespaces.component';
import { TranslationsComponent } from './translations/translations.component';
import { CreateEditTranslationsComponent } from './translations/create-edit/create-edit.translation.component';

const routes: Routes = [
  {
    path: 'languages',
    component: LanguagesComponent,
  },
  {
    path: 'languages/create',
    component: CreateEditLanguageComponent,
  },
  {
    path: 'languages/edit/:id',
    component: CreateEditLanguageComponent,
  },
  {
    path: 'namespaces',
    component: NamespacesComponent,
  },
  {
    path: 'namespaces/create',
    component: CreateEditNamespaceComponent,
  },
  {
    path: 'namespaces/edit/:id',
    component: CreateEditNamespaceComponent,
  },
  {
    path: 'translations',
    component: TranslationsComponent,
  },
  {
    path: 'translations/create',
    component: CreateEditTranslationsComponent,
  },
  {
    path: 'translations/edit/:id',
    component: CreateEditTranslationsComponent,
  },
  {
    path: 'internalization',
    component: InternalizationComponent,
  },
];

export default routes;
