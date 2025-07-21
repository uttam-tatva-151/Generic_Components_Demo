/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Generic_modal_demoComponent } from './generic_modal_demo.component';

describe('Generic_modal_demoComponent', () => {
  let component: Generic_modal_demoComponent;
  let fixture: ComponentFixture<Generic_modal_demoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Generic_modal_demoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Generic_modal_demoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
