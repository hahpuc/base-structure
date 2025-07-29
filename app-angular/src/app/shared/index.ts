// Shared Module Index - Single point of export for all shared resources

// Core Module
export { SharedModule } from './shared.module';

// Constants
export * from './constants/app.constants';

// Services
export * from './services/toast.service';

// Utilities
export * from './utils/common.utils';

// Components
export { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
export {
  ConfirmDialogComponent,
  type ConfirmDialogData,
} from './components/confirm-dialog/confirm-dialog.component';
export { ToastComponent } from './components/toast/toast.component';

// Directives
export { ClickOutsideDirective } from './directives/click-outside.directive';
export { HighlightDirective } from './directives/highlight.directive';

// Pipes
export { TruncatePipe } from './pipes/truncate.pipe';
export { TimeAgoPipe } from './pipes/time-ago.pipe';
