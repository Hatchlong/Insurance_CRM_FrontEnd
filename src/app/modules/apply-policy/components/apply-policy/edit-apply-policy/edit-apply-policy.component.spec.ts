import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApplyPolicyComponent } from './edit-apply-policy.component';

describe('EditApplyPolicyComponent', () => {
  let component: EditApplyPolicyComponent;
  let fixture: ComponentFixture<EditApplyPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditApplyPolicyComponent]
    });
    fixture = TestBed.createComponent(EditApplyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
