import { Component } from '@angular/core';

import { ComponentCardComponent } from '../../../common/component-card/component-card.component';
import { CardOneComponent } from '../card-one/card-one.component';
import { CardThreeComponent } from '../card-three/card-three.component';
import { CardTwoComponent } from '../card-two/card-two.component';

@Component({
  selector: 'app-card-with-image',
  imports: [
    ComponentCardComponent,
    CardOneComponent,
    CardTwoComponent,
    CardThreeComponent,
  ],
  templateUrl: './card-with-image.component.html',
  styles: ``
})
export class CardWithImageComponent {

}
