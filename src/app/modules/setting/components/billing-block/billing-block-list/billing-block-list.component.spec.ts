import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingBlockListComponent } from './billing-block-list.component';

describe('BillingBlockListComponent', () => {
  let component: BillingBlockListComponent;
  let fixture: ComponentFixture<BillingBlockListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillingBlockListComponent]
    });
    fixture = TestBed.createComponent(BillingBlockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
