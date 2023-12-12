import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorInvoiceListComponent } from './vendor-invoice-list.component';

describe('VendorInvoiceListComponent', () => {
  let component: VendorInvoiceListComponent;
  let fixture: ComponentFixture<VendorInvoiceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorInvoiceListComponent]
    });
    fixture = TestBed.createComponent(VendorInvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
