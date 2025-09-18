import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardDescriptionComponent } from '../../../ui/card/card-description.component';
import { CardTitleComponent } from '../../../ui/card/card-title.component';

@Component({
  selector: 'app-card-icon-two',
  imports: [
    CardTitleComponent,
    CardDescriptionComponent,
    RouterModule,
],
  templateUrl: './card-icon-two.component.html',
  styles: ``
})
export class CardIconTwoComponent {

}
