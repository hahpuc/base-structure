import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  isSidebarOpen = false;
  currentUser = {
    name: 'Long Nguyen',
    email: 'admin@example.com',
    avatar:
      'https://media.about.nike.com/img/bb971c73-1433-41e3-97cb-4b40e62d353c/250424-nike-seoul-day1-lightbox-karina-0687-v1g-rgb-re.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjowLCJ0b3AiOjAsIndpZHRoIjozMDAwLCJoZWlnaHQiOjE2ODh9LCJyZXNpemUiOnsid2lkdGgiOjkwMH19fQ%3D%3D&s=c14a011e4279b2852fac17fb52acda20feb6980cbb3afda1535f75dd52435a58',
  };

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout(): void {
    // Implement logout logic here
    this.router.navigate(['/auth/login']);
  }
}
