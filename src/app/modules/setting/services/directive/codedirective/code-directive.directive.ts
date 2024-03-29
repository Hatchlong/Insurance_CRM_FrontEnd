import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCodeDirective]'
})
export class CodeDirectiveDirective {


  private maxLength: number = 3;

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputElement: HTMLInputElement = this.el.nativeElement;

    const value: string = inputElement.value;

    if (value.length >= this.maxLength) {
      inputElement.value = value.slice(0, this.maxLength); // Trim the input
      event.preventDefault();
    }
  }
}
