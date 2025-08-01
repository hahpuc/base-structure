import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private requestCount = 0;

  get isLoading$(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  get isLoading(): boolean {
    return this.loadingSubject.value;
  }

  /**
   * Start loading - increment request counter
   */
  start(): void {
    this.requestCount++;
    if (this.requestCount === 1) {
      this.loadingSubject.next(true);
    }
  }

  /**
   * Stop loading - decrement request counter
   */
  stop(): void {
    this.requestCount = Math.max(0, this.requestCount - 1);
    if (this.requestCount === 0) {
      this.loadingSubject.next(false);
    }
  }

  /**
   * Force stop all loading
   */
  forceStop(): void {
    this.requestCount = 0;
    this.loadingSubject.next(false);
  }
}
