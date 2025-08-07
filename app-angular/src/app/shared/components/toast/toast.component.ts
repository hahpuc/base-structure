import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastMessage, ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: false,
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
      message: `${toast?.message ?? ''}`,
      variant: toast?.type || 'info', // 'info' | 'success' | 'warning' | 'destructive'
      duration: toast?.duration || 3000,
      appearance: 'solid', // 'solid' | 'outline' | 'light'
    });
  }
}
