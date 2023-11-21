import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorInvoiceComponent } from './add-vendor-invoice.component';

describe('AddVendorInvoiceComponent', () => {
  let component: AddVendorInvoiceComponent;
  let fixture: ComponentFixture<AddVendorInvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVendorInvoiceComponent]
    });
    fixture = TestBed.createComponent(AddVendorInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
