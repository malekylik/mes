import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRulePageComponent } from './edit-rule-page.component';

describe('EditRulePageComponent', () => {
  let component: EditRulePageComponent;
  let fixture: ComponentFixture<EditRulePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRulePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
