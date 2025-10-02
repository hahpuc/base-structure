import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-rich-text',
  templateUrl: './rich-text.component.html',
})
export class RichTextComponent {
  @Input() required = false;
}
