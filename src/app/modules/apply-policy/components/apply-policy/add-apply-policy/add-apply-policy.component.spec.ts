import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplyPolicyComponent } from './add-apply-policy.component';

describe('AddApplyPolicyComponent', () => {
  let component: AddApplyPolicyComponent;
  let fixture: ComponentFixture<AddApplyPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddApplyPolicyComponent]
    });
    fixture = TestBed.createComponent(AddApplyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
