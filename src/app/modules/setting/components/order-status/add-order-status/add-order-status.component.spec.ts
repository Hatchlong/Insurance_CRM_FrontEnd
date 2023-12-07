import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderStatusComponent } from './add-order-status.component';

describe('AddOrderStatusComponent', () => {
  let component: AddOrderStatusComponent;
  let fixture: ComponentFixture<AddOrderStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrderStatusComponent]
    });
    fixture = TestBed.createComponent(AddOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
