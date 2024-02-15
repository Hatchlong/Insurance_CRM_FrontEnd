import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPolicyPlanComponent } from './edit-policy-plan.component';

describe('EditPolicyPlanComponent', () => {
  let component: EditPolicyPlanComponent;
  let fixture: ComponentFixture<EditPolicyPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPolicyPlanComponent]
    });
    fixture = TestBed.createComponent(EditPolicyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
