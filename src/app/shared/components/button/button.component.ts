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
  @Input() icon?: string; // Font Awesome or Material icon class
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() block = false; // Full width
  @Input() ariaLabel?: string;
  @Input() customClass?: string;
  @Input() customStyle?: { [key: string]: string; };
  @Output() btnClick = new EventEmitter<Event>();

  // Edge: if no label, use ariaLabel for accessibility
  get computedAriaLabel(): string {
    return this.ariaLabel || this.label || 'Button';
  }

  onClick(event: Event) {
    if (!this.loading && !this.disabled) {
      this.btnClick.emit(event);
    }
  }

}
