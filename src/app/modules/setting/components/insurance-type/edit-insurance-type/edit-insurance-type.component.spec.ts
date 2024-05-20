import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsuranceTypeComponent } from './edit-insurance-type.component';

describe('EditInsuranceTypeComponent', () => {
  let component: EditInsuranceTypeComponent;
  let fixture: ComponentFixture<EditInsuranceTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInsuranceTypeComponent]
    });
    fixture = TestBed.createComponent(EditInsuranceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
