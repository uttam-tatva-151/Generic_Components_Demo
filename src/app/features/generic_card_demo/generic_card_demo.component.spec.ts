/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Generic_card_demoComponent } from './generic_card_demo.component';

describe('Generic_card_demoComponent', () => {
  let component: Generic_card_demoComponent;
  let fixture: ComponentFixture<Generic_card_demoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Generic_card_demoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Generic_card_demoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
