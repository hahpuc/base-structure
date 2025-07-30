import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NzResultModule } from 'ng-zorro-antd/result';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error.component';

@NgModule({
  declarations: [ErrorComponent],
  imports: [SharedModule, ErrorRoutingModule, NzResultModule],
})
export class ErrorModule {}
