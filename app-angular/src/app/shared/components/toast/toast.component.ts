import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastService, ToastMessage } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: ` <div></div> `,
})
export class ToastComponent implements OnDestroy {
  toasts: ToastMessage[] = [];
  private subscription: Subscription;

  constructor(private toastService: ToastService) {
    this.subscription = this.toastService.getToasts().subscribe((toasts) => {
      this._showToastMessage(toasts[toasts.length - 1]);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  dismiss(id: string): void {
    this.toastService.dismiss(id);
  }

  private _showToastMessage(toast: ToastMessage): void {
    const KTToast = (window as any).KTToast;

    (KTToast as any).show({
      message: `${toast.message}`,
      variant: toast.type,
      duration: toast.duration || 3000,
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
      appearance: 'solid', // 'solid' | 'outline' | 'light'
    });
  }
}
