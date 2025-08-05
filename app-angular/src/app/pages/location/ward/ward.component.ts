import { AppBaseComponent } from '@/app/shared/app.base.component';
import { Component, Injector, OnInit } from '@angular/core';

@Component({
  standalone: false,
  templateUrl: './ward.component.html',
})
export class WardComponent extends AppBaseComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}
}
