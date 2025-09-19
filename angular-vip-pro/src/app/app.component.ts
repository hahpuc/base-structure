import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProgressBarComponent } from './shared/components/loading/progress-bar/progress-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ProgressBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Angular Vjp Pro';
}
