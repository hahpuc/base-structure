import { Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

export abstract class AppBaseComponent {
  protected readonly router: Router;
  protected readonly activeRoute: ActivatedRoute;
  protected readonly msgService: NzMessageService;

  protected constructor(readonly injector: Injector) {
    this.router = injector.get(Router);
    this.activeRoute = injector.get(ActivatedRoute);
    this.msgService = injector.get(NzMessageService);
  }
}
