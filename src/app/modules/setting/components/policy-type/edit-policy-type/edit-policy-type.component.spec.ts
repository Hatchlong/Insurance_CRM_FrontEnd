import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPolicyTypeComponent } from './edit-policy-type.component';

describe('EditPolicyTypeComponent', () => {
  let component: EditPolicyTypeComponent;
  let fixture: ComponentFixture<EditPolicyTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPolicyTypeComponent]
    });
    fixture = TestBed.createComponent(EditPolicyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
