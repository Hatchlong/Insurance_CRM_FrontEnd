import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerAccComponent } from './add-customer-acc.component';

describe('AddCustomerAccComponent', () => {
  let component: AddCustomerAccComponent;
  let fixture: ComponentFixture<AddCustomerAccComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCustomerAccComponent]
    });
    fixture = TestBed.createComponent(AddCustomerAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
