import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })

export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>('light');
  theme$ = this.themeSubject.asObservable();

  constructor() {
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'light';
    this.setTheme(savedTheme);
  }

  toggleTheme() {
    const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme: Theme) {
    this.themeSubject.next(theme);
    localStorage.setItem('theme', theme);
    
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    
    if (theme === 'dark') {
      // Add dark classes for Tailwind
      htmlElement.classList.add('dark');
      bodyElement.classList.add('dark:bg-gray-900');
      
      // Set data attribute for Ant Design dark theme
      htmlElement.setAttribute('data-theme', 'dark');
      bodyElement.setAttribute('data-theme', 'dark');
      
      // Add transition class for smooth animations
      htmlElement.classList.add('theme-transition');
    } else {
      // Remove dark classes
      htmlElement.classList.remove('dark');
      bodyElement.classList.remove('dark:bg-gray-900');
      
      // Set data attribute for Ant Design light theme
      htmlElement.setAttribute('data-theme', 'light');
      bodyElement.setAttribute('data-theme', 'light');
      
      // Add transition class for smooth animations
      htmlElement.classList.add('theme-transition');
    }
    
    // Remove transition class after animation completes
    setTimeout(() => {
      htmlElement.classList.remove('theme-transition');
    }, 300);
  }
}