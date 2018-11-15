import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndeterminateProgressSpinnerComponent } from './indeterminate-progress-spinner.component';

describe('IndeterminateProgressSpinnerComponent', () => {
  let component: IndeterminateProgressSpinnerComponent;
  let fixture: ComponentFixture<IndeterminateProgressSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndeterminateProgressSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndeterminateProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
