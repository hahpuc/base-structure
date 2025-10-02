import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardDescriptionComponent } from '../../../ui/card/card-description.component';
import { CardTitleComponent } from '../../../ui/card/card-title.component';
import { CardComponent } from '../../../ui/card/card.component';


@Component({
  selector: 'app-card-one',
  imports: [
    CardComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    RouterModule,
  ],
  templateUrl: './card-one.component.html',
  styles: ``
})
export class CardOneComponent {

}
