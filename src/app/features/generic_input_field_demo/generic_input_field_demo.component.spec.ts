/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { Generic_input_field_demoComponent } from './generic_input_field_demo.component';

describe('Generic_input_field_demoComponent', () => {
  let component: Generic_input_field_demoComponent;
  let fixture: ComponentFixture<Generic_input_field_demoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Generic_input_field_demoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Generic_input_field_demoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
