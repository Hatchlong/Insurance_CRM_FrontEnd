import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPlanListComponent } from './policy-plan-list.component';

describe('PolicyPlanListComponent', () => {
  let component: PolicyPlanListComponent;
  let fixture: ComponentFixture<PolicyPlanListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyPlanListComponent]
    });
    fixture = TestBed.createComponent(PolicyPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
