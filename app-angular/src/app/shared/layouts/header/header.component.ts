import { Component, OnInit } from '@angular/core';

import { HeaderService, HeaderButton, HeaderButtonType } from './header.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(private readonly headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.setTitle('');
    this.headerService.setButtons([]);
  }

  get title() {
    return this.headerService.pageTitle;
  }

  get buttons() {
    return this.headerService.headerButtons;
  }

  onClick = () => {};

  // Helper methods for dynamic properties
  getButtonType(button: HeaderButton): HeaderButtonType {
    if (typeof button.type === 'function') {
      return button.type();
    }
    return button.type || 'default';
  }

  getButtonTitle(button: HeaderButton): string {
    if (typeof button.title === 'function') {
      return button.title();
    }
    return button.title;
  }

  getButtonIcon(button: HeaderButton): string | undefined {
    if (typeof button.icon === 'function') {
      return button.icon();
    }
    return button.icon;
  }

  isButtonVisible(button: HeaderButton): boolean {
    if (typeof button.visible === 'function') {
      return button.visible();
    }
    return button.visible !== false; // Default to true if not specified
  }

  isButtonDisabled(button: HeaderButton): boolean {
    if (typeof button.disable === 'function') {
      return button.disable();
    }
    return button.disable === true; // Default to false if not specified
  }

  getButtonClasses(button: HeaderButton): string {
    const type = this.getButtonType(button);
    const isDisabled = this.isButtonDisabled(button);

    // Base classes: Use both outline and ghost, ghost will take precedence on desktop
    const baseClasses = 'kt-btn font-semibold text-xs';
    const responsiveClasses = 'kt-btn-outline kt-btn-ghost';

    const typeClasses: Record<HeaderButtonType, string> = {
      default: isDisabled
        ? 'text-gray-400 border-gray-300 cursor-not-allowed'
        : 'text-blue-600 border-blue-600 md:border-transparent hover:bg-blue-50 cursor-pointer',
      primary: isDisabled
        ? 'text-gray-400 border-gray-300 cursor-not-allowed'
        : 'text-blue-600 border-blue-600 md:border-transparent hover:bg-blue-50 cursor-pointer',
      success: isDisabled
        ? 'text-gray-400 border-gray-300 cursor-not-allowed'
        : 'text-green-600 border-green-600 md:border-transparent hover:bg-green-50 cursor-pointer',
      info: isDisabled
        ? 'text-gray-400 border-gray-300 cursor-not-allowed'
        : 'text-cyan-600 border-cyan-600 md:border-transparent hover:bg-cyan-50 cursor-pointer',
      warning: isDisabled
        ? 'text-gray-400 border-gray-300 cursor-not-allowed'
        : 'text-yellow-600 border-yellow-600 md:border-transparent hover:bg-yellow-50 cursor-pointer',
      danger: isDisabled
        ? 'text-gray-400 border-gray-300 cursor-not-allowed'
        : 'text-red-600 border-red-600 md:border-transparent hover:bg-red-50 cursor-pointer',
    };

    const disabledClasses = isDisabled ? 'opacity-60 pointer-events-none' : '';

    return `${baseClasses} ${responsiveClasses} ${typeClasses[type]} ${disabledClasses}`.trim();
  }

  getIconClasses(button: HeaderButton): string {
    const type = this.getButtonType(button);
    const isDisabled = this.isButtonDisabled(button);

    if (isDisabled) {
      return 'text-gray-400';
    }

    const typeClasses: Record<HeaderButtonType, string> = {
      default: 'text-blue-600',
      primary: 'text-blue-600',
      success: 'text-green-600',
      info: 'text-cyan-600',
      warning: 'text-yellow-600',
      danger: 'text-red-600',
    };

    return typeClasses[type];
  }

  onButtonClick(button: HeaderButton): void {
    if (!this.isButtonDisabled(button) && button.click) {
      button.click();
    }
  }

  getButtonStyles(): { [key: string]: string } {
    return {
      'font-size': '13px',
    };
  }
}
