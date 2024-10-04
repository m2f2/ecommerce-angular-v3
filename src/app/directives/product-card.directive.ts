import { Directive, ElementRef, HostListener, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appProductCard]',
  standalone: true
})
export class ProductCardDirective implements OnChanges {

  @Input() shadowColor: string = 'gray';
  @Input() shadowSize: number = 5;

  originalShadow: string = '';

  constructor(private el: ElementRef) { }
  ngOnChanges() {
    this.shadow();
  }
  @HostListener('mouseover') onMouseOver() {
    this.el.nativeElement.style.boxShadow = `10px 20px 20px ${this.shadowColor}`;
  }

  @HostListener('mouseout') onMouseOut() {
    this.el.nativeElement.style.boxShadow = this.originalShadow;
  }

  shadow() {
    this.originalShadow = `0px ${this.shadowSize}px ${this.shadowSize}px ${this.shadowColor}`;
    this.el.nativeElement.style.boxShadow = this.originalShadow;
    this.el.nativeElement.style.borderRadius = '20px';
  }
}
