import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  stats = [
    {
      title: 'Total Users',
      value: '2,834',
      change: '+12%',
      changeType: 'increase',
      icon: 'users',
    },
    {
      title: 'Revenue',
      value: '$45,234',
      change: '+8.2%',
      changeType: 'increase',
      icon: 'currency',
    },
    {
      title: 'Orders',
      value: '1,423',
      change: '-2.4%',
      changeType: 'decrease',
      icon: 'shopping',
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '+1.8%',
      changeType: 'increase',
      icon: 'chart',
    },
  ];

  recentActivities = [
    {
      id: 1,
      user: 'Long Nguyen',
      action: 'Created a new project',
      time: '2 hours ago',
      avatar:
        'https://media.about.nike.com/img/bb971c73-1433-41e3-97cb-4b40e62d353c/250424-nike-seoul-day1-lightbox-karina-0687-v1g-rgb-re.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjowLCJ0b3AiOjAsIndpZHRoIjozMDAwLCJoZWlnaHQiOjE2ODh9LCJyZXNpemUiOnsid2lkdGgiOjkwMH19fQ%3D%3D&s=c14a011e4279b2852fac17fb52acda20feb6980cbb3afda1535f75dd52435a58',
    },
    {
      id: 2,
      user: 'Karina',
      action: 'Updated user profile',
      time: '4 hours ago',
      avatar:
        'https://media.about.nike.com/img/bb971c73-1433-41e3-97cb-4b40e62d353c/250424-nike-seoul-day1-lightbox-karina-0687-v1g-rgb-re.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjowLCJ0b3AiOjAsIndpZHRoIjozMDAwLCJoZWlnaHQiOjE2ODh9LCJyZXNpemUiOnsid2lkdGgiOjkwMH19fQ%3D%3D&s=c14a011e4279b2852fac17fb52acda20feb6980cbb3afda1535f75dd52435a58',
    },
    {
      id: 3,
      user: 'Giselle',
      action: 'Completed task assignment',
      time: '6 hours ago',
      avatar:
        'https://media.about.nike.com/img/bb971c73-1433-41e3-97cb-4b40e62d353c/250424-nike-seoul-day1-lightbox-karina-0687-v1g-rgb-re.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjowLCJ0b3AiOjAsIndpZHRoIjozMDAwLCJoZWlnaHQiOjE2ODh9LCJyZXNpemUiOnsid2lkdGgiOjkwMH19fQ%3D%3D&s=c14a011e4279b2852fac17fb52acda20feb6980cbb3afda1535f75dd52435a58',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    // Initialize component
  }

  getStatIcon(iconType: string): string {
    const icons: { [key: string]: string } = {
      users:
        'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
      currency:
        'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      shopping: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7H6L5 9z',
      chart:
        'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    };
    return icons[iconType] || icons['chart'];
  }
}
