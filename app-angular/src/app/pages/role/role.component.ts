import { Component, Injector, OnInit } from '@angular/core';

import { AppBaseComponent } from '@/app/shared/app.base.component';

@Component({
  standalone: false,
  templateUrl: './role.component.html',
})
export class RoleComponent extends AppBaseComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.setPageTitle('Role Management');
    this.setHeaderButtons([]);
  }
}
