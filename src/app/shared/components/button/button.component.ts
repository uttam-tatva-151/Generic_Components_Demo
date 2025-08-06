import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() label?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() btnStyle: 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'link' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() icon?: string; // Material icon name or SVG icon name
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() block = false;
  @Input() ariaLabel?: string;
  @Input() customClass?: string;
  @Input() customStyle?: { [key: string]: string; };
  @Output() btnClick = new EventEmitter<Event>();

  get computedAriaLabel(): string {
    return this.ariaLabel || this.label || 'Button';
  }

  get matButtonType(): string {
    switch (this.btnStyle) {
      case 'primary':
      case 'success':
        return 'mat-raised-button';
      case 'secondary':
        return 'mat-stroked-button';
      case 'outline':
        return 'mat-outlined-button';
      case 'danger':
        return 'mat-raised-button';
      case 'link':
        return 'mat-button';
      default:
        return 'mat-raised-button';
    }
  }

  get color(): string | undefined {
    switch (this.btnStyle) {
      case 'primary':
        return 'primary';
      case 'danger':
        return 'warn';
      case 'success':
        return 'accent';
      default:
        return undefined;
    }
  }

  get buttonClasses(): string[] {
    const classes = ['generic-btn'];
    if (this.customClass) classes.push(this.customClass);
    if (this.block) classes.push('block');
    if (this.size) classes.push(this.size);
    if (this.btnStyle) classes.push(this.btnStyle);
    return classes;
  }

  onClick(event: Event) {
    if (!this.loading && !this.disabled) {
      this.btnClick.emit(event);
    }
  }

}
