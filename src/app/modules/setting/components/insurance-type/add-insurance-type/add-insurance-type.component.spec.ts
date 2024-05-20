import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInsuranceTypeComponent } from './add-insurance-type.component';

describe('AddInsuranceTypeComponent', () => {
  let component: AddInsuranceTypeComponent;
  let fixture: ComponentFixture<AddInsuranceTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInsuranceTypeComponent]
    });
    fixture = TestBed.createComponent(AddInsuranceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
