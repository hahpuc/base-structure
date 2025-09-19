import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ProgressBarService } from '../../shared/services/progress-bar.service';

@Component({
  selector: 'app-loading-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-8">
      <h1 class="text-3xl font-bold mb-8">Progress Bar Example</h1>

      <div class="space-y-4 flex flex-col sm:flex-row sm:space-y-0 sm:space-x-4 gap-4">
        <button
          (click)="simulateApiCall()"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Simulate API Call (3 seconds)
        </button>

        <button
          (click)="simulateLongApiCall()"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Simulate Long API Call (5 seconds)
        </button>

        <button
          (click)="simulateMultipleApiCalls()"
          class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Simulate Multiple API Calls
        </button>

        <button
          (click)="forceStop()"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Force Stop Loading
        </button>
      </div>

      <div class="mt-8 p-4 bg-gray-100 rounded">
        <p class="text-sm text-gray-600">
          Click the buttons above to test the progress bar. The progress bar will appear at the top
          of the screen when loading starts.
        </p>
        <p class="text-sm text-gray-600 mt-2">
          Loading state: {{ progressBarService.isLoading() ? 'Loading...' : 'Idle' }}
        </p>
      </div>
    </div>
  `,
})
export class LoadingExampleComponent {
  constructor(public progressBarService: ProgressBarService) {}

  simulateApiCall(): void {
    this.progressBarService.start();

    // Simulate API call
    setTimeout(() => {
      this.progressBarService.stop();
    }, 3000);
  }

  simulateLongApiCall(): void {
    this.progressBarService.start();

    // Simulate longer API call
    setTimeout(() => {
      this.progressBarService.stop();
    }, 5000);
  }

  simulateMultipleApiCalls(): void {
    // Start multiple API calls
    this.progressBarService.start();
    this.progressBarService.start();
    this.progressBarService.start();

    // Complete them at different times
    setTimeout(() => this.progressBarService.stop(), 2000);
    setTimeout(() => this.progressBarService.stop(), 3000);
    setTimeout(() => this.progressBarService.stop(), 4000);
  }

  forceStop(): void {
    this.progressBarService.forceStop();
  }
}
