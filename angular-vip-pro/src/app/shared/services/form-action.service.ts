import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

export interface FormActionEvent {
  action: 'submit' | 'reset' | 'cancel' | string;
  data?: unknown;
}

export interface FormActionResponse {
  success: boolean;
  error?: string;
  data?: unknown;
}

export interface FormActionState {
  isLoading: boolean;
  lastAction?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FormActionService {
  private actionSubject = new Subject<FormActionEvent>();
  private responseSubject = new Subject<FormActionResponse>();
  private stateSubject = new BehaviorSubject<FormActionState>({ isLoading: false });

  // Observable for form components to listen to actions
  action$ = this.actionSubject.asObservable();

  // Observable for page components to listen to responses
  response$ = this.responseSubject.asObservable();

  // Observable for loading states
  state$ = this.stateSubject.asObservable();

  get currentState(): FormActionState {
    return this.stateSubject.value;
  }

  // Trigger an action from header or any external component
  triggerAction(action: string, data?: unknown): void {
    this.updateState({ isLoading: true, lastAction: action });
    this.actionSubject.next({ action, data });
  }

  // Send response from form component back to triggering component
  sendResponse(success: boolean, error?: string, data?: unknown): void {
    this.updateState({ isLoading: false, lastAction: this.currentState.lastAction });
    this.responseSubject.next({ success, error, data });
  }

  // Update loading state
  private updateState(state: Partial<FormActionState>): void {
    this.stateSubject.next({ ...this.currentState, ...state });
  }

  // Convenience methods
  triggerSubmit(data?: unknown): void {
    this.triggerAction('submit', data);
  }

  triggerReset(): void {
    this.triggerAction('reset');
  }

  triggerCancel(): void {
    this.triggerAction('cancel');
  }

  // Reset the service state
  reset(): void {
    this.updateState({ isLoading: false, lastAction: undefined });
  }
}
