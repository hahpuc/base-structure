import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { QuillModule } from 'ngx-quill';

import { RichTextComponent } from './controls/rich-text/rich-text.component';
import { FormComponent } from './form.component';

const components = [FormComponent, RichTextComponent];

const antD = [
  NzFormModule,
  NzInputModule,
  NzSelectModule,
  NzButtonModule,
  NzSpaceModule,
  NzGridModule,
  NzInputNumberModule,
  NzRadioModule,
  NzCheckboxModule,
  NzSwitchModule,
  NzDatePickerModule,
  NzTimePickerModule,
  NzUploadModule,
  NzRateModule,
  NzSliderModule,
  NzColorPickerModule,
  NzSpinModule,
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, QuillModule.forRoot(), ...antD],
  exports: [...components],
})
export class AppFormModule {}
