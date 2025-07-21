import { Component } from '@angular/core';
import { GenericInputFieldComponent } from '../../shared/components/input_field/input_field.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generic_input_field_demo',
  standalone: true,
  templateUrl: './generic_input_field_demo.component.html',
  styleUrls: ['./generic_input_field_demo.component.css'],
  imports: [GenericInputFieldComponent,CommonModule]
})
export class Generic_input_field_demoComponent {

  name = '';
  email = '';
  password = '';
  age: number | null = null;
  bio = '';

  onNameChange(value: string) {
    this.name = value;
    // Extra logic if needed
  }

  onEmailChange(value: string) {
    this.email = value;
  }

  onPwdChange(value: string) {
    this.password = value;
  }

  onAgeChange(value: number) {
    this.age = value;
  }

  onBioChange(value: string) {
    this.bio = value;
  }

}
