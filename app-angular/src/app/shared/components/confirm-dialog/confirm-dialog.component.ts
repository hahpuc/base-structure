import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'info' | 'warning' | 'danger' | 'success';
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-50 overflow-y-auto" [class.hidden]="!isVisible">
      <!-- Background overlay -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        (click)="onCancel()"
      ></div>

      <!-- Modal -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div
          class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
        >
          <!-- Icon -->
          <div
            class="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
            [ngClass]="iconBackgroundClass"
          >
            <svg
              class="h-6 w-6"
              [ngClass]="iconClass"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <!-- Info icon -->
              <path
                *ngIf="data.type === 'info'"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
              <!-- Warning icon -->
              <path
                *ngIf="data.type === 'warning'"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
              <!-- Danger icon -->
              <path
                *ngIf="data.type === 'danger'"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
              <!-- Success icon -->
              <path
                *ngIf="data.type === 'success'"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          <!-- Content -->
          <div class="mt-3 text-center sm:mt-5">
            <h3 class="text-base font-semibold leading-6 text-gray-900">
              {{ data.title }}
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                {{ data.message }}
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div
            class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
          >
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:col-start-2"
              [ngClass]="confirmButtonClass"
              (click)="onConfirm()"
            >
              {{ data.confirmText || 'Confirm' }}
            </button>
            <button
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
              (click)="onCancel()"
            >
              {{ data.cancelText || 'Cancel' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ConfirmDialogComponent {
  @Input() isVisible: boolean = false;
  @Input() data: ConfirmDialogData = {
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed?',
    type: 'info',
  };

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  get iconBackgroundClass(): string {
    const classes = {
      info: 'bg-blue-100',
      warning: 'bg-yellow-100',
      danger: 'bg-red-100',
      success: 'bg-green-100',
    };
    return classes[this.data.type || 'info'];
  }

  get iconClass(): string {
    const classes = {
      info: 'text-blue-600',
      warning: 'text-yellow-600',
      danger: 'text-red-600',
      success: 'text-green-600',
    };
    return classes[this.data.type || 'info'];
  }

  get confirmButtonClass(): string {
    const classes = {
      info: 'bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600',
      warning:
        'bg-yellow-600 hover:bg-yellow-500 focus-visible:outline-yellow-600',
      danger: 'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600',
      success:
        'bg-green-600 hover:bg-green-500 focus-visible:outline-green-600',
    };
    return classes[this.data.type || 'info'];
  }

  onConfirm(): void {
    this.confirmed.emit();
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
