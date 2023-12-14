import { TestBed } from '@angular/core/testing';

import { BillingBlockService } from './billing-block.service';

describe('BillingBlockService', () => {
  let service: BillingBlockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingBlockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
