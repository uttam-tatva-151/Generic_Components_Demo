/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { Generic_snackbar_demoComponent } from './generic_snackbar_demo.component';

describe('Generic_snackbar_demoComponent', () => {
  let component: Generic_snackbar_demoComponent;
  let fixture: ComponentFixture<Generic_snackbar_demoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Generic_snackbar_demoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Generic_snackbar_demoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
