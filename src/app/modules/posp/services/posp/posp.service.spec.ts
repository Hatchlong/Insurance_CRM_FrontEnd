import { TestBed } from '@angular/core/testing';

import { PospService } from './posp.service';

describe('PospService', () => {
  let service: PospService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PospService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
