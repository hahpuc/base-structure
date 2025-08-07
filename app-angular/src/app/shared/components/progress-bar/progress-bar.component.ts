import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProgressBarService } from '@shared/services/progress-bar.service';

export type ProgressBarTheme = 'primary' | 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'app-progress-bar',
  standalone: false,
  templateUrl: './progress-bar.component.html',
  styleUrl: './prgoress-bar.component.scss',
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  @Input() theme: ProgressBarTheme = 'primary';
  @Input() height: number = 3;

  isLoading = false;
  private subscription: Subscription = new Subscription();

  constructor(private progressBarService: ProgressBarService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.progressBarService.isLoading$.subscribe(loading => {
        this.isLoading = loading;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
