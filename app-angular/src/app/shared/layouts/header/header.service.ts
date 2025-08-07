import { Injectable } from '@angular/core';

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

  get pageTitle(): string | undefined {
    return this.title;
  }

  get headerButtons(): HeaderButton[] {
    return this.buttons;
  }

  clear() {
    this.title = undefined;
    this.buttons = [];
  }

  setTitle(title: string) {
    this.title = title;
  }

  setButtons(buttons: HeaderButton[]) {
    this.buttons = buttons;
  }
}
