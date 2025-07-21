/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Generic_buttons_demoComponent } from './generic_buttons_demo.component';

describe('Generic_buttons_demoComponent', () => {
  let component: Generic_buttons_demoComponent;
  let fixture: ComponentFixture<Generic_buttons_demoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Generic_buttons_demoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Generic_buttons_demoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
