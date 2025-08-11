import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type HeaderButtonType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger';

export interface HeaderButton {
  title: string | (() => string);
  icon?: string | (() => string);
  type?: HeaderButtonType | (() => HeaderButtonType);
  visible?: boolean | (() => boolean);
  disable?: boolean | (() => boolean);
  click?: () => Promise<void> | void;
  permission?: string;
}

@Injectable({ providedIn: 'root' })
export class HeaderService {
  private title: string | undefined;
  private buttons: HeaderButton[] = [];
  private buttonsChange$ = new Subject<HeaderButton[]>();

  get pageTitle(): string | undefined {
    return this.title;
  }

  get headerButtons(): HeaderButton[] {
    return this.buttons;
  }

  get buttonsChange() {
    return this.buttonsChange$.asObservable();
  }

  clear() {
    this.title = undefined;
    this.buttons = [];
    this.buttonsChange$.next(this.buttons);
  }

  setTitle(title: string) {
    this.title = title;
  }

  setButtons(buttons: HeaderButton[]) {
    this.buttons = buttons;
    this.buttonsChange$.next(this.buttons);
  }
}
