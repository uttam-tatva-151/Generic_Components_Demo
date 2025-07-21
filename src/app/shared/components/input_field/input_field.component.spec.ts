/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Input_fieldComponent } from './input_field.component';

describe('Input_fieldComponent', () => {
  let component: Input_fieldComponent;
  let fixture: ComponentFixture<Input_fieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Input_fieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Input_fieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
