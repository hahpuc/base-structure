import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';

@Component({
  selector: 'ft-header',
  standalone: false,
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(private readonly headerService: HeaderService) {}

  ngOnInit(): void {}

  get title() {
    return this.headerService.pageTitle;
  }

  get buttons() {
    return this.headerService.headerButtons;
  }
}
