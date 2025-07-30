import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
} from '@angular/core';
import { AppBaseComponent } from '../../app.base.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
  selector: 'action-bar',
  templateUrl: './action-bar.component.html',
  styles: [':host{ margin-bottom: 2rem; display: block; }'],
})
export class ActionBarComponent<T> extends AppBaseComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}
}
