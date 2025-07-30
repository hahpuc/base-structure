import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user = {
    firstName: 'Long',
    lastName: 'Nguyen',
    email: 'admin@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Dev Cỏ',
    avatar:
      'https://media.about.nike.com/img/bb971c73-1433-41e3-97cb-4b40e62d353c/250424-nike-seoul-day1-lightbox-karina-0687-v1g-rgb-re.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjowLCJ0b3AiOjAsIndpZHRoIjozMDAwLCJoZWlnaHQiOjE2ODh9LCJyZXNpemUiOnsid2lkdGgiOjkwMH19fQ%3D%3D&s=c14a011e4279b2852fac17fb52acda20feb6980cbb3afda1535f75dd52435a58',
    company: 'Fractal ',
    position: 'Frontend Developer',
    location: 'NA - Nghe An - North America',
  };

  isEditing = false;

  constructor() {}

  ngOnInit(): void {
    // Initialize component
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    // Implement save logic here
    this.isEditing = false;
    // Show success message
  }

  cancelEdit(): void {
    this.isEditing = false;
    // Reset form or reload user data
  }

  onAvatarChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
