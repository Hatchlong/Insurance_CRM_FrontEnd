import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPolicyTypeComponent } from './add-policy-type.component';

describe('AddPolicyTypeComponent', () => {
  let component: AddPolicyTypeComponent;
  let fixture: ComponentFixture<AddPolicyTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPolicyTypeComponent]
    });
    fixture = TestBed.createComponent(AddPolicyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
