import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaymentTermComponent } from './edit-payment-term.component';

describe('EditPaymentTermComponent', () => {
  let component: EditPaymentTermComponent;
  let fixture: ComponentFixture<EditPaymentTermComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPaymentTermComponent]
    });
    fixture = TestBed.createComponent(EditPaymentTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
