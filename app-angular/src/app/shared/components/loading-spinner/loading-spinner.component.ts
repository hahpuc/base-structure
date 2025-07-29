import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center" [style.height.px]="height">
      <div class="relative">
        <div
          class="animate-spin rounded-full border-solid border-t-transparent"
          [style.width.px]="size"
          [style.height.px]="size"
          [style.border-width.px]="thickness"
          [ngClass]="colorClass"
        ></div>
        <div
          *ngIf="showText && text"
          class="mt-3 text-center text-sm font-medium"
          [ngClass]="textColorClass"
        >
          {{ text }}
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .animate-spin {
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoadingSpinnerComponent {
  @Input() size: number = 40;
  @Input() thickness: number = 4;
  @Input() color: 'primary' | 'secondary' | 'white' | 'gray' = 'primary';
  @Input() text: string = '';
  @Input() showText: boolean = false;
  @Input() height: number = 200;

  get colorClass(): string {
    const colors = {
      primary: 'border-indigo-600',
      secondary: 'border-gray-600',
      white: 'border-white',
      gray: 'border-gray-400',
    };
    return colors[this.color];
  }

  get textColorClass(): string {
    const colors = {
      primary: 'text-indigo-600',
      secondary: 'text-gray-600',
      white: 'text-white',
      gray: 'text-gray-400',
    };
    return colors[this.color];
  }
}
