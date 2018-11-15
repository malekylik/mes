import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesListPageComponent } from './rules-list-page.component';

describe('RulesListPageComponent', () => {
  let component: RulesListPageComponent;
  let fixture: ComponentFixture<RulesListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
