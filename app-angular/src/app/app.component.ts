import { Component, OnInit, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private translateService: TranslateService;

  constructor(private injector: Injector) {
    this.translateService = this.injector.get(TranslateService);
  }

  ngOnInit(): void {
    let lang = localStorage.getItem('lang');
    if (!lang) {
      lang = 'en';
      localStorage.setItem('lang', lang);
    }
    this.translateService.use(lang);
  }
}
