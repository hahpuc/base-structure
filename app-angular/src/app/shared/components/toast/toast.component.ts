import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastService, ToastMessage } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <div
        *ngFor="let toast of toasts; trackBy: trackByToastId"
        class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden transform transition-all duration-300 ease-in-out"
        [class.translate-x-0]="true"
        [class.opacity-100]="true"
      >
        <div class="p-4">
          <div class="flex items-start">
            <!-- Icon -->
            <div class="flex-shrink-0">
              <svg
                class="w-6 h-6"
                [ngClass]="getIconColor(toast.type)"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <!-- Success icon -->
                <path
                  *ngIf="toast.type === 'SUCCESS'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <!-- Error icon -->
                <path
                  *ngIf="toast.type === 'ERROR'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <!-- Warning icon -->
                <path
                  *ngIf="toast.type === 'WARNING'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
                <!-- Info icon -->
                <path
                  *ngIf="toast.type === 'INFO'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <!-- Content -->
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">{{ toast.title }}</p>
              <p class="mt-1 text-sm text-gray-500">{{ toast.message }}</p>
            </div>

            <!-- Close button -->
            <div *ngIf="toast.dismissible" class="ml-4 flex-shrink-0 flex">
              <button
                class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                (click)="dismiss(toast.id)"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Progress bar -->
        <div
          *ngIf="toast.duration && toast.duration > 0"
          class="bg-gray-200 h-1"
        >
          <div
            class="h-1 transition-all ease-linear"
            [ngClass]="getProgressBarColor(toast.type)"
            [style.animation]="'progress ' + toast.duration + 'ms linear'"
          ></div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @keyframes progress {
        from {
          width: 100%;
        }
        to {
          width: 0%;
        }
      }
    `,
  ],
})
export class ToastComponent implements OnDestroy {
  toasts: ToastMessage[] = [];
  private subscription: Subscription;

  constructor(private toastService: ToastService) {
    this.subscription = this.toastService
      .getToasts()
      .subscribe((toasts) => (this.toasts = toasts));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  dismiss(id: string): void {
    this.toastService.dismiss(id);
  }

  trackByToastId(index: number, toast: ToastMessage): string {
    return toast.id;
  }

  getIconColor(type: string): string {
    const colors = {
      SUCCESS: 'text-green-500',
      ERROR: 'text-red-500',
      WARNING: 'text-yellow-500',
      INFO: 'text-blue-500',
    };
    return colors[type as keyof typeof colors] || colors.INFO;
  }

  getProgressBarColor(type: string): string {
    const colors = {
      SUCCESS: 'bg-green-500',
      ERROR: 'bg-red-500',
      WARNING: 'bg-yellow-500',
      INFO: 'bg-blue-500',
    };
    return colors[type as keyof typeof colors] || colors.INFO;
  }
}
