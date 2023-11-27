import { TestBed } from '@angular/core/testing';

import { PurchaseOrgService } from './purchase-org.service';

describe('PurchaseOrgService', () => {
  let service: PurchaseOrgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseOrgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
