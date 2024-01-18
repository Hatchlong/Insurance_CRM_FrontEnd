import { TestBed } from '@angular/core/testing';

import { GoodReceiptService } from './good-receipt.service';

describe('GoodReceiptService', () => {
  let service: GoodReceiptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoodReceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
