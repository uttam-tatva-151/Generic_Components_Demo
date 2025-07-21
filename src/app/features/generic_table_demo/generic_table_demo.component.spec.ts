/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Generic_table_demoComponent } from './generic_table_demo.component';

describe('Generic_table_demoComponent', () => {
  let component: Generic_table_demoComponent;
  let fixture: ComponentFixture<Generic_table_demoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Generic_table_demoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Generic_table_demoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
