import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  private loading = signal(false);
  private requestCount = 0;

  // Computed signal for loading state
  readonly isLoading = computed(() => this.loading());

  /**
   * Start loading - increment request counter
   */
  start(): void {
    this.requestCount++;
    if (this.requestCount === 1) {
      this.loading.set(true);
    }
  }

  /**
   * Stop loading - decrement request counter
   */
  stop(): void {
    this.requestCount = Math.max(0, this.requestCount - 1);
    if (this.requestCount === 0) {
      this.loading.set(false);
    }
  }

  /**
   * Force stop all loading
   */
  forceStop(): void {
    this.requestCount = 0;
    this.loading.set(false);
  }
}
