import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SampleComponent } from './sample.component';

const routes: Routes = [
  {
    path: '',
    component: SampleComponent,
    data: { title: 'Sample' },
  },
  //   {
  //     path: 'create',
  //     component: SampleCreateEditComponent,
  //   },
  //   {
  //     path: 'edit/:id',
  //     component: SampleCreateEditComponent,
  //   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SampleRoutingModule {}
