import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentTermsComponent } from './add-payment-terms.component';

describe('AddPaymentTermsComponent', () => {
  let component: AddPaymentTermsComponent;
  let fixture: ComponentFixture<AddPaymentTermsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPaymentTermsComponent]
    });
    fixture = TestBed.createComponent(AddPaymentTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
