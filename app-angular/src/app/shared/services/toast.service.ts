import { Injectable } from '@angular/core';
import { APP_CONSTANTS, NOTIFICATION_TYPES } from '../constants/app.constants';

export interface ToastMessage {
  id: string;
  type: keyof typeof NOTIFICATION_TYPES;
  title: string;
  message: string;
  duration?: number;
  dismissible?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: ToastMessage[] = [];
  private toastSubject = new BehaviorSubject<ToastMessage[]>([]);

  constructor() {}

  getToasts() {
    return this.toastSubject.asObservable();
  }

  show(toast: Omit<ToastMessage, 'id'>): void {
    const id = this.generateId();
    const newToast: ToastMessage = {
      id,
      duration: APP_CONSTANTS.UI.TOAST_DURATION,
      dismissible: true,
      ...toast,
    };

    this.toasts.push(newToast);
    this.toastSubject.next([...this.toasts]);

    // Auto dismiss
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, newToast.duration);
    }
  }

  success(title: string, message: string, duration?: number): void {
    this.show({
      type: 'SUCCESS',
      title,
      message,
      duration,
    });
  }

  error(title: string, message: string, duration?: number): void {
    this.show({
      type: 'ERROR',
      title,
      message,
      duration: duration || 5000, // Errors stay longer
    });
  }

  warning(title: string, message: string, duration?: number): void {
    this.show({
      type: 'WARNING',
      title,
      message,
      duration,
    });
  }

  info(title: string, message: string, duration?: number): void {
    this.show({
      type: 'INFO',
      title,
      message,
      duration,
    });
  }

  dismiss(id: string): void {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.toastSubject.next([...this.toasts]);
  }

  clear(): void {
    this.toasts = [];
    this.toastSubject.next([]);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

// Fix import
import { BehaviorSubject } from 'rxjs';
