import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Export standalone components, pipes, and directives for easy import
export { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
export { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
export { ToastComponent } from './components/toast/toast.component';
export { ClickOutsideDirective } from './directives/click-outside.directive';
export { TruncatePipe } from './pipes/truncate.pipe';

// Export services and utilities
export { ToastService } from './services/toast.service';
export * from './constants/app.constants';
export * from './utils/common.utils';

/**
 * SharedModule provides common Angular modules for easy import
 * Use this when you need to import multiple common modules at once
 */
@NgModule({
  exports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class SharedModule {}

// Common imports array for standalone components
export const SHARED_IMPORTS = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
] as const;
