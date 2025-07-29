import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight: string = 'yellow';
  @Input() defaultColor: string = 'transparent';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setBackgroundColor(this.defaultColor);
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.setBackgroundColor(this.appHighlight);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.setBackgroundColor(this.defaultColor);
  }

  private setBackgroundColor(color: string): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'backgroundColor',
      color
    );
  }
}
