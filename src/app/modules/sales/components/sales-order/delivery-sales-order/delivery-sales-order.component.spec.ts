import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverySalesOrderComponent } from './delivery-sales-order.component';

describe('DeliverySalesOrderComponent', () => {
  let component: DeliverySalesOrderComponent;
  let fixture: ComponentFixture<DeliverySalesOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliverySalesOrderComponent]
    });
    fixture = TestBed.createComponent(DeliverySalesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
