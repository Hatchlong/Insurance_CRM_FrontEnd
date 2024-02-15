import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyPolicyListComponent } from './apply-policy-list.component';

describe('ApplyPolicyListComponent', () => {
  let component: ApplyPolicyListComponent;
  let fixture: ComponentFixture<ApplyPolicyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyPolicyListComponent]
    });
    fixture = TestBed.createComponent(ApplyPolicyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
