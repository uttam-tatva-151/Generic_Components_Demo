import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-generic-input-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input_field.component.html',
  styleUrls: ['./input_field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericInputFieldComponent),
      multi: true,
    },
  ]
})
export class GenericInputFieldComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() type: string = 'text'; // text, number, email, password, etc.
  @Input() name?: string;
  @Input() placeholder?: string;
  @Input() required: boolean = false;
  @Input() minLength?: number;
  @Input() maxLength?: number;
  @Input() min?: number | string;
  @Input() max?: number | string;
  @Input() pattern?: string | RegExp;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() autoTrim: boolean = true;
  @Input() icon?: string; // Font Awesome class (e.g. 'fa-solid fa-user')
  @Input() iconPosition: 'prefix' | 'suffix' = 'prefix';
  @Input() helperText?: string;
  @Input() errorText?: string; // Custom error message
  @Input() customClass?: string;
  @Input() customStyle?: { [key: string]: string; };
  @Input() rows: number = 3; // for textarea
  @Input() showTogglePassword: boolean = false; // only for password

  @Output() valueChange = new EventEmitter<any>();
  @Output() inputBlur = new EventEmitter<void>();

  @ViewChild('inputEl') inputEl?: ElementRef;

  value: any = '';
  touched = false;
  showPassword = false;
  internalError: string | null = null;

  // ControlValueAccessor functions
  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value ?? '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: any) {
    let val = event.target.value;
    if (this.autoTrim && typeof val === 'string') {
      val = val.trimStart();
    }
    this.value = val;
    this.onChange(val);
    this.valueChange.emit(val);
    this.checkValidation();
  }

  handleBlur() {
    this.touched = true;
    this.onTouched();
    this.inputBlur.emit();
    this.checkValidation();
  }

  checkValidation() {
    this.internalError = null;
    const val = this.value ?? '';
    if (this.required && !val) {
      this.internalError = 'This field is required';
    } else if (this.minLength && val.length < this.minLength) {
      this.internalError = `Must be at least ${this.minLength} characters`;
    } else if (this.maxLength && val.length > this.maxLength) {
      this.internalError = `Must be at most ${this.maxLength} characters`;
    } else if (this.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) {
      this.internalError = 'Invalid email address';
    } else if (this.pattern) {
      const reg = typeof this.pattern === 'string' ? new RegExp(this.pattern) : this.pattern;
      if (val && !reg.test(val)) {
        this.internalError = 'Invalid format';
      }
    } else if (this.type === 'number' && val !== '' && !isNaN(val)) {
      if (this.min !== undefined && +val < +this.min) {
        this.internalError = `Must be ≥ ${this.min}`;
      }
      if (this.max !== undefined && +val > +this.max) {
        this.internalError = `Must be ≤ ${this.max}`;
      }
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    setTimeout(() => {
      if (this.inputEl) this.inputEl.nativeElement.focus();
    });
  }

  // For exposing focus to parent
  focus() {
    if (this.inputEl) this.inputEl.nativeElement.focus();
  }
}