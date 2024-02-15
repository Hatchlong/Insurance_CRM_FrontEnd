import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPolicyPlanComponent } from './add-policy-plan.component';

describe('AddPolicyPlanComponent', () => {
  let component: AddPolicyPlanComponent;
  let fixture: ComponentFixture<AddPolicyPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPolicyPlanComponent]
    });
    fixture = TestBed.createComponent(AddPolicyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
