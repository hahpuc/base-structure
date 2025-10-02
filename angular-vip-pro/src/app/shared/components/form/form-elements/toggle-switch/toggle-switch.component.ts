import { Component } from '@angular/core';

import { ComponentCardComponent } from '../../../common/component-card/component-card.component';
import { SwitchComponent } from '../../input/switch.component';

@Component({
  selector: 'app-toggle-switch',
  imports: [
    SwitchComponent,
    ComponentCardComponent,
  ],
  templateUrl: './toggle-switch.component.html',
  styles: ``
})
export class ToggleSwitchComponent {

  handleSwitchChange(checked: boolean) {
    console.log('Switch is now:', checked ? 'ON' : 'OFF');
  }
}
