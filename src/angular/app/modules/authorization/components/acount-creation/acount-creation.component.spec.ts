import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcountCreationComponent } from './acount-creation.component';

describe('AcountCreationComponent', () => {
  let component: AcountCreationComponent;
  let fixture: ComponentFixture<AcountCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcountCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcountCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
