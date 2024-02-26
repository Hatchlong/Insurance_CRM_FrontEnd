import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialPeriodListComponent } from './financial-period-list.component';

describe('FinancialPeriodListComponent', () => {
  let component: FinancialPeriodListComponent;
  let fixture: ComponentFixture<FinancialPeriodListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialPeriodListComponent]
    });
    fixture = TestBed.createComponent(FinancialPeriodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
