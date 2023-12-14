import { TestBed } from '@angular/core/testing';

import { CustomerAccountAGService } from './customer-account-ag.service';

describe('CustomerAccountAGService', () => {
  let service: CustomerAccountAGService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerAccountAGService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
