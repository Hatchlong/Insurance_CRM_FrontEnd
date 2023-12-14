import { TestBed } from '@angular/core/testing';

import { SalesOrgService } from './sales-org.service';

describe('SalesOrgService', () => {
  let service: SalesOrgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesOrgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
