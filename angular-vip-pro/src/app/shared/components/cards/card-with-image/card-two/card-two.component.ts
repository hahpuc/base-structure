import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardDescriptionComponent } from '../../../ui/card/card-description.component';
import { CardComponent } from '../../../ui/card/card.component';

@Component({
  selector: 'app-card-two',
  imports: [
    CardComponent,
    CardDescriptionComponent,
    RouterModule,
  ],
  templateUrl: './card-two.component.html',
  styles: ``
})
export class CardTwoComponent {

}
