import { CommonModule } from '@angular/common';
import { Component, signal, computed, effect, OnDestroy } from '@angular/core';

import { ProgressBarService } from '../../../services/progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
})
export class ProgressBarComponent implements OnDestroy {
  private animationProgress = signal(0);
  private animationFrame: number | null = null;

  readonly isLoading = computed(() => this.progressBarService.isLoading());

  constructor(private progressBarService: ProgressBarService) {
    effect(() => {
      if (this.isLoading()) {
        this.startAnimation();
      } else {
        this.completeAnimation();
      }
    });
  }

  // Computed class for the progress bar width and animation
  progressBarClass = computed(() => {
    const progress = this.animationProgress();
    const isLoading = this.isLoading();

    if (!isLoading && progress === 100) {
      return 'w-full opacity-0';
    } else if (!isLoading) {
      return 'w-full';
    } else {
      return `w-[${Math.min(progress, 90)}%]`;
    }
  });

  // Computed width for the progress bar
  progressWidth = computed(() => {
    const progress = this.animationProgress();
    const isLoading = this.isLoading();

    if (!isLoading) {
      return 100;
    } else {
      return Math.min(progress, 90);
    }
  });

  // Computed opacity for the progress bar
  progressOpacity = computed(() => {
    const progress = this.animationProgress();
    const isLoading = this.isLoading();

    if (!isLoading && progress === 100) {
      return 0; // Fade out when complete
    }
    return 1;
  });

  private startAnimation(): void {
    this.animationProgress.set(0);
    this.animate();
  }

  private animate(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    const startTime = Date.now();
    const duration = 30000; // 30 seconds max duration

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 90, 90); // Cap at 90%

      this.animationProgress.set(progress);

      if (progress < 90 && this.isLoading()) {
        this.animationFrame = requestAnimationFrame(tick);
      }
    };

    this.animationFrame = requestAnimationFrame(tick);
  }

  private completeAnimation(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }

    this.animationProgress.set(100);

    setTimeout(() => {
      if (!this.isLoading()) {
        this.animationProgress.set(0);
      }
    }, 300);
  }

  ngOnDestroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }
}
