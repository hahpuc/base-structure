import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml', standalone: false })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: string | undefined) {
    if (!value) return value;
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
