import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerAccountAGComponent } from './edit-customer-account-ag.component';

describe('EditCustomerAccountAGComponent', () => {
  let component: EditCustomerAccountAGComponent;
  let fixture: ComponentFixture<EditCustomerAccountAGComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCustomerAccountAGComponent]
    });
    fixture = TestBed.createComponent(EditCustomerAccountAGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
