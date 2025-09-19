import { Injectable, signal, Signal } from '@angular/core';

import { BreadCrumbButton } from '../types/bread-crumb';

@Injectable({ providedIn: 'root' })
export class BreadCrumbService {
  private _title = signal<string | (() => string) | undefined>(undefined);

  private _actions = signal<BreadCrumbButton[]>([]);

  readonly title: Signal<string | (() => string) | undefined> = this._title.asReadonly();
  readonly actions: Signal<BreadCrumbButton[]> = this._actions.asReadonly();

  setTitle(title: string | (() => string)) {
    this._title.set(title);
  }

  clearTitle() {
    this._title.set(undefined);
  }

  setActions(actions: BreadCrumbButton[]) {
    this._actions.set(actions);
  }

  clearActions() {
    this._actions.set([]);
  }
}
