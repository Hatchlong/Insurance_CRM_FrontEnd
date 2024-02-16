import { TestBed } from '@angular/core/testing';

import { FinancialPeriodService } from './financial-period.service';

describe('FinancialPeriodService', () => {
  let service: FinancialPeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancialPeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
