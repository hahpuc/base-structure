import { Component, OnInit } from '@angular/core';

import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(private readonly headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.setTitle('');
    this.headerService.setButtons([]);
  }

  get title() {
    return this.headerService.pageTitle;
  }

  get buttons() {
    return this.headerService.headerButtons;
  }
}
