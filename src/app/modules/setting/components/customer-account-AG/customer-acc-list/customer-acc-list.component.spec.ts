import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAccListComponent } from './customer-acc-list.component';

describe('CustomerAccListComponent', () => {
  let component: CustomerAccListComponent;
  let fixture: ComponentFixture<CustomerAccListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerAccListComponent]
    });
    fixture = TestBed.createComponent(CustomerAccListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
